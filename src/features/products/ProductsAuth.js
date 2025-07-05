// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk: axios orqali productlar olish
export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data.products; // axios avtomatik .json qiladi
  }
);

const ProductsAuth = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default ProductsAuth.reducer;
