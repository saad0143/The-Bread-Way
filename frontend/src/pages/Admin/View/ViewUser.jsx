import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { backend_url, server } from '../../../server';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import Loader from '../../../components/AnimationsPages/Loader';
import Navbar from '../Navbar';

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [expandedAddressIndex, setExpandedAddressIndex] = useState(null);

  useEffect(() => {
    axios.get(`${server}/user/user-info/${id}`)
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, [id]);

  const handleDeleteUser = () => {
    console.log("Deleting user with ID:", id);
    setIsLoading(true);
    axios.delete(`/api/admin/users/${id}`)
      .then(response => {
        setIsLoading(false);
        console.log('User deleted successfully:', response.data);
        navigate('/admin/homepage');
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error deleting user:', error);
      });
  };

  if (!user) {
    return <div>
      <Navbar />
      <Loader />
    </div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 ">
        <div className='max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden'>
          <div className='bg-gray-200 h-72 flex items-center justify-center'>
            <img
              src={`${backend_url}${user.avatar}`}
              alt="User Avatar"
              className='h-64 w-64 rounded-full object-cover shadow-lg'
            />
          </div>
          <div className='p-6'>
            <div className=' flex justify-between'>
              <h3 className='text-center text-3xl font-semibold'>{user.name}</h3>
              <button
                onClick={handleDeleteUser}
                disabled={isLoading}
                className="px-4 py-2  bg-red-500 hover:bg-red-600  text-white
                 font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                {isLoading ? 'Deleting...' : 'Delete User'}
              </button>

            </div>

            <div className='grid sm:grid-cols-2 grid-cols-1 gap-4 mt-10'>
              <div>
                <h5 className='text-lg font-semibold'>Email:</h5>
                <p className='text-gray-700'>{user.email}</p>
              </div>
              <div>
                <h5 className='text-lg font-semibold'>Phone Number:</h5>
                <p className='text-gray-700'>+92 {user.phoneNumber}</p>
              </div>
              <div>
                <h5 className='text-lg font-semibold'>User ID</h5>
                <p className='text-gray-700 '>{user._id}</p>
              </div>
              <div>
                <h5 className='text-lg font-semibold'>Joined on:</h5>
                <p className='text-gray-700'>
                  {user.createdAt && user.createdAt.slice(0, 10)}
                </p>
              </div>
            </div>
            <div className='mt-6'>
              <h5 className='text-lg font-semibold'>Addresses:</h5>
              {user.addresses.map((address, index) => (
                <div key={index} className='mt-2'>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => setExpandedAddressIndex(expandedAddressIndex === index ? null : index)}
                  >
                    {expandedAddressIndex === index ? (
                      <BsChevronDown className="h-4 w-4 mr-1 text-gray-500" />
                    ) : (
                      <BsChevronRight className="h-4 w-4 mr-1 text-gray-500" />
                    )}
                    <h6 className='font-semibold'>{address.addressType}</h6>
                  </div>
                  {expandedAddressIndex === index && (
                    <div>
                      <p className='text-gray-700'>{address.address}</p>
                      <p className='text-gray-700'>{address.city}, {address.country}</p>
                      <p className='text-gray-700'>Zip Code: {address.zipCode}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ViewUser;
