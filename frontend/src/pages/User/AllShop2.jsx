import React, { useState, useEffect } from 'react';
import style from '../../style/style';
import Navbar from '../../components/User/Navbar';
import ShopCard from '../../components/User/shopCard';
import Footer from '../../components/User/Footer';
import Loader from '../../components/AnimationsPages/Loader';
import axios from 'axios';
import { server } from '../../server';


const ShopList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allShops, setAllShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    axios.get(`${server}/user/all-shops`)
      .then(response => {
        console.log(response.data); // Log the response data to check if it contains the expected shops
        setAllShops(response.data.data);
        setFilteredShops(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching shops:', error);
        setError(error); // Update the error state if there is an error
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleFilter = (filterType) => {
    if (filterType === 'all') {
      setFilteredShops(allShops);
    } else if (filterType === 'custom') {
      const customShops = allShops.filter(shop => shop.customizeProducts);
      setFilteredShops(customShops);
    } else if (filterType === 'not-custom') {
      const notCustomShops = allShops.filter(shop => !shop.customizeProducts);
      setFilteredShops(notCustomShops);
    }
    setActiveFilter(filterType);
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
            <div className='flex items-center justify-center sm:mr-12 mt-1 mb-4'>
              <h1 className={`${style.heading} px-12`}>All Shops</h1>
            </div>

            <div className="flex justify-between items-center bg-gray-500 px-8 py-1 text-white w-full">
              <button
                onClick={() => handleFilter('all')}
                className={`${activeFilter === 'all' ?
                  'bg-gray-800 px-4 py-2 rounded focus:outline-none' : 'px-4 py-2 rounded focus:outline-none'}`}>
                All Shops
              </button>

              <Dropdown // Use Dropdown component
                options={['All', 'Customizable', 'Non-Customizable']}
                selectedOption="Customizable"
                onSelect={(option) => handleFilter(option.toLowerCase())}
              />

              <button
                onClick={() => handleFilter('not-custom')}
                className={` ${activeFilter === 'not-custom' ?
                  'bg-gray-800 px-4 py-2 rounded focus:outline-none' : 'px-4 py-2 rounded focus:outline-none'}`}>
                Shop (Standard Products)
              </button>
            </div>

            <div className={`grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-7 mb-10 ${style.shopGrid}`}>
              {filteredShops.map((shop) => (
                <ShopCard key={shop._id} data={shop} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ShopList;
