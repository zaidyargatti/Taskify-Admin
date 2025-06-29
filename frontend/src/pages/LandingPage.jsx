import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left side content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 py-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 font-inter">
          Welcome to Admin Panel
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Manage your agents and assigned tasks from a powerful dashboard. Upload task lists, view statistics, and monitor progress with ease.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="w-48 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Go to Admin Login
        </button>
      </div>

      {/* Right side illustration or color accent */}
      <div className="w-full lg:w-1/2 bg-gradient-to-tr from-sky-100 via-sky-300 to-sky-500 flex items-center justify-center p-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Admin Illustration"
          className="w-72 lg:w-96"
        />
      </div>
    </div>
  );
}
