import express from "express"
import User from "../models/users.js"
import protect from "../middleware/authmiddleware.js"
import {checkadmin} from "../middleware/authmiddleware.js"
const router=express.Router()

//get all user
router.get("/getallusers",protect,checkadmin,async(req,res)=>{
    try{
        const users=await User.find({})
        res.json({data:users})

    }catch(e){
        console.error(e)
        res.status(500).json({message:"server error"})
    }
})
//get single user
router.get("/:id",protect,checkadmin,async(req,res)=>{
    try{
        const user=await User.findById(req.params.id).select("name email")
        if(!user){
            return res.status(404).json({message:"user nt found"})
        }
        res.json({message:"user is found",data:user})

    }
    catch(e){
        console.error(e)
        res.status(500).json({message:"server error"})
    }
})


///deleteuser


router.delete("/:id",protect,checkadmin,async (req,res)=>{
    try{
        const {id}=req.params
        
        const user= await User.findById(id)
        if(!user){return res.status(404).json({message:"user not found"})}
        console.log(user)
        await user.deleteOne()
        res.json({message:"user is deleted"})
    }
    catch(e){
        console.error(e)
        res.status(500).json({message:"server error"})
    }
})
//create user
router.post("/createuser",protect,checkadmin,async(req,res)=>{
    try{
        const{name,email,password,role}=req.body// get all data 
        //check if teh email exits
        const exitsuser=await User.findOne({email})
        if(exitsuser){
            return res.status(401).json({message:"user already exits"})
        }

        const newuser=await User.create({name,email,password,role:role||"customer"})
        res.status(201).json({message:"user is created",data:newuser})

    }
    catch(e){
        console.error(e)
        res.status(500).json({message:"server error"})
    }
})





//edituser

router.put("/:id",protect,checkadmin,async(req,res)=>{
    try{
        const {name,email,role}=req.body
        console.log(name,email,role)
        const user= await User.findById(req.params.id)
        if(!user){
           return res.status(404).json({message:"user not found"})
        }
        user.name=name||user.name
        user.email=email||user.email
        user.role=role||user.role
        await user.save()
return res.status(202).json({message:"user is edited",data:user})

    }
    catch(e){
        console.error(e)
        res.status(500).json({message:"server error"})
    }
})
export default router