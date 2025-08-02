import mongoose from "mongoose";
import dotenv from"dotenv"
import Product from "./models/products.js";
import User from "./models/users.js";
import Cart from "./models/cart.js";
import products from "./data/products.js";
import Order from "./models/order.js";
dotenv.config()
async function seedData(){
    await mongoose.connect(process.env.MONGO_URL)

    try{//clear exisiting data
        await Product.deleteMany()
        await User.deleteMany()
        await Cart.deleteMany()
        await Order.deleteMany()


        //createdefaultadmin
        const dadmin=await User.create({
            name:"mohit",email:"mohit@gmail.com",password:"123456",role:"admin"
        })

        //default user id  who created them
        const userId=dadmin._id
        const sampleproducts=products.map(e=>({...e,user:userId}))

        await Product.insertMany(sampleproducts)


        console.log("proucdts data seeded successfully")


         

        




    }
    catch(e){
        console.log(e,"error")
console.log("there is the problem is seeding data")
    }
}

seedData()