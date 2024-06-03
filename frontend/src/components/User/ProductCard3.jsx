import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Eye, Trash2 } from 'lucide-react';
import { backend_url } from '../../server';
import { deleteProduct } from '../../redux/actions/product';
import ProductDetailCard from './ProductDetailCard';
import ProductDetailCard2 from './ProductDetailCard2';

const ProductCard3 = ({ data }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    if (!data) {
        return null;
    }

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
        window.location.reload(true);
    };

    const imageUrl = `${backend_url}${data.images[0]}`;

    return (
        <div className="w-full p-1">
        <div className="sm:w-auto w-[155px] h-[320px] sm:h-[300px] rounded-lg shadow-md relative cursor-pointer border
          border-black/20 hover:scale-105 transform transition-transform duration-300 ease-in-out">
                <Link to={`/product/3/${data._id}`}>
                    <img src={imageUrl} alt='' className="sm:w-full w-full h-[150px] sm:h-[160px] object-cover" />
                    <h5 className="font-extrabold text-sm px-1 sm:px-3 mt-2">
                        <div  className="text-[#f63b60] underline">
                            {data.shop && data.shop.shopName}
                        </div>
                    </h5>
                    <h4 className=" px-1 sm:px-3 text-sm sm:text-md h-10">
                        <Link to={`/product/${data._id}`} className="text-black">
                        {data.name}
                        </Link>
                    </h4>
                    <div className="sm:flex justify-between sm:mt-0 mt-2">
                        <h5 className="font-bold text-md px-2 sm:px-3">Rs: {data.originalPrice}</h5>
                        <h5 className="font-bold text-md ml-2 sm:px-5 text-green-600">
                            {data.sold_out} sold
                        </h5>
                    </div>
                </Link>
                <div className="p-2 flex justify-end sm:mt-2">
                    <Eye
                        size={20}
                        className="cursor-pointer ml-2 mx-1"
                        onClick={() => setOpen(!open)}
                        color="#333"
                        title="Quick View"
                    />
                    <div className="text-right mx-1">
                        <button onClick={() => handleDelete(data._id)}>
                            <Trash2 size={20} className="cursor-pointer text-red-600" title="Delete" />
                        </button>
                    </div>

                </div>

            </div>
            {open ? <ProductDetailCard2 open={open} setOpen={setOpen} data={data} /> : null}
        </div>
    );
};

export default ProductCard3;
