const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Event Product Name"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Event Product Description"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Event Product Category"],
  },
  tags:{
    type:String,
    
  },
  originalPrice: {
    type: Number,
    required: [true, "Please Enter Event Product Original Price"],
  },
  discountPrice: {
    type: Number,
    required: [true, "Please Enter Event Product Price After Discount"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Stock Quantity"],
  },
  images: [String],
  shopId:{
    type:String,
    required:true
  },
  shop:{
    type:Object,
    required:true,
  },
  sold_out: {
    type: Number,
    default: 0, 
  },
  createdAt: {
    type: Date,
    default: Date.now(), 
  },
  startDate: {
    type: Date, 
    required: [true, "Please Enter Event Start Date"],
  },
  endDate: {
    type: Date, 
    required: [true, "Please Enter Event Finish Date"],
  },
  status: {
    type: String, 
    default:"Running"
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
