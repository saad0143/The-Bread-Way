require('dotenv').config(); // Load environment variables

const express = require("express");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require('mongoose');

// Import controllers
const user = require('./controller/user');
const shop = require('./controller/shop');
const product = require('./controller/product');
const event = require('./controller/event');
const coupon = require('./controller/couponCode');
const order = require('./controller/order');
const conversation = require('./controller/conversation');
const admin = require('./controller/admin');

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));

// Error handling
const errorHandlerInstance = new ErrorHandler();
app.use((err, req, res, next) => {
  errorHandlerInstance.handleError(err, req, res, next);
});

// Routes
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop); 
app.use("/api/v2/product", product); 
app.use("/api/v2/event", event); 
app.use("/api/v2/coupon", coupon); 
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/admin", admin);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`MongoDB connected with server: ${data.connection.host}`);
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`);
  });

// Server setup
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.log(`Shutting down the server for handling uncaught exception`);
  server.close(() => {
    process.exit(1);
  });
});
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Handling unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Shutting down the server for unhandled promise rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
