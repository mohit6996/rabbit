import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        match:[/.+\@.+\../,"please enter the valid email address"]
    }
    ,password:{
        type:String,
        required:true,
        minLength:6
    },
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"

    }

},{timestamps:true})

//mongo middleware
userschema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
        this.password=await bcrypt.hash(this.password,10)
    next()

})
userschema.methods.matchPassword=async function (enterdpassword){
    return await bcrypt.compare(enterdpassword,this.password)
}
const User=mongoose.model("User",userschema)
export default User
