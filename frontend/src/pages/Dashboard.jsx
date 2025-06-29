import { useState } from 'react';
import axios from '../services/Axios';

export default function Dashboard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    countryCode: '+91',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const fullMobile = `${formData.countryCode}${formData.mobile}`;
      const res = await axios.post('/agent/agent-creation', {
        ...formData,
        mobile: fullMobile,
      });
      setMessage(res.data.message);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        password: '',
        countryCode: '+91',
      });
    } catch (err) {
      setError(err?.response?.data?.message || 'Error creating agent');
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl bg-white mt-10 p-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-2xl font-semibold font-inter text-gray-800 text-center">Create Agent</h2>

        {message && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{message}</div>}
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Mobile</label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-2 bg-white"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+81">🇯🇵 +81</option>
              </select>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-0"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition "
          >
            Add Agent
          </button>
        </form>
      </div>
    </div>
  );
}
