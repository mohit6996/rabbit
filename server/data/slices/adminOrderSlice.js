import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchAdminOrders=createAsyncThunk("adminproducts/fetchproducts",async(_,thunkAPI)=>{
    try{
    const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,{
        headers:{
            Authorization:` Bearer${localStorage.getItem(token)}`
        }
    })
    return response.data
}
    catch(e){

                return thunkAPI.rejectWithValue(e?.response?.data?.message||"cant fetch orders for admin")


    }           
})

// export const createOrder=createAsyncThunk("adminOrder/createProduct",async(productdata,thunkAPI)=>{
//     try{
// const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/adminproduct/addproduct`,productdata,
//     {headers:{
//             Authorization:` Bearer${localStorage.getItem(token)}`
//         }}
// )
//     return response.data}
//     catch(e){
//                 return thunkAPI.rejectWithValue(e?.response?.data?.message||"cant upadte product")

//     }
// })

export const upadteOrder=createAsyncThunk("adminOrder/upadteOrder",async(id,data,thunkAPI)=>{
    try{
const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/adminorder/updateorder?${id}`,data,
    {headers:{
            Authorization:` Bearer${localStorage.getItem(token)}`
        }}
)
    return response.data}
    catch(e){
                return thunkAPI.rejectWithValue(e?.response?.data?.message||"cant update product user")

    }
})
//delte product

// export const deleteProduct=createAsyncThunk("adminProduct/createProduct",async(id,thunkAPI)=>{
//     try{
// const response=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/adminproduct/deleteproduct?${id}`,
//     {headers:{
//             Authorization:` Bearer${localStorage.getItem(token)}`
//         }}
// )
//     return response.data}
//     catch(e){
//                 return thunkAPI.rejectWithValue(e?.response?.data?.message||"cant delete product")

//     }
// })

const adminOrderSlice=createSlice({
    name:"adminOrders",
    initialState:{
        orders:[],
        totalOrders:0,
        totalSales:0,
        
        loading:false,error:null
    },reducers:{

    }
    ,extraReducers:(builder)=>{
        builder.addCase(fetchAdminOrders.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchAdminOrders.fulfilled,(state,action)=>{
            state.loading=false,
            state.orders=action.payload.data
            state.totalOrders=action.payload.length

            state.totalSales=action.payload.data.reduce((a,c)=>{
                a+c.totalPrice
            },0)
        })
        .addCase(fetchAdminOrders.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        
        .addCase(upadteOrder.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(upadteOrder.fulfilled,(state,action)=>{
            
           const up=action.payload.data
           state.orders=state.orders.map((e,i)=>e._id==up._id)?up:e
            state.loading=false
        })
        .addCase(upadteOrder.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(deleteOrder.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(deleteOrder.fulfilled,(state,action)=>{
            
           const up=action.payload.data
           state.orders=state.orders.filter((e,i)=>e._id!=up._id)
            state.loading=false
        })
        .addCase(deleteOrder.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        
    }
})

export default adminOrderSlice.reducer