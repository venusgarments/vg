// routes/razorpayWebhook.js
const express = require("express");
const crypto = require("crypto");
const Router = express.Router();

const orderService = require("../services/order.service");
const paymentService = require("../services/payment.service");
const { sendAdminWhatsApp } = require("../config/seeAdminWhatsApp.js");

// 🔎 Startup check
console.log("🔎 sendAdminWhatsApp typeof:", typeof sendAdminWhatsApp);

Router.post(
  "/razorpay",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      console.log("\n📥 Razorpay webhook received");

      /* ===============================
         1️⃣ Verify webhook signature
      =============================== */
      const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
      if (!secret) {
        console.error("❌ RAZORPAY_WEBHOOK_SECRET missing");
        return res.status(500).send("Server misconfigured");
      }

      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(req.body)
        .digest("hex");

      const actualSignature = req.headers["x-razorpay-signature"];
      if (expectedSignature !== actualSignature) {
        console.warn("❌ Invalid Razorpay signature");
        return res.status(400).json({ success: false });
      }

      console.log("✅ Razorpay signature verified");

      /* ===============================
         2️⃣ Parse payload safely
      =============================== */
      const payload = JSON.parse(req.body.toString());
      console.log("📦 Webhook Event:", payload.event);

      const paymentEntity =
        payload.payload?.payment?.entity ||
        payload.payload?.payment_link?.entity?.payments?.[0];

      if (!paymentEntity) {
        console.log("⚠️ No payment entity found");
        return res.status(200).send("OK");
      }

      const paymentId = paymentEntity.id;
      const orderId =
        paymentEntity.notes?.orderId ||
        paymentEntity.reference_id ||
        paymentEntity.order_id;

      console.log("🔍 Extracted IDs:", { paymentId, orderId });

      if (!orderId) {
        console.log("⚠️ Order ID missing in payload");
        return res.status(200).send("OK");
      }

      /* ===============================
         3️⃣ Fetch order
      =============================== */
      const orderObj = await orderService.findOrderById(orderId);
      if (!orderObj) {
        console.log("⚠️ Order not found:", orderId);
        return res.status(200).send("OK");
      }

      console.log("🧾 Order found:", orderObj._id.toString());

      /* ===============================
         4️⃣ Update payment (idempotent)
      =============================== */
      const result = await paymentService.updatePaymentInformation({
        payment_id: paymentId,
        order_id: orderObj._id.toString(),
      });

      console.log("💳 Payment update result:", result);

      /* ===============================
         5️⃣ Send WhatsApp ONCE per order
      =============================== */
      console.log(
        "📞 WhatsApp sender type:",
        typeof sendAdminWhatsApp
      );

      if (!orderObj.adminWhatsappSent) {
        console.log("📤 Sending WhatsApp to admin (first time)");

        await sendAdminWhatsApp({
          name: `${orderObj.user?.firstName || ""} ${orderObj.user?.lastName || ""}`.trim(),
          phone: orderObj.shippingInfo?.phone || orderObj.user?.mobile || "N/A",
          orderId: orderObj._id.toString(),
          amount: orderObj.totalDiscountedPrice || 0,
        });

        orderObj.adminWhatsappSent = true;
        await orderObj.save();

        console.log("✅ Admin WhatsApp SENT & flag saved");
      } else {
        console.log("⚠️ Admin WhatsApp already sent — skipping");
      }

      return res.status(200).json({ success: true });

    } catch (err) {
      console.error("❌ Razorpay webhook error:", err);
      return res.status(500).json({ success: false });
    }
  }
);

module.exports = Router;
