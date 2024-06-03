import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductDetailCard from './ProductDetailCard';
import { Eye } from 'lucide-react';

import { TbShoppingCartPlus } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { addTocart } from '../../redux/actions/cart';
import { backend_url } from '../../server';

const ProductCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((item) => item._id === id);
    
    if (isItemExists) {
      toast.error("Item Already in Cart!");
    } else {
      // Check if there are items in the cart
      if (cart.length > 0) {
        const newShopId = data.shop._id;

        // Check if the new product's shopId matches the shopId of items in the cart
        const isDifferentShop = cart.some((item) => item.shop._id !== newShopId);

        if (isDifferentShop) {
          toast.error("Empty Cart To Add Any Other Shop Product! ");
          return;
        }
      }

      if (data.stock < count) {
        toast.error("Product Stock Limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));

        toast.success("Item Added To Cart!");
      }
    }
  };



  if (!data) {
    return null;
  }

  const imageUrl = `${backend_url}${data.images[0]}`



  return (
    <div className="w-full p-1">
      <div className="sm:w-auto w-[155px] h-[320px] sm:h-[300px] rounded-lg shadow-md relative cursor-pointer border
        border-black/20 hover:scale-105 transform transition-transform duration-300 ease-in-out">
        <Link to={`/product/${data._id}`}>

          <img src={imageUrl} alt='' className="sm:w-full w-full h-[150px] sm:h-[160px] object-cover" />
          <h5 className="font-extrabold text-sm px-1 sm:px-3 mt-2">
            <Link to={`/shop/preview/${data.shop._id}`} className="text-[#f63b60] underline">
              {data.shop && data.shop.shopName}
            </Link>
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
        <div className="p-2 flex justify-end sm:mt-1">
          <Eye
            size={25}
            className="cursor-pointer ml-2"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick View"
          />

          <TbShoppingCartPlus
            size={25}
            className="cursor-pointer ml-2"
            onClick={() => {
              addToCartHandler(data._id)
              setCount(count + 1)
              setOpen(false)
              console.log(open)
            }}
            color="#444"
            title="Add to Cart"
          />
        </div>
      </div>
      {open ? <ProductDetailCard open={open} setOpen={setOpen} data={data} /> : null}
    </div>
  );
};

export default ProductCard;