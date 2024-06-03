import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard2 from '../../../components/User/ProductCard2';
import EventCard from '../../../components/User/Event/EventCard';
import { getAllProductsShop } from '../../../redux/actions/product';
import { getAllEventShop } from '../../../redux/actions/event';
import EventCard2 from '../../../components/User/Event/EventCard2';

const Admin_ShopProfileData = () => {
  const [active, setActive] = useState(1);

  const { products, isLoading } = useSelector((state) => state.product);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventShop(id));
  }, [dispatch]);

  const allReviews =
    products && products.map((product) => product.reviews).flat();
  return (
    <div>
     <div className='w-full '>
        <div className='flex flex-col sm:flex-row justify-between'>
        <div className="flex items-center justify-center sm:gap-20 gap-5  sm:w-1/2 sm:mt-2 sm:mb-0 mb-5 ">
            <div className="" onClick={() => setActive(1)}>
              <h1 className={`text-xl font-bold ${active === 1 ? "text-red-600" : "text-black"} cursor-pointer`}>
                All Products
              </h1>
            </div>
            <div className="" onClick={() => setActive(2)}>
              <h1 className={`text-xl font-bold ${active === 2 ? "text-red-600" : "text-black"} cursor-pointer`}>
                Running Events
              </h1>
            </div>

          </div>

        </div>
        <div className='grid grid-cols-2 px-4 gap-3 sm:grid-cols-4 sm:px-14 sm:py-2 '>
          {active === 1 && (
            products &&
            products.map((product, index) => (
              <ProductCard2 key={index} data={product} isShop={true} />
            ))
          )}
        </div>
        {active === 2 && (
          <div className="w-full flex flex-wrap items-center justify-center">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard2 key={event._id} data={event} />
              ))
            ) : (
              <div className="text-center mt-20 h-44 items-center flex justify-center">
                <p className="text-xl text-black">No event available right now.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin_ShopProfileData;
