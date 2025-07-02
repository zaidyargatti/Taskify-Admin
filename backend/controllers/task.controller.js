import Listitem from "../models/list.model.js";

const getAllTasksWithAgents = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const tasks = await Listitem.find({createdBy})
      .populate('assigneTo', 'name email mobile') // get agent details
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json(tasks);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

const gettaskbyagent =  async (req, res) => {
  try {
    const tasks = await Listitem.find({ assigneTo: req.params.agentId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};


export { 
    getAllTasksWithAgents ,
    gettaskbyagent
};