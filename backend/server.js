
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const DB_URL = "mongodb+srv://SaadAnwar:deadpool001@cluster0.amcnqg1.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((data) => {
    console.log(`mongoo connected with server: ${data.connection.host}`);
  });


// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}`
  );
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});



app.use(cors({
  origin: "http://localhost:3000",
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



