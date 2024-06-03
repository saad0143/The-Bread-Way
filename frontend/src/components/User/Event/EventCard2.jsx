import React, { useState } from "react";
import CountDown from "./CountDown";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";


import { addTocart } from "../../../redux/actions/cart";
import { backend_url } from "../../../server";



const EventCard2 = ({ data }) => {
  const [count, setCount] = useState(1);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();



  // Check if the event time is over
  const currentTime = new Date();
  const eventStartDate = new Date(data.startDate);
  const eventEndDate = new Date(data.endDate);

  console.log("Current Time:", currentTime);
  console.log("Event Start Date:", eventStartDate);
  console.log("Event End Date:", eventEndDate);

  if (currentTime > eventEndDate) {
    toast.error("Event is not currently ongoing. Cannot add item to cart.");
    return;
  }








  if (!data) {
    return;
  }

  return (
    <div className="sm:w-[75%] w-full rounded-lg flex flex-col lg:flex-row border border-black/30 mb-7 shadow-lg ">
      <div className="w-full sm:w-[50%]">
        <img
          className="h-[250px] w-[480px] sm:h-[450px] sm:w-[450px] object-cover rounded-lg"
          src={`${backend_url}${data.images[0]}`}
          alt="Red Velvet Cake"
        />
      </div>

      <div className="w-full sm:flex sm:flex-col justify-center px-5">
       
          <div className='w-full flex justify-start mt-5 sm:mt-0 mb-3'>
            <img
              src={`${backend_url}${data.shop.avatar}`}
              alt=""
              className='h-10 w-10 rounded-full object-cover border-2 border-blue-900'
            />
            <h1 className="sm:text-2xl text-xl font-extrabold px-5">
              {data.name}
            </h1>
          </div>
        


        <div className="flex items-center px-2">
          <div className="sm:flex items-center">
            <h5 className="text-md line-through mr-2 text-red-800 font-semibold">
              PKR {data.originalPrice}
            </h5>
            <h5 className="font-bold text-xl text-blue-600">
              PKR {data.discountPrice}
            </h5>
          </div>
          <span className="text-lg text-green-600 font-semibold ml-auto">
            {data.sold_out} soldouts
          </span>
        </div>
        <div className="text-lg sm:text-xl mt-2 text-red-600 font-semibold mb-2 text-center ">
          <CountDown data={data} />
        </div>

      </div>
    </div>
  );
};

export default EventCard2;
