import { Router } from "express";
import protect from "../middleware/protect.middleware.js";
import { getAllTasksWithAgents, gettaskbyagent } from "../controllers/task.controller.js";


const task = Router()
task.get('/all-task',protect,getAllTasksWithAgents)
task.get('/agent/:agentId',protect,gettaskbyagent)

export default task