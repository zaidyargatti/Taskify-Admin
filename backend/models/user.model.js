import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const User = mongoose.model("User",UserSchema)
export default User