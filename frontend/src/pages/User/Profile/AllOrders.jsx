import React from 'react'
import AllOrderPage from './Pages/AllOrderPage'
import Navbar from '../../../components/User/Navbar'
import ProfileSidebar from '../../../components/User/Profile/ProfileSidebar'
import Footer from '../../../components/User/Footer'


const AllOrders = () => {

  return (
    <>
      <Navbar />
      <div className='sm:mx-auto w-full sm:w-11/12 flex py-10 sm:py-10'>
        <div className='w-[50px]  sm:w-[330px]'>
          <ProfileSidebar active={4} />
        </div>
        <div className='w-[85%] sm:w-full sm:px-10 sm:mt-0 px-1'>
          <AllOrderPage />
        </div>

      </div>
      <Footer />
    </>
  )
}

export default AllOrders
