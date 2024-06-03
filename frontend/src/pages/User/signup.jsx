import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { server } from '../../server';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Navbar from '../../components/User/Navbar';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/');
      toast.success('Already Logged In!');
    }
  });

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const formData = new FormData();

    formData.append('file', avatar);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    axios
      .post(`${server}/user/create-user`, formData, config)
      .then((res) => {
        toast.success(res.data.message);
        navigate('/login');
        setName('');
        setEmail('');
        setPassword('');
        setAvatar();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-white ">
        <div className="form p-8 rounded-lg max-w-md w-full mt-20 sm:mt-8 shadow-lg bg-gray-100">
          <h2 className="form-title text-2xl mb-10 text-center font-bold">Signup For an Account</h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-2 input-container">
              <div className="flex">

                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
              </div>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2 input-container">
              <div className="flex">

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
            <div className="mb-2 input-container">
              <div className="flex">

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

            <div className="mb-4 flex items-center w-full cursor-pointer">
              
              <div className="grid w-full items-center gap-1.5">
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

            <div className="flex justify-center w-full mt-10">
              <button
                onClick={handleSignUp}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
                <h1 className="w-full items-center justify-center">Signup</h1>
              </button>
            </div>
          </form>
          <div className="text-center mt-4 signup-link">
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 hover:underline font-semibold underline text-lg">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
