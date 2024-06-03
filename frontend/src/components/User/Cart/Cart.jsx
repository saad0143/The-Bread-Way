import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { IoBagHandleOutline } from 'react-icons/io5';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi'

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { backend_url } from '../../../server';
import { addTocart, removeFromCart } from '../../../redux/actions/cart';
import { Delete } from 'lucide-react';
import { toast } from 'react-toastify';
import Loader2 from '../../AnimationsPages/Loader2';


const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();


  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));

  }
  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));

  }
  const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.originalPrice, 0);



  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000066] z-10">
      <div className="fixed top-0 right-0 h-screen w-[65%] sm:w-[25%] bg-white flex flex-col justify-between 
      overflow-y-auto">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={30}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>
          {/* item select  */}
          <div className="flex items-center p-4">
            <IoBagHandleOutline size={30} />
            <h5 className="pl-2 text-lg font-semibold">{cart.length} items</h5>
          </div>
          <div className="w-full border-t">
            {cart.length === 0 && (
              <div className='w-full mt-10 items-center justify-center flex'>
                <Loader2 />
              </div>
            )}
            {cart.length > 0 && cart.map((item, index) => (
              <CartSingle key={index} data={item}
                quantityChangeHandler={quantityChangeHandler}
                removeFromCartHandler={removeFromCartHandler}
              />
            ))}
          </div>
        </div>
        <div className='px-5 mb-3'>
          <Link onClick={() => setOpenCart(false)} to="/checkout" className='h-[45px] flex items-center justify-center w-full mt-5 mb-2 !bg-[#f63b60] text-white  rounded-lg'>
            <h1 className='sm:text-md text-sm font-medium'>
              Checkout Now (PKR:{" "}{totalPrice})
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.originalPrice * value;

  const increaseQuantity = (data) => {

    if (data.stock < value) {
      toast.error("Product Stock Limited!");
    }
    else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData)
    }
  };

  const decreaseQuantity = () => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData)
  };

  return (
    <div className="border-b sm:px-4 sm:py-3 p-2 flex justify-between">
      <div className="w-full flex items-center mt-1">
        <div>
          <div
            className="bg-blue-600 border border-blue-900 rounded-full w-[25px] h-[25px] flex items-center 
                  justify-center cursor-pointer"
            onClick={() => increaseQuantity(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="p-2 font-semibold text-md">{data.qty}</span>
          <div
            className="bg-red-500 border border-red-900 rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decreaseQuantity(data)}
          >
            <HiOutlineMinus size={18} color="#fff" />
          </div>
        </div>
        <img src={`${backend_url}${data.images[0]}`} alt="" className="w-[90px] h-[90px] object-cover ml-2 sm:ml-5" />
        <div className="ml-2 sm:pl-3">
          <h1 className='font-semibold sm:font-bold text-md sm:text-lg'>{data.name}</h1>
          <h4 className="font-bold text-sm text-black">{data.originalPrice}*{data.qty} </h4>
          <h4 className="text-lg font-bold pt-1 sm:pt-2 text-red-700">PKR:{' '}{totalPrice}</h4>
        </div>
      </div>
      <div className="cursor-pointer items-end">
        <Delete className='sm:mr-2' size={20} onClick={() => removeFromCartHandler(data)} />
      </div>
    </div>
  );
}


export default Cart;
