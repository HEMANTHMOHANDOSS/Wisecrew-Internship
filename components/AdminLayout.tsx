import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon,
  ShieldAlert,
  ClipboardList,
  Activity
} from 'lucide-react';
import { NavItem } from '../types';

interface AdminLayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const ADMIN_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Manage Students', path: '/admin/students', icon: GraduationCap },
  { label: 'Manage Trainers', path: '/admin/trainers', icon: Users },
  { label: 'Documents & Fees', path: '/admin/documents', icon: FileText },
  { label: 'Monitoring', path: '/admin/monitoring', icon: Activity }, // Attendance, Learning Hours
  { label: 'Feedback', path: '/admin/feedback', icon: ClipboardList },
  { label: 'Communication', path: '/admin/chat', icon: MessageSquare },
  { label: 'System Settings', path: '/admin/settings', icon: Settings },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, darkMode, toggleTheme, isAuthenticated, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden animate-fade-in bg-gray-50 dark:bg-gray-900">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[20%] w-96 h-96 bg-slate-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        
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
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen overflow-hidden relative animate-fade-in bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-slate-300 dark:bg-slate-800 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 dark:opacity-20"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-orange-200 dark:bg-orange-900/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 dark:opacity-20"></div>
       </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 glass-panel border-r border-white/20 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col bg-white/40 dark:bg-black/40
        `}
      >
        <div className="p-6 flex flex-col">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500 rounded-lg text-white">
              <ShieldAlert size={20} />
            </div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              WiseCrew<span className="text-orange-500">Admin</span>
            </h1>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 ml-1">WiseCrew Solutions Panel</p>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-600 dark:text-gray-300 absolute top-6 right-6">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.path) && (item.path !== '/admin' || location.pathname === '/admin');
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-slate-800 text-white shadow-lg shadow-slate-500/20' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5'}
                `}
              >
                <item.icon size={20} className={`${isActive ? 'text-orange-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-200'} transition-colors`} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
          
          <div className="pt-6 mt-6 border-t border-gray-200/50 dark:border-gray-700/50 px-2">
             <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 glass-panel border-b border-white/20 flex items-center justify-between px-6 z-30 shrink-0 bg-white/30 dark:bg-black/20">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 mr-4"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white hidden sm:block">
              {ADMIN_NAV_ITEMS.find(i => location.pathname.startsWith(i.path) && (i.path !== '/admin' || location.pathname === '/admin'))?.label || 'Overview'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-800 dark:text-white">Administrator</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Super Admin Access</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm shadow-md">
                AD
              </div>
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