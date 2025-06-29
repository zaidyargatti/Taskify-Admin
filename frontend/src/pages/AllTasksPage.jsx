import { useEffect, useState } from 'react';
import axios from '../services/Axios';

export default function AllTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/task/all-task');
        setTasks(res.data);
      } catch (err) {
        console.error('Failed to load tasks', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading tasks...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold font-inter mb-6 text-gray-800">📋 All Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white  rounded-xl shadow p-4 space-y-2"
            >
              <p className="text-lg font-semibold text-blue-700">{task.firstName}</p>
              <p>📞 {task.phone}</p>
              <p>📝 {task.notes}</p>
              <div className="pt-2 text-sm text-gray-600 border-t mt-2">
                👤 <strong>{task.assigneTo?.name}</strong><br />
                📧 {task.assigneTo?.email}<br />
                📱 {task.assigneTo?.mobile}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
