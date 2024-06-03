import React from 'react';
import { Link } from 'react-router-dom';
import { backend_url } from '../../server';

const ShopCard = ({ data }) => {
  const handleCallClick = () => {
    window.location.href = `tel:+92${data.phoneNumber}`;
  };

  return (
    <div className="w-full p-1">
      <Link to={`/shop/preview/${data._id}`}>
      <div className="sm:w-auto w-[150px] h-[240px] sm:h-[250px] rounded-lg shadow-md relative cursor-pointer border
        border-black/20 hover:scale-105 transform transition-transform duration-300 ease-in-out">
      
        <img
          src={`${backend_url}${data.avatar}`}
          alt="Shop Avatar"
          className="sm:w-full w-[150px] h-[150px] sm:h-[160px] object-cover"
        />
     
      <h5 className="font-extrabold text-sm px-1 sm:px-3 mt-2">
        <Link to={`/shop/preview/${data._id}`} className="text-[#f63b60] underline">
          {data.shopName}
        </Link>
      </h5>
      <div className='px-2 text-sm font-medium  sm:text-md'>
        {data.address}
      </div>
      <div className='flex items-end justify-end px-3'>
        <span className="cursor-pointer text-sm sm:text-md font-medium text-blue-500 hover:underline" onClick={handleCallClick}>
          +92 {data.phoneNumber}
        </span>
      </div>
    </div>
    </Link>
    </div>
  );
};

export default ShopCard;
