import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const fetchUsers=createAsyncThunk("admin/fetchalluser",async(_,thunkAPI)=>{
    try{

    
    const response =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data
}
catch(e){
        return thunkAPI.rejectWithValue(e?.response?.data?.message||"cant find users")
    
}
})

export const adduser=createAsyncThunk("admin/adduser",async(userData,thunkAPI)=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/adduser`,userData,{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        })
        return response.data

    }
    catch(e){
        return thunkAPI.rejectWithValue(e?.response?.data?.message||"cant add user")

    }
})

//update userinfo
export const updateuser=createAsyncThunk("admin/upadteuser",async({id,name,email,role},thunkAPI)=>{
     try{
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/upadte${id}`,{name,email,role},{

            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        })
        return response.data

    }
    catch(e){
        return thunkAPI.rejectWithValue(e?.response?.data?.message||"cant add user")

    }

})


///delte user
export const deleteuser=createAsyncThunk("admin/deleteuser",async(id,thunkAPI)=>{
    try{
    const response=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/deleteuser/${id}`,{headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }})
    return response.data}
    catch(e){
        return thunkAPI.rejectWithValue(e?.response?.data?.message||"cant delete user")
        
    }
})

const adminSlice=createSlice({
    name:"admin",
    initialState:{
        users:[],
        loading:false,
        error:null
    },reducers:{},extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.loading=true
            state.error.null
        }).addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false
            state.users=action.payload.data
        }).addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(updateuser.pending,(state)=>{
            state.loading=true
            state.error.null
        }).addCase(updateuser.fulfilled,(state,action)=>{
            state.loading=false
            const upadteuser=action.payload.data
            state.users=state.users.map((e,i)=>e._id==upadteuser._id?upadteuser:e)

        }).addCase(updateuser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(deleteuser.pending,(state)=>{
            state.loading=true
            state.error.null
        }).addCase(deleteuser.fulfilled,(state,action)=>{
            state.loading=false
            state.users=action.payload.data
        }).addCase(deleteuser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(adduser.pending,(state)=>{
            state.loading=true
            state.error.null
        }).addCase(adduser.fulfilled,(state,action)=>{
            state.loading=false
            state.users=action.payload.data
        }).addCase(adduser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
})

export default adminSlice.reducer