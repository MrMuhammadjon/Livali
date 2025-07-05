import { configureStore } from "@reduxjs/toolkit";
import authReduser from '../features/auth/authSlice';

export const store = configureStore({
    reducer:{
        auth: authReduser,
    }
})