import { Router } from "express";
import protect from "../middleware/protect.middleware.js";
import { getAllTasksWithAgents } from "../controllers/task.controller.js";

const task = Router()
task.get('/all-task',protect,getAllTasksWithAgents)

export default task