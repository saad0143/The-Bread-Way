import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfUser } from '../../../../redux/actions/order';
import { Link } from 'react-router-dom';
import { ArrowRightCircle } from 'lucide-react';

import processing from '../../../../Assets/Animation/processing.json'
import completed from '../../../../Assets/Animation/completed.json'
import Lottie from 'react-lottie';
import styles from '../../../../style/style';

const AllOrderPage = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: processing,

  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: completed,

  };

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const formatDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  };

  const latestOrder = orders && orders.length > 0
    ? [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
    : null;

  return (
    <div className="w-full h-full">
      <div className={`${styles.heading}`}>
        <h1>Lastest Orders</h1>
      </div>
      {latestOrder && (
          <div className="text-center sm:px-8 sm:w-full">
            <div className="w-full flex items-center justify-center">
              {latestOrder && latestOrder.status === 'Processing' ? (
                <Lottie options={defaultOptions1} height={300} width={300} />
              ) : (
                <Lottie options={defaultOptions2} height={300} width={300} />
              )}
            </div>
            </div>
          )}
            
      <div className="w-full  items-center flex rounded-md overflow-x-auto overflow-y-auto">

        {latestOrder && (
          <div className="text-center sm:p-8 w-full h-[400px]">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Order ID</th>
                  <th className="p-2 text-left">Shop Name</th>
                  <th className="p-2 text-left">Order Status</th>
                  <th className="p-2 text-left">Total Price</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Time</th>
                  <th className="p-2 text-center">View Order</th>
                </tr>
              </thead>
              <tbody>
                {latestOrder &&
                  <tr key={latestOrder._id}>
                    <td className="p-2 text-left">{latestOrder._id}</td>
                    <td className="p-2 text-left">{latestOrder.cart[0].shop.shopName}</td>
                    <td className="p-2 text-left">{latestOrder.status}</td>
                    <td className="p-2 text-left">PKR: {latestOrder.totalPrice}</td>
                    <td className="p-2 text-left">{formatDate(latestOrder.createdAt).date}</td>
                    <td className="p-2 text-left">{formatDate(latestOrder.createdAt).time}</td>
                    <Link to={`/user/order/${latestOrder._id}`}>
                      <td className="p-2 text-center justify-center flex">
                        <ArrowRightCircle size={25} style={{ color: 'red' }} />
                      </td>
                    </Link>
                  </tr>
                }
              </tbody>
            </table>

          </div>
        )}

      </div>

    </div>
  );
};

export default AllOrderPage;

