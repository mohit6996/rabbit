import mongoose from "mongoose";
const emailsscheam=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
})
const Email=mongoose.model("Email",emailsscheam)
export default Email