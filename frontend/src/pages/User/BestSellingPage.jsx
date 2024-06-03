import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProducts } from '../../redux/actions/product';

import styles from '../../style/style';
import Navbar from '../../components/User/Navbar';
import Footer from '../../components/User/Footer';
import ProductCard from '../../components/User/ProductCard';
import Loader from '../../components/AnimationsPages/Loader';

const BestSelling = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const { allProducts, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allProducts && !isLoading) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts, isLoading]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const sortedData = allProducts.slice().sort((a, b) => b.sold_out - a.sold_out);
      
      setData(sortedData);
      setLoading(false); // Set loading to false once data is loaded
    }
  }, [dispatch, allProducts]);

  return (
    <>
      <Navbar />
      <div className="w-11/12 mx-auto p-5 sm:mt-0 mt-10 h-full ">
        {loading ? (
          <p><Loader /></p>
        ) : (
          <div>
            <div className='flex items-start justify-center sm:justify-start'>

              <h1 className={`${styles.heading}`}>Best Selling</h1>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-10 mb-10" >
              {data && data.map((product, index) => (
                <ProductCard data={product} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BestSelling;
