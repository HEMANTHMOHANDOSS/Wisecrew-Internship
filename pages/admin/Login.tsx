import React, { useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { LogIn, Lock, ShieldCheck, Mail, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@wisecrew.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-md w-full">
      <div className="text-center">
         <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">WiseCrew Solutions</h1>
         <p className="text-orange-600 dark:text-orange-400 font-semibold text-lg">Administrative Panel</p>
      </div>

      <GlassCard className="w-full shadow-2xl border-t-4 border-t-orange-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-orange-500 transform rotate-3">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-1">Admin Control</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Restricted Access Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase ml-1">Admin ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="admin@wisecrew.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-slate-800 dark:text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase ml-1">Security Key</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-slate-800 dark:text-white placeholder-slate-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed border-b-4 border-orange-600"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn size={20} />
                <span>Authenticate</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
          <p className="text-xs text-slate-400 mb-2">
            Unauthorized access is prohibited and monitored.
          </p>
          <Link to="/login" className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline">Return to Student Portal</Link>
        </div>
      </GlassCard>

      {/* Demo Credentials Box */}
      <GlassCard className="bg-orange-50/80 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
         <h3 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
            <ShieldAlert size={16} className="text-orange-500" /> Demo Credentials
         </h3>
         <div className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex justify-between items-center p-2 rounded hover:bg-white/30 dark:hover:bg-white/5 transition-colors">
               <span><strong>Student:</strong> student@wisecrew.com / student123</span>
               <Link to="/login" className="text-orange-600 dark:text-orange-400 hover:underline font-bold">Go to Portal</Link>
            </div>
            <div className="flex justify-between items-center p-2 rounded hover:bg-white/30 dark:hover:bg-white/5 transition-colors">
               <span><strong>Trainer:</strong> trainer@wisecrew.com / trainer123</span>
               <Link to="/trainer/login" className="text-orange-600 dark:text-orange-400 hover:underline font-bold">Go to Portal</Link>
            </div>
            <div className="flex justify-between items-center bg-white/50 dark:bg-black/20 p-2 rounded">
               <span><strong>Admin:</strong> admin@wisecrew.com / admin123</span>
               <span className="text-green-600 font-bold text-[10px] uppercase">Current</span>
            </div>
         </div>
      </GlassCard>
    </div>
  );
};

export default AdminLogin;