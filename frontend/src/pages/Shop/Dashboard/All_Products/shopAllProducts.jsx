import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Trash2} from 'lucide-react';
import { deleteProduct, getAllProductsShop } from '../../../../redux/actions/product';
import styles from '../../../../style/style';

const ShopAllProducts = () => {
    const { products, isLoading } = useSelector((state) => state.product);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsShop(seller._id));
    }, [dispatch, seller]);


    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
        window.location.reload(true);
    }



    return (
        <div className="w-full mb-20  ">
            <div className={`${styles.heading}`}>
                <h1>All Products</h1>
            </div>
            <div className="table-container overflow-x-auto h-[450px] overflow-y-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 text-left">Product ID</th>
                            <th className="p-2 text-left">Product Name</th>
                            <th className="p-2 text-center">Price (PKR)</th>
                            <th className="p-2 text-center">Stock</th>
                            <th className="p-2 text-center">Sold Out</th>
                            
                            <th className="p-2 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((product, index) => (
                            <tr key={product._id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                <td className="p-2 text-left">{product._id}</td>
                                <td className="p-2 text-left">{product.name}</td>
                                <td className="p-2 text-center">{product.originalPrice}</td>
                                <td className="p-2 text-center">{product.stock}</td>
                                <td className="p-2 text-center">{product.sold_out}</td>
                                <td className="p-2 text-center">
                                    <button className="" onClick={() => handleDelete(product._id)}>
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

export default ShopAllProducts;
