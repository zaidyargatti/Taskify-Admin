import { useEffect, useState } from 'react';
import axios from '../services/Axios';

export default function ViewAgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAgents, setFilteredAgents] = useState([]);

  const [taskModal, setTaskModal] = useState({ open: false, agent: null });
  const [agentTasks, setAgentTasks] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchAgents = async () => {
    try {
      const res = await axios.get('/agent/all-agent');
      setAgents(res.data);
      setFilteredAgents(res.data);
    } catch (error) {
      setErr('Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearchQuery(q);
    const filtered = agents.filter(
      (a) =>
        a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)
    );
    setFilteredAgents(filtered);
  };

  const handleShowTasks = async (agent) => {
    try {
      const res = await axios.get(`/task/agent/${agent._id}`);
      setAgentTasks(res.data);
      setTaskModal({ open: true, agent });
    } catch (error) {
      setErrorMsg('Failed to fetch tasks');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (err) return <p className="text-red-600 text-center mt-8">{err}</p>;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl bg-white mt-10 p-8 rounded-xl shadow-lg space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold font-inter text-gray-800">All Agents</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name or email"
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none w-64"
          />
        </div>

        {successMsg && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-center">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-center">
            {errorMsg}
          </div>
        )}

        {/* Table UI */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-sky-100 text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Mobile</th>
                <th className="px-6 py-3">Tasks</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.map((agent) => (
                <tr key={agent._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{agent.name}</td>
                  <td className="px-6 py-4 text-gray-700">{agent.email}</td>
                  <td className="px-6 py-4 text-gray-700">{agent.mobile}</td>
                  <td className="px-6 py-4 text-gray-700">{agent.taskCount || 0}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-sky-500 hover:bg-sky-600 text-white text-sm px-4 py-1 rounded"
                      onClick={() => handleShowTasks(agent)}
                    >
                      View Tasks
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAgents.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No agents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Modal */}
      {taskModal.open && (
    <div className="fixed inset-0  bg-opacity-40 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Tasks for: {taskModal.agent.name}
            </h3>

            {agentTasks.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {agentTasks.map((task) => (
                  <li key={task._id}>📌 {task.notes}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No tasks assigned to this agent.</p>
            )}

            <button
              onClick={() => setTaskModal({ open: false, agent: null })}
              className="mt-4 px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
