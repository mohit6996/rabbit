import Cart from "../models/cart.js";
import express from "express"
import Product from "../models/products.js";
import protect from "../middleware/authmiddleware.js";

const router=express.Router()
//hepler fucntion to get the crat by user id or guest id
async function getCart(userId,guestId){
    if(userId){
        return await Cart.findOne({user:userId})
    }
    else if(guestId){
        return await Cart.findOne({guestId})
    }
    else{
        return null
    }
    

}
//create the cart 
//add the product to cart for guest or user
router.post("/",async(req,res)=>{
    try{
        const {productId,quantity,size,color,guestId,user}=req.body
        const userId=user?.id

        const product=await Product.findById(productId)
        if(!product){
          return   res.status(404).json({message:"not found404"})
        }
        let cart=await getCart(userId,guestId)
        // if the cart exits we need to update it
        if(cart){

            const productIndex=cart.products.findIndex((p)=>p.size==size&&p.color==color&&p.productId.toString()==productId)


            if(productIndex!=-1){
                cart.products[productIndex].quantity+=quantity
            }
            else{
                cart.products.push({productId,name:product.name,image:product.images[0].url,price:product.price,size,color,quantity})
            }

            //recalculate totalprice
       
       cart.totalPrice=cart.products.reduce((a,item)=>a+(item.quantity*item.price),0)
       await cart.save()
       res.status(200).json({
        data:cart
       })
       //if

        }
        else{
            const newCart=await Cart.create({
                user:userId?userId:undefined,
                
                guestId:guestId?guestId:"guest_"+new Date().getTime(),
                products:[
                    {
                    productId,
                   name:product.name,image:product.images[0].url,price:product.price,size,color,quantity}
                ],
                totalPrice:product.price*quantity

            })
            if (!newCart) return res.status(500).json({ message: "Cart not created" });

        return res.status(201).json({data:newCart})
        }


    }
    catch(e){
        console.error(e)
        res.json({message:"server error"})
    }
})
// to update the quantity
router.put("/",async (req,res)=>{
    try{
        const {productId,quantity,size,color,guestId,user}=req.body

        const cart=await getCart(user,guestId)
        
        if(!cart){return  res.status(404).json({message:"cart not found"})}
        const productIndex=cart.products.findIndex((s)=>s.productId.toString()==productId&&s.size==size&&s.color==color)
        if(productIndex==-1){return res.status(404).json({message:"not found"})}
        if(quantity>0){
        cart.products[productIndex].quantity=quantity

        }
        else{
        cart.products.splice(productIndex,1)

        }
        cart.totalPrice=cart.products.reduce((a,i)=>a+(i.quantity*i.price),0)
        await cart.save()
        return res.json({data:cart})




    }
    catch(e){
        console.error(e)
        res.json({message:"server error"})
    }
})
//delete items form cart
router.delete("/",async (req,res)=>{
    try{
        const{productId,userId,guestId,color,size}=req.body
        console.log(productId,userId,guestId,color,size,"khjgfhdfdsf")
        
        const cart=await getCart(userId,guestId)
        if(!cart) return res.json({message:"cart not found"})
          const productIndex=cart.products.findIndex((s)=>s.productId.toString()==productId&&s.color==color&&s.size==size)
            if(productIndex==-1) return res.json({message:"product not found"})
                cart.products.splice(productIndex,1)
            cart.totalPrice=cart.products.reduce((a,i)=>a+i.price*i.quantity,0)
            await cart.save()
            res.json({data:cart})

    }catch(e){
        console.error(e)
        res.status(500).json({message:"server error"})
    }
})
//display cart
router.get("/",async(req,res)=>{
    try{
        const {user,userId,guestId}=req.query
        
        
        const cart=await getCart(userId,guestId)
        if(!cart){ return res.json({message:"cart not found"})}
        return res.json({data:cart})
    }
    catch(e){
        console.error(e)
        res.json({message:"server error"})
    }
})


    //merge
router.post("/merge",protect,async(req,res)=>{
    try{
        const {guestId}=req.body
      
        const guestcart=await getCart(null,guestId)
        const usercart=await getCart(req.user._id,null)

        if(!guestcart){
return res.json({message:"cart is not found"})
        }
        if(guestcart.products.length<1) return res.json({message:"guest cart is empty"})
        if (usercart){
            if(usercart.products.length>0){
                guestcart.products.forEach((guestitem)=>{
                const productindex=usercart.products.findIndex((e)=>guestitem.color==e.color&&guestitem.size==e.size&&e.productId.toString()==guestitem.productId.toString())
             if(productindex!=-1){
                usercart.products[productindex].quantity+=guestitem.quantity
             }
             else{
                usercart.products.push(guestitem)
             }
                }
                )
            }
            usercart.totalPrice+=guestcart.products.reduce((a,i)=>a+i.price*i.quantity,0)
            usercart.save()
            await guestcart.deleteOne()

           return  res.json({data:usercart})
            
        }
        else{
            guestcart.user=req.user._id
        guestcart.guestId=undefined
        guestcart.save()

        return json({data:guestcart})

        }
        

       

       

        


}
    catch(e){
        console.error(e)
        res.json({message:"server serror"})
    }
})

export default router