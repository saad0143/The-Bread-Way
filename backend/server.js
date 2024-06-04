const mongoose = require('mongoose');
const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// MongoDB connection
const DB_URL = process.env.MONGODB_URL || "mongodb+srv://SaadAnwar:deadpool001@cluster0.amcnqg1.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((data) => {
    console.log(`MongoDB connected with server: ${data.connection.host}`);
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1); // Exit the process if the connection fails
  });

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
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

// Import controllers
const user = require('./controller/user');
const shop = require('./controller/shop');
const product = require('./controller/product');
const event = require('./controller/event');
const coupon = require('./controller/couponCode');
const order = require('./controller/order');
const conversation = require('./controller/conversation');
const admin = require('./controller/admin');

// Routes
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/admin", admin);

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server for handling uncaught exception`);
  process.exit(1);
});

// Create server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handling unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for unhandled promise rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
