import express from "express"
import Order from "../models/order.js"
import protect from "../middleware/authmiddleware.js"
import { checkadmin } from "../middleware/authmiddleware.js"
//get all orders
const router=express.Router()


router.get("/getallorders",protect,checkadmin,async(req,res)=>{
    try{
        const orders=await Order.find().populate("user","name email")
        orders.map(e=>console.log(e.user,"kk"))
        res.json({data:orders})

    }catch(e){
        console.error(e)
        res.status(500).json({message:"server error"})
    }
})
//update order 
router.put("/editorder/:id",protect,checkadmin,async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id)
        if(!order){
            res.status(404).json({message:"order not found"})
        }
        console.log(req.body)
        order.status=req.body.data||order.status
        order.isDelivered=req.body.data==="Delivered"?true:order.isDelivered
        order.deliveredAt=req.body.data==="Delivered"?Date.now():order.deliveredAt

        await order.save()
        return res.json({data:order})

        

        
    }catch(e){
        console.error(e)
        res.status(500).json({message:"server error"})

    }
})
//delete order
router.delete("/delete/:id",protect,checkadmin,async (req,res)=>{
    try{
        const order=await Order.findById(req.params.id)
        if(!order){
            return res.status(404).json({message:"order is not found"})
        }
        await order.deleteOne()
        res.json({message:"order is deleted"})

    }
    catch(e){
        console.error(e)
        res.json({message:"order not found"})
    }
   
})






export default router
