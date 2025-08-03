import express from "express"
import mongoose from "mongoose"
import  dotenv from "dotenv"
import cors from "cors"
import productRoutes from "./routes/productroutes.js"
import userRoutes from "./routes/userRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import checkoutRoutes from "./routes/checkoutRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from"./routes/uploadRoutes.js"
import subscribeRoutes from "./routes/subscribeRoutes.js"
import adminUserRoutes from "./routes/adminUserRoutes.js"
import adminProductRoutes from "./routes/adminProductRoutes.js"
import adminOrderRoutes from"./routes/adminOrderroutes.js"
import subscribeeRoutes from "./routes/subscribeRoutes.js"
dotenv.config()

const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL
const app=express()

//midlerwares
//jsonbodyparser come in to play when from data is transfered from front to back(client to server)
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173","https://rabbit-zj1k.vercel.app"],

    credentials:true,//allows for cookies,authorization
    methods:['GET','POST','PUT','DELETE']
}))

//api routes
app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/checkout',checkoutRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/subscribe',subscribeRoutes)
app.use('/api/admin/user',adminUserRoutes)
app.use('/api/admin/product',adminProductRoutes)
app.use('/api/admin/order',adminOrderRoutes)
app.use("/email",subscribeeRoutes)







//admintoken-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg4NGNlZTBjZjllY2QyZDEwOTc0ZGFkIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTc1MzYwMTA3MCwiZXhwIjoxNzUzNzQ1MDcwfQ.33labCdyS_IVR94scL0Xq0eEBYapc0LpPsqbmgawMz0















async function connectdb(){
    try{
await mongoose.connect(MONGO_URL)
console.log("Database is connected")
    }
    catch(e){
        console.error(e)
    }

}




app.listen(PORT,()=>{
    console.log("server is runing on ",PORT)
    connectdb()
})