import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfUser } from '../../../../redux/actions/order';
import { Link } from 'react-router-dom';
import { ArrowRightCircle } from 'lucide-react';
import styles from '../../../../style/style';

const AllOrderPage = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const formatDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  };

  const sortedOrders = orders
    ? [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div className="w-full h-full mb-20">
      <div className={`${styles.heading}`}>
        <h1>All Orders</h1>
      </div>
      <div className="table-container overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Shop Name</th>
              <th className="p-2 text-left">Order Status</th>
              <th className="p-2 text-right">Total Price</th>
              <th className="p-2 text-center">Date</th>
              <th className="p-2 text-center">Time</th>
              <th className="p-2 text-right">View Order</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders && sortedOrders.map((order, index) => (
              <tr key={order._id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="p-2 ">{order._id}</td>
                <td className="p-2 text-left">{order.cart[0].shop.shopName}</td>
                <td className="p-2 text-left">{order.status}</td>
                <td className="p-2 text-right">PKR: {order.totalPrice}</td>
                <td className="p-2 text-right">{formatDate(order.createdAt).date}</td>
                <td className="p-2 text-right">{formatDate(order.createdAt).time}</td>
                <Link to={`/user/order/${order._id}`}>
                  <td className="p-2 text-right justify-end flex">
                    <ArrowRightCircle size={25} style={{ color: 'red' }} />
                  </td>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrderPage;
