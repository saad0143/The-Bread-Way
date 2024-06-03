import { ImagePlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createEvent } from '../../../../redux/actions/event';


const CreateEvent = () => {
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [stock, setStock] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { seller } = useSelector((state) => state.seller);
    const { success, error } = useSelector((state) => state.event);

    const today = new Date().toISOString().slice(0, 10);
    const minEndDate = startDate
        ? new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10)
        : today;

        useEffect(() => {
            if (error) {
                toast.error(error)
            }
            if (success) {
                toast.success("Event Created Successfully!");
                navigate('/dashboard-events');
                window.location.reload(true);
            }
        }, [dispatch, error, success, navigate])
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            const newForm = new FormData();
            images.forEach((image) => {
                newForm.append('images', image);
            });
    
            newForm.append('name', name);
            newForm.append('description', description);
            newForm.append('category', category);
            newForm.append('tags', tags);
            newForm.append('originalPrice', originalPrice);
            newForm.append('discountPrice', discountPrice);
            newForm.append('stock', stock);
            newForm.append('shopId', seller._id);
            newForm.append('startDate', startDate ? new Date(startDate).toISOString() : null);
            newForm.append('endDate', endDate ? new Date(endDate).toISOString() : null);
    
            dispatch(createEvent(newForm));
        };

    const handleStartDate = (e) => {
        const selectedStartDate = e.target.value;
        setStartDate(selectedStartDate);
    };

    const handleEndDate = (e) => {
        const selectedEndDate = e.target.value;
        setEndDate(selectedEndDate);
    };


    const handleImageChange = (e) => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        setImages((previousImages) => [...previousImages, ...files]);
    };
    return (
        <div className="sm:w-[70%] w-[95%] mx-auto p-6 mb-10 bg-gray-100 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4 items-center flex justify-center">
                Add Event Product
            </h2>
            <form onSubmit={handleSubmit}>
                <div className='sm:flex sm:justify-between mb-2'>
                    <div className="sm:w-[49%]">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Event Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Event Product Name"
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="sm:w-[49%]">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Enter Event Product Category"
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-300"
                        />
                    </div>
                </div>
                <div className="mb-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Event Product Description"
                        className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-300"
                    />
                </div>

                <div className='sm:flex sm:justify-between mb-2'>
                    <div className="sm:w-[49%]">
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-600">
                            Tags
                        </label>
                        <input
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Enter Event Product Tags"
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-300"
                        />
                    </div>
                    <div className="sm:w-[49%]">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-600">
                            Stock
                        </label>
                        <input
                            type="number"
                            id="stock"
                            value={stock}
                            onChange={(e) => {
                                const newValue = parseInt(e.target.value, 10);
                                if (!isNaN(newValue) && newValue >= 0) {
                                    setStock(newValue);
                                } else {
                                    setStock('');
                                }
                            }}
                            placeholder="Enter Event Product Available in Stock"
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-300"
                        />
                    </div>
                </div>
                <div className='sm:flex sm:justify-between mb-2'>
                    <div className="sm:w-[49%]">
                        <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-600">
                            Original Price
                        </label>
                        <input
                            type="number"
                            id="originalPrice"
                            value={originalPrice}
                            onChange={(e) => setOriginalPrice(e.target.value)}
                            placeholder='Enter Product Orignal Price'
                            className="mt-1 p-2 w-full border rounded focus:outline-none  focus:border-blue-300"
                        />
                    </div>
                    <div className="sm:w-[49%]">
                        <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-600">
                            After Discount Price (optional)
                        </label>
                        <input
                            type="number"
                            id="discountPrice"
                            value={discountPrice}
                            onChange={(e) => setDiscountPrice(e.target.value)}
                            placeholder='Enter Product Price After Discount'
                            className="mt-1 p-2 w-full border rounded focus:outline-none  focus:border-blue-300"
                        />
                    </div>
                </div>
                <div className='sm:flex sm:justify-between mb-2'>
                    <div className="sm:w-[49%]">
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">
                            Start Event Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={handleStartDate}
                            min={today}
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="sm:w-[49%]">
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">
                            Finish Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={handleEndDate}
                            min={minEndDate}
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-400"
                        />
                    </div>
                </div>
                <div className="p-4 border rounded-lg shadow-lg mt-5">
                    <label className="text-lg font-semibold text-gray-700 mb-4">
                        Upload Images <span className="text-red-600">*</span>
                    </label>
                    <div className="flex items-center mb-4">
                        <input
                            type="file"
                            name="upload"
                            id="upload"
                            className="hidden"
                            multiple
                            onChange={handleImageChange}
                        />
                        <label htmlFor="upload" className="cursor-pointer">
                            <ImagePlus size={30} className="mr-2 text-blue-500" />
                        </label>
                    </div>
                    {images.length > 0 && (
                        <div className="flex flex-wrap">
                            {images.map((image, index) => (
                                <div key={index} className="p-2 flex">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt=""
                                        className="w-20 h-20 object-cover rounded-lg shadow"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full flex mt-10 justify-center items-center">
                    <button className="bg-blue-500 text-white p-2 rounded hover-bg-blue-600 focus:outline-none">
                        Add Event Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;
