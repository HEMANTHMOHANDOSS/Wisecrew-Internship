import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TrainerLayout } from './components/TrainerLayout';
import { AdminLayout } from './components/AdminLayout';
import { StudentProfile, UserRole } from './types';

// Student Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import AskDoubt from './pages/AskDoubt';
import RequestSession from './pages/RequestSession';
import ChatHR from './pages/ChatHR';

// Trainer Pages
import TrainerLogin from './pages/trainer/Login';
import TrainerRegister from './pages/trainer/Register';
import TrainerDashboard from './pages/trainer/Dashboard';
import TrainerProfile from './pages/trainer/Profile';
import TrainerStudentsList from './pages/trainer/StudentsList';
import TrainerSessionRequests from './pages/trainer/SessionRequests';
import TrainerAttendance from './pages/trainer/Attendance';
import ChatCEO from './pages/trainer/ChatCEO';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import StudentManager from './pages/admin/StudentManager';
import TrainerManager from './pages/admin/TrainerManager';
import DocumentsManager from './pages/admin/Documents';
import AdminChat from './pages/admin/ChatSystem';
import FeedbackManager from './pages/admin/Feedback';
import AdminSettings from './pages/admin/Settings';

// Mock Data Initial State
const initialProfile: StudentProfile = {
  name: "John Doe",
  registerNumber: "REG2024001",
  year: "Final Year",
  department: "Computer Science",
  college: "Tech Institute of Advanced Studies",
  projectTitle: "AI-Based Attendance System",
  projectProgress: 65,
  internalGuide: "Dr. Sarah Smith",
  internalGuideContact: "sarah.smith@college.edu",
  parentContact: "+1 234 567 8900",
  personalEmail: "john.doe@gmail.com",
  collegeEmail: "john.d@college.edu",
  phone: "+1 987 654 3210",
  location: "New York, USA",
  skills: ["React", "Python", "Machine Learning"],
  avatarUrl: "https://picsum.photos/200"
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Single source of truth for user role to ensure distinct sessions
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  
  const [userProfile, setUserProfile] = useState<StudentProfile>(initialProfile);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // Role-based Login Handlers
  const studentLogin = () => setUserRole('student');
  const trainerLogin = () => setUserRole('trainer');
  const adminLogin = () => setUserRole('admin');
  
  const logout = () => setUserRole(null);

  return (
    <Router>
      <Routes>
        {/* ================= Student Routes ================= */}
        <Route path="/login" element={userRole !== 'student' ? <Login onLogin={studentLogin} /> : <Navigate to="/" />} />
        <Route path="/register" element={userRole !== 'student' ? <Register onRegister={studentLogin} /> : <Navigate to="/" />} />
        
        <Route path="/" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme} isAuthenticated={userRole === 'student'} onLogout={logout}>
             {userRole === 'student' ? <Dashboard profile={userProfile} /> : <Navigate to="/login" />}
          </Layout>
        } />
        <Route path="/profile" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme} isAuthenticated={userRole === 'student'} onLogout={logout}>
             {userRole === 'student' ? <Profile profile={userProfile} setProfile={setUserProfile} /> : <Navigate to="/login" />}
          </Layout>
        } />
        <Route path="/attendance" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme} isAuthenticated={userRole === 'student'} onLogout={logout}>
             {userRole === 'student' ? <Attendance /> : <Navigate to="/login" />}
          </Layout>
        } />
        <Route path="/ask-doubt" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme} isAuthenticated={userRole === 'student'} onLogout={logout}>
             {userRole === 'student' ? <AskDoubt /> : <Navigate to="/login" />}
          </Layout>
        } />
        <Route path="/request-session" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme} isAuthenticated={userRole === 'student'} onLogout={logout}>
             {userRole === 'student' ? <RequestSession /> : <Navigate to="/login" />}
          </Layout>
        } />
        <Route path="/chat-hr" element={
          <Layout darkMode={darkMode} toggleTheme={toggleTheme} isAuthenticated={userRole === 'student'} onLogout={logout}>
             {userRole === 'student' ? <ChatHR /> : <Navigate to="/login" />}
          </Layout>
        } />

        {/* ================= Trainer Routes ================= */}
        <Route path="/trainer/login" element={userRole !== 'trainer' ? <TrainerLogin onLogin={trainerLogin} /> : <Navigate to="/trainer" />} />
        <Route path="/trainer/register" element={userRole !== 'trainer' ? <TrainerRegister onRegister={trainerLogin} /> : <Navigate to="/trainer" />} />

        <Route path="/trainer/*" element={
          <TrainerLayout darkMode={darkMode} toggleTheme={toggleTheme} isAuthenticated={userRole === 'trainer'} onLogout={logout}>
            <Routes>
               <Route path="/" element={userRole === 'trainer' ? <TrainerDashboard /> : <Navigate to="/trainer/login" />} />
               <Route path="/profile" element={userRole === 'trainer' ? <TrainerProfile /> : <Navigate to="/trainer/login" />} />
               <Route path="/students" element={userRole === 'trainer' ? <TrainerStudentsList /> : <Navigate to="/trainer/login" />} />
               <Route path="/requests" element={userRole === 'trainer' ? <TrainerSessionRequests /> : <Navigate to="/trainer/login" />} />
               <Route path="/attendance" element={userRole === 'trainer' ? <TrainerAttendance /> : <Navigate to="/trainer/login" />} />
               <Route path="/chat-ceo" element={userRole === 'trainer' ? <ChatCEO /> : <Navigate to="/trainer/login" />} />
            </Routes>
          </TrainerLayout>
        } />

        {/* ================= Admin Routes ================= */}
        <Route path="/admin/login" element={userRole !== 'admin' ? <AdminLogin onLogin={adminLogin} /> : <Navigate to="/admin" />} />
        
        <Route path="/admin/*" element={
          <AdminLayout darkMode={darkMode} toggleTheme={toggleTheme} isAuthenticated={userRole === 'admin'} onLogout={logout}>
            <Routes>
               <Route path="/" element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
               <Route path="/students" element={userRole === 'admin' ? <StudentManager /> : <Navigate to="/admin/login" />} />
               <Route path="/trainers" element={userRole === 'admin' ? <TrainerManager /> : <Navigate to="/admin/login" />} />
               <Route path="/documents" element={userRole === 'admin' ? <DocumentsManager /> : <Navigate to="/admin/login" />} />
               <Route path="/chat" element={userRole === 'admin' ? <AdminChat /> : <Navigate to="/admin/login" />} />
               <Route path="/feedback" element={userRole === 'admin' ? <FeedbackManager /> : <Navigate to="/admin/login" />} />
               <Route path="/settings" element={userRole === 'admin' ? <AdminSettings /> : <Navigate to="/admin/login" />} />
               <Route path="/monitoring" element={userRole === 'admin' ? <div className="text-center text-slate-500 mt-10">Monitoring Module Under Construction</div> : <Navigate to="/admin/login" />} />
            </Routes>
          </AdminLayout>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;