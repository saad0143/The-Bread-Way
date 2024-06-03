// src/components/ForgetPasswordPage.js
import React, { useState } from 'react';
import Navbar from './User/Navbar';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password reset logic here
    console.log('Password reset request for email:', email);
  };

  return (
   <>
    <Navbar />
    <div className="flex items-center justify-center mt-20 sm:mt-56">
      <div className="max-w-md w-full p-6 shadow-md rounded-md bg-gray-50">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Forget Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <button
             
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Reset Password
            </button>
          </div>
        </form>
        <p className="text-sm text-gray-600 text-center">
          Remember your password? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
   </>
  );
};

export default ForgetPasswordPage;
