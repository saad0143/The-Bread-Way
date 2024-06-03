import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import { Store } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getAllProductsShop } from '../../redux/actions/product';
import { backend_url, server } from '../../server';
import { toast } from 'react-toastify';
import { addTocart } from '../../redux/actions/cart';
import Navbar from '../../components/User/Navbar';
import Ratings from '../../components/User/ratings';
import Footer from '../../components/User/Footer';
import axios from 'axios';


const ProductDetailPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [count, setCount] = useState(1);
    const [select, setSelect] = useState(0);
    const navigate = useNavigate();
    const { allProducts } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.cart);

    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);
        if (isItemExists) {
            toast.error("Item Already in Cart!");
        } else {
            // Check if there are items in the cart
            if (cart.length > 0) {
                const newShopId = data.shop._id;
                // Check if the new product's shopId matches the shopId of items in the cart
                const isDifferentShop = cart.some((item) => item.shop._id !== newShopId);
                if (isDifferentShop) {
                    toast.error("You cannot add products from different shops to the cart.");
                    return;
                }
            }
            if (data.stock < count) {
                toast.error(`Product Stock Limited! ${" "} ( ${data.stock} )`);
            } else {
                const cartData = { ...data, qty: count };
                dispatch(addTocart(cartData));

                toast.success("Item Added To Cart!");
            }
        }
    };
    const handleMessageSubmit = async () => {
        if (isAuthenticated) {
            const groupTitle = data._id + user._id;
            const userId = user._id;
            const sellerId = data.shop._id;
            await axios
                .post(`${server}/conversation/create-new-conversation`, {
                    groupTitle,
                    userId,
                    sellerId,
                })
                .then((res) => {
                    navigate(`/inbox?${res.data.conversation._id}`);
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        } else {
            toast.error("Please login to create a conversation");
        }
    };

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        const product = allProducts.find((item) => item._id === id);
        setData(product);
    }, [id, allProducts]);

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const incrementCount = () => {
        setCount(count + 1);
    };

    return (
        <>
            <Navbar />
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
                                <p className="py-5 sm:mr-10 text-sm sm:text-md px-2 sm:px-5 text-justify ">
                                    {data.description}
                                </p>
                                <div className="flex px-5">
                                    <h4 className="text-lg sm:text-xl font-semibold">
                                        <span className="font-bold">PKR:</span> {data.originalPrice}
                                    </h4>
                                </div>
                                <div className="flex items-center justify-between mt-6 sm:mt-5 px-5">
                                    <div className="flex items-center">
                                        <button
                                            className="!bg-[#f63b60] text-white font-bold rounded-sm px-2 py-1 shadow-lg"
                                            onClick={decrementCount}
                                        >
                                            <HiOutlineMinus size={15} color="#fff" />
                                        </button>
                                        <span className="bg-gray-200 text-black font-medium px-2 py-1">
                                            {count}
                                        </span>
                                        <button
                                            className="!bg-[#f63b60] text-white font-bold rounded-sm px-2 py-1 shadow-lg"
                                            onClick={incrementCount}
                                        >
                                            <HiPlus size={15} color="#fff" />
                                        </button>
                                    </div>
                                    <div onClick={() => addToCartHandler(data._id)} className="w-full md:w-[200px] mx-5 bg-black h-11 flex items-center justify-center rounded-xl cursor-pointer">
                                        <span className="text-white flex items-center">
                                            Add to Cart{' '}
                                            <AiOutlineShoppingCart size={20} className="ml-2 mt-1" />
                                        </span>
                                    </div>
                                </div>

                                {/* Seller Information Section */}
                                <div className="sm:flex mt-6 sm:mt-5 item-center sm:justify-between px-5">
                                    <div className='flex justify-center w-full items-center'>
                                        <img
                                            src={`${backend_url}${data.shop?.avatar}`}
                                            alt=""
                                            className="w-14 h-14 object-cover sm:w-[100px] sm:h-[100px] border shadow-lg rounded-full sm:mr-2"
                                        />
                                        <div className='w-full'>
                                            <h5 className="font-extrabold text-md sm:text-lg px-1">
                                                <Link to={`/shop/preview/${data.shop._id}`} className="text-blue-500 underline">
                                                    {data.shop && data.shop.shopName}
                                                </Link>
                                            </h5>

                                        </div>
                                    </div>
                                    <div className='w-full items-center flex justify-center sm:justify-end sm:mt-0 mt-5'>
                                        <div onClick={handleMessageSubmit} className="w-[150px] sm:w-[200px] mx-5 !bg-[#f63b60] text-[#fff] h-11 flex items-center justify-center rounded-xl cursor-pointer">
                                            <span className=" flex items-center">
                                                Send Message <AiOutlineMessage size={20} className="ml-1" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Details Section */}
                        <div className="p-6 items-center flex justify-center w-full">
                            <ProductDetailsInfo data={data} />
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

