import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Navbar2 from './Navbar2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        navigate("/admin/homepage");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred while logging in');
    }
  };

  return (
    <>
    <Navbar2/>
      <div className="flex justify-center items-center sm:px-0 px-2  ">
        <div className=" p-8 rounded-lg shadow-xl max-w-md w-full mt-10 sm:mt-20 bg-gray-50 ">
          <h2 className=" text-2xl mb-10 text-center font-bold">Login To Your Admin Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className='flex'>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
              </div>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <div className='flex'>
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
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
            <div className="flex justify-center w-full">
              <button

                className="bg-blue-500 w-full flex text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <h1 className='w-full items-center justify-center'>
                  Login
                </h1>
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
};

export default Login;
