import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/User/Navbar';

const Shop_Signup = () => {
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [customizeProducts, setCustomizeProducts] = useState('No'); // Added customizeProducts state
  const navigate = useNavigate();

  const { isSeller, seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${seller._id}`);
      toast.success('Already Logged In !');
    }
  });

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleShopRegistration = async (e) => {
    e.preventDefault();

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const formData = new FormData();

    formData.append('file', avatar);
    formData.append('shopName', shopName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('zipCode', zipCode);
    formData.append('phoneNumber', phoneNumber);
    formData.append('customizeProducts', customizeProducts); // Append customizeProducts to formData

    axios
      .post(`${server}/shop/create-shop`, formData, config)
      .then((res) => {
        toast.success(res.data.message);
        navigate('/shop-login');
        setShopName('');
        setEmail('');
        setPassword('');
        setAddress('');
        setZipCode('');
        setPhoneNumber('');
        setAvatar(null);
      })
      .catch((error) => {
        toast.error('Shop Registration Failed');
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-white h-auto sm:mb-0 mb-5">
        <div className="p-4 sm:p-6 rounded-lg shadow-xl w-[80%] md:w-[35%] mt-20 sm:mt-5 bg-gray-50">
          <h2 className="text-3xl  text-gray-800 text-center font-bold mb-10">
            Register as a Shop
          </h2>
          <form onSubmit={handleShopRegistration}>
            <div className="">
              <div className='flex flex-col justify-around sm:flex-row '>
                <div className="mb-4 w-full px-2">
                  <div className="flex items-center">

                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4 w-full px-2">
                  <div className="flex items-center">

                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

              </div>
              <div>
                <div className='flex flex-col justify-around sm:flex-row'>
                  <div className="mb-4 w-full px-2">
                    <div className="flex items-center">

                      <label htmlFor="ShopName" className="block text-gray-700 text-sm font-bold mb-2">
                        Shop Name
                      </label>
                    </div>
                    <input
                      type="text"
                      id="ShopName"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Shop Name"
                      required
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 w-full px-2">
                    <div className="flex items-center">

                      <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                        Phone Number
                      </label>
                    </div>
                    <input
                      type="text"
                      id="phoneNumber"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Phone Number"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className='flex flex-col justify-around sm:flex-row'>
                  <div className="mb-4 w-full px-2">
                    <div className="flex items-center">

                      <label htmlFor="zipCode" className="block text-gray-700 text-sm font-bold mb-2">
                        Zip Code
                      </label>
                    </div>
                    <input
                      type="text"
                      id="zipCode"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Zip Code"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 w-full px-2">
                    <div className="flex items-center">

                      <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                        Address
                      </label>
                    </div>
                    <input
                      type="text"
                      id="address"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                 
                </div>
                <div className="w-full px-2">
                    <div className="flex items-center">
                      <label htmlFor="customizeProducts" className="block text-gray-700 text-sm font-bold mb-2">
                        Provide Customizable Products ( 3D Model )
                      </label>
                    </div>
                    <select
                      id="customizeProducts"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      value={customizeProducts}
                      onChange={(e) => setCustomizeProducts(e.target.value)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
              </div>
            </div>
            <div className="mb-4 flex items-center sm:mt-0  w-full h-24">
              <div className="grid w-full  items-center gap-1.5 px-2">
                <label className="text-gray-700 text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Profile
                </label>
                <input
                  id="picture"
                  type="file"
                  className="flex h-10 w-full rounded-md border border-input cursor-pointer bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                  onChange={handleFileInputChange}
                />
              </div>

            </div>
            <div className="flex justify-center w-full">
              <button

                className="bg-blue-500 text-white hover:bg-blue-700 
                font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[95%] text-center"
              >
                Signup
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p>
              Already have a Seller account?{' '}
              <a href="/shop-login" className="text-blue-500 hover:underline font-bold text-lg">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop_Signup;
