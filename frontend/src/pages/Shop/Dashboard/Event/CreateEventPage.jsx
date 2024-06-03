import React from 'react'

import CreateEvent from '../Event/CreateEvent'
import ShopNavbar from '../../../../components/Shop/ShopNavbar'
import DashboardSidebar from '../DashboardSidebar'


const CreateEventPage = () => {
  return (
    <div>
      <ShopNavbar />
      <div className='sm:mx-auto sm:w-11/12 w-full flex py-5'>
        <div className='w-[50px]  sm:w-[330px] mx-auto items-center'>
          <DashboardSidebar active={7} />

        </div>
        <div className='w-[85%] sm:px-10 px-1'>
          <CreateEvent />
        </div>

      </div>
    </div>
  )
}

export default CreateEventPage
