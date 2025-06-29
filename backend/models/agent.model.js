import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
      type:String,
      required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const Agent = mongoose.model("Agent",AgentSchema)
export default Agent