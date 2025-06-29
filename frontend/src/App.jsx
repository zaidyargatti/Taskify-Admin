import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import UploadListPage from './pages/UploadListPage';
import Layout from './components/Layout';
import ViewAgentsPage from './pages/ViewAgentsPage';
import AllTasksPage from './pages/AllTasksPage';
import LandingPage from './pages/LandingPage'; 

const isAuthenticated = () => !!localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Make landing page the root route */}
        <Route path="/" element={<LandingPage />} />

        {/* ✅ Login route moved separately */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<div className="text-center mt-10 text-red-500">404 - Page Not Found</div>} />


        {/* ✅ Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/upload"
          element={
            isAuthenticated() ? (
              <Layout>
                <UploadListPage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/agents"
          element={
            isAuthenticated() ? (
              <Layout>
                <ViewAgentsPage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/tasks"
          element={
            isAuthenticated() ? (
              <Layout>
                <AllTasksPage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
