import React from 'react'
import ShopOrder from './ShopOrder'
import ShopNavbar from '../../../../components/Shop/ShopNavbar'
import DashboardSidebar from '../DashboardSidebar'

const ShopOrdersPage = () => {
  return (
    <div>
      <ShopNavbar />
      <div className='sm:mx-auto sm:w-11/12 flex py-5'>
        <div className='w-[50px]  sm:w-[330px] mx-auto items-center'>
          <DashboardSidebar active={3} />

        </div>
        <div className='w-[85%] sm:px-10 px-1'>
        <ShopOrder />
        </div>

      </div>
    </div>
  )
}

export default ShopOrdersPage
