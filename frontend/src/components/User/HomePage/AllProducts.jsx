import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import styles from '../../../style/style';


const AllProducts = ({ allProducts }) => {
  const [recentlyAddedProducts, setRecentlyAddedProducts] = useState([]);

  useEffect(() => {
    const sortedProducts = allProducts
      ? [...allProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : [];
    setRecentlyAddedProducts(sortedProducts.slice(0, 5));
  }, [allProducts]);
  

  return (
    <div className="mt-10 w-11/12 mx-auto p-5">
      <div className="py-6">
        <h1 className={`${styles.heading} justify-start `}>
          All Products
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {recentlyAddedProducts&&recentlyAddedProducts.map((product, index) => (
          <ProductCard data={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
