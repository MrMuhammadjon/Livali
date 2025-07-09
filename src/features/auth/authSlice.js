import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://686bac8ee559eba908739191.mockapi.io/users";

// 🚀 Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(BASE_URL, userData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data || "Server error");
    }
  }
);

// 🚀 Login by phone
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ phone }, thunkAPI) => {
    try {
      const res = await axios.get(BASE_URL);
      const user = res.data.find((u) => u.phone === phone);
      if (user) return user;
      else return thunkAPI.rejectWithValue("User not found");
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data || "Server error");
    }
  }
);

// 🧠 LocalStorage bilan boshlang‘ich holat
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
