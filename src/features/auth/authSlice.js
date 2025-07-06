// src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async login function
export const loginUser = createAsyncThunk('auth/loginUser', async (data, thunkAPI) => {
  try {
    const res = await axios.post('https://dummyjson.com/auth/login', {
      username: data.username,
      password: data.password,
    });
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const user = JSON.parse(localStorage.getItem('user')) || null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
