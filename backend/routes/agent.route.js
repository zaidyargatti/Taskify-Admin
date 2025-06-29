import { Router } from "express";
import { AgentRegister, GetAllAgents,updateAgent ,deleteAgent} from "../controllers/agent.controller.js";
import protect from "../middleware/protect.middleware.js";

const way= Router()
way.post('/agent-creation',protect,AgentRegister)
way.get('/all-agent',protect,GetAllAgents)
way.put('/:id', protect, updateAgent);
way.delete('/:id', protect, deleteAgent);

export default way