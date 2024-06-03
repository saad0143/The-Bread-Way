import React from 'react'

import ChangePasswordPage from './Pages/ChangePasswordPage';
import Navbar from '../../../components/User/Navbar';
import ProfileSidebar from '../../../components/User/Profile/ProfileSidebar';
import Footer from '../../../components/User/Footer';



const ChangePassword = () => {
  
  return (
    <>
      <Navbar />
      <div className='mx-auto sm:w-11/12 w-full flex py-10 sm:py-10 mb-16'>
        <div className='w-[50px]  sm:w-[330px] mx-auto items-center'>
          <ProfileSidebar active={5} />
        </div>
        <div className='w-full sm:px-10 sm:mt-0  mt-5 px-1'>
          <ChangePasswordPage />
        </div>
       
      </div>
      <Footer />
    </>
  )
}

export default ChangePassword
