import React, { useEffect, useState } from 'react';
import Hero from './HomePage/Hero';
import BestSelling from './HomePage/BestSelling';
import Event from './HomePage/Event';
import Footer from './Footer';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../AnimationsPages/Loader'
import ProductPage from '../../pages/User/ProductPage';
import { getAllProducts } from '../../redux/actions/product';


const Home = () => {
  const [loading, setLoading] = useState(true);
  const { allProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
  
    if (!allProducts) {
      dispatch(getAllProducts());
    }
  }, [dispatch,loading]);
  

  useEffect(() => {
    if (allProducts) {
      setLoading(false);
    }
  }, [allProducts]);

  return (
    <div className=''>
      <Navbar />

      {loading ? (
        <Loader />
      ) : (
        <div className='mt-20'>
          
          <Hero />
          <BestSelling allProducts={allProducts} />
          <Event />
          <ProductPage/>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
