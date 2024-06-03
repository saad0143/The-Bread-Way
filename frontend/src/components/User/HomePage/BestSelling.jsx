import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import styles from '../../../style/style';


const BestSelling = ({ allProducts }) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const sortedData = allProducts.slice().sort((a, b) => b.sold_out - a.sold_out);
      const firstFive = sortedData.slice(0, 5);
      setData(firstFive);
    }
  }, [allProducts]); 
  
  return (
    <div className="w-full sm:w-11/12 mx-auto px-5 pb-5">
      <div className="py-6 flex items-center justify-center sm:justify-start">
        <h1 className={`${styles.heading}`}>Best Deals</h1>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {data &&
          data.map((product, index) => (
            <ProductCard data={product} key={index} />
          ))}
      </div>
    </div>
  );
};

export default BestSelling;
