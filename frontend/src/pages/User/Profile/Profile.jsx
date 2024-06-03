import React from 'react'


import ProfilePage from './Pages/ProfilePage'
import Navbar from '../../../components/User/Navbar'
import Footer from '../../../components/User/Footer'
import ProfileSidebar from '../../../components/User/Profile/ProfileSidebar'


const Profile = () => {

  return (
    <>
      <Navbar />
      <div className='mx-auto sm:w-11/12 w-full flex  mb-16'>
        <div className='w-[50px]  sm:w-[330px] py-10 mx-auto items-center'>
          <ProfileSidebar active={1}  />
        </div>
        <div className='w-full sm:px-10 sm:mt-0 py-5  mt-5 px-1'>
          <ProfilePage />
        </div>
       
      </div>
      <Footer />
    </>
  )
}

export default Profile
