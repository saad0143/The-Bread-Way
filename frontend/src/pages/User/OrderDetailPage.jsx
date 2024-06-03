import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllOrdersOfUser } from '../../redux/actions/order';
import { BsFillBagFill } from 'react-icons/bs';
import styles from '../../style/style';
import { backend_url, server } from '../../server';
import { RxCross1 } from 'react-icons/rx';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../../components/User/Navbar';
import Footer from '../../components/User/Footer';


const OrderDetailPage = () => {
    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [rating, setRating] = useState(0);

    const reviewHandler = async (e) => {

        await axios
            .put(
                `${server}/product/create-new-review`,
                {
                    user,
                    rating,
                    comment,
                    productId: selectedItem?._id,
                    orderId: id,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success(res.data.message);
                dispatch(getAllOrdersOfUser(user._id));
                setComment("");
                setRating(null);
                setOpen(false);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id));
    }, [dispatch, user._id]);


    const data = orders && orders.find((item) => item._id === id);
    return (
        <>
            <Navbar />
            <div className={`py-4 ${styles.section} sm:mt-0 mt-20`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <BsFillBagFill size={30} color="crimson" />
                        <h1 className="pl-2 text-2xl font-bold">Order Details</h1>
                    </div>
                    <Link to={'/user-orders'}>
                        <div
                            className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px]
                                     cursor-pointer text-[18px] font-[600]`}
                        >
                            Send Message
                        </div>
                    </Link>
                </div>
                <div className='w-full justify-center items-center py-10'>
                    <div className="flex items-center justify-between">
                        <h5 className="text-gray-600">
                            Order ID: <span>#{data?._id?.slice(0, 8)}</span>
                        </h5>
                        <h5 className="text-gray-600">
                            Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
                        </h5>
                        <h5 className="text-gray-600">
                            Order Status: <span>{data.status}</span>
                        </h5>
                    </div>
                    <div className="mt-20">
                        {data &&
                            data?.cart.map((item, index) => (
                                <div key={index} className="flex items-start mb-5">
                                    <img
                                        src={`${backend_url}${item.images[0]}`}
                                        alt=""
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="ml-4 flex justify-between w-full">
                                        <div>
                                            <h5 className="text-xl font-semibold">{item.name}</h5>
                                            <p className="text-gray-700">
                                                {item.discountPrice !== 0 ? (
                                                    <>
                                                        <span className='font-semibold'> PKR:</span>
                                                        {item.originalPrice} x{' '}
                                                        <span className='text-xl font-bold'>{item.qty}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className='font-semibold'> PKR:</span>
                                                        {item.discountPrice} x{' '}
                                                        <span className='text-xl font-bold'>{item.qty}</span>
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        {!item.isReviewed && data?.status === "Completed" ? <div
                                            className={`${styles.button} text-[#fff]`}
                                            onClick={() => setOpen(true) || setSelectedItem(item)}
                                        >
                                            Write a review
                                        </div> : (
                                            null
                                        )}
                                        {/* review popup */}
                                        {open && (
                                            <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] 
                                                z-50 flex items-center justify-center">
                                                <div className="w-[50%] h-min bg-[#fff] shadow rounded-md px-10">
                                                    <div className="w-full flex justify-end p-3">
                                                        <RxCross1
                                                            size={30}
                                                            onClick={() => setOpen(false)}
                                                            className="cursor-pointer"
                                                        />
                                                    </div>
                                                    <h2 className="text-[30px] font-[500] font-Poppins text-center">
                                                        Give a Review
                                                    </h2>
                                                    <br />
                                                    <div className="w-full flex">
                                                        <img
                                                            src={`${backend_url}${selectedItem.images[0]}`}
                                                            alt=""
                                                            className="w-20 h-20 object-cover rounded"
                                                        />

                                                        <div className='ml-8'>
                                                            <h5 className="text-xl font-semibold">{selectedItem.name}</h5>
                                                            <p className="text-gray-700">
                                                                {selectedItem.discountPrice !== 0 ? (
                                                                    <>
                                                                        <span className='font-semibold'> PKR:</span>
                                                                        {selectedItem.originalPrice} x{' '}
                                                                        <span className='text-xl font-bold'>
                                                                            {selectedItem.qty}
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span className='font-semibold'> PKR:</span>
                                                                        {selectedItem.discountPrice} x{' '}
                                                                        <span className='text-xl font-bold'>
                                                                            {selectedItem.qty}
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <br />
                                                    <br />

                                                    {/* ratings */}
                                                    <h5 className="pl-3 text-[20px] font-[500]">
                                                        Give a Rating <span className="text-red-500">*</span>
                                                    </h5>
                                                    <div className="flex w-full ml-2 pt-1">
                                                        {[1, 2, 3, 4, 5].map((i) =>
                                                            rating >= i ? (
                                                                <AiFillStar
                                                                    key={i}
                                                                    className="mr-1 cursor-pointer"
                                                                    color="rgb(246,186,0)"
                                                                    size={25}
                                                                    onClick={() => setRating(i)}
                                                                />
                                                            ) : (
                                                                <AiOutlineStar
                                                                    key={i}
                                                                    className="mr-1 cursor-pointer"
                                                                    color="rgb(246,186,0)"
                                                                    size={25}
                                                                    onClick={() => setRating(i)}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                    <br />
                                                    <div className="w-full ml-3">
                                                        <label className="block text-[20px] font-[500]">
                                                            Write a comment
                                                            <span className="ml-1 font-[400] text-[16px]
                                                                 text-[#00000052]">
                                                                (optional)
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            name="comment"
                                                            id=""
                                                            cols="20"
                                                            rows="5"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                            placeholder="Provide your feedback and express your experience with the product."
                                                            className="mt-2 w-[95%] border p-2 outline-none"
                                                        ></textarea>
                                                    </div>
                                                    <div
                                                        className={`${styles.button} text-white text-[20px] ml-3`}
                                                        onClick={rating > 0 ? reviewHandler : () => toast.error("Please provide a rating")}
                                                    >
                                                        Submit
                                                    </div>

                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="border-t mt-10 text-right">
                        <h5 className="pt-2 text-xl">
                            Total Price: <strong>PKR: {data?.totalPrice}</strong>
                        </h5>
                    </div>
                    <div className='w-full flex items-center justify-center'>
                        <div className="grid sm:w-full  sm:flex flex-wrap items-center justify-center sm:gap-10 mt-10 grid-cols-2 gap-x-1">
                            <div className="border rounded-md p-4 mb-4 w-44 h-24">
                                <h4 className="text-md font-bold mb-2">Shipping Address:</h4>
                                <h4 className="text-sm">{data?.shippingAddress.address}</h4>
                            </div>
                            <div className="border rounded-md p-4 mb-4 w-44 h-24">
                                <h4 className="text-md font-bold mb-2">Phone Number:</h4>
                                <h4 className="text-sm">+92 {data?.user?.phoneNumber}</h4>
                            </div>
                            <div className="border rounded-md p-4 mb-4 w-44 h-24">
                            <h4 className="text-md  font-bold mb-2">Payment Status:</h4>
                            <h4 className="text-sm">{data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}</h4>
                            </div>
                            <div className="border rounded-md p-4 mb-4 w-44 h-24">
                            <h4 className="text-md font-bold mb-2">Order Status:</h4>
                            <h4 className="text-sm">{data.status}</h4>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
       
        </>
    );
};

export default OrderDetailPage;
