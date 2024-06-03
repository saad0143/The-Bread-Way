import React from 'react';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black sm:px-6 sm:py-2 mt-20">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className='p-3'>
          <div className="text-3xl font-extrabold mb-2 lg:mb-0 mx-2 text-[#f63b60]">The Bread Way</div>
          <p className="text-sm mb-2 mx-4">Baked Fresh, Delivered with Love</p>
        </div>
        <div className="flex space-x-8">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transform transition-transform hover:text-red-500"
          >
            <FaInstagram size={30} color="red" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transform transition-transform hover:text-blue-500"
          >
            <FaFacebook size={30} color="blue" />
          </a>
          <a
            href="mailto:example@gmail.com"
            className="hover:scale-110 transform transition-transform hover:text-green-500"
          >
            <FaEnvelope size={30} color="green" />
          </a>
        </div>
        <div className="flex sm:flex-col space-x-5 sm:space-x-0 mt-2 sm:mt-0 p-5 sm:mr-10">
          <a href="/about-us" className='hover:underline text-md font-semibold'>About Us</a>
          <a href="/our-blog" className='hover:underline text-md font-semibold'>Our Blog</a>
          <a href="/reviews" className='hover:underline text-md font-semibold'>Reviews</a>
        </div>
      </div>
      <div className="text-center flex justify-center text-sm pb-4">
       <p className='sm:ml-28'> &copy; {new Date().getFullYear()} The Bread Way. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
