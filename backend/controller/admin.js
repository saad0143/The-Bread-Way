const express = require("express");
const router = express.Router();
const Shop = require('../model/Shop'); 
const User = require('../model/user');
const Admin = require('../model/Admin');
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const jwt = require('jsonwebtoken'); 
const sendMail = require("../utils/sendMail");
const Product = require("../model/product");
const Event = require("../model/event");
const Coupon = require("../model/couponCode");
const { isAdmin } = require("../middleware/Auth");


// Admin login route
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if email and password match the fixed credentials
    const fixedEmail = "01saadanwar@gmail.com";
    const fixedPassword = "saad123";
    if (email !== fixedEmail || password !== fixedPassword) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // If credentials are correct, generate admin token with a longer expiry time
    const admin = { email: fixedEmail };
    const admin_token = jwt.sign(admin, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d', // Set token expiry to 7 days (adjust as needed)
    });

    res.cookie('admin_token', admin_token, {
      httpOnly: true,
      // Add additional cookie options as needed
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error('Error logging in:', error);
    return next(new ErrorHandler("An error occurred while logging in", 500));
  }
});


// Logout route
router.post("/logout",isAdmin, async (req, res) => {
  // Clear the admin token cookie
  res.clearCookie('admin_token');

  // Send a response indicating successful logout
  res.status(200).json({ success: true, message: "Logout successful" });
});

// Get all registered shops
router.get("/shops",isAdmin, catchAsyncErrors(async (req, res, next) => {
  try {
    const shops = await Shop.find();
    res.status(200).json({
      success: true,
      count: shops.length,
      data: shops,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// Get all registered users
router.get("/users",isAdmin, catchAsyncErrors(async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));



// Delete a shop and associated data
router.delete("/shops/:id",isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    // Find the shop to delete
    const shopToDelete = await Shop.findById(id);
    if (!shopToDelete) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    // Delete all products associated with the shop
    await Product.deleteMany({ shopId: id });

    // Delete all events associated with the shop
    await Event.deleteMany({ shopId: id });

    // Delete all coupons associated with the shop
    await Coupon.deleteMany({ shopId: id });

    // Send email notification upon successful deletion
    await sendMail({
      email: shopToDelete.email,
      subject: "Notification of Shop Removal from Your Platform",
      message: `Dear ${shopToDelete.shopName},\n\nWe regret to inform you that your shop has been removed from our platform.\n\nThank you for your understanding.\n\nBest regards,\nYour Platform Team`
    });

    // Delete the shop itself
    await Shop.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Shop and associated data deleted successfully" });
  } catch (error) {
    console.error('Error deleting shop:', error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});





// Delete a user
router.delete("/users/:id",isAdmin, catchAsyncErrors(async (req, res, next) => {
  try {
    const userToDelete = await User.findByIdAndDelete(req.params.id);
    if (!userToDelete) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    await sendMail({
      email: userToDelete.email,
      subject: "Notification of Shop Removal from Your Platform",
      message: `Dear ${userToDelete.name},\n\nWe regret to inform you that you have been removed from our platform.\n\nThank you for your understanding.\n\nBest regards,\nYour Platform Team`
    });
    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

module.exports = router;
