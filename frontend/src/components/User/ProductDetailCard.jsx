// ProductDetailCard.jsx
import React, { useState } from 'react';
import { AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { backend_url } from '../../server';
import Loader from '../AnimationsPages/Loader';
import { addTocart } from '../../redux/actions/cart';


const ProductDetailCard = ({ setOpen, data, }) => {
  const [count, setCount] = useState(1);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);

    if (isItemExists) {
      toast.error("Item Already in Cart!");
    } else {
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
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));

        toast.success("Item Added To Cart!");
      }
    }
  };



  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };



  return (
    <div>
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-black/50 z-40 flex items-center justify-center rounded-lg p-6">
          <div className="w-full sm:w-[60%] h-[85vh] overflow-y-scroll rounded-md bg-gray-100 p-5 shadow-sm relative ">
            <MdClose
              size={35}
              className="absolute right-5 top-3 z-50 cursor-pointer"
              onClick={() => setOpen(false)}
            />
            <div className="w-full flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 px-5 flex flex-col items-center justify-center">

                <img src={`${backend_url}${data.images[0]}`} alt={data.name} className="w-full h-52 sm:h-96 object-cover sm:p-5 smv:w-auto p-5" />


                <div className="flex">
                  <img
                    src={`${backend_url}${data.shop?.avatar}`}
                    alt=""
                    className='h-20 w-20 rounded-full object-cover border shadow-lg'
                  />
                  <div>
                    <h5 className="font-extrabold text-md px-1 sm:px-5 mt-2">
                      <Link to={`/shop/preview/${data.shop._id}`} className="text-blue-500 underline">
                        {data.shop && data.shop.shopName}
                      </Link>
                    </h5>
                    <h5 className="text-sm flex font-semibold ml-5 mt-2 ">
                      4.5<span className=" ml-1">(Ratings)</span>
                    </h5>
                  </div>
                </div>
                <div className="w-[170px] !bg-[#f63b60] text-white   h-11 mt-3 md:mt-5 flex items-center justify-center rounded-xl cursor-pointer">
                  <span className="flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-lg text-black mt-4 font-semibold">
                  ({data.sold_out}) Sold Out
                </h5>
              </div>
              <div className="w-full md:w-1/2 p-2">
                <h1 className="text-xl font-extrabold underline">{data.name}</h1>
                <p className="text-md mt-2 text-justify">{data.description}</p>
                <div className="flex py-3">
                  <h1 className="font-extrabold text-lg">Rs: {data.originalPrice}</h1>
                </div>
                <div className="sm:flex items-center justify-between mt-2 md:mt-5">
                  <div className="flex items-center">
                    <button
                      className="!bg-[#f63b60] text-white  font-bold rounded-sm px-2 py-1 shadow-lg"
                      onClick={decrementCount}
                    >
                      <HiOutlineMinus size={15} color="#fff" />
                    </button>
                    <span className="!bg-white text-black  font-medium px-2 py-1">
                      {count}
                    </span>
                    <button
                      className="!bg-[#f63b60] text-white  font-bold rounded-sm px-2 py-1 shadow-lg"
                      onClick={incrementCount}
                    >
                      <HiPlus size={15} color="#fff" />
                    </button>
                  </div>
                  <div onClick={() => addToCartHandler(data._id)} className="w-[90%] sm:w-[170px] bg-black h-11 sm:mt-0 mt-5 flex items-center justify-center rounded-xl cursor-pointer">
                    <span className="text-white flex items-center">
                      Add to Cart <AiOutlineShoppingCart size={20} className="ml-2 mt-1" />
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      ) : <Loader />}
    </div>
  );
};

export default ProductDetailCard;
