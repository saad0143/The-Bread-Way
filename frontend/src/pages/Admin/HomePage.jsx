import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { backend_url } from '../../server';
import { Users } from 'lucide-react';
import Loader from '../../components/AnimationsPages/Loader';
import { RiStore3Line } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import styles from '../../style/style';

const HomePage = () => {
  const [shops, setShops] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch shops
    axios.get('/api/admin/shops')
      .then(response => {
        setShops(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching shops:', error);
      })
      .finally(() => {
        setIsLoading(false); // Update loading state after fetching shops
      });

    // Fetch users
    axios.get('/api/admin/users')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      })
      .finally(() => {
        setIsLoading(false); // Update loading state after fetching users
      });
  }, []);

  const handleCallClick = (shop) => {
    window.location.href = `tel:+92${shop.phoneNumber}`;
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <div className="container mx-auto">
            <div className='sm:px-20'>
              <div className='w-full'>
                <h1 className="text-4xl font-bold mb-6 flex justify-center">Admin Dashboard</h1>
              </div>

              <div className="sm:flex  justify-center mb-5 sm:gap-14 grid grid-cols-1 px-20 sm:px-0">
                <div className="w-full h-28 sm:w-48  bg-[#58afdb] text-white shadow p-4 rounded sm:mt-0 mt-2">
                  <div className="flex items-center">
                    <RiStore3Line size={30} className="mr-2" />
                    <div>
                      <h3 className="text-lg font-bold">Total Shops</h3>
                      <div className='text-xl font-medium mt-2 flex justify-center'>
                        {shops.length}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-28 sm:w-48  bg-[#58afdb] text-white shadow p-4 rounded sm:mt-0 mt-2">
                  <div className="flex items-center">
                    <Users size={30} className="mr-2" />
                    <div>
                      <h3 className="text-lg font-bold">Total Users</h3>
                      <div className='text-xl font-medium mt-2 flex justify-center'>{users.length}</div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-28 sm:w-48  bg-[#58afdb] text-white shadow p-4 rounded sm:mt-0 mt-2">
                  <div className="flex items-center">
                    <GiMoneyStack size={30} className="mr-2" />
                    <div>
                      <h3 className="text-lg font-bold">Total Revenue</h3>
                      <div className='text-xl font-medium mt-2 flex justify-center'>PKR: {shops.length * 5000} </div>
                    </div>
                  </div>
                </div>
              </div>

              <section className="mb-5 px-5">
                <h2 className={`${styles.heading}`}>Registered Shops</h2>
                <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-7 mb-10 ">
                  {Array.isArray(shops) && shops.map(shop => (
                    <div key={shop._id}>
                      <Link to={`/view/shop/${shop._id}`}>
                        <div className="items-center justify-between rounded-lg">
                          <div className="w-[150px] h-[245px] sm:h-[250px] sm:w-[200px] rounded-lg shadow-md relative cursor-pointer border border-black/20 hover:scale-105 transform transition-transform duration-300 ease-in-out">
                            <img
                              src={shop.avatar ? `${backend_url}${shop.avatar}` : ''}
                              alt="Shop Avatar"
                              className="sm:w-full w-[150px] h-[150px] sm:h-[120px] object-cover"
                            />
                            <h5 className="font-extrabold text-md text-gray-800">
                              <div className="text-[#f63b60] hover:underline px-2 py-2">
                                {shop.shopName}
                              </div>
                            </h5>
                            <div className='px-2 text-md font-semibold'>
                              {shop.address}
                            </div>
                            <div className='flex items-end justify-end px-3 text-md font-semibold'>
                              <span className="cursor-pointer text-md text-black hover:underline" onClick={() => handleCallClick(shop)}>
                                +92 {shop.phoneNumber}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* users */}
              <section className='mb-20 px-5'>
                <h2 className={`${styles.heading}`} >Registered Users</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4 mt-5 mb-5">
                  {Array.isArray(users) && users.map(user => (
                    <div key={user._id}>
                      <Link to={`/view/user/${user._id}`} className="text-blue-500 hover:text-blue-700">
                        <div className="w-[150px] h-[245px] sm:h-[250px] sm:w-[200px] rounded-lg shadow-md relative cursor-pointer border border-black/20 hover:scale-105 transform transition-transform duration-300 ease-in-out">
                          <div>
                            <img
                              src={`${backend_url}${user?.avatar}`}
                              alt="User Profile"
                              className="sm:w-full w-[150px] h-[150px] sm:h-[150px] object-cover"
                            />
                          </div>
                          <div className='p-2'>
                            <div className="font-semibold text-xl text-gray-800">{user.name}</div>
                            <div className="text-sm text-gray-500 h-[20px] truncate">{user.email}</div>
                          </div>

                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
