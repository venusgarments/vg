const express = require("express");
const cors = require("cors");

const app = express();

app.use("/api/webhook", require("./routes/razorpayWebhook.js"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  return res.status(200).send({ message: "welcome to ecommerce api - node" });
});
// =============================================================================
// ROUTE IMPORTS
// =============================================================================


app.post("/api/whatsapp/webhook", async (req, res) => {
  try {
    const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const from = message?.from;
    const text = message?.text?.body?.toLowerCase() || "";

    if (!message || !from) return res.sendStatus(200);

    // Auto Reply Message
    await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: from,
        type: "text",
        text: {
          body: `Thanks for contacting us! 😊
We will get back to you shortly.

Follow us here:
Instagram 👉 https://instagram.com/yourpage
YouTube 👉 https://youtube.com/yourchannel
Website 👉 https://yourwebsite.com`
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.sendStatus(200);
  } catch (err) {
    console.log("WhatsApp Auto Reply Error:", err?.response?.data || err.message);
    return res.sendStatus(500);
  }
});

// Auth & User Routes
const authRouter = require("./routes/auth.routes.js");
const userRouter = require("./routes/user.routes.js");
const userQueryRoute = require("./routes/userQueryRoute.js");

// Product Routes
const productRouter = require("./routes/product.routes.js");
const adminProductRouter = require("./routes/product.admin.routes.js");

// Cart Routes
const cartRouter = require("./routes/cart.routes.js");
const cartItemRouter = require("./routes/cartItem.routes.js");

// Order & Payment Routes
const orderRouter = require("./routes/order.routes.js");
const adminOrderRoutes = require("./routes/adminOrder.routes.js");
const paymentRouter = require("./routes/payment.routes.js");

// Review & Rating Routes
const reviewRouter = require("./routes/review.routes.js");
const ratingRouter = require("./routes/rating.routes.js");

// Blog Routes
const blogRoutes = require("./routes/blog.routes.js");

// Coupon Routes
const couponRoutes = require("./routes/coupon.routes.js");

// Chat Routes (commented out - needs GETOTP_API_KEY)
const chatRoutes = require("./routes/chatRoute.js");

// video
const videoRoutes = require("./routes/video.routes.js");

// =============================================================================
// ROUTE REGISTRATION
// =============================================================================

// Auth & User
app.use("/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/user", userQueryRoute);

// Products
app.use("/api/products", productRouter);
app.use("/api/admin/products", adminProductRouter);

// Cart
app.use("/api/cart", cartRouter);
app.use("/api/cart_items", cartItemRouter);

// Orders & Payments
app.use("/api/orders", orderRouter);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/payments", paymentRouter);

// Reviews & Ratings
app.use("/api/reviews", reviewRouter);
app.use("/api/ratings", ratingRouter);

// Blogs
app.use("/api/blogs", blogRoutes);

// Coupons
app.use("/api/coupons", couponRoutes);

// Chat (commented out - needs GETOTP_API_KEY)
app.use("/api", chatRoutes);

// video
app.use("/api", videoRoutes);

module.exports = { app };
