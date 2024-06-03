import React from 'react'
import DashboardSidebar from '../DashboardSidebar'
import ShopNavbar from '../../../../components/Shop/ShopNavbar'
import Setting from './Setting'


const ShopSettingPage = () => {
  return (
    <div>
      <ShopNavbar />
      <div className='sm:mx-auto sm:w-11/12 flex py-5'>
        <div className='w-[50px]  sm:w-[330px] mx-auto items-center'>
          <DashboardSidebar active={10} />

        </div>
        <div className='w-[85%] sm:px-10  px-1'>
         <Setting />
        </div>

      </div>
    </div>
  )
}

export default ShopSettingPage;
