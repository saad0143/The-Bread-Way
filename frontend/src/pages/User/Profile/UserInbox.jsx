import React from 'react'

import Navbar from '../../../components/User/Navbar'
import ProfileSidebar from '../../../components/User/Profile/ProfileSidebar'
import UserInboxPage from './Pages/UserInboxPage'


const Inbox = () => {
  return (
    <div>
      <Navbar />
      <div className='mx-auto sm:w-11/12 w-full flex py-10 sm:py-10 mb-16'>
        <div className='w-[50px]  sm:w-[330px] mx-auto items-center'>
          <ProfileSidebar active={3} />

        </div>
        <div className='w-full flex justify-center px-1 '>
        <UserInboxPage />
        </div>

      </div>
    </div>
  )
}

export default Inbox
