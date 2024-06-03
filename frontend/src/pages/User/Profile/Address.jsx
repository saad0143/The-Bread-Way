import React from 'react'
import AddressPage from './Pages/AddressPage';
import Navbar from '../../../components/User/Navbar';
import ProfileSidebar from '../../../components/User/Profile/ProfileSidebar';
import Footer from '../../../components/User/Footer';


const Address = () => {

  return (
    <>
      <Navbar />
      <div className='mx-auto sm:w-11/12 w-full flex py-10 sm:py-10 mb-16'>
        <div className='w-[50px]  sm:w-[330px] mx-auto items-center'>
          <ProfileSidebar active={6}  />
        </div>
        <div className='w-full sm:px-10 sm:mt-0  mt-5 '>
          <AddressPage />
        </div>
       
      </div>
      <Footer />
    </>
  )
}

export default Address
