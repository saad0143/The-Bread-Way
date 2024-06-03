import React from 'react'
import ShopNavbar from '../../../components/Shop/ShopNavbar'
import ShopInfo from './ShopInfo'
import ShopProfileData from './ShopProfileData'

const ShopHomePage = () => {
  return (
    <div>
      <ShopNavbar />
      <div className=' sm:w-11/12 w-full  sm:mx-auto '>
        <div className='w-full sm:flex py-5 justify-between'>
          <div className='sm:w-[20%] w-11/12 mx-auto rounded-md shadow-md border 
           sm:h-[580px] h-[370px] bg-gray-50 sm:sticky sm:top-10 sm:left-0 sm:z-10 sm:mb-0 mb-10'>
            <ShopInfo isOwner={true} />

          </div>
          <div className="sm:w-[80%] w-full rounded-md">
            <ShopProfileData isOwner={true} />
          </div>

        </div>

      </div>
    </div>
  )
}

export default ShopHomePage
