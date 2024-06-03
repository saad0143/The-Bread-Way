import { Box, Cog, FolderPlus, Gift, LayoutDashboard, MessageSquare,
      PackagePlus, Radio, ShoppingBag, Tag } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const DashboardSidebar = ({ active }) => {
    return (
        <>
            <div className='w-full shadow-lg rounded-lg p-4 bg-gray-100 sm:mt-0'>
                <div className={`flex items-center cursor-pointer w-full mb-6 ${active === 1 ? 'text-red-500' : ''} sm:flex`}>
                    <Link to="/dashboard" className='w-full flex items-center' >
                        <LayoutDashboard size={20} />
                        <h5 className={`sm:block hidden pl-2 text-md `}>
                            Dashboard
                        </h5>
                    </Link>
                </div>
                <div className={`flex items-center cursor-pointer w-full mb-6 ${active === 2 ? 'text-red-500' : ''} sm:flex`}>
                    <Link to="/dashboard-orders" className='w-full flex items-center' >
                        <Radio   size={20} />
                        <h5 className={`sm:block hidden pl-2 text-md `}>
                            Live Orders
                        </h5>
                    </Link>
                </div>
                <div className={`flex items-center cursor-pointer w-full mb-6 ${active === 3 ? 'text-red-500' : ''} sm:flex`}>
                <Link to="/dashboard-all-orders" className='w-full flex items-center' >
                        <ShoppingBag size={20} />
                        <h5 className={`sm:block hidden pl-2 text-md `}>
                        All Orders
                        </h5>
                    </Link>
                </div>
                <div className={`flex items-center cursor-pointer w-full mb-6 ${active === 4 ? 'text-red-500' : ''} sm:flex`}>
                <Link to="/dashboard-products" className='w-full flex items-center' >
                        <Box size={20} />
                        <h5 className={`sm:block hidden pl-2 text-md`}>
                            All Products
                        </h5>
                    </Link>
                </div>
                <div className={`flex items-center cursor-pointer w-full mb-6 ${active === 5 ? 'text-red-500' : ''} sm:flex`}>
                <Link  to="/dashboard-create-product" className='w-full flex items-center' >
                        <PackagePlus size={20} />
                        <h5 className={`sm:block hidden pl-2 text-md `}>
                        Create Product
                        </h5>
                    </Link>
                </div>
                <div className={`flex items-center cursor-pointer w-full mb-6 ${active === 6 ? 'text-red-500' : ''} sm:flex`}>
                <Link to="/dashboard-events" className='w-full flex items-center' >
                        <Tag size={20} />
                        <h5 className={`sm:block hidden pl-2 text-md `}>
                        All Events
                        </h5>
                    </Link>
                </div>
                <div className={`flex items-center cursor-pointer w-full mb-6 ${active === 7 ? 'text-red-500' : ''}  sm:flex`}>
                    <div>
                    <Link to="/dashboard-create-event" className='w-full flex items-center' >
                            <FolderPlus size={20} />
                            <h5 className={`sm:block hidden pl-2 text-md `}>
                            Create Events
                            </h5>
                        </Link>
                    </div>
                </div>
                <div className={`flex items-center cursor-pointer w-full mb-6 ${active === 8 ? 'text-red-500' : ''}  sm:flex`}>
                    <div>
                    <Link to="/dashboard-inbox"  className='w-full flex items-center' >
                            <MessageSquare size={20} />
                            <h5 className={`sm:block hidden pl-2 text-md `}>
                            Shop inbox
                            </h5>
                        </Link>
                    </div>
                </div>
                <div className={`flex items-center cursor-pointer w-full mb-6 ${active === 9 ? 'text-red-500' : ''}  sm:flex`}>
                    <div>
                    <Link to="/dashboard-coupons" className='w-full flex items-center' >
                            <Gift size={20} />
                            <h5 className={`sm:block hidden pl-2 text-md `}>
                            Discount Codes
                            </h5>
                        </Link>
                    </div>
                </div>
                <div className={`flex items-center cursor-pointer w-full mb-6 ${active === 10 ? 'text-red-500' : ''}  sm:flex`}>
                    <div>
                    <Link to="/dashboard-setting" className='w-full flex items-center' >
                            <Cog size={20} />
                            <h5 className={`sm:block hidden pl-2 text-md `}>
                            Settings
                            </h5>
                        </Link>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default DashboardSidebar
