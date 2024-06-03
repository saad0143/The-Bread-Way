import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller"; 
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { orderReducer } from "./reducers/order";

const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        product: productReducer,
        event: eventReducer,
        cart:cartReducer,
        order:orderReducer,
       
    },
  });
  
  export default Store;