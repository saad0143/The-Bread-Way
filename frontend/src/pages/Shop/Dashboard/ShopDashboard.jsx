import React, { useEffect, useState } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../../redux/actions/order";
import { getAllProductsShop } from "../../../redux/actions/product";
import { getAllEventShop } from "../../../redux/actions/event";
import axios from "axios";
import { server } from "../../../server";
import { ArrowRightCircle, Atom, Boxes, ListOrdered, Percent } from "lucide-react";



const DashboardPage = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const { products } = useSelector((state) => state.product);
    const { events, isLoading } = useSelector((state) => state.event);
    const [coupons, setCoupons] = useState([]);

    const formatDate = (createdAt) => {
        const dateObj = new Date(createdAt);
        const date = dateObj.toLocaleDateString();
        const time = dateObj.toLocaleTimeString();
        return { date, time };
    };
    useEffect(() => {
        dispatch(getAllEventShop(seller._id));
    }, [dispatch, seller]);

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id));
        dispatch(getAllProductsShop(seller._id));
    }, [dispatch]);

    useEffect(() => {
        axios
            .get(`${server}/coupon/get-coupon/${seller._id}`, {
                withCredentials: true,
            })
            .then((res) => {
                const Coupons = res.data.couponCode || [];
                setCoupons(Coupons);
            })
            .catch((error) => {

                console.error("Error fetching coupons:", error);
            });
    }, [dispatch]);

    const totalRevenue = 5898;

    // const totalRevenue = orders && orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const totalSoldOuts = products && products.reduce((sum, product) => {
        const isSoldOut = product.stock === 0;
        return isSoldOut ? sum + 1 : sum;
    }, 0);

    const processingOrders = orders && orders.filter((order) => order.status === 'Processing');

    const firstFiveOrders = processingOrders && processingOrders.slice(0, 5);

    return (
        <>
            <div class="grid sm:grid-cols-3 gap-2 sm:px-32 sm:py-5 
                                flex items-center justify-center sm:gap-x-20 w-full center-container">
                <div className="w-48  sm:h-36 h-20 sm:w-56 bg-[#58afdb] text-white shadow sm:p-4 p-2 rounded">
                    <div className="flex items-center">
                        <AiOutlineMoneyCollect size={30} className="mr-2" />
                        <div>
                            <h3 className="text-lg font-bold">Total Revenue</h3>
                            <h5 className="text-2xl font-semibold mb-2">PKR: {totalRevenue}</h5>
                            <Link to="/dashboard-manage-orders" className=" underline sm:block hidden">
                                Manage Orders
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-48 sm:h-36 h-20 sm:w-56  bg-[#58afdb] text-white shadow sm:p-4 p-2 rounded">
                    <div className="flex items-center">
                        <ListOrdered size={30} className="mr-2" />
                        <div>
                            <h3 className="text-lg font-bold">All Orders</h3>
                            <h5 className="text-2xl font-semibold mb-2">{orders && orders.length}</h5>
                            <Link to="/dashboard-orders" className=" underline sm:block hidden">
                                View Orders
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-48 sm:h-36 h-20 sm:w-56  bg-[#58afdb] text-white shadow sm:p-4 p-2 rounded">
                    <div className="flex items-center">
                        <Boxes size={30} className="mr-2" />
                        <div>
                            <h3 className="text-lg font-bold">All Products</h3>
                            <h5 className="text-2xl font-semibold mb-2">{products && products.length}</h5>
                            <Link to="/dashboard-products" className=" underline sm:block hidden">
                                View Products
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-48 sm:h-36 h-20 sm:w-56  bg-[#58afdb] text-white shadow sm:p-4 p-2 rounded">
                    <div className="flex items-center">
                        <MdBorderClear size={30} className="mr-2" />
                        <div>
                            <h3 className="text-lg font-bold">Total Sold Outs</h3>
                            <h5 className="text-2xl font-semibold mb-2">2</h5>
                            <Link to="/dashboard-products" className=" underline sm:block hidden">
                                View Soldouts
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-48 sm:h-36 h-20 sm:w-56  bg-[#58afdb] text-white shadow sm:p-4 p-2 rounded">
                    <div className="flex items-center">
                        <Atom size={30} className="mr-2" />
                        <div>
                            <h3 className="text-lg font-bold">Total Events</h3>
                            <h5 className="text-2xl font-semibold mb-2">{events && events.length}</h5>
                            <Link to="/dashboard-events" className=" underline sm:block hidden">
                                View Events
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-48 sm:h-36 h-20 sm:w-56  bg-[#58afdb] text-white shadow sm:p-4 p-2 rounded">
                    <div className="flex items-center">
                        <Percent size={30} className="mr-2" />
                        <div>
                            <h3 className="text-lg font-bold">Total Coupons</h3>
                            <h5 className="text-2xl font-semibold mb-2">{coupons && coupons.length}</h5>
                            <Link to="/dashboard-coupons" className=" underline sm:block hidden ">
                                View Coupons
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full px-20 mt-5 sm:block hidden">
                <div className="w-full flex justify-center">
                    <div className="w-full h-full mb-20">
                        <div className="text-3xl font-bold text-gray-800 underline uppercase flex justify-start mb-5">
                            <h1>All Order In Process</h1>
                        </div>
                        <div className="table-container overflow-x-auto">
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
                                    {firstFiveOrders && firstFiveOrders.map((order, index) => (
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
                </div>
            </div>
        </>
    );
};
export default DashboardPage;
