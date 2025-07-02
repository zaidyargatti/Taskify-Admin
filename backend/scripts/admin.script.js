// adminCreator.js

import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.config.js";
import User from "../models/user.model.js";

dotenv.config();
await connectDB();

const createAdmin = async () => {
  try {
    const email = 'admin2@gmail.com';
    const password = 'Admin@01';

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log(" Admin already exists with this email!");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        password: hashedPassword,
      });
      console.log(" Admin created successfully!");
    }

  } catch (error) {
    console.error(" Error creating admin:", error);
  } finally {
    process.exit();
  }
};

createAdmin();
