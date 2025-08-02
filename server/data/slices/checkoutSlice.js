import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//to handle th echeckout session
export const createCheckout=createAsyncThunk("checkout/createCheckout",async(checkoutdata,thunkAPI)=>{
    try{
        const response =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`,checkoutdata,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data

    }catch(e){
            return thunkAPI.rejectWithValue(e?.response.data.message||"error is occuresd")
        
    }
})


const checkoutSlice=createSlice({
    name:"checkout",initialState:{
        checkout:null,loading:false,error:null
    },reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createCheckout.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(createCheckout.fulfilled,(state,action)=>{
            state.loading=false;
            state.checkout=action.payload.data
        }).addCase(createCheckout.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})
export default checkoutSlice.reducer