const ProductDetailsInfo = ({ data }) => {
    const [active, setActive] = useState(1);
    const { products } = useSelector((state) => state.product);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsShop(seller && seller._id));
    }, [dispatch]);


    return (
        <div className="bg-gray-100 px-3 py-2 rounded sm:w-[65%] mb-20 mt-10">
            <div className="w-full flex sm:justify-evenly justify-between items-center border-b pt-10 pb-2">
                {['Shop Description', 'Reviews', 'Shop'].map((label, index) => (
                    <div key={index} className="relative">
                        <h5
                            className={`text-black text-sm px-2 leading-5 font-semibold cursor-pointer 800px:text-lg ${active === index + 1 ? 'active' : ''}`}
                            onClick={() => setActive(index + 1)}
                        >
                            {label}
                        </h5>
                        {active === index + 1 && (
                            <div className="absolute bottom-[-27%] left-0 h-[3px] w-full bg-red-600" />
                        )}
                    </div>
                ))}
            </div>

            {active === 1 && (
                <div className="p-5  h-auto">
                    <h4 className='text-md text-black px-5 text-justify'>{data.shop.description}</h4>

                </div>
            )}

            {active === 2 && (
                <div className="w-full h-[30vh] flex flex-col items-center py-3 overflow-y-scroll p-10">
                    {data && data.reviews.map((item, index) => (
                        <div className="w-full flex mb-5" key={index}>
                            <img
                                src={`${backend_url}${item.user.avatar}`}
                                alt=""
                                className="w-[50px] h-[50px] rounded-full"
                            />
                            <div className="ml-5">
                                <div className="w-full flex items-center">
                                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                                    <Ratings rating={data?.ratings} />
                                </div>
                                <p>{item.comment}</p>
                            </div>
                        </div>
                    ))}

                    {data && data.reviews.length === 0 && (
                        <div className="flex flex-col items-center justify-center">
                            <h5>No Reviews for this product!</h5>
                        </div>
                    )}
                </div>
            )}


            {active === 3 && (
                <div className="w-full flex flex-col sm:flex-row p-5  h-[30vh] items-center">
                    <div className="w-full  flex-row justify-center">
                        <div className="flex items-center justify-center">
                            <img
                                src={`${backend_url}${data.shop?.avatar}`}
                                alt=""
                                className="w-16 h-16 sm:w-24 sm:h-24 border rounded-full mr-2 shadow-xl"
                            />
                            <div>
                                <Link to={`/shop/preview/${data.shop._id}`} >
                                    <h5 className="font-medium px-3 mt-2 sm:mt-0 text-lg sm:text-xl text-blue-500 underline">
                                        {data.shop.shopName}
                                    </h5>
                                </Link>
                                <h5 className="text-md flex font-medium ml-3 mt-2">
                                    {data.shop.address}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5 sm:mt-0 flex justify-center">
                        <div className="text-center flex-row justify-center">
                            <div className="flex items-start justify-start">
                                <h5 className="text-lg font-bold text-gray-800"> Email:</h5>
                                <a href={`mailto:${data.shop.email}`} className="text-md ml-2 hover:underline">{data.shop.email}</a>
                            </div>
                            <div className='flex items-start justify-start'>
                                <h5 className='text-lg font-bold text-gray-800'>Phone Number: </h5>
                                <a href={`tel:+92${data.shop.phoneNumber}`} className='px-3 text-md flex justify-end hover:underline'>+92 {data.shop.phoneNumber}</a>
                            </div>
                            <div>
                                <Link to={`/shop/preview/${data.shop._id}`} className="flex items-start justify-center mt-5">
                                    <div className="w-full sm:w-[180px] bg-[#f63b60] text-white h-11 flex items-center justify-center rounded-xl cursor-pointer">
                                        <span className="flex items-center">
                                            View Shop <Store size={20} className="ml-2 mt-1" />
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;
