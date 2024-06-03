import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Eye, Trash2, X } from 'lucide-react';
import { deleteEvent, getAllEventShop } from '../../../../redux/actions/event';
import styles from '../../../../style/style';

const AllEvents = () => {
    const { events, isLoading } = useSelector((state) => state.event);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventShop(seller._id));
    }, [dispatch, seller]);


    const handleDelete = (id) => {
        dispatch(deleteEvent(id))
        window.location.reload(true);
    }



    return (
        <div className="w-full h-full mb-20">
            <div className={`${styles.heading}`}>
                <h1>All Events</h1>
            </div>
            <div className="table-container overflow-x-auto h-[450px] overflow-y-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 text-left">Product ID</th>
                            <th className="p-2 text-left">Product Name</th>
                            <th className="p-2 text-center">Price (PKR)</th>
                            <th className="p-2 text-center">Discount Price (PKR)</th>
                            <th className="p-2 text-center">Stock</th>
                            <th className="p-2 text-center">Sold Out</th>
                            <th className="p-2 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {events && events.map((event, index) => (
                            <tr key={event._id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                <td className="p-2 text-left">{event._id}</td>
                                <td className="p-2 text-left">{event.name}</td>
                                <td className="p-2 text-center">{event.originalPrice}</td>
                                <td className="p-2 text-center">{event.discountPrice}</td>
                                <td className="p-2 text-center">{event.stock}</td>
                                <td className="p-2 text-center">{event.sold_out}</td>    
                                <td className="p-2 text-center">
                                    <button className="" onClick={() => handleDelete(event._id)}>
                                        <Trash2 size={20} className="cursor-pointer text-red-600" title="Delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllEvents;
