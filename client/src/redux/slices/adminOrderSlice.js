import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminOrders = createAsyncThunk("adminorders/fetchOrders", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/order/getallorders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't fetch admin orders");
  }
});

export const updateOrder = createAsyncThunk("adminorders/updateOrder" , async ({ id, data }, thunkAPI) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/order/editorder/${id}`, {data}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't update order");
  }
});

export const deleteOrder = createAsyncThunk("adminorders/deleteOrder", async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/order/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't delete order");
  }
});

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.totalOrders = action.payload.data.length;
        state.totalSales = action.payload.data.reduce((a, c) => a + c.totalPrice, 0);
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.orders = state.orders.map((o) => (o._id === updated._id ? updated : o));
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.orders = state.orders.filter((o) => o._id !== deletedId);
      });
  }
});

export default adminOrderSlice.reducer;

