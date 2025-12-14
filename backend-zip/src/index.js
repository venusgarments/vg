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

// Chat Routes (commented out - needs GROQ_API_KEY)
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

// Chat (commented out - needs GROQ_API_KEY)
app.use("/api", chatRoutes);

// video
app.use("/api", videoRoutes);

module.exports = { app };
