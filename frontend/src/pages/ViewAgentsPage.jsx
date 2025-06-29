import { useEffect, useState } from 'react';
import axios from '../services/Axios';

export default function ViewAgentsPage() {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', mobile: '' });
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = agents.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.email.toLowerCase().includes(query)
    );
    setFilteredAgents(filtered);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/agent/${deleteId}`);
      setShowConfirm(false);
      setSuccessMsg('Agent deleted successfully ✅');
      setErrorMsg('');
      fetchAgents();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      setShowConfirm(false);
      setErrorMsg('Failed to delete agent');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  const handleEdit = (agent) => {
    setEditId(agent._id);
    setEditData({
      name: agent.name,
      email: agent.email,
      mobile: agent.mobile,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/agent/${editId}`, editData);
      setEditId(null);
      setSuccessMsg('Agent updated successfully ✅');
      setErrorMsg('');
      fetchAgents();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      setErrorMsg('Failed to update agent');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (err) return <p className="text-red-600 text-center mt-8">{err}</p>;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl bg-white mt-10 p-8 rounded-xl shadow-lg space-y-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent._id}
              className="bg-gray-50 rounded-xl shadow p-6 space-y-2 relative"
            >
              {editId === agent._id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded focus:outline-none"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                  <input
                    type="email"
                    className="w-full border px-3 py-2 rounded focus:outline-none"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  />
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded focus:outline-none"
                    value={editData.mobile}
                    onChange={(e) => setEditData({ ...editData, mobile: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-600 text-white px-4 py-1 rounded"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-4 py-1 rounded"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-blue-700">{agent.name}</h3>
                  <p className="text-gray-600">📧 {agent.email}</p>
                  <p className="text-gray-600">📱 {agent.mobile}</p>
                  <p className="text-gray-600">🧾 Tasks: {agent.taskCount || 0}</p>
                  <div className="absolute top-4 right-4 flex gap-3">
                    <button
                      onClick={() => handleEdit(agent)}
                      className="text-blue-600 text-lg hover:scale-105"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => confirmDelete(agent._id)}
                      className="text-red-600 text-lg hover:scale-105"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold mb-4 text-red-600">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this agent?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
