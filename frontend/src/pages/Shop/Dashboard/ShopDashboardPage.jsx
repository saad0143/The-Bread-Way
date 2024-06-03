import React from 'react'
import ShopNavbar from '../../../components/Shop/ShopNavbar'
import DashboardSidebar from './DashboardSidebar'
import ShopDashboard from './ShopDashboard'

const ShopDashboardPage = () => {
  return (
    <div>
      <ShopNavbar />
      <div className='sm:mx-auto sm:w-11/12 flex py-5'>
        <div className='w-[50px]  sm:w-[330px] mx-auto items-center'>
          <DashboardSidebar active={1} />

        </div>
        <div className='w-[85%] items-center flex-col justify-center px-1'>
          <ShopDashboard/>
        </div>
      </div>
    </div>
  )
}

export default ShopDashboardPage
