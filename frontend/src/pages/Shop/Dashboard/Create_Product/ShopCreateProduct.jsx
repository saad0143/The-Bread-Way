import React from 'react'

import CreateProduct from './CreateProduct'
import ShopNavbar from '../../../../components/Shop/ShopNavbar'
import DashboardSidebar from '../DashboardSidebar'

const CreateProductPage = () => {
  return (
    <div>
      <ShopNavbar />
      <div className='sm:mx-auto sm:w-11/12 flex py-5'>
        <div className='w-[50px]  sm:w-[330px] mx-auto items-center'>
          <DashboardSidebar active={5} />

        </div>
        <div className='w-[85%] sm:px-10 px-1 flex justify-center'>
          <CreateProduct />
        </div>

      </div>
    </div>
  )
}

export default CreateProductPage
