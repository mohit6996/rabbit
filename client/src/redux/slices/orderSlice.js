import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserOrder = createAsyncThunk("orders/fetchUserOrders", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't fetch orders");
  }
});

export const fetchOrderDetails = createAsyncThunk("orders/fetchOrderDetails", async (orderId, thunkAPI) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't fetch order details");
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [], orderDetails: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrder.fulfilled, (state, action) => {
        console.log(action.payload)
        state.orders = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        console.log(action.payload.data,"dsfsd")
        state.orderDetails = action.payload.data;
        state.loading = false;
      });
  }
});

export default orderSlice.reducer;