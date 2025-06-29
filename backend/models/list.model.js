import mongoose from "mongoose";
 
const ListSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    notes:{
        type:String,
        default:''
    },
    assigneTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Agent",
        required:true
    }
},{timestamps:true})

const Listitem = mongoose.model ("Listitem",ListSchema);
export default Listitem;