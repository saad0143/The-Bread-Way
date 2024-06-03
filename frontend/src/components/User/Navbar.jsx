import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { BaggageClaim, Briefcase, Calendar, HelpCircle, LogOut, Rotate3D, Store, User, UserPlus, Warehouse } from 'lucide-react';
import Cart from './Cart/Cart';
import { Menu } from 'lucide-react';
import { RxCross1 } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { backend_url, server } from '../../server';


function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const { allProducts } = useSelector((state) => state.product);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filterProducts = allProducts && allProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filterProducts);
    setSearchResultsVisible(!!term); // Show results when there is a search term
  };

  const handleSearchClear = () => {
    setSearchTerm('');
    setSearchData([]);
    setSearchResultsVisible(false);
  };

  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
    if (!openMenu) {
      setSearchTerm('');
      setSearchData([]);
      setSearchResultsVisible(false);
    }
  };
  const logoutHandler = () => {
    axios.get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success("Logged Out Successfully!");
        navigate("/");
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error("Logout failed: " + error.message);
      });
  };

  return (
    <>
      <div>
        {/*  hide the Navbar on small screens */}
        <div className='hidden sm:flex justify-between items-center h-20 w-full
         bg-white px-6 z-10 top-0 fixed left-0 shadow-md'>
          <div>
            <Menu size={50} className='p-2 hover:scale-110 transition duration-300 hover:underline cursor-pointer ' onClick={handleMenuToggle} />

            {openMenu && (
              <div className='fixed w-full h-full top-0 left-0 z-20 bg-[#0000005f]'>
                <div className='fixed h-full top-0 left-0 z-30 w-[18%] bg-white'>
                  <div className='w-full justify-between flex p-5'>
                    <div>
                      <RxCross1 size={30} onClick={handleMenuToggle} className='cursor-pointer' />
                    </div>
                  </div>
                  {/* Search bar */}
                  <div className='my-8 w-10/12 m-auto h-[40px]'>
                    <div className="relative flex">
                      <input
                        type='text'
                        placeholder='Search items...'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className='h-[40px] w-full  px-2 border-2 border-[#f63b60] rounded-md'
                      />
                      {searchTerm ? (
                        <RxCross1
                          size={20}
                          className='absolute right-2 top-2 cursor-pointer'
                          onClick={handleSearchClear}
                        />
                      ) : (
                        <AiOutlineSearch size={25} className='absolute right-2 top-2 cursor-pointer' />
                      )}
                      {searchResultsVisible && (
                    <div className="absolute bg-white shadow w-full z-10 left-0 mt-10 overflow-y-auto h-[400px]">
                      {searchData && searchData.map((item, index) => (
                        <Link to={`/product/${item.name}`} key={item._id} className="block">
                          <div className="flex items-center p-2 border-b border-gray-200">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-auto h-20 object-contain mr-4"
                            />
                            <div className="flex flex-col">
                              <h1 className="text-sm font-medium">{item.name}</h1>
                              <h4 className="text-black font-semibold text-sm">${item.originalPrice}</h4>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                    </div>
                  </div>
                  {/* Links */}
                  <div className='justify-center'>
                    <div className='flex flex-col space-y-1 items-start mt-5'>
                      <Link onClick={handleMenuToggle} to="/" className='text-md font-medium py-1 px-5 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                        <Warehouse className='mr-2' size={20} />
                        Home
                      </Link>
                      <Link onClick={handleMenuToggle} to="/products" className='text-md font-medium py-1 px-5 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                        <Briefcase className='mr-2' size={20} />
                        Products
                      </Link>
                      <Link onClick={handleMenuToggle} to="/all-shops" className='text-md font-medium px-5 py-1 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                        <Store className='mr-2' size={20} />
                        Shops
                      </Link>
                      <Link onClick={handleMenuToggle} to="/model" className='text-md font-medium px-5 py-1 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                        <Rotate3D className='mr-2' size={20} />
                        3D Model
                      </Link>
                      <Link onClick={handleMenuToggle} to="/events" className='text-md font-medium py-1 px-5 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                        <Calendar className='mr-2' size={20} />
                        Events
                      </Link>
                      <Link onClick={handleMenuToggle} to="/faq" className='text-md font-medium py-1 px-5 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                        <HelpCircle className='mr-2' size={20} />
                        FAQ
                      </Link>
                      <Link onClick={handleMenuToggle} to="/profile" className='text-md font-medium py-1 px-5 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                        <User className='mr-2' size={20} />
                        Profile
                      </Link>
                    </div>
                  </div>


                  <div className='flex justify-center mt-14 px-5'>
                    <Link onClick={handleMenuToggle} to="/shop-login" className={"w-full bg-[#f63b60] text-white h-[45px] flex items-center justify-center rounded-xl cursor-pointer"}>
                      <h1 className='text-md font-medium  transform hover:scale-110 transition-transform duration-300 hover:underline'>
                        Become a Seller
                      </h1>
                    </Link>
                  </div>
                  <div className='w-full flex justify-center items-center'>
                    <div className='w-full py-5 px-5 '>
                      {!isAuthenticated ? (
                        <>
                          <div className="items-center">
                            <Link onClick={handleMenuToggle} to="/login" className={` bg-black text-white h-[45px] 
                              my-3 flex items-center justify-center rounded-xl cursor-pointer text-md font-medium `}>
                              <h4 className='transform hover:scale-110 transition-transform duration-300 hover:underline text-white'>
                                Login
                              </h4>
                            </Link>
                            <Link onClick={handleMenuToggle} to="/sign-up" className={` bg-black text-white h-[45px] 
                              my-3 flex items-center justify-center rounded-xl cursor-pointer  text-md font-medium `}>
                              <h4 className='transform hover:scale-110 transition-transform duration-300 hover:underline text-white'>
                                Signup
                              </h4>
                            </Link>
                          </div>

                        </>
                      ) : ( // Render "Log Out" when logged in
                        <div className={` bg-black text-white h-[45px] 
                       flex items-center justify-center rounded-xl cursor-pointer w-full mt-20 `}
                          onClick={() =>
                            logoutHandler()
                          }
                        >
                          <span className='text-md font-medium transform hover:scale-110 
                        transition-transform duration-300 hover:underline'>Log Out</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className='flex items-center'>
            <Link to="/" className='text-4xl text-[#f63b60] font-extrabold
             hover:scale-110 transition duration-300 hover:underline'>
              TheBreadWay
            </Link>
          </div>

          <div className='flex items-center justify-center'>
            <div onClick={() => setOpenCart(true)} className='text-black mx-2 transform hover:scale-110 transition duration-300 hover:underline cursor-pointer'>
              <BaggageClaim size={35} className='mr-2' />
              <span className='absolute right-0 top-0 rounded-full text-white text-sm font-semibold bg-[#f63b60] w-5 h-5 flex items-center justify-center'>
                <h5>{cart && cart.length}</h5>
              </span>
            </div>
            <div>
              {isAuthenticated ? (
                <Link to="/profile" className='text-black mx-2 '>
                  <img src={`${backend_url}${user.avatar}`} alt=''
                   className='h-14 w-14 object-cover rounded-full border border-black/25
                    hover:scale-110 transition duration-300 hover:underline' />
                </Link>
              ) : (
                <Link to="/login" className='text-black mx-2 mt-2 transform hover:scale-110 transition duration-300 hover:underline'>
                  <User size={35} />
                </Link>
              )}
            </div>
          </div>
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
        </div>
      </div>

      {/* Small screens */}
      <div className='w-full h-[50px] fixed bg-white z-10 top-0 left-0 shadow-sm sm:hidden'>
        <div className='w-full flex items-center justify-between'>
          <div>
            <Menu size={45} className='p-2 mt-1 ' onClick={handleMenuToggle} />
          </div>
          <div>
            <Link to="/">
              <h1 className='text-[#f63b60] text-2xl font-extrabold'>The Bread Way</h1>
            </Link>
          </div>
          <div>
            <div onClick={() => setOpenCart(true)} className='text-black mx-2 mt-2 transform hover:scale-110 transition duration-300 hover:underline cursor-pointer'>
              <BaggageClaim size={30} />
              <span className='absolute right-0 top-0 rounded-full text-white text-sm bg-green-600 w-4 h-4 flex items-center justify-center'>
                {cart && cart.length}
              </span>

            </div>
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          </div>
        </div>
        {openMenu && (
          <div className='fixed w-full h-full top-0 left-0 z-20 bg-[#0000005f]'>
            <div className='fixed h-full top-0 left-0 z-30 w-[60%] bg-white'>
              <div className='w-full justify-between flex p-3'>
                <div>
                  <RxCross1 size={30} onClick={handleMenuToggle} />
                </div>
                {isAuthenticated ? (
                  <Link onClick={handleMenuToggle} to="/profile" className='text-black mx-2 transform hover:scale-110 transition duration-300 hover:underline'>
                    <img src={`${backend_url}${user.avatar}`} alt='' className='h-10 rounded-full' />
                  </Link>
                ) : (
                  <Link to="/login" className='text-black mx-2 mt-2 transform hover:scale-110 transition duration-300 hover:underline'>
                    <User onClick={handleMenuToggle} size={25} />
                  </Link>
                )}
              </div>
              {/* Search bar */}
              <div className='my-8 w-10/12 m-auto h-[40px]'>
                <div className="relative flex">
                  <input
                    type='text'
                    placeholder='Search items...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className='h-[40px] w-full  px-2 border-2 border-[#f63b60] rounded-md'
                  />
                  {searchTerm ? (
                    <RxCross1
                      size={20}
                      className='absolute right-2 top-2 cursor-pointer'
                      onClick={handleSearchClear}
                    />
                  ) : (
                    <AiOutlineSearch size={25} className='absolute right-2 top-2 cursor-pointer' />
                  )}
                  {searchResultsVisible && (
                    <div className="absolute bg-white shadow w-full z-10 left-0 mt-10 overflow-y-auto h-[400px]">
                      {searchData && searchData.map((item, index) => (
                        <Link to={`/product/${item.name}`} key={item._id} className="block">
                          <div className="flex items-center p-2 border-b border-gray-200">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-auto h-20 object-contain mr-4"
                            />
                            <div className="flex flex-col">
                              <h1 className="text-sm font-medium">{item.name}</h1>
                              <h4 className="text-black font-semibold text-sm">${item.originalPrice}</h4>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                </div>
              </div>
              {/* Links */}

              <div className='justify-center'>
                <div className='flex flex-col space-y-1 items-start mt-5'>
                  <Link onClick={handleMenuToggle} to="/" className='text-md font-medium py-1 px-5 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                    <Warehouse className='mr-2' size={20} />
                    Home
                  </Link>
                  <Link onClick={handleMenuToggle} to="/products" className='text-md font-medium py-1 px-5 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                    <Briefcase className='mr-2' size={20} />
                    Products
                  </Link>
                  <Link onClick={handleMenuToggle} to="/all-shops" className='text-md font-medium px-5 py-1 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                    <Store className='mr-2' size={20} />
                    Shops
                  </Link>
                  <Link onClick={handleMenuToggle} to="/model" className='text-md font-medium px-5 py-1 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                    <Rotate3D className='mr-2' size={20} />
                    3D Model
                  </Link>
                  <Link onClick={handleMenuToggle} to="/events" className='text-md font-medium py-1 px-5 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                    <Calendar className='mr-2' size={20} />
                    Events
                  </Link>
                  <Link onClick={handleMenuToggle} to="/faq" className='text-md font-medium py-1 px-5 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                    <HelpCircle className='mr-2' size={20} />
                    FAQ
                  </Link>
                  <Link onClick={handleMenuToggle} to="/profile" className='text-md font-medium py-1 px-5 transform hover:scale-110 transition-transform duration-300 hover:underline flex items-center'>
                    <User className='mr-2' size={20} />
                    Profile
                  </Link>
                </div>
              </div>


              <div className='flex justify-center mt-10 px-3 '>
                <Link onClick={handleMenuToggle} to="/shop-login"
                  className={"bg-[#f63b60] w-full text-white h-[45px] flex items-center justify-center rounded-xl cursor-pointer"}>
                  <h1 className='text-md font-medium transform hover:scale-110 transition-transform duration-300 hover:underline'>
                    Become a Seller
                  </h1>
                </Link>
              </div>
              <div className='w-full flex justify-center items-center'>
                <div className='w-full py-5 px-3 '>
                  {!isAuthenticated ? (
                    <>
                      <div className="items-center">
                        <Link onClick={handleMenuToggle} to="/login" className={` bg-black text-white h-[45px] 
                              my-3 flex items-center justify-center rounded-xl cursor-pointer text-md font-medium`}>
                          <h4 className='transform hover:scale-110 transition-transform duration-300 hover:underline text-white'>
                            Login
                          </h4>
                        </Link>
                        <Link onClick={handleMenuToggle} to="/sign-up" className={` bg-black text-white h-[45px] 
                              my-3 flex items-center justify-center rounded-xl cursor-pointer text-md font-medium`}>
                          <h4 className='transform hover:scale-110 transition-transform duration-300 hover:underline text-white'>
                            Signup
                          </h4>
                        </Link>
                      </div>

                    </>
                  ) : ( // Render "Log Out" when logged in
                    <div className={` bg-black text-white h-[45px] 
                       flex items-center justify-center rounded-xl cursor-pointer w-full mt-20 `}
                      onClick={() =>
                        logoutHandler()
                      }
                    >
                      <span className='text-sm font-medium transform hover:scale-110 
                        transition-transform duration-300 hover:underline'>Log Out</span>
                    </div>
                  )}
                </div>
              </div>


            </div>
          </div>
        )}
      </div>
      <div className='sm:mt-16'>

      </div>
    </>
  );
}

export default Navbar;
