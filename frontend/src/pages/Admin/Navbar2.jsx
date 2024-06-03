import React from 'react';
import { Link } from 'react-router-dom';


const Navbar2 = () => {
  
  return (
    <div className='flex flex-row justify-center h-20  relative shadow-md mb-5'>
      <div className="flex p-5 sm:ml-10">
        <Link to="/admin/login" >
          <h1 className="sm:text-4xl text-3xl text-[#f63b60] font-extrabold hover:scale-105 transition duration-300 hover:underline uppercase">
            Admin Panel
          </h1>
        </Link>
      </div>
     
      
    </div>
  );
}

export default Navbar2;
