import React from 'react'
import ShopNavbar from '../../../../components/Shop/ShopNavbar'
import DashboardSidebar from '../DashboardSidebar'
import Order from './Order'

const ShopOrdersPage = () => {
  return (
    <div>
      <ShopNavbar />
      <div className='sm:mx-auto sm:w-11/12 flex py-5'>
        <div className='w-[50px]  sm:w-[330px] mx-auto items-center'>
          <DashboardSidebar active={2} />

        </div>
        <div className='w-[85%] sm:px-10  px-1'>
        <Order />
        </div>

      </div>
    </div>
  )
}

export default ShopOrdersPage
