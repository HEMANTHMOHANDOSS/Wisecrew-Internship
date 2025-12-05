import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { LogIn, Lock, Mail, Building, Users, ShieldAlert, GraduationCap } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('student@wisecrew.com');
  const [password, setPassword] = useState('student123');
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
         <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg">& WiseCrew Academy</p>
      </div>

      <GlassCard className="w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
            <GraduationCap size={32} />
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-2">Student Portal</h2>
          <p className="text-gray-500 dark:text-gray-400">Sign in to access your courses</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Mail size={18} />
            </div>
            <input
              type="email"
              placeholder="Student Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 dark:text-white placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Lock size={18} />
            </div>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 dark:text-white placeholder-gray-400"
            />
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn size={20} />
                <span>Login as Student</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            Create Account
          </Link>
        </div>
      </GlassCard>

      {/* Demo Credentials Box */}
      <GlassCard className="bg-orange-50/80 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
         <h3 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
            <ShieldAlert size={16} className="text-orange-500" /> Demo Credentials
         </h3>
         <div className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex justify-between items-center bg-white/50 dark:bg-black/20 p-2 rounded">
               <span><strong>Student:</strong> student@wisecrew.com / student123</span>
               <span className="text-green-600 font-bold text-[10px] uppercase">Current</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded hover:bg-white/30 dark:hover:bg-white/5 transition-colors">
               <span><strong>Trainer:</strong> trainer@wisecrew.com / trainer123</span>
               <Link to="/trainer/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold">Go to Portal</Link>
            </div>
            <div className="flex justify-between items-center p-2 rounded hover:bg-white/30 dark:hover:bg-white/5 transition-colors">
               <span><strong>Admin:</strong> admin@wisecrew.com / admin123</span>
               <Link to="/admin/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold">Go to Panel</Link>
            </div>
         </div>
      </GlassCard>
    </div>
  );
};

export default Login;