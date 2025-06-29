import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Place your logo in src/assets/

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="h-screen w-64 bg-white text-gray-800 flex flex-col justify-between shadow-lg">
      <div>
        {/* Header with Logo */}
        <div className="bg-gradient-to-b from-sky-100 to-transparent p-4 rounded-b-xl">
          <img src={logo} alt="Logo" className="h-12 w-12 mx-auto mb-2" />
          <h1 className="text-xl font-bold text-center font-inter">Admin Panel</h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg font-medium ${isActive ? 'bg-sky-100 text-blue-700' : 'hover:bg-sky-50'
              }`
            }
          >
            ➕ Add Agent
          </NavLink>
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg font-medium ${isActive ? 'bg-sky-100 text-blue-700' : 'hover:bg-sky-50'
              }`
            }
          >
            📤 Upload List
          </NavLink>

          <NavLink
            to="/agents"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg font-medium ${isActive ? 'bg-sky-100 text-blue-700' : 'hover:bg-sky-50'
              }`
            }
          >
            👥 View Agents
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg font-medium ${isActive ? 'bg-sky-100 text-blue-700' : 'hover:bg-sky-50'
              }`
            }
          >
            🗂 All Tasks
          </NavLink>

        </nav>
      </div>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
