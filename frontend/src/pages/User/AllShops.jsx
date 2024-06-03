import React, { useState, useEffect } from 'react';
import style from '../../style/style';
import Navbar from '../../components/User/Navbar';
import ShopCard from '../../components/User/shopCard';
import Footer from '../../components/User/Footer';
import Loader from '../../components/AnimationsPages/Loader';
import axios from 'axios';
import { server } from '../../server';
import { BiMenuAltLeft } from 'react-icons/bi';
import { ArrowDown } from 'lucide-react';

const ShopList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allShops, setAllShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Shops');

  useEffect(() => {
    axios.get(`${server}/user/all-shops`)
      .then(response => {
        setAllShops(response.data.data);
        setFilteredShops(response.data.data);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter shops based on selected category
    if (selectedCategory === 'All Shops') {
      setFilteredShops(allShops);
    } else if (selectedCategory === 'Shops (Customizable 3D Products)') {
      const customShops = allShops.filter(shop => shop.customizeProducts);
      setFilteredShops(customShops);
    } else if (selectedCategory === 'Shop (Standard Products)') {
      const notCustomShops = allShops.filter(shop => !shop.customizeProducts);
      setFilteredShops(notCustomShops);
    }
  }, [selectedCategory, allShops]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  return (
    <>
      <Navbar />
      <div className="w-11/12 mx-auto p-5 sm:mt-0 mt-10">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            <div className='sm:flex items-center justify-between mt-2'>
              <div className='flex items-center justify-center sm:justify-start w-full'>
                <h1 className={`${style.heading} px-12`}>All Shops</h1>
              </div>
              <div className="flex justify-center items-center sm:mt-0 mt-5">
                <div className="relative">
                  <div onClick={() => setShowDropdown(!showDropdown)}>
                    <div className="relative ">
                      <div className='flex items-center justify-center h-[60px] w-[300px] shadow-md'>
                        <BiMenuAltLeft size={30} className="absolute top-3 left-2 text-white" />
                        <button
                          className={`h-[100%] w-full flex justify-between items-center pl-10
                        !bg-[#f63b60] text-white font-sans text-lg font-[500] select-none rounded-t-md`}
                        >
                          {selectedCategory}
                        </button>
                        <ArrowDown
                          size={25}
                          className="absolute right-2 top-4 cursor-pointer mt-1 text-white"
                        />
                      </div>
                    </div>
                  </div>
                  {showDropdown && (
                    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-md border-2 " >
                      {['All Shops', 'Shops (Customizable 3D Products)', 'Shop (Standard Products)'].map((category) => (
                        <button
                          key={category}
                          className="w-full text-left p-2 cursor-pointer hover:underline focus:outline-none"
                          onClick={() => handleCategoryChange(category)}
                        >
                          <div className='text-md font-semibold px-3 py-1'>
                            {category}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>


            </div>

            <div className={`grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-7 mb-10 ${style.shopGrid}`}>
              {filteredShops.map((shop) => (
                <ShopCard key={shop._id} data={shop} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopList;
