import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const tosubscribe = createAsyncThunk(
  "subscribe/tosubscribe",
  async (email, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscribe`,
        { email }
      );
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(
        e?.response?.data?.message || e.message || "Subscribe error"
      );
    }
  }
);

const subscribe = createSlice({
  name: "subscribe",
  initialState: { loading: false, error: null, issubs: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tosubscribe.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.issubs = false;
      })
      .addCase(tosubscribe.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.success) {
          state.issubs = true;
          toast.success(action.payload.message || "Subscribed successfully!");
        } else {
          state.issubs = false;
          toast.error(
            action.payload.message || "Subscription failed. Try again."
          );
        }
      })
      .addCase(tosubscribe.rejected, (state, action) => {
        state.loading = false;
        state.issubs = false;
        state.error = action.payload;
        toast.error(action.payload || "Subscription error");
      });
  },
});

export default subscribe.reducer;
