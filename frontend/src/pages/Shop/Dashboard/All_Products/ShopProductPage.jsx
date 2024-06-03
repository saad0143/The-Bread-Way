import React from 'react'



import ShopAllProducts from '../All_Products/shopAllProducts'
import ShopNavbar from '../../../../components/Shop/ShopNavbar'
import DashboardSidebar from '../DashboardSidebar'

const ShopProductPage = () => {
  return (
    <div>
      <ShopNavbar />
      <div className='sm:mx-auto sm:w-11/12 flex py-5'>
        <div className='w-[50px]  sm:w-[330px] mx-auto items-center'>
          <DashboardSidebar active={4} />

        </div>
        <div className='w-[85%] sm:px-10 px-1'>
          <ShopAllProducts />
        </div>

      </div>
    </div>
  )
}

export default ShopProductPage
