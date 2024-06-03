
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../../../redux/actions/order";
import { Link, useParams } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";
import styles from "../../../../style/style";

const Order = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);
  const formatDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  };
  const processingOrders = orders&&orders.filter((order) => order.status === 'Processing');
  return (
    <>
      <div className="w-full h-full sm:mb-20">
        <div className={`${styles.heading} text-xl`}>
          <h1>Orders In Process</h1>
        </div>
       
        <div className="table-container overflow-x-auto h-[450px] overflow-y-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Order ID</th>
                <th className="p-2 text-center">Order Status</th>
                <th className="p-2 text-center">Price (PKR)</th>
                <th className="p-2 text-center">Date</th>
                <th className="p-2 text-center">Time</th>
                <th className="p-2 text-end">Order Details</th>
              </tr>
            </thead>
            <tbody>
              {processingOrders && processingOrders.map((order, index) => (
                <tr key={order._id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                  <td className="p-2 text-left">{order._id}</td>
                  <td className="p-2 text-center">{order.status}</td>
                  <td className="p-2 text-center">{order.totalPrice}</td>
                  <td className="p-2 text-right">{formatDate(order.createdAt).date}</td>
                  <td className="p-2 text-right">{formatDate(order.createdAt).time}</td>
                  <td className="p-2 text-center">
                    <Link to={`/order/${order._id}`}>
                      <td className="p-2 text-center justify-end flex">
                        <ArrowRightCircle size={22} style={{ color: 'red' }} />
                      </td>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
        </div>
      </div>
    </>
  );
};

export default Order;