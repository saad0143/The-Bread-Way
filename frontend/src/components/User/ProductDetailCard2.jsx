// ProductDetailCard.jsx
import React, { useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';

import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { backend_url } from '../../server';
import Loader from '../AnimationsPages/Loader';



const ProductDetailCard2 = ({ setOpen, data, }) => {
    const [select, setSelect] = useState(0);
    return (
        <div>
            {data ? (
                <div className="fixed w-full h-screen top-0 left-0 bg-black/50 z-40 flex items-center justify-center rounded-lg p-6">
                    <div className="w-full sm:w-[60%] h-[85vh] overflow-y-scroll rounded-md bg-gray-100 p-5 shadow-sm relative ">
                        <MdClose
                            size={35}
                            className="absolute right-5 top-3 z-50 cursor-pointer"
                            onClick={() => setOpen(false)}
                        />
                        <div className="w-full flex flex-col md:flex-row">
                            <div className="w-full sm:w-[50%] flex flex-col items-center justify-center mt-20 sm:mt-10">
                                <img
                                    src={`${backend_url}${data.images[select]}`}
                                    alt=""
                                    className="h-[230px] sm:h-[300px]"
                                />
                                <div className="w-full flex mt-2 justify-center">
                                    {data.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer ${select === index ? 'border-2' : ''}`}
                                            onClick={() => setSelect(index)}
                                        >
                                            <img
                                                src={`${backend_url}${image}`}
                                                alt=""
                                                className="w-full h-[110px] sm:h-[170px] p-2"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 p-2">
                                <h1 className="text-xl font-extrabold underline">{data.name}</h1>
                                <p className="text-md mt-2 text-justify">{data.description}</p>
                                <div className="flex py-3">
                                    <h1 className="font-extrabold text-lg">Rs: {data.originalPrice}</h1>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            ) : <Loader />}
        </div>
    );
};

export default ProductDetailCard2;
