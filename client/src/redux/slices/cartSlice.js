import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async ({ userId, guestId }, thunkAPI) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
      params: {  userId, guestId }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't fetch cart");
  }
});

export const addToCart = createAsyncThunk("cart/addToCart", async (data, thunkAPI) => {
  console.log(data,"data")
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, data);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't add to cart");
  }
});

export const updateCartItemQuantity = createAsyncThunk("cart/updateQuantity", async (data, thunkAPI) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, data);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't update cart item");
  }
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (data, thunkAPI) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, { data });
    console.log(response.data,"daa")
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't remove from cart");
  }
});

export const mergeCart = createAsyncThunk("cart/mergeCart", async ({ guestId }, thunkAPI) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, { guestId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't merge cart");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {totalPrice:0, cart: { products: [] }, loading: false, error: null },
  reducers: {
    clearCart:(state)=>{
      state.cart={products:[]}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log(action.payload.data,"kdjfskjdgbkjdgbjkdf")
        state.cart = action.payload.data;
        state.loading = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.cart = action.payload.data;

      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;

      });
  }
});
export const {clearCart} = cartSlice.actions
export default cartSlice.reducer;