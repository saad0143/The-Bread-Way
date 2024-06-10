const express = require("express");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// CORS configuration
app.use(cors({
  origin: "https://the-bread-way-53y.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

const errorHandlerInstance = new ErrorHandler();

// Logging middleware
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  errorHandlerInstance.handleError(err, req, res, next);
});

// Route Imports
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/couponCode");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const admin = require("./controller/admin");

// Routes
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/admin", admin);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
