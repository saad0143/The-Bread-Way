import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

import Navbar from '../../components/User/Navbar';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user)
  useEffect(() => {


    if (isAuthenticated === true) {
      navigate("/")
      toast.success("Already Logged In !");
    }

  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      `${server}/user/login-user`,
      {
        email,
        password,
      }, { withCredentials: true }
    ).then((res) => {
      toast.success("Login Success!");
      navigate("/");
      window.location.reload(true);

    })
      .catch((err) => {
        toast.error("Wrong Password or Email!");

      });

  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-white ">
        <div className="form p-8 rounded-lg  max-w-md w-full mt-20 sm:mt-10 shadow-lg bg-gray-100 ">
        <h2 className="form-title text-2xl mb-10 text-center font-bold">Login To Your Account</h2>
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
            <div className="flex items-center justify-between mb-4">
              {/* Add forgot password link */}
              <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
            </div>
            <div className="flex justify-center w-full">
              <button
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >

                <h1 className='w-full items-center justify-center'>
                  Login
                </h1>
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p>
              Don't have an account? <a href="/sign-up" className="text-blue-500 hover:underline font-semibold underline
               text-lg">Signup</a>
            </p>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
