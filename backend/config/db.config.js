import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("MongoDB Connected");
        
    } catch (error) {
        console.log("MongoDB Connection Failed",error);
        process.exit(1);
        
    }
}
export default connectDB;