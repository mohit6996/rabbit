import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { use } from "react";
///load the cart from localstroage
const loadCartFromStroage=()=>{
    const storedCart=localStorage.getItem("cart")
    return storedCart?JSON.parse(storedCart):{products:[]}
}
//helper function to localstrogae
const saveCartStorage=(cart)=>{
    localStorage.setItem("cart",JSON.stringify(cart))
}

export const fetchCart=createAsyncThunk(
    "cat/fetchCart",
    async({userId,guestId},thunkAPI)=>{
        try{
            const response =await axios.get(`${import.meta.env.VITE_BACKNED_URL}/api/cart`,{
                params:{userId,guestId}
            })
            return response.data
        }catch(e){
            return thunkAPI.rejectWithValue(e?.response.data.message||"error is occuresd")
        }
        
    }
)
//add to crat
export const addToCart=createAsyncThunk("cart/addToCat",async({productId,quantity,size,color,guestId,userId})=>{
    try{
        const response =await axios.post(`${import.meta.env.VITE_BACKNED_URL}/api/cart`,{productId,quantity,size,color,guestId,userId})
    return response.data
    }
    catch(e){
            return thunkAPI.rejectWithValue(e?.response.data.message||"error is occuresd")

    }
})
//update teh item in cart qunatity
export const upadteCartItemQuantity=createAsyncThunk(
    "cart/updateCartItemQuantity",async({productId,quantity,size,color,userId,guestId})=>{
        try{
const response=await axios.put(`${import.meta.env.VITE_BACKNED_URL}/api/cart`,{
    productId,quantity,guestId,userId,size,color
})
return response.data
        }
        catch(e){
            return thunkAPI.rejectWithValue(e?.response.data.message||"error is occuresd")

        }
    }
)
//delete the item from cart
export const removeFromCart=createAsyncThunk("cart/removeFromCart",async({productId,guestId,userId,size,color},thunkAPI)=>{
    try{
        const response=await axios({
            method:"DELETE",
            url:`${import.meta.env.VITE_BACKNED_URL}/api/cart`,
            data:{productId,guestId,userId,size,color}
        })
        return response.data
    }
    catch(e){
            return thunkAPI.rejectWithValue(e?.response.data.message||"error is occuresd")

    }

})
//merge
export const mergeCrat=createAsyncThunk('cart/mergeCart',async({guestId,userId},thunk)=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_BACKNED_URL}/api/cart/merge`,{guestId,userId},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
        return response.data
    }catch(e){
            return thunkAPI.rejectWithValue(e?.response.data.message||"error is occuresd")

    }
})
const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cart:loadCartFromStroage(),
        loading:false,
        error:null
    },
    reducers:{
        clearCart:(state)=>{
            state.cart={products:[]}
            localStorage.removeItem("cart")
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCart.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.loading=false,
            state.cart=action.payload.data
            saveCartStorage(action.payload.data)
        })
        .addCase(fetchCart.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload.message||"failed to fecth cart"
        })

        //
        .addCase(addToCart.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.loading=false,
            state.cart=action.payload.data
            saveCartStorage(action.payload.data)
        })
        .addCase(addToCart.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload.message||"failed to add to acrt"
        })
        .addCase(upadteCartItemQuantity.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(upadteCartItemQuantity.fulfilled,(state,action)=>{
            state.loading=false,
            state.cart=action.payload.data
            saveCartStorage(action.payload.data)
        })
        .addCase(upadteCartItemQuantity.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload.message||"failed to fupadte item qunaity"
        })
        //remove
        .addCase(removeFromCart.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(removeFromCart.fulfilled,(state,action)=>{
            state.loading=false,
            state.cart=action.payload.data
            saveCartStorage(action.payload.data)
        })
        .addCase(removeFromCart.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload.message||"failed to remove item"
        })
//merge
            .addCase(mergeCrat.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(mergeCrat.fulfilled,(state,action)=>{
            state.loading=false,
            state.cart=action.payload.data
            saveCartStorage(action.payload.data)
        })
        .addCase(mergeCrat.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload.message||"failed tomerge"
        })

    }
})
export const {clearCart}=cartSlice.actions
export default cartSlice.reducer
