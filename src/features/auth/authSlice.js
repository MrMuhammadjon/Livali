import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://686bac8ee559eba908739191.mockapi.io/users";

// Ro'yxatdan o'tish
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(BASE_URL, userData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Server xatosi");
    }
  }
);

// Kirish (Login) - telefon raqam + parolni tekshiradi
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ phone, password }, thunkAPI) => {
    try {
      const res = await axios.get(BASE_URL);
      const user = res.data.find((u) => u.phone === phone);

      if (!user) {
        return thunkAPI.rejectWithValue("Telefon raqam topilmadi");
      }

      if (user.password !== password) {
        return thunkAPI.rejectWithValue("Parol noto‘g‘ri");
      }

      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Server xatosi");
    }
  }
);

// Dastlabki holat
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
