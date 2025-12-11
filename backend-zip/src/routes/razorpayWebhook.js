// routes/razorpayWebhook.js
const express = require("express");
const crypto = require("crypto");
const Router = express.Router();

const orderService = require("../services/order.service");
const paymentService = require("../services/payment.service"); // your service file name
const { sendAdminWhatsApp } = require("../config/seeAdminWhatsApp.js");

Router.post(
  "/razorpay",
  express.raw({ type: "application/json" }), // must be raw
  async (req, res) => {
    try {
      const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
      if (!secret) {
        console.error("RAZORPAY_WEBHOOK_SECRET not set");
        return res.status(500).send("Server misconfigured");
      }

      // verify signature
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(req.body)
        .digest("hex");

      const actualSignature = req.headers["x-razorpay-signature"];
      if (!actualSignature || expectedSignature !== actualSignature) {
        console.warn("Invalid razorpay webhook signature");
        return res.status(400).json({ success: false, message: "Invalid signature" });
      }

      const payload = JSON.parse(req.body.toString());
      console.log("✅ Razorpay Webhook Event:", payload.event);

      // extract payment entity robustly
      let paymentEntity = null;

      // normal payment captured event (payment entity present)
      if (payload.payload?.payment?.entity) {
        paymentEntity = payload.payload.payment.entity;
      }

      // payment_link.paid sometimes contains payment inside payment_link.entity.payments
      if (!paymentEntity && payload.payload?.payment_link?.entity) {
        const pl = payload.payload.payment_link.entity;
        // payments may be array
        if (Array.isArray(pl.payments) && pl.payments.length > 0) {
          paymentEntity = pl.payments[0];
        } else if (pl.payment) {
          paymentEntity = pl.payment;
        }
      }

      if (!paymentEntity) {
        console.log("No payment entity found in payload — ignoring");
        return res.status(200).json({ success: true });
      }

      const paymentId = paymentEntity.id;
      // try different places to get your order id (you set in reference_id / notes)
      const orderReferenceFromNotes =
        paymentEntity.notes?.orderId ||
        paymentEntity.notes?.order_id ||
        paymentEntity.reference_id ||
        paymentEntity.order_id ||
        null;

      // If we found your order id in notes/reference, use it. Otherwise try to match using payment info saved earlier (less reliable).
      let orderObj = null;
      if (orderReferenceFromNotes) {
        try {
          orderObj = await orderService.findOrderById(orderReferenceFromNotes);
        } catch (err) {
          console.warn("Order not found by reference:", orderReferenceFromNotes);
          orderObj = null;
        }
      }

      // If still not found, try search by paymentInfo razorpayPaymentId (if you ever saved it). Otherwise log and return.
      if (!orderObj) {
        console.log("Unable to map payment to order from webhook - ensure createPaymentLink added notes/reference.");
        // don't fail; return 200 so Razorpay won't retry forever (or you can respond 500 to notify)
        return res.status(200).send("OK");
      }

      // Option A: Use your existing service to update payment info (expects reqData: { payment_id, order_id })
      try {
        const result = await paymentService.updatePaymentInformation({
          payment_id: paymentId,
          order_id: orderObj._id.toString(),
        });

        console.log("updatePaymentInformation result:", result);

        // send admin WhatsApp
        await sendAdminWhatsApp({
          name: `${orderObj.user?.firstName || ""} ${orderObj.user?.lastName || ""}`.trim(),
          phone: orderObj.shippingInfo?.phone || orderObj.user?.mobile || "",
          orderId: orderObj._id.toString(),
          amount: orderObj.totalDiscountedPrice || 0,
        });

        return res.status(200).json({ success: true });
      } catch (err) {
        console.error("Error updating payment info from webhook:", err);
        return res.status(500).json({ success: false, message: err.message || "internal" });
      }
    } catch (err) {
      console.error("Webhook handler error:", err);
      return res.status(500).json({ success: false });
    }
  }
);

module.exports = Router;
