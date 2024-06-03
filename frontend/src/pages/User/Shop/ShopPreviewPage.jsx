import React from 'react'
import Navbar from '../../../components/User/Navbar'
import ShopInfo from '../../Shop/Profile/ShopInfo'
import ShopProfileData from '../../Shop/Profile/ShopProfileData'

const ShopPreviewPage = () => {
  return (
    <div>
      <Navbar />
      <div className=' w-11/12 mx-auto '>
        <div className='w-full sm:flex py-5 justify-between sm:mt-0 mt-14'>
          <div className='w-full sm:w-[20%] rounded-md shadow-md border sm:h-[550px] mt-5'>
             <ShopInfo isOwner={false} /> 
          </div>
          <div className="sm:w-full w-full rounded-md sm:mt-0 mt-8">
            <ShopProfileData isOwner={false} /> 
          </div>

        </div>

      </div>
    </div>
  )
}

export default ShopPreviewPage
