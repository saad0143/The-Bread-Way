import React, { useEffect, useState } from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom';
import { backend_url, server } from '../../../server';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const ShopInfo = ({ isOwner }) => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const { products, isLoading } = useSelector((state) => state.product);



    useEffect(() => {
        axios
            .get(`${server}/shop/get-shop-info/${id}`)
            .then((res) => {
                setData(res.data.shop);
                
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleLogout = () => {
        axios
            .get(`${server}/shop/logout`, { withCredentials: true })
            .then((res) => {
                toast.success('Logged Out Successfully!');
                navigate('/shop-login');
                window.location.reload(true);
            })
            .catch((error) => {
                toast.error('Logout failed: ' + error.message);
            });
    };

    
    return (
        <div>
            <div className='w-full p-3 sm:flex-row '>
                <div className='w-full flex items-center justify-center gap-5'>
                    <img
                        src={`${backend_url}${data.avatar}`}
                        alt=""
                        className='sm:h-40 sm:w-40 h-28 w-28 rounded-full object-cover shadow-lg'
                    />
                     <h3 className='text-center text-2xl font-bold underline sm:hidden block '>
                    {data.shopName}
                </h3>
                </div>
                <h3 className='text-center py-2 text-2xl font-bold underline hidden sm:block'>
                    {data.shopName}
                </h3>


            </div>
            <div className='px-5 mt-1 flex justify-start sm:flex-col  '>
                <h5 className='text-md font-bold'>Email </h5>
                <h4 className='px-3  '>{data.email}</h4>
            </div>
            <div className='px-5 mt-1 flex justify-start sm:flex-col '>
                <h5 className='text-md font-bold'>Address </h5>
                <h4 className='px-3'>{data.address}</h4>
            </div>
            <div className='px-5 mt-1 flex justify-start sm:flex-col'>
                <h5 className='text-md font-bold'>Phone Number </h5>
                <h4 className='px-3 '>+92 {data.phoneNumber}</h4>
            </div>
            <div className='px-5 mt-1 flex justify-start sm:flex-col'>
                <h5 className='text-md font-bold'>Total Products </h5>
                <h4 className='px-3  '>{products && products.length}</h4>
            </div>
            <div className='px-5 mt-1 flex justify-start sm:flex-col'>
                <h5 className='text-md font-bold'>Custom Products</h5>
                <h4 className='px-3'>{data.customizeProducts ? 'Yes' : 'No'}</h4>
            </div>
            
            {
                isOwner && (
                    <div className='py-4 px-3'>
                        <div className="flex justify-around">
                            <Link to='/dashboard-setting' className='w-[40%] h-[40px] !bg-[#f63b60] text-white my-3 flex items-center justify-center rounded-md cursor-pointer'>
                                <span className='text-white'>
                                    Edit Shop
                                </span>
                            </Link>
                            <button onClick={handleLogout} className='w-[40%] h-[40px] bg-black my-3 flex items-center justify-center rounded-md cursor-pointer'>
                                <span className='text-white'>
                                    Log Out
                                </span>
                            </button>
                        </div>

                    </div>

                )
            }
        </div>
    )
}

export default ShopInfo
