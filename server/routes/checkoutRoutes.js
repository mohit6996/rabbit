import express from "express"

import Checkout from "../models/checkout.js"
import Cart from "../models/cart.js"
import Order from "../models/order.js"
import protect from "../middleware/authmiddleware.js"

const router=express.Router()
//create checkout 
//post 
//private

router.post("/",protect,async(req,res)=>{
    try{
        const {checkoutItems,shippingAddress,paymentMethod,totalPrice}=req.body
        if(!checkoutItems||checkoutItems.length<1){
            return res.status(400).json({message:"no items in the Cart"})
        }
        const newCheckout=await Checkout.create({
            user:req.user._id,
            checkoutItems:checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus:"Pending",
            isPaid:false,
        })
        
        res.status(201).json({message:"new checkout is created",data:newCheckout})

    }catch(e){
        console.error(e)
        res.json({message:"server error"})
    }
})
//paid , upadate the deatiles to paid from pending
router.put("/:id/pay",protect,async(req,res)=>{
    console.log(req.params.id,"sdfsd")
    try{
        const {paymentStatus,paymentDetails}=req.body
        
        const checkout=await Checkout.findById(req.params.id)
        if(!checkout){
            res.status(404).json({message:"checkout not found"})
        }
        if(paymentStatus=="paid"){
            checkout.isPaid=true
            checkout.paymentStatus=paymentStatus
            checkout.paymentDetails=paymentDetails
            checkout.paidAt=Date.now()
            await checkout.save()

            res.status(200).json({message:"upadte",data:checkout})
        }
        else{
            res.status(400).json({message:"invalid payment status"})
        }


    }
    catch(e){
        console.error(e)
        res.json({message:"server seeror"})
    }
})
//covert checkout to order

router.post("/:id/finalize",protect,async(req,res)=>{
    try{
        const checkout =await Checkout.findById(req.params.id)
        if(!checkout){
            return res.status(404).json({message:"checkout not found"})
        }
        if(checkout.isPaid && !checkout.isFinalized){
            //create final order
            const finalOrder=await Order.create({
                user:checkout.user,
                orderItems:checkout.checkoutItems,
                shippingAddress:checkout.shippingAddress,
                paymentMethod:checkout.paymentMethod,
                totalPrice:checkout.totalPrice,
                isPaid:true,
                PaidAt:checkout.paidAt,
                isDelivered:false,
                paymentStatus:"paid",
                paymentDetails:checkout.paymentDetails

            })

            checkout.isFinalized=true
            checkout.finalizedAt=Date.now()
            await checkout.save()
            //delete the cart
            await Cart.findOneAndDelete({user:checkout.user})
            res.status(201).json({data:finalOrder})
        }
        else if(checkout.isFinalized){
            res.status(400).json({message:"checkout already finalized"})

        }
        else{
            res.status(400).json({message:"checkout is not paid"})
        }

    }catch(e){
        console.error(e)
        res.json({message:"server error"})
    }
})

export default router