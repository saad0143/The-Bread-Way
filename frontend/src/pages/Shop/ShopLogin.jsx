import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { LogIn } from 'lucide-react';
import { LucideLock, LucideMail } from 'lucide-react';
import Navbar from '../../components/User/Navbar';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if email is stored in local storage
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    await axios.post(
      `${server}/shop/login-shop`,
      {
        email,
        password,
      }, { withCredentials: true }
    ).then((res) => {
      toast.success("Login Success!");
      navigate("/dashboard");
      window.location.reload(true);

    })
      .catch((err) => {
        toast.error("Wrong Password or Email!");

      });

  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center  bg-white">
        <div className="border-black/70 p-8 rounded-lg shadow-xl max-w-md w-full mt-32 sm:mt-20 bg-gray-50 ">
          <h2 className="text-3xl text-gray-800 text-center font-bold mb-10">Login To Your Shop</h2>
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
             
              <a href="/shop-forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
            </div>
            <div className="flex justify-center w-full">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white hover:bg-blue-700 
                font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-center"
              >
                Login
              </button>
            </div>

          </form>
          <div className="text-center mt-4">
            <p>
              Don't have an account? <a href="/shop-create" className="text-blue-500 hover:underline font-bold text-lg">Signup</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
