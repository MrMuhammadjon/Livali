import { configureStore } from "@reduxjs/toolkit";
import authReduser from '../features/auth/authSlice';
import productReduser from '../features/products/ProductsAuth';

export const store = configureStore({
    reducer:{
        auth: authReduser,
        products: productReduser,
    }
})