import React, { useEffect, useState } from "react";

import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../../../style/style";
import { getAllOrdersOfShop } from "../../../../redux/actions/order";
import { backend_url, server } from "../../../../server";
import ShopNavbar from "../../../../components/Shop/ShopNavbar";

const ShopOrderDetails = () => {
    const { orders, isLoading } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id));
    }, [dispatch]);

    const data = orders && orders.find((item) => item._id === id);

    const orderUpdateHandler = async (e) => {
        await axios
            .put(
                `${server}/order/update-order-status/${id}`,
                {
                    status,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success("Order updated!");
                navigate("/dashboard-orders");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };



    console.log(data?.status);


    return (
        <>
            <ShopNavbar />
            <div className={`py-4 ${styles.section}`}>
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center">
                        <BsFillBagFill size={30} color="crimson" />
                        <h1 className="pl-2 text-[25px]">Order Details</h1>
                    </div>
                    <Link to="/dashboard-orders">
                        <div
                            className={`${styles.button} !rounded-[4px] !bg-[#f63b60] text-white font-bold !h-[45px] text-[18px]`}
                        >
                            Order List
                        </div>
                    </Link>
                </div>

                <div className="w-full flex items-center justify-between pt-6">
                    <h5 className="text-[#00000084]">
                        Order ID: <span>#{data?._id?.slice(0, 8)}</span>
                    </h5>
                    <h5 className="text-[#00000084]">
                        Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
                    </h5>
                </div>

                {/* order items */}
                <br />
                <br />
                {data &&
                    data?.cart.map((item, index) => (
                        <div className="w-full flex items-start mb-5" key={index}>
                            <img
                                src={`${backend_url}${item.images[0]}`}
                                alt=""
                                className="h-28 w-32 object-cover"
                            />
                            <div className="w-full">
                                <h5 className="pl-3 text-lg font-bold">{item.name}</h5>
                                {item.discountPrice !== null ? (
                                    <h5 className="pl-3 text-[20px] text-[#00000091]">
                                        PKR:  {item.discountPrice} x {item.qty}
                                    </h5>
                                ) : (
                                    <h5 className="pl-3 text-md text-black">
                                        <span className="text-lg font-semibold">PKR:</span> {item.originalPrice} x {item.qty}
                                    </h5>
                                )}
                            </div>
                        </div>
                    ))}

                <div className="border-t w-full text-right">
                    <h5 className="pt-3 text-[18px]">
                        Total Price: <strong>PKR: {data?.totalPrice}</strong>
                    </h5>
                </div>

                <div className="w-full sm:flex-row flex justify-center items-center mt-8 flex-col">


                    <div className="sm:w-[50%] w-full">
                        <div className="flex justify-start sm:gap-10 gap-5">
                            <div className="text-lg font-bold sm:w-1/3">Shipping Address:</div>
                            <div className="text-md ">
                                {data?.shippingAddress.address}
                            </div>

                        </div>
                        <div className="flex justify-start sm:gap-10 gap-5">
                            <div className="text-lg font-bold sm:w-1/3">Shop Phone Number:</div>

                            <div className=" text-md  ">+92 {data?.user?.phoneNumber}</div>
                        </div>
                        <div className="flex justify-start sm:gap-10 gap-5">
                            <h4 className=" text-lg font-bold sm:w-1/3">Payment Info:</h4>
                            <h4 className="text-md ">

                                {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
                            </h4>
                        </div>
                    </div>
                    <div className="flex sm:w-6/12 w-full  sm:justify-end justify-center items-center sm:pr-20 sm:mt-0 mt-4">
                        <div className="">
                            <h4 className="pt-3 text-lg font-semibold">Order Status:</h4>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className=" mt-2 border h-[35px] w-full"
                            >
                                {[
                                    "Processing",
                                    "Completed",
                                ]
                                    .slice(
                                        [
                                            "Processing",
                                            "Completed",
                                        ].indexOf(data?.status)
                                    )
                                    .map((option, index) => (
                                        <option value={option} key={index}>
                                            {option}
                                        </option>
                                    ))}
                            </select>
                            {data?.status !== "Completed" && (
                                <div className="w-full">
                                <button
                                    className={`${styles.button} mt-5 !bg-[#f63b60] text-white font-bold w-full h-[45px] text-md`}
                                    onClick={orderUpdateHandler}
                                >
                                    Update Status
                                </button>
                            </div>
                            
                            )}
                            {data?.status === "Completed" && (
                                <div className="mt-5 text-gray-400">Order Completed</div>
                            )}
                        </div>
                    </div>



                </div>





            </div>
        </>
    );
};

export default ShopOrderDetails;