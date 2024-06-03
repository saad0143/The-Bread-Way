import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        toast.success("logout Successfully!");
       navigate("/admin/login") 
      } else {
        // Handle error
        const data = await response.json();
        console.error('Logout error:', data.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className='flex flex-row justify-between h-20 relative shadow-md mb-5'>
      <div className="flex sm:w-[70%] w-8/12 p-5 sm:ml-10 items-center sm:justify-start">
        <Link to="/admin/homepage" >
          <h1 className="sm:text-4xl text-2xl text-[#f63b60] 
          font-extrabold hover:scale-105 transition duration-300 hover:underline uppercase">
            Admin Panel
          </h1>
        </Link>
      </div>
     
      <div className=' sm:w-[30%] sm:p-5 py-5 sm:px-10 w-4/12 flex sm:justify-end'>
        <button onClick={handleLogout} className="px-8 py-2
         bg-red-500 hover:bg-red-600 text-white font-semibold 
         rounded-md focus:outline-none focus:ring-2 focus:ring-red-400">
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;
