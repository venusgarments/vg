// routes/razorpayWebhook.js
const express = require("express");
const crypto = require("crypto");
const Router = express.Router();

const orderService = require("../services/order.service");
const paymentService = require("../services/payment.service");
const { sendAdminWhatsApp } = require("../config/seeAdminWhatsApp.js"); // keep for now

// 🔥 DIAGNOSTIC: prove import is valid
console.log(
  "🔎 sendAdminWhatsApp typeof:",
  typeof sendAdminWhatsApp
);

Router.post(
  "/razorpay",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      console.log("\n📥 Razorpay webhook received");

      const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
      if (!secret) {
        console.error("❌ RAZORPAY_WEBHOOK_SECRET not set");
        return res.status(500).send("Server misconfigured");
      }

      // ✅ Verify Razorpay signature
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

      const payload = JSON.parse(req.body.toString());
      console.log("📦 Webhook Event:", payload.event);

      let paymentEntity =
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
        console.log("⚠️ Order ID missing in Razorpay payload");
        return res.status(200).send("OK");
      }

      const orderObj = await orderService.findOrderById(orderId);
      if (!orderObj) {
        console.log("⚠️ Order not found in DB:", orderId);
        return res.status(200).send("OK");
      }

      console.log("🧾 Order found:", orderObj._id.toString());

      // ✅ Update payment & order
      const result = await paymentService.updatePaymentInformation({
        payment_id: paymentId,
        order_id: orderObj._id.toString(),
      });

      console.log("💳 Payment update result:", result);

      // 🔥 DIAGNOSTIC BEFORE WHATSAPP
      console.log(
        "📞 WhatsApp sender check → typeof:",
        typeof sendAdminWhatsApp
      );

      if (typeof sendAdminWhatsApp !== "function") {
        console.error("❌ sendAdminWhatsApp is NOT a function");
        return res.status(500).json({
          success: false,
          error: "WhatsApp sender missing",
        });
      }

      // ✅ Send WhatsApp ONLY after successful placement
      if (result?.message === "Order placed & payment recorded") {
        console.log("📤 Sending WhatsApp to admin...", {
          admin: process.env.ADMIN_WHATSAPP,
          orderId: orderObj._id.toString(),
        });

        const waResult = await sendAdminWhatsApp({
          name: `${orderObj.user?.firstName || ""} ${orderObj.user?.lastName || ""}`.trim(),
          phone: orderObj.shippingInfo?.phone || orderObj.user?.mobile || "",
          orderId: orderObj._id.toString(),
          amount: orderObj.totalDiscountedPrice || 0,
        });

        console.log("📲 WhatsApp function returned:", waResult);
        console.log("✅ Admin WhatsApp notification SENT");
      } else {
        console.log("⚠️ Payment already processed, WhatsApp skipped");
      }

      return res.status(200).json({ success: true });

    } catch (err) {
      console.error("❌ Razorpay webhook error:", err);
      return res.status(500).json({ success: false });
    }
  }
);

module.exports = Router;
