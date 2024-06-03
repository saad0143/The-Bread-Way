import React from 'react'
import DashboardSidebar from '../DashboardSidebar'
import ShopInbox from './ShopInbox'
import ShopNavbar from '../../../../components/Shop/ShopNavbar'
const ShopInboxPage = () => {
  return (
    <div>
      <ShopNavbar />
      <div className='sm:mx-auto sm:w-11/12 flex py-5'>
        <div className='w-[50px]  sm:w-[330px] mx-auto items-center'>
          <DashboardSidebar active={8} />
        </div>
        <div className='w-[85%] sm:px-10 px-1'>
         <ShopInbox />
        </div>

      </div>
    </div>
  )
}

export default ShopInboxPage;
