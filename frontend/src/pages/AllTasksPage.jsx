import { useEffect, useState } from 'react';
import axios from '../services/Axios';
import { Trash2 } from 'lucide-react'; // Make sure lucide-react is installed

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
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl bg-white mt-10 p-8 rounded-xl shadow-lg space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold font-inter text-gray-800">📋 All Tasks</h2>
          <button
            className="text-red-600 hover:text-red-700 transition-all"
            title="Delete All Tasks"
            onClick={() => console.log('Delete clicked')} // Add actual delete logic here
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-sky-100 text-gray-700 uppercase">
                <tr>
                  <th className="px-6 py-3">First Name</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Notes</th>
                  <th className="px-6 py-3">Assigned To</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">{task.firstName}</td>
                    <td className="px-6 py-4 text-gray-700">{task.phone}</td>
                    <td className="px-6 py-4 text-gray-700">{task.notes}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {task.assigneTo?.name || 'Unassigned'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
