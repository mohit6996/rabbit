import express from "express"
import Order from "../models/order.js"
import protect from "../middleware/authmiddleware.js"


const router =express.Router()
//get al my orders
router.get("/",protect,async(req,res)=>{
    try{
            const orders= await Order.find({user:req.user._id}).sort({createdAt:-1})

            res.json({data:orders})
    }
    catch(e){
        console.error(e)
        res.json({message:"server error"})
    }
})

//order deatiled
 router.get("/:id",protect,async(req,res)=>{
    try{
const order=await Order.findById(req.params.id).populate("user","name email")
if(!order){
    res.status(404).json({message:"order not found"})
}
res.json({data:order})
    }
    catch(e){
        console.error(e)
        res.json({message:"server error"})
    }
 })

 export default router