import React, { useState } from "react";
import CountDown from "./CountDown";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";


import { addTocart } from "../../../redux/actions/cart";
import { backend_url } from "../../../server";



const EventCard = ({ data }) => {
  const [count, setCount] = useState(1);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);

    if (isItemExists) {
        toast.error("Item Already in Cart!");
        return;
    }

    // Check if the event time is over
    const currentTime = new Date();
    const eventStartDate = new Date(data.startDate);
    const eventEndDate = new Date(data.endDate);

    console.log("Current Time:", currentTime);
    console.log("Event Start Date:", eventStartDate);
    console.log("Event End Date:", eventEndDate);

    if ( currentTime > eventEndDate) {
        toast.error("Event is not currently ongoing. Cannot add item to cart.");
        return;
    }

    // Check if there are items in the cart
    if (cart.length > 0) {
        const newShopId = data.shop._id;

        // Check if the new product's shopId matches the shopId of items in the cart
        const isDifferentShop = cart.some((item) => item.shop._id !== newShopId);

        if (isDifferentShop) {
            toast.error("You cannot add products from different shops to the cart.");
            return;
        }
    }

    if (data.stock < count) {
        toast.error("Product Stock Limited!");
        return;
    }

    // Update the cartData with discountPrice
    const cartData = { ...data, qty: count, originalPrice: data.discountPrice };
    dispatch(addTocart(cartData));

    toast.success("Item Added To Cart!");
};


  if (!data) {
    return;
  }

  return (
    <div className="sm:w-[75%] w-full rounded-lg flex flex-col lg:flex-row border border-black/30 mb-7 shadow-lg ">
      <div className="w-full sm:w-[50%]">
        <img
          className="h-[150px] w-full sm:h-[450px] sm:w-[450px] object-cover rounded-lg"
          src={`${backend_url}${data.images[0]}`}
          alt=""
        />
      </div>

      <div className="w-full flex flex-col justify-center px-5">
        <div className='w-full '>
          <div className='w-full flex justify-start mt-5 sm:mt-0'>
            <img
              src={`${backend_url}${data.shop.avatar}`}
              alt=""
              className='h-10 w-10 rounded-full object-cover border border-black'
            />
            <h3 className='text-center py-2 px-2 text-md font-bold text-blue-500'>
              <Link to={`/shop/preview/${data.shop._id}`} className="text-blue-500 underline">
                {data.shop && data.shop.shopName}
              </Link>
            </h3>
          </div>
        </div>
        <div className="flex flex-col justify-start p-2 sm:px-10">
          <h1 className="sm:text-2xl text-xl font-extrabold mb-2">
            {data.name}
          </h1>
          <p className="text-sm text-gray-700 leading-5 hidden sm:block text-justify">
            {data.description}
          </p>
        </div>

        <div className="flex items-center px-2 sm:px-10">
          <div className="sm:flex items-center">
            <h5 className="text-sm sm:text-md line-through mr-2 text-red-800 font-semibold">
              PKR {data.originalPrice}
            </h5>
            <h5 className="font-bold  text-blue-600 text-sm sm:text-xl">
              PKR {data.discountPrice}
            </h5>
          </div>
          <span className="text-sm sm:text-lg text-green-600 font-semibold ml-auto">
            {data.sold_out} soldouts
          </span>
        </div>
        <div className="text-md sm:text-lg mt-2 text-red-600 font-semibold mb-2 text-center ">
          <CountDown data={data} />
        </div>
        <div className="flex justify-center w-full  mt-2 mb-2">
          <div onClick={() => addToCartHandler(data._id)}
            className="w-auto px-10 mb-1 bg-black h-[40px]
          flex items-center justify-center rounded-xl cursor-pointer">
            <span className="text-white flex items-center">
              Add to Cart
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
