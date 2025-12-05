import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Users, 
  Video, 
  CalendarCheck, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Briefcase
} from 'lucide-react';
import { NavItem } from '../types';

interface TrainerLayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const TRAINER_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/trainer', icon: LayoutDashboard },
  { label: 'My Profile', path: '/trainer/profile', icon: User },
  { label: 'Students List', path: '/trainer/students', icon: Users },
  { label: 'Session Requests', path: '/trainer/requests', icon: Video },
  { label: 'Attendance', path: '/trainer/attendance', icon: CalendarCheck },
  { label: 'Chat with CEO', path: '/trainer/chat-ceo', icon: Briefcase },
];

export const TrainerLayout: React.FC<TrainerLayoutProps> = ({ children, darkMode, toggleTheme, isAuthenticated, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden animate-fade-in">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        
        <div className="absolute top-4 right-4 z-50">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full glass-panel hover:bg-white/50 transition-colors text-gray-800 dark:text-white"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <div className="w-full max-w-md z-10">
          {children}
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    onLogout();
    navigate('/trainer/login');
  };

  return (
    <div className="flex h-screen overflow-hidden relative animate-fade-in">
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[20%] right-[30%] w-80 h-80 bg-teal-300 dark:bg-teal-900 rounded-full mix-blend-multiply filter blur-[90px] opacity-20 dark:opacity-10"></div>
          <div className="absolute bottom-[10%] left-[10%] w-96 h-96 bg-cyan-300 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-[90px] opacity-20 dark:opacity-10"></div>
       </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 glass-panel border-r border-white/20 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="p-6 flex flex-col">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400">
            WiseCrew Trainer
          </h1>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">WiseCrew Solutions</p>
          <button onClick={() => setIsSidebarOpen(false)} className="absolute top-6 right-6 lg:hidden text-gray-600 dark:text-gray-300">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {TRAINER_NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-800/40'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
          
          <div className="pt-6 mt-6 border-t border-gray-200/50 dark:border-gray-700/50">
             <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 glass-panel border-b border-white/20 flex items-center justify-between px-6 z-30 shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 mr-4"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white hidden sm:block">
              {TRAINER_NAV_ITEMS.find(i => i.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer" onClick={() => navigate('/trainer/profile')}>
              TR
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};