const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const shopOwnerSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: [true, "Please Enter Shop Name!"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email!"],
  },
  role: {
    type: String,
    default: "seller"
  },
  password: {
    type: String,
    required: [true, "Please Enter Password!"],
    select: false
  },
  address: {
    type: String,
    required: [true, "Please Enter Address!"],
  },
  description: {
    type: String,
  },
  zipCode: {
    type: Number,
    required: [true, "Please Enter Zip Code!"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please Phone Number"],
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
  avatar: {
    type: String,
    required: true
  },
  customizeProducts: {
    type: Boolean,
    default: false 
  }
}, {
  timestamps: true
});

//  Hash password
shopOwnerSchema.pre("save", async function (next){
  if(!this.isModified("password")){
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
shopOwnerSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
shopOwnerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('ShopOwner', shopOwnerSchema); 
