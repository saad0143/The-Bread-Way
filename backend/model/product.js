const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  tags: {
    type: String,

  },
  originalPrice: {
    type: Number,
    required: [true, "Please Enter Original Price"],
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Stock Quantity"],
  },
  images: [String],
  shopId: {
    type: String,
    required: true
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  ratings:{
    type:Number,
  },
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt:{
        type: Date,
        default: Date.now(),
      }
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
