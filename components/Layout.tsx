import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  CalendarCheck, 
  MessageCircleQuestion, 
  Video, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Lock,
  HelpCircle
} from 'lucide-react';
import { NavItem } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Profile', path: '/profile', icon: User },
  { label: 'Attendance', path: '/attendance', icon: CalendarCheck },
  { label: 'Ask Doubt', path: '/ask-doubt', icon: MessageCircleQuestion },
  { label: 'Request Session', path: '/request-session', icon: Video },
  { label: 'Chat with HR', path: '/chat-hr', icon: MessageSquare },
];

export const Layout: React.FC<LayoutProps> = ({ children, darkMode, toggleTheme, isAuthenticated, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        
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
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
       {/* Abstract Background Shapes for Dashboard */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 dark:opacity-10"></div>
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 dark:opacity-10"></div>
       </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 glass-panel border-r border-white/20 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="p-6 flex flex-col">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            WiseCrew Academy
          </h1>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Powered by WiseCrew Solutions</p>
          <button onClick={() => setIsSidebarOpen(false)} className="absolute top-6 right-6 lg:hidden text-gray-600 dark:text-gray-300">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-800/40'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
          
          <div className="pt-6 mt-6 border-t border-gray-200/50 dark:border-gray-700/50">
             <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors">
                <Lock size={20} />
                <span className="font-medium">Change Password</span>
             </button>
             <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors">
                <HelpCircle size={20} />
                <span className="font-medium">Forgot Password</span>
             </button>
             <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-2"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 glass-panel border-b border-white/20 flex items-center justify-between px-6 z-30 shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 mr-4"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white hidden sm:block">
              {NAV_ITEMS.find(i => i.path === location.pathname)?.label || 'Portal'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
             {/* Info ticker for large screens */}
             <div className="hidden md:flex items-center text-xs font-medium px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
               <span className="animate-pulse mr-2 w-2 h-2 rounded-full bg-indigo-500"></span>
               Online Session Default: 7 PM - 8 PM (Mon-Fri)
             </div>

            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer" onClick={() => navigate('/profile')}>
              JD
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};