import jwt from "jsonwebtoken"
import User from "../models/users.js"

console.log(process.env.JWT_SECRET)
async function protect(req,res,next){
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){

        try{
            const token=req.headers.authorization.split(" ")[1]
            const decode= jwt.verify(token,process.env.JWT_SECRET)
            const user= await User.findById(decode.user.id).select('-password')
            req.user=user
            next()

        }
        catch(e){
            console.error(e)
            res.status(401).json({
                success:false,
                message:"token authorization failed"
            })
        }
    }
    else{
        res.status(401).json({
            success:false,
            message:"unauthorize access denialed"
        })
    }

}

export async function checkadmin(req,res,next){
if(req.user&& req.user.role=="admin"){
    next()

}
else{
   return res.status(403).json({
        sucess:false,
        message:"unauthorize access denieal"
    })
}
}
export default protect