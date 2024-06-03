import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getAllProductsShop } from '../../redux/actions/product';
import { backend_url } from '../../server';
import Navbar from '../Admin/Navbar';
import ShopNavbar from '../../components/Shop/ShopNavbar';





const ProductDetailPage3 = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [select, setSelect] = useState(0);
    const { allProducts } = useSelector((state) => state.product);
    const dispatch = useDispatch();
   

    
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        const product = allProducts.find((item) => item._id === id);
        setData(product);
    }, [id, allProducts]);

   

    return (
        <>
            <ShopNavbar />
            <div className="w-full mx-auto">
                {data && (
                    <div>
                        {/* Product Images Section */}
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-[40%] flex flex-col items-center justify-center mt-20 sm:mt-10">
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

                            {/* Product Information Section */}
                            <div className="w-full md:w-1/2 ">
                                <h1 className="text-2xl sm:text-3xl mt-10 font-extrabold flex justify-center">
                                    {data.name}
                                </h1>
                                <p className="py-5 sm:mr-10 text-lg sm:text-md px-2 sm:px-10 text-justify">
                                    {data.description}
                                </p>
                                <div className="flex px-5">
                                    <h4 className="text-lg sm:text-2xl font-semibold">
                                        <span className="font-bold">PKR:</span> {data.originalPrice}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
           
        </>
    );
};



export default ProductDetailPage3;
