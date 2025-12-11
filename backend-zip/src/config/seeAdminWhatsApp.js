// utils/sendAdminWhatsApp.js
const axios = require("axios");

const sendAdminWhatsApp = async ({ name, phone, orderId, amount }) => {
  try {
    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    const adminNumber = process.env.ADMIN_WHATSAPP; // must be in international format e.g. 91XXXXXXXXXX

    if (!token || !phoneId || !adminNumber) {
      console.warn("WhatsApp env vars missing");
      return;
    }

    const templateName = process.env.WHATSAPP_TEMPLATE_NAME || "new_order_alert";
    // build template message parameters (adjust order if your template expects different placeholders)
    const body = {
      messaging_product: "whatsapp",
      to: adminNumber,
      type: "template",
      template: {
        name: templateName,
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: name || "Customer" },
              { type: "text", text: phone || "N/A" },
              { type: "text", text: orderId },
              { type: "text", text: `${amount}` },
            ],
          },
        ],
      },
    };

    const resp = await axios.post(
      `https://graph.facebook.com/v18.0/${phoneId}/messages`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("WhatsApp sent:", resp.data);
    return resp.data;
  } catch (err) {
    console.error("Error sending WhatsApp:", err.response?.data || err.message);
    // optionally retry here or log to DB for later retry
  }
};

module.exports = { sendAdminWhatsApp };
