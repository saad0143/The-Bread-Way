const express = require("express");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
  origin: "https://the-bread-way-53yg.vercel.app/",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));

// Config
if (process.env.NODE_ENV !== "production") { 
  require("dotenv").config({
    path: "backend/config/.env"
  });
}

const errorHandlerInstance = new ErrorHandler();

app.use((err, req, res, next) => {
  errorHandlerInstance.handleError(err, req, res, next);
});

const user = require('./controller/user');
const shop = require('./controller/shop');
const product = require('./controller/product');
const event = require('./controller/event');
const coupon = require('./controller/couponCode');
const order = require('./controller/order');
const conversation = require('./controller/conversation');
const admin = require('./controller/admin');



app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop); 
app.use("/api/v2/product", product); 
app.use("/api/v2/event", event); 
app.use("/api/v2/coupon", coupon); 
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/admin", admin);


module.exports = app;
