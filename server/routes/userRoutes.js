import express from "express";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
import protect from "../middleware/authmiddleware.js";

 const router=express.Router()

//to register user
router.post('/register',async(req,res)=>{
    const {name,email,password}=req.body
    try{
            let user = await User.findOne({email})
            if (user) {
                     res.status(400).json({
                    success:false,
                    message:"The email address is already in use"

                })


            }
            else{
                const newUser= new User({email,name,password})
                await newUser.save()
                // jwt payload
                const payload={user:{id:newUser._id,role:newUser.role}}
                //create the token form payload
                jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"40h"},(err,token)=>{
                    if(err) throw new err;

                    res.status(201).json({
                        success:true,
                        message:"user is registered",
                        data:{
                              id:newUser._id,
                        name:newUser.name,
                        email:newUser.email,
                        role:newUser.role

                        }
                        ,token

                    })
                })


                // res.status(201).json({
                //     success:true,
                //     message:"user is registered",
                //     data:{
                //         id:newUser._id,
                //         name:newUser.name,
                //         email:newUser.email,
                //         role:newUser.role
                //     }
                // })

               
            }
    }
    catch(e){
            console.log(e)
            res.status(500).send('server Error')
    }
})

// login 
router.post("/login", async (req,res)=>{
    const {email,password}=req.body
    // check if teh user is present or not
    const user= await User.findOne({email})
    if(user){
        const verifyuser=await user.matchPassword(password)
        if(verifyuser){
            const payload={user:{id:user._id,role:user.role}}
            jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"40h"},(err,token)=>{
                if(err){
                    res.status(500).json({
                        success:false,
                        message:"server error somehting went wrong"
                    })
                }
                else{
                    res.status(200).json({
                        success:true,
                        message:"logged in",
                        data:{
                            id:user._id,
                            name:user.name,
                            role:user.role,
                        email:user.email
                        }
                        ,token
                    })
                }

            })


        }
        else{
            res.status(401).json({
                success:false,
                message:"invalid credentials"
            })
        }
        


    }else{
        res.status(404).json({
            success:false,
            message:"user not found",
        
        })
    }


})

// profile it is protected route by middleware 
router.get("/profile",protect,async (req,res)=>{
    res.send(req.user)
})
export default router

