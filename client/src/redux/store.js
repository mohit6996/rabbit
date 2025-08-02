import {configureStore} from "@reduxjs/toolkit"
// congiruestore takes object -reducer

import authReducer from "./slices/authSlice"
import productSlice from "./slices/productSlice"
import cartSlice from "./slices/cartSlice"
import checkoutSlice from "./slices/checkoutSlice"
import orderSlice from "./slices/orderSlice"
import adminSlice from "./slices/adminSlice"
import adminProductSlice from "./slices/adminProductsSlice"
import adminOrderSlice from "./slices/adminOrderSlice"
import subscribe from"./slices/subscribeSlice"

const  store=configureStore(
    {
        reducer:{
            auth:authReducer,
            product:productSlice,
            cart:cartSlice,
            checkout:checkoutSlice,
            order:orderSlice,
            admin:adminSlice,
            adminProduct:adminProductSlice,
            adminOrder:adminOrderSlice,
            subscribe:subscribe


        }

    }
)
export default store