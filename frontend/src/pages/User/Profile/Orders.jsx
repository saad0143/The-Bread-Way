import React from 'react'

import Navbar from '../../../components/User/Navbar'
import ProfileSidebar from '../../../components/User/Profile/ProfileSidebar'
import Footer from '../../../components/User/Footer'
import OrderPage from './Pages/OrdersPage'



const AllOrders = () => {
    
  return (
    <>
      <Navbar />
      <div className='mx-auto sm:w-11/12 flex py-10 sm:py-10 mb-16'>
        <div className='w-[50px]  sm:w-[330px]'>
          <ProfileSidebar active={2}  />
        </div>
        <div className='w-[85%] sm:w-full sm:px-10 sm:mt-0  mt-5 px-1'>
          <OrderPage />
        </div>
       
      </div>
      <Footer />
    </>
  )
}

export default AllOrders
