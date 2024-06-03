import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingBag, MessagesSquare, Truck, Home, LogOut, Key, Box, Radio } from 'lucide-react';
import axios from 'axios';
import { toast } from "react-toastify";
import { server } from '../../../server';
import { BiLogOutCircle } from 'react-icons/bi';


const ProfileSidebar = ({ active }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios.get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success("Logged Out Successfully!");
        navigate("/");
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error("Logout failed: " + error.message);
      });
  };




  return (
    <div className='w-full shadow-lg rounded-lg mt-10 p-4 pt-10 bg-gray-100 sm:mt-0'>
      <div className={`flex items-center cursor-pointer w-full mb-8 ${active === 1 ? 'text-red-500' : ''} sm:flex`}>
        <Link to="/profile" className='w-full flex items-center' >
          <User size={20} />
          <h5 className={`sm:block hidden pl-2 text-md `}>
            Profile
          </h5>
        </Link>
      </div>
      <div className={`flex items-center cursor-pointer w-full mb-8 ${active === 2 ? 'text-red-500' : ''} sm:flex`}>
        <Link to="/user-orders" className='w-full flex items-center' >
          <Radio  size={20} />
          <h5 className={`sm:block hidden pl-2 text-md `}>
            Live Orders
          </h5>
        </Link>
      </div>
      <div className={`flex items-center cursor-pointer w-full mb-8 ${active === 3 ? 'text-red-500' : ''} sm:flex`}>
        <Link to="/user-inbox" className='w-full flex items-center' >
          <MessagesSquare size={20} />
          <h5 className={`sm:block hidden pl-2 text-md`}>
            Inbox
          </h5>
        </Link>
      </div>
      <div className={`flex items-center cursor-pointer w-full mb-8 ${active === 4 ? 'text-red-500' : ''} sm:flex`}>
        <Link to="/user-all-orders" className='w-full flex items-center' >
          <Box size={20} />
          <h5 className={`sm:block hidden pl-2 text-md `}>
            All Orders
          </h5>
        </Link>
      </div>
      <div className={`flex items-center cursor-pointer w-full mb-8 ${active === 5 ? 'text-red-500' : ''} sm:flex`}>
        <Link to="/user-update-password" className='w-full flex items-center' >
          <Key size={20} />
          <h5 className={`sm:block hidden pl-2 text-md `}>
            Update Password
          </h5>
        </Link>
      </div>
      <div className={`flex items-center cursor-pointer w-full mb-8 ${active === 6 ? 'text-red-500' : ''}  sm:flex`}>
        <div>
          <Link to="/user-address" className='w-full flex items-center' >
            <Home size={20} />
            <h5 className={`sm:block hidden pl-2 text-md `}>
              Adresses
            </h5>
          </Link>
        </div>
      </div>
      <div
        className={`flex items-center cursor-pointer w-full mb-8 ${active === 7 ? 'text-red-500' : ''}  sm:flex`}
        onClick={() => logoutHandler()}
      >
        <div className='w-full flex items-center'>

          <BiLogOutCircle  size={20} />

          <h5 className={`sm:block hidden pl-2 text-md `}>Log Out</h5>
        </div>

      </div>
    </div>
  );
}

export default ProfileSidebar;
