import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, Gift, Trash2, X } from 'lucide-react';

import axios from 'axios';

import { toast } from 'react-toastify';
import { server } from '../../../../server';
import styles from '../../../../style/style';
import { getAllProductsShop } from '../../../../redux/actions/product';

const AllCoupons = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [value, SetValue] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [coupons, setCoupons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [maxAmount, setMaxAmount] = useState('');
    const [selectedProducts, setSelectedProducts] = useState('');

    const { seller } = useSelector((state) => state.seller);
    const { products } = useSelector((state) => state.product);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsShop(seller._id));
    }, [dispatch, seller]);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${server}/coupon/get-coupon/${seller._id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setIsLoading(false);
                const Coupons = res.data.couponCode || [];
                setCoupons(Coupons);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error("Error fetching coupons:", error);
            });
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${server}/coupon/delete-coupon/${id}`, {
                withCredentials: true,
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon._id !== id));
            } else {
                toast.error("Failed to delete coupon code");
            }
        } catch (error) {
            console.error("Error deleting coupon:", error);
            toast.error("An error occurred while deleting the coupon code");
        }
    };

    const handleAddCoupon = async (e) => {
        e.preventDefault();

        await axios
            .post(
                `${server}/coupon/create-coupon-code`,
                {
                    name,
                    minAmount,
                    maxAmount,
                    selectedProducts,
                    value,
                    shopId: seller._id,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success("Coupon code created successfully!");
                setOpen(false);
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });


    };

    return (
        <div className="w-full mb-20 ">
            <div className='sm:flex justify-between '>
                <div className={`${styles.heading}`}>
                    <h1>Discount Codes</h1>
                </div>
                <div className='sm:block hidden '>
                    <div onClick={() => setOpen(true)} className={"w-[170px] !bg-[#f63b60] text-white h-[45px] flex items-center justify-center rounded-xl cursor-pointer"}>
                        <h1 className="text-white flex items-center">
                            Add Coupon

                        </h1>
                    </div>
                </div>
                {
                    open && (
                        <div className="fixed top-0 left-0 w-full h-screen bg-[#0000006b] z-[2000] flex items-center justify-center overflow-y-auto">
                            <div className="w-[80%] sm:w-[50%] h-[80vh] bg-white rounded-md relative">
                                <div className='w-full flex items-end justify-end p-4'>
                                    <X size={30} className='cursor-pointer' onClick={() => setOpen(false)} />
                                </div>
                                <h2 className="text-2xl font-semibold mb-4 items-center flex justify-center">Add Coupon Code</h2>
                                <form className='p-5' onSubmit={handleAddCoupon} aria-required={true}>
                                    <div className='mb-2'>
                                        <div className=" w-full">
                                            <label htmlFor="setName" className="block text-sm font-medium text-gray-600">
                                                Coupon Name:
                                            </label>
                                            <input
                                                type="text"
                                                id="setName"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder='Enter Coupon Name'
                                                className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-400"
                                            />
                                        </div>

                                        <div className="w-full">
                                            <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-600">
                                                Discount Percentage:
                                            </label>
                                            <input
                                                type="number"
                                                id="SetValue"
                                                value={value}
                                                onChange={(e) => SetValue(e.target.value)}
                                                placeholder='Enter Discount Percentage'
                                                className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-400"
                                            />
                                        </div>
                                    </div>
                                    <div className=' mb-2'>
                                        <div className=" w-full">
                                            <label htmlFor="minAmount" className="block text-sm font-medium text-gray-600">
                                                Min Amount:
                                            </label>
                                            <input
                                                type="number"
                                                id="minAmount"
                                                value={minAmount}
                                                onChange={(e) => setMinAmount(e.target.value)}
                                                placeholder='Enter Min Amount'
                                                className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-400"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="maxAmount" className="block text-sm font-medium text-gray-600">
                                                Max Amount:
                                            </label>
                                            <input
                                                type="number"
                                                id="maxAmount"
                                                value={maxAmount}
                                                onChange={(e) => setMaxAmount(e.target.value)}
                                                placeholder='Enter Max Amount'
                                                className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-400"
                                            />
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center w-full sm:mt-20 mt-5'>
                                        <button

                                            onClick={handleAddCoupon}
                                            className="bg-black text-white p-2 rounded cursor-pointer w-7/12"
                                        >
                                            Add Coupon
                                        </button>
                                    </div>


                                </form>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="table-container overflow-x-auto h-[400px] overflow-y-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 ">
                            <th className="p-2 text-left">Coupon ID</th>
                            <th className="p-2 text-left">Coupon Name</th>
                            <th className="p-2 text-center">Discount</th>
                            <th className="p-2 text-center">Min Amount</th>
                            <th className="p-2 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {coupons && coupons.map((coupon, index) => (
                            <tr key={coupon._id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                <td className="p-2 text-left">{coupon._id}</td>
                                <td className="p-2 text-left">{coupon.name}</td>
                                <td className="p-2 text-center">{coupon.value}%</td>
                                <td className="p-2 text-center">{coupon.minAmount} RS</td>
                                <td className="p-2 text-center">
                                    <button className="" onClick={() => handleDelete(coupon._id)}>
                                        <Trash2 size={25} className="cursor-pointer text-red-600" title="Delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <div className='w-full flex items-center justify-center mt-5 sm:hidden block'>
                <div onClick={() => setOpen(true)}
                    className={"w-[170px] !bg-[#f63b60] text-white h-[45px] flex items-center justify-center  rounded-xl cursor-pointer"}>
                    <h1 className="text-white flex items-center">
                        Add Coupon

                    </h1>
                </div>
            </div>

        </div>
    );
};

export default AllCoupons;
