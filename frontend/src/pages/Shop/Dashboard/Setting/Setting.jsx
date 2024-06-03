import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { backend_url, server } from '../../../../server';

import { Camera, Eye, EyeOff, Save } from 'lucide-react';
import { loadUser, loadseller } from '../../../../redux/actions/user';
import styles from '../../../../style/style';

const ProfilePage = () => {
    const { seller } = useSelector((state) => state.seller);
    const [avatar, setAvatar] = useState();
    const [shopName, setShopName] = useState(seller && seller.shopName);
    const [description, setDescription] = useState(
        seller && seller.description ? seller.description : ""
    );
    const [address, setAddress] = useState(seller && seller.address);
    const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
    const [email, setEmail] = useState(seller && seller.email);

    //   useEffect(() => {
    //     if (error) {
    //       toast.error(error);
    //       dispatch({ type: "clearErrors" });
    //     }
    //   }, [error]);
    const dispatch = useDispatch();

    const handleImage = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setAvatar(file);
        const formData = new FormData();
        formData.append("image", file);
        try {
            await axios.put(`${server}/shop/update-shop-avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            toast.success('Avatar updated successfully');
            dispatch(loadUser());
            window.location.reload();
        } catch (error) {
            toast.error('Error updating avatar');
        }
    };


    const updateHandler = async (e) => {
        e.preventDefault();

        await axios
            .put(
                `${server}/shop/update-seller-info`,
                {
                    shopName,
                    address,
                    phoneNumber,
                    description,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success("Shop info updated succesfully!");
                dispatch(loadseller());
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    return (
        <div className="flex justify-center items-center w-full ">
            <div className="w-full sm:w-7/12 bg-white rounded-lg pt-2 pb-5 px-8 shadow-md">
                <h1 className='text-2xl font-bold'>Shop Profile</h1>
                <div className="flex items-center justify-center">
                    <div className='relative mt-2 sm:mt-0'>
                        <img
                            src={`${backend_url}${seller?.avatar}`}
                            alt=""
                            className='w-40 h-40 rounded-full object-cover border shadow-md'
                        />
                        <div className='w-8 h-8  flex items-center 
                            justify-center cursor-pointer absolute bottom-[5px] right-[5px] bg-gray-800 bg
                            -opacity-50 hover:bg-opacity-75 rounded-full p-2 transition duration-300 ease-in-out
                             transform hover:scale-110'>
                            <input type="file" id="image"
                                className='hidden'
                                onChange={handleImage}
                            />
                            <label htmlFor="image">
                                <Camera size={20} color='white' className='cursor-pointer' />
                            </label>

                        </div>
                    </div>
                </div>

                <form onSubmit={updateHandler}>

                    <div className="mb-2">
                        <label className="block text-md font-semibold">Email:</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-md font-semibold">
                            Full Shop Name:
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-md font-semibold">
                            Phone Number:
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            required
                            pattern="[0-9]*"
                            value={phoneNumber}
                            onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, '');
                                setPhoneNumber(numericValue);
                            }}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-md font-semibold">
                            Description:
                        </label>
                        <textarea
                            placeholder={`${seller?.description
                                ? seller.description
                                : 'Enter your shop description'
                                }`}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            style={{ height: '80px' }}
                        />
                    </div>
                    <div className="flex justify-center mt-5">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full sm:w-1/3"
                            style={{ boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.3)' }}
                        >
                            Update Info
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ProfilePage;