import Agent from "../models/agent.model.js";
import bcrypt from "bcryptjs";
import Listitem from '../models/list.model.js';


const AgentRegister = async(req,res)=>{
    try {
        const {name,email,mobile,password}=req.body
        if(!name || !email || !mobile || !password){
            res.status(400)
            .json({
                message:'All fileds are required!'
            })
        }
        const exist = await Agent.findOne({email})
        if(exist){
            res.status(400)
            .json({
                message:'Agent already exist!'
            })
        }
        const HashedPassword = await bcrypt.hash(password,10)
        const agent = await Agent.create({
            name,
            email,
            mobile,
            password:HashedPassword
        })
        res.status(201)
        .json({
            message:'Agent Created!',
            agent
        })

    } catch (error) {
        console.log(error)
        res.status(500)
        .json({
            message:'Internal server error!'
        })
    }
}

const GetAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find({}, '-password');

    const agentsWithTaskCount = await Promise.all(
      agents.map(async (agent) => {
        const count = await Listitem.countDocuments({ assigneTo: agent._id });
        return { ...agent.toObject(), taskCount: count };
      })
    );

    res.status(200).json(agentsWithTaskCount);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching agents' });
  }
};

const updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    const { name, email, mobile } = req.body;
    agent.name = name || agent.name;
    agent.email = email || agent.email;
    agent.mobile = mobile || agent.mobile;

    await agent.save();
    res.status(200).json({ message: 'Agent updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};

export {
    AgentRegister,
    GetAllAgents,
    updateAgent,
    deleteAgent
}