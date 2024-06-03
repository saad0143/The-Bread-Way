import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import ShopInfo from '../../Shop/Profile/ShopInfo';
import ShopProfileData from '../../Shop/Profile/ShopProfileData';
import { toast } from 'react-toastify';
import Admin_ShopInfo from '../Profile/Admin_ShopInfo';
import Admin_ShopProfileData from '../Profile/Admin_ShopProfileData';

const ViewShop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteShop = () => {
    console.log("Deleting shop with ID:", id);
    setIsLoading(true);
    axios.delete(`/api/admin/shops/${id}`)
      .then(response => {
        setIsLoading(false);
        console.log('Shop deleted successfully:', response.data);
        toast.success("Shop Deleted");
        sendEmailNotification();
        toast.success("Email Sent to Shop Owner");
        navigate('/admin/homepage');
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error deleting shop:', error);
      });
  };

  const sendEmailNotification = () => {
    axios.post('/api/send-email-notification', { shopId: id })
      .then(response => {
        console.log('Email notification sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending email notification:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className='w-11/12 mx-auto'>
        <div className='w-full sm:flex pb-5 justify-between sm:mt-0 mt-14'>
          <div className='w-full sm:w-[20%] rounded-md shadow-md border sm:h-auto'>
            <Admin_ShopInfo  />
            <div className='w-full flex justify-center py-5'>
              <button
                onClick={() => setShowConfirmation(true)}
                disabled={isLoading}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                {isLoading ? 'Deleting...' : 'Delete Shop'}
              </button>
            </div>
          </div>
          <div className="sm:w-full w-full rounded-md sm:mt-0 mt-8">
            <Admin_ShopProfileData  />
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20  bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this shop?</p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowConfirmation(false)}
                className="mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteShop}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewShop;
