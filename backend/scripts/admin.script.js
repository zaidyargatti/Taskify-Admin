This script was use to create admin it was already run one time and it's work is done.

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import connectDB from "../config/db.config.js";

dotenv.config()
connectDB()

const hashed = await bcrypt.hash('Admin@01',10)
await User.create({
    email:'admin@gmail.com',
    password:hashed
})

console.log('Admin Created');
process.exit()
