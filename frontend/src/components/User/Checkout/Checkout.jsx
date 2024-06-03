import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../../server";
import Navbar from "../Navbar";
import styles from "../../../style/style";


const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [userInfo, setUserInfo] = useState(false);
  const [address, setAddress] = useState("");

  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (cart.length === 0 || subTotalPrice === 0) {
      toast.error("Your cart is empty or subtotal is 0. Please add items to your cart.");
    } else if (address === "" || zipCode === null) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address,
        zipCode,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };


  const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.originalPrice, 0);

  // this is shipping cost variable
  let shipping = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;

      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          // Calculate the discount percentage correctly
          const discountPrice = (subTotalPrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exist!");
        setCouponCode("");
      }
    });
  };


  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed()
    : (subTotalPrice + shipping).toFixed();



  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center sm:justify-center'>

        <h1 className={`${styles.heading} sm:mt-7 mt-12`}>Checkout Page</h1>
      </div>
      <div className="w-full flex flex-col items-center py-5">
        <div className="sm:w-[80%] sm:flex w-11/12">
          <div className="w-full sm:w-[60%] mr-4">
            <div className="checkout-box">
              <ShippingInfo
                user={user}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                address={address}
                setAddress={setAddress}
                zipCode={zipCode}
                setZipCode={setZipCode}
              />
            </div>
          </div>
          <div className="w-full lg:w-[40%]">
            <div className="checkout-box">

              <CartData
                handleSubmit={handleSubmit}
                totalPrice={totalPrice}
                shipping={shipping}
                subTotalPrice={subTotalPrice}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                discountPercentenge={discountPercentenge}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-full flex justify-center mb-20 sm:mb-0`}
      >
        <button onClick={paymentSubmit} className={`bg-[#000000] text-[#FFFFFF] h-[45px] my-3 flex 
          items-center justify-center rounded-xl cursor-pointer w-full sm:w-[200px] mx-10 `}>
          <h5 className="text-white">Go to Payment</h5>
        </button>

      </div>
    </>
  );
};

const ShippingInfo = ({
  user,
  userInfo,
  setUserInfo,
  address,
  setAddress,
  zipCode,
  setZipCode,
}) => {



  return (
    <div className="w-full bg-white rounded-md p-5 pb-5 shadow-lg">
      <h2 className="text-2xl font-bold mb-10 flex justify-center">Shipping Address</h2>
      <form className="mt-4">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-[50%] px-3 mb-2">
            <label className="block text-sm font-semibold text-gray-600">Full Name</label>
            <input
              type="text"
              value={user && user.name}
              required
              className="w-full h-12 border border-gray-300 rounded-md px-4 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="w-full md:w-[50%] px-3 mb-2">
            <label className="block text-sm font-semibold text-gray-600">Email Address</label>
            <input
              type="email"
              value={user && user.email}
              required
              className="w-full h-12 border border-gray-300 rounded-md px-4 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-[50%] px-3 mb-2">
            <label className="block text-sm font-semibold text-gray-600">Phone Number</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className="w-full h-12 border border-gray-300 rounded-md px-4 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="w-full md:w-[50%] px-3 mb-2">
            <label className="block text-sm font-semibold text-gray-600">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className="w-full h-12 border border-gray-300 rounded-md px-4 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="w-full mb-2">
          <label className="block text-sm font-semibold text-gray-600">Address</label>
          <input
            type="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-12 border border-gray-300 rounded-md px-4 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </form>

      <div className="">
        <h5
          className="text-lg cursor-pointer inline-block mt-4"
          onClick={() => setUserInfo(!userInfo)}
        >
          Choose From Saved Addresses
          <span className="dropdown-arrow">&#9662;</span>
        </h5>

        {userInfo && (
          <div className="mt-2">
            {user &&
              user.addresses.map((item, index) => (
                <div className="flex items-center mt-2" key={index}>

                  <input
                    type="checkbox"
                    className="mr-3 cursor-pointer"
                    value={item.addressType}
                    checked={item.address === address ? 'bg-blue' : ''}
                    onChange={() => {
                      setAddress(item.address);
                      setZipCode(item.zipCode);

                    }
                    }
                  />
                  <h2 className="text-base">{item.addressType}</h2>
                  <p className="text-sm text-gray-500 ml-2">
                    {item.address}, {item.zipCode}
                  </p>
                </div>
              ))}
          </div>


        )}
      </div>
    </div>

  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full bg-white rounded-md p-5 pb-5 shadow-lg">
      <h2 className="text-2xl font-bold mb-10 flex justify-center">Cart Summary</h2>
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold text-gray-700">Subtotal:</h3>
        <h5 className="text-xl font-bold text-black">PKR: {subTotalPrice}</h5>
      </div>
      {/* <div className="flex justify-between mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Shipping:</h3>
        <h5 className="text-xl font-bold text-black">PKR: {shipping.toFixed(2)}</h5>
      </div> */}
      <div className="flex justify-between border-b pb-3 mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Discount:</h3>
        <h5 className="text-xl font-bold text-red-500">
          - {discountPercentenge ? "PKR: " + discountPercentenge.toString() : null}
        </h5>
      </div>
      <h5 className="text-xl font-bold text-right pt-3">PKR: {totalPrice}</h5>
      <form onSubmit={handleSubmit} className="mt-6">
        <input
          type="text"
          className="w-full h-12 pl-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <button
          className="w-full h-12 mt-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
        >
          Apply Code
        </button>
      </form>
    </div>

  );
};

export default Checkout;