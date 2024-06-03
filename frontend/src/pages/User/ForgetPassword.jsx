import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../server';
import Navbar from '../../components/User/Navbar';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${server}/user/forgot-password`, { email });
      // Set email in localStorage
      localStorage.setItem('resetEmail', email);
      setMessage(response.data.message);
      toast.success('Password reset email sent');
    } catch (error) {
      setMessage(error.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8 shadow-lg bg-gray-100 p-10 mt-10 sm:mt-0">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Your Password?</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address below and we'll send you a password reset link.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
           text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
           focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5a.5.5 0 011 0V4a8 8 0 01-8 8z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
          <div className="text-sm text-center">
            {message && (
              <p className="text-red-500">{message}</p>
            )}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Back to login</Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default ForgotPassword;
