import { Router } from "express";
import protect from "../middleware/protect.middleware.js";
import { uploadlist } from "../controllers/list.controller.js";
import upload from "../middleware/multer.middleware.js";

const route= Router()

route.post('/upload',protect,upload.single('file'), uploadlist)

export default route