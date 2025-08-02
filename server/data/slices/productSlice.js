import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import reducer from "./authSlice";
import { useSearchParams } from "react-router";

export const initialState={
    products:[],
    selectedProduct:null,
    similarProducts:[],
    loading:false,
    error:null,filters:{
        category:"",
        sizez:"",
        color:"",
        gender:"",
        brand:"",
        minPrice:"",
        Maxprice:"",
        search:"",
        material:"",
        collection:""
    }

}
export const fetchProductbyFilters=createAsyncThunk(
    "product/fetchbyFilters",async(filters,thunkAPI)=>{
        try{
        const query=new URLSearchParams()
        for (let i in filters){
            if (filters[i]) query.append(i,filters[i])
        }
    const data=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/fetchallproducts/?${query.toString()}`)


    return data.data

        }
        catch(e){
           return  thunkAPI.rejectWithValue(e.response?.data?.message || "product fetch failed");
        }

    }
    
    
    
)
//detail
export const fetchproductdeatil=createAsyncThunk("product/fecthdetails",
    async(id,thunkAPI)=>{
        try{
const data=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/productdeatil/${id.toString()}`)
       return data.data }
        catch(e){

return thunkAPI.rejectWithValue(e.response?.data?.message||"product fecthing failed")
        }

    }
)
//upadte
export const updateproduct=createAsyncThunk(
    "product/upadteproduct",async(id,productdata,thunkAPI)=>{
        try{
            const data=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/products/upadte/${id.toString()}`,productdata,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
return data.data
        }
        catch(e){
            return thunkAPI.rejectWithValue(e?.response?.data?.message||"product upadte failed")
        }
    }
)

//similar
export const fetchSimilarProducts=createAsyncThunk(
    "products/fetchsimilarproducts",async(id,thunkAPI)=>{
        try{
            const similarProducts=await axios(`${import.meta.env.VITE_BACKEND_URL}/api/products/similarproducts?${id}`)
            return similarProducts.data
        }
        catch(e){
            return thunkAPI.rejectWithValue(e?.response?.data?.message||"failed to get similar products")
        }
    }
)

//slice

const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        setFilters:(state,action)=>{
            state.filters={...state.filters,...action.payload}
        },
        clearFilters:(state)=>{
            state.filters={
                category:"",
        sizez:"",
        color:"",
        gender:"",
        brand:"",
        minPrice:"",
        Maxprice:"",
        search:"",
        material:"",
        collection:""
            }
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProductbyFilters.pending,(state)=>{
            state.loading=true
            state.error=null


        })
        .addCase(fetchProductbyFilters.fulfilled,(state,action)=>{
            state.loading=false
            state.products=Array.isArray(action.payload.data)?action.payload.data:[]
        })
        .addCase(fetchProductbyFilters.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(fetchproductdeatil.pending,(state)=>{
            state.loading=true
            state.error=null


        })
        .addCase(fetchproductdeatil.fulfilled,(state,action)=>{
            state.loading=false
            state.selectedProduct =action.payload.data
        })
        .addCase(fetchproductdeatil.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(updateproduct.pending,(state)=>{
            state.loading=true
            state.error=null


        })
        .addCase(updateproduct.fulfilled,(state,action)=>{
            state.loading=false
            const upadateproduct =action.payload.data
            state.products=state.products.map((e,i)=>e._id==upadateproduct._id?upadateproduct:e)
        })
        .addCase(updateproduct.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        
        .addCase(fetchSimilarProducts.pending,(state)=>{
            state.loading=true
            state.error=null


        })
        .addCase(fetchSimilarProducts.fulfilled,(state,action)=>{
            state.loading=false
            state.similarProducts =action.payload.data
        })
        .addCase(fetchSimilarProducts.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

       

}


})

export const {setFilters,clearFilters} = productSlice.actions
export default productSlice.reducer