import { Gift, MessageSquare, Package, ShoppingBag } from 'lucide-react'
import React from 'react'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { backend_url } from '../../server'
import { useSelector } from 'react-redux'

const ShopNavbar = () => {
    const { seller } = useSelector((state) => state.seller);
    return (
        <div>
            <div className='flex justify-between items-center h-20 bg-gray-100 sm:px-6 shadow-md'>
                <div className='flex items-center'>
                    <Link to="/dashboard" className='sm:text-4xl text-3xl px-2 text-[#f63b60] font-extrabold hover:scale-110 transition duration-300 hover:underline'>TheBreadWay</Link>
                </div>

                <div className='flex items-center'>
                    <div className='flex item-center mr-4'>

                        <Link to={`/shop/${seller?._id}`} className='flex '>
                            <div className='text-2xl font-bold hover:scale-110 transition duration-300 hover:underline px-5 mt-2 sm:block hidden '>
                                {seller.shopName}
                            </div>
                            <img
                                src={`${backend_url}${seller?.avatar}`}
                                alt="" className='w-[50px] h-[50px] border-2 border-black rounded-full object-cover' />
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ShopNavbar
