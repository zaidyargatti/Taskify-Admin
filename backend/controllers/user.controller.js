import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Agent from "../models/agent.model.js";

const login = async(req,res)=>{
    try {
        const {email,password}=req.body 
        const agent = await Agent.findOne({email});
        if(agent){
            
           return res.status(400)
            .json({
                message:'Access Denied: This panel is only for ADMIN!'
            })
        }
       const user= await User.findOne({email})
       if(!user){
        return res.status(400)
                   .json({
                    message:"Invalid Email or Password"
                   })
       }
       const ismatch = await bcrypt.compare(password ,user.password)
       if(!ismatch){
        return res.status(400)
                   .json({
                    message:"Invalid Email or Password"
                   })
       }
       const token = jwt.sign({
        id:user._id,
       },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
       )
       res.status(200)
       .json({
        token,
        user:{
            id:user._id,
            email:user.email
        }
       })
    } catch (error) {
        res.status(500)
        .json({
            message:"Internel server error"
        })
    }
}

export {
    login
}