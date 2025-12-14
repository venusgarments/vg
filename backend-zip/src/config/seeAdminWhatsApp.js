const axios = require("axios");

const sendAdminWhatsApp = async ({ name, phone, orderId, amount }) => {
  try {
    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    const adminNumber = String(process.env.ADMIN_WHATSAPP || "");
    const templateName = process.env.WHATSAPP_TEMPLATE_NAME || "new_order_alert";

    if (!token || !phoneId || !adminNumber) {
      console.error("❌ WhatsApp ENV missing", {
        token: !!token,
        phoneId: !!phoneId,
        adminNumber: !!adminNumber,
      });
      return;
    }

    const payload = {
      messaging_product: "whatsapp",
      to: adminNumber,
      type: "template",
      template: {
        name: templateName,
        language: { code: "en_US" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: name || "Customer" },
              { type: "text", text: phone || "N/A" },
              { type: "text", text: orderId },
              { type: "text", text: String(amount) },
            ],
          },
        ],
      },
    };

    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${phoneId}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    console.log("✅ Admin WhatsApp sent successfully:", response.data);
    return response.data;

  } catch (err) {
    // 🔥 Detailed Meta error logging
    console.error(
      "❌ WhatsApp send failed:",
      err.response?.data || err.message
    );

    // OPTIONAL FALLBACK (for debugging only)
    // Try plain text message if template fails
    try {
      const fallbackPayload = {
        messaging_product: "whatsapp",
        to: process.env.ADMIN_WHATSAPP,
        type: "text",
        text: {
          body: `New Order Received\nOrder ID: ${orderId}\nAmount: ₹${amount}`,
        },
      };

      await axios.post(
        `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
        fallbackPayload,
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      console.log("⚠️ Fallback text WhatsApp sent");
    } catch (fallbackErr) {
      console.error(
        "❌ Fallback WhatsApp also failed:",
        fallbackErr.response?.data || fallbackErr.message
      );
    }
  }
};

module.exports = { sendAdminWhatsApp };
