import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchProducts", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/product/getallproducts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't fetch products");
  }
});

export const createProduct = createAsyncThunk("adminProducts/createProduct", async (productData, thunkAPI) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/create`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't create product");
  }
});

export const updateProduct = createAsyncThunk("adminProducts/updateProduct", async ({ id, data }, thunkAPI) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't update product");
  }
});

export const deleteProduct = createAsyncThunk("adminProducts/deleteProduct", async (id, thunkAPI) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't delete product");
  }
});

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.data);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.products = state.products.map((p) => (p._id === updated._id ? updated : p));
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      });
  }
});

export default adminProductSlice.reducer;

