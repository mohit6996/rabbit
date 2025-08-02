import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";


import axios from"axios"

// retrieve user inof and token from localstroage if available
const userFromStorage = localStorage.getItem("userinfo") && localStorage.getItem("userinfo") !== "undefined"
  ? JSON.parse(localStorage.getItem("userinfo"))
  : {};
//check for an exiting guest id from local strpogae if not create one

const initialGuestId=localStorage.getItem("guestId")||`guest_${new Date().getTime()}`;
//set it again inefficient
localStorage.setItem("guestId",initialGuestId)

//intial state

const initialState={
    user:userFromStorage,
    guestId:initialGuestId,
    loading:false,
    error:null
}
//async thunk that will handle login
export const loginUser=createAsyncThunk(
    "auth/loginUser",async (userData,thunkAPI)=>{
        try{
            const data= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,userData)

           return data.data

        }catch(e){
                
                      return thunkAPI.rejectWithValue(e.response?.data?.message || "Login failed");
        }
    }
)

export const registerUser=createAsyncThunk(
    "auth/registerUser",async (userData,thunkAPI)=>{
        try{
            console.log("OO")
            const data= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,userData)
                console.log(data)
            
            return data.data

        }catch(e){
                
                      return thunkAPI.rejectWithValue(e.response?.data?.message || "Register failed");
        }
    }
)

//slice
const authSlice=createSlice({
    name:"auth",initialState,
    reducers:{
        logout:(state)=>{
            state.user=null
            state.guestId=`guest_${new Date().getTime()}`
            localStorage.removeItem("userinfo")
            localStorage.removeItem("token")
            localStorage.setItem("guestId",state.guestId)
           
        },
        generateNewGuestId:(state)=>{
            state.guestId=`guest_${new Date().getTime()}`
            localStorage.setItem("guestId",state.guestId)

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            console.log(action,"action")
            state.user=action.payload.data
              localStorage.setItem("userinfo",JSON.stringify(action.payload.data))
            localStorage.setItem("usertoken",action.payload.token)
           
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

        .addCase(registerUser.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
                        console.log(action.payload.token,"acetion")

            state.user=action.payload.data
            state.token=action.payload.token

            localStorage.setItem("userinfo",JSON.stringify(action.payload.data))
            localStorage.setItem("token",JSON.stringify(action.payload.token))
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.error=action.payload
            state.user=null
            state.loading=false

        })
        
    }
})

export const {logout,generateNewGuestId}=authSlice.actions
export default authSlice.reducer