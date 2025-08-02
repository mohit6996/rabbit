import express from "express"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import streamifier from "streamifier"
import dotenv from "dotenv"
dotenv.config()



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
})

//multer setup 
const storage=multer.memoryStorage()
const upload=multer({storage})
const router=express.Router()

//router to get images sand with midller of multer
router.post("/",upload.single("image"),async(req,res)=>{
    try{
            if(!req.file){
res.status(400).json({message:"file not found"})
            }


            const streamUpload=(fileBuffer)=>{
                return new Promise((resolve,reject)=>{
                const stream=cloudinary.uploader.upload_stream((err,res)=>{
                    if(res){
                        resolve(res)
                    }
                    else{   
                           reject(err) 
                    }
                })
                //user streamfier
                streamifier.createReadStream(fileBuffer).pipe(stream)
            }
        )
    }
    const result=await streamUpload(req.file.buffer)

    res.json({data:result.secure_url})
}
    catch(e){
        console.error(e)
        res.status(500).json({message:"sevrer error"})

    }

})


export default router