import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/user/getallusers`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't fetch users");
  }
});

export const addUser = createAsyncThunk("admin/addUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/user/createuser`, userData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't add user");
  }
});

export const updateUser = createAsyncThunk("admin/updateUser", async ({ id, name, email, role }, thunkAPI) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/user/${id}`, { name, email, role }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't update user");
  }
});

export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, thunkAPI) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/user/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e?.response?.data?.message || "Can't delete user");
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: { users: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload.data);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.users = state.users.map((u) => (u._id === updated._id ? updated : u));
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      });
  }
});

export default adminSlice.reducer;