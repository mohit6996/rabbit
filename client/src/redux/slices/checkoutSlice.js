import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCheckout = createAsyncThunk("checkout/createCheckout", async (checkoutData, thunkAPI) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`, checkoutData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't create checkout");
  }
});

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: { checkout: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.checkout = action.payload.data;
        state.loading = false;
      });
  }
});

export default checkoutSlice.reducer;