import React, { useEffect, useState } from 'react';


import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions/product';

import { BiMenuAltLeft } from 'react-icons/bi';

import { ArrowDown} from 'lucide-react';
import Navbar from '../../components/User/Navbar';
import ProductCard from '../../components/User/ProductCard';
import Loader from '../../components/AnimationsPages/Loader';
import styles from '../../style/style';

const ProductPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showDropdown, setShowDropdown] = useState(false);

  const { allProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (allProducts) {
      setLoading(false);
    }
  }, [allProducts]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const groupProductsByCategory = () => {
    const groupedProducts = {};

    if (allProducts) {
      allProducts.forEach((product) => {
        const { category } = product;
        if (!groupedProducts[category]) {
          groupedProducts[category] = [];
        }
        groupedProducts[category].push(product);
      });
    }

    return groupedProducts;
  };

  const groupedProducts = groupProductsByCategory();

  return (
    <>
      <Navbar />
      <div className="w-full sm:w-11/12 mx-auto p-5 sm:mt-0 mt-10 h-full mb-20">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className='sm:flex items-center justify-between mt-2'>
              <div className='flex items-center justify-center sm:justify-start w-full'>
              <h1 className={`${styles.heading}`}>All Products</h1>
              </div>
              <div className="flex justify-center items-center sm:mt-0 mt-10">
                <div className="relative">
                  <div onClick={() => setShowDropdown(!showDropdown)}>
                    <div className="relative ">
                      <div className='flex items-center justify-center h-[60px] w-[270px] shadow-md'>
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
                        onClick={() => setShowDropdown(!showDropdown)}
                      />
                      </div>
                      {showDropdown && (
                        <div  className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-md border-2 " >
                          {['All', ...Object.keys(groupedProducts)].map((category) => (
                            <div
                              key={category}
                              className="p-2 cursor-pointer hover:underline"
                              onClick={() => handleCategoryChange(category)}
                            >
                              <div className='text-md font-semibold px-3 py-1'>
                              {category}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-7 mb-5">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-3">
                {selectedCategory === 'All' ? (
                  allProducts.map((product) => (
                    <ProductCard data={product} key={product._id} />
                  ))
                ) : (
                  groupedProducts[selectedCategory].map((product) => (
                    <ProductCard data={product} key={product._id} />
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductPage;
