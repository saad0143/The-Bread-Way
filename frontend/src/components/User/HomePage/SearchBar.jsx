import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineSearch } from 'react-icons/ai';
import styles from '../../../style/style';
import { IoIosArrowForward } from 'react-icons/io';


const SearchBar = ({ allProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);



  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filterProducts = allProducts && allProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );

    setSearchData(filterProducts);
    setSearchResultsVisible(!!term); // Show results when there is a search term
  };

  const closeSearchResults = () => {
    setSearchTerm('');
    setSearchData([]);
    setSearchResultsVisible(false);
  };

  return (
    <div>
      <div className='flex flex-col sm:flex-row items-center justify-between '>
        {/* Search bar */}
        <div className='w-full sm:w-1/2 relative px-10 mt-24 sm:mt-5 hidden sm:block '>
          <div className="relative flex">
            <input
              type='text'
              placeholder='Search Bakery/items...'
              value={searchTerm}
              onChange={handleSearchChange}
              className='h-10 w-[500px] px-10 border-2 border-gray-400 rounded-md'
            />
            <AiOutlineSearch size={25} className='absolute left-2 top-2 cursor-pointer' />
          </div>

          {searchResultsVisible && (
            <div className="absolute w-[500px] items-center  bg-gray-100 shadow-lg z-10 sm:p-2 mt-5 max-h-[350px] overflow-y-auto">
              {searchData && searchData.map((i, index) => (
                <Link to={`/product/${i._id}`} key={i._id}>
                  <div className="flex items-center py-3 p-2 mb-2">
                    <img
                      src={i.images[0]}
                      alt=""
                      className="w-[90px] h-[90px] object-cover mr-2 "
                    />
                    <div className="flex flex-col">
                      <h1 className="text-md sm:text-xl font-extrabold">{i.name}</h1>
                      <h4 className="text-black font-semibold text-md px-2">PKR: {i.originalPrice}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>


        <div className={`flex items-center justify-center ${styles.button} mr-5 hidden sm:flex`}>
          <Link to="/shop-login">
            <h1 className="text-white flex items-center">
              Become a Seller
              <IoIosArrowForward size={18} className="ml-1 mt-1" />
            </h1>
          </Link>
        </div>



      </div>


      {searchResultsVisible && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-25"
          onClick={closeSearchResults}
        />
      )}
    </div>
  );
};

export default SearchBar;
