import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserOrder=createAsyncThunk("order/fetchUserorders",async(_,thunkAPI)=>{
    try{
const response =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders`,
    {headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }}
)
return response.data
    }
    catch(e){
        return thunkAPI.rejectWithValue(e?.response?.data?.message||"cant find orders")
    }
})
//fetchorder deatil

export const fetchOrderDetails=createAsyncThunk("orders/fetchOrderDetails",async(orderId,thunkAPI)=>{
    try{
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data

    }
    catch(e){
        return thunkAPI.rejectWithValue(e?.response?.data?.message||"cant find orders")

    }
})
const orderSlice=createSlice({
    name:"orders",
    initialState:{
        orders:[],
        totalOrders:0,
        orderDetails:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUserOrder.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchUserOrder.fulfilled,(state,action)=>{
            state.loading=false
            state.orders=action.payload.data
           
        })
        .addCase(fetchUserOrder.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(fetchOrderDetails.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchOrderDetails.fulfilled,(state,action)=>{
            state.loading=false
            state.orderDetails=action.payload.data
           
        })
        .addCase(fetchOrderDetails.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
})

export default orderSlice.reducer