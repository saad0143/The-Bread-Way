const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Coupon Code Name"],
  },
  value: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  shop: {
    type: Object, 
    required: true,
  },
  shopId:{
    type:String,
    required:true
  },
  selectedProduct: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  }
});

const Coupon = mongoose.model('coupons', CouponSchema);

module.exports = Coupon;
