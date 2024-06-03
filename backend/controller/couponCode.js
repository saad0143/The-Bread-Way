const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/Shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/Auth");
const CoupounCodes = require("../model/couponCode");
const router = express.Router();
// create coupon code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existingCoupon = await CoupounCodes.findOne({
        name: req.body.name,
      });

      if (existingCoupon) {
        return next(new ErrorHandler("Coupon code already exists!", 400));
      }

      // Assuming shopId is the ID of the shop
      const shop = await Shop.findById(req.seller.id);
      if (!shop) {
        return next(new ErrorHandler("Shop not found!", 404));
      }

      // Include the entire shop object in the coupon creation
      req.body.shop = shop;

      const couponCode = await CoupounCodes.create(req.body);

      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message || "Something went wrong", 400));
    }
  })
);


router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
      try {
          
          const couponCode = await CoupounCodes.find({ shopId: req.seller.id });
          res.status(201).json({
              success: true,
              couponCode,
          });
      } catch (error) {
          return next(new ErrorHandler(error, 400));
      }
  })
);
// delete coupoun code of a shop
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCodes.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get coupon code value by its name
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCodes.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
