import express from "express"
import Email from "../models/emails"

const router=express.Router()

router.post("/",async(req,res)=>{
    try{
        const exitsemail=await Email.find({email:req.body.email})
        if(exitsemail){
            return res.status(400).json({message:"email already exits"})
        }
        res.status(201).json("subscribtion succesfull")

    }
    catch(e){
        console.log(e)
        res.status(500).json({message:"sever error"})
    }
})