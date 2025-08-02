import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async (filters, thunkAPI) => {
    try {
      const queryObject = {};

for (let key in filters) {
  const value = filters[key];
  if (Array.isArray(value)) {
    queryObject[key] = value.filter((v) => v); // remove falsy values like "" or null
  } else if (value !== "" && value !== null && value !== undefined) {
    queryObject[key] = value;
  }
}


      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/getallproducts`,queryObject
      );

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.response?.data?.message || "Can't fetch products"
      );
    }
  }
);


export const fetchProductDetail = createAsyncThunk("products/fetchDetail", async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getproduct/${id}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't fetch product details");
  }
});

export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, data }, thunkAPI) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't update product");
  }
});

export const fetchSimilarProducts = createAsyncThunk("products/fetchSimilar", async (id, thunkAPI) => {
  try {
    if(typeof(id)!="string") throw new Error("nothing")
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getsimilarto/${id}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't fetch similar products");
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: { products: [], selectedProduct: null, similarProducts: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.selectedProduct = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.similarProducts = action.payload.data;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.products = state.products.map((p) => (p._id === updated._id ? updated : p));
      });
  }
});

export default productSlice.reducer;