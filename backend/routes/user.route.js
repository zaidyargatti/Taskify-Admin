import { Router } from "express";
import { login } from "../controllers/user.controller.js";

const path=Router()

path.post('/login',login)

export default path