import express from "express"
import Subscribe from "../models/subscribe.js"
import Email from "../models/emails.js"

const router=express.Router()

//post aubscribe handle subrcibeis

router.post('/',async(req,res)=>{
    
    const {email}=req.body
    
    if(!email){
        return res.status(400).json({message:"email is required"})
    }
    try{
            let subscribe=await Email.findOne({email})
            if(subscribe){
                return res.status(400).json({sucess:false,message:"email is already subscribe"})
            }
            //create a new subscriber
            subscribe=new Email({email})
            await subscribe.save()
            res.status(201).json({success:true,message:"Succesfully subsrcibe to the newsletter!"})
    }
    catch(e){
        console.error(e)
        res.status(500).json({message:"server error"})



    }
})

export default router
