import React, { useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { Users, HelpCircle, CheckCircle, Clock, Zap } from 'lucide-react';

const TrainerDashboard: React.FC = () => {
  const [status, setStatus] = useState('Online');
  const statuses = ['Online', 'Offline', 'Idle', 'Leave', 'Available', 'Holiday'];

  const stats = [
    { label: 'Total Students', value: 142, icon: Users, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Questions Raised', value: 38, icon: HelpCircle, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { label: 'Questions Solved', value: 32, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Time Spent', value: '42h', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Trainer Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Overview of your performance and students</p>
        </div>
        
        <GlassCard className="p-2 flex space-x-1">
          {statuses.map((s) => (
             <button 
               key={s}
               onClick={() => setStatus(s)}
               className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                 status === s 
                   ? 'bg-teal-500 text-white shadow-lg' 
                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
               }`}
             >
               {s}
             </button>
          ))}
        </GlassCard>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <GlassCard key={idx} className="flex items-center space-x-4 transform transition-all hover:scale-105">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Recent Activity / Visual Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <GlassCard className="lg:col-span-2" title="Weekly Doubt Resolution">
            <div className="h-64 flex items-end justify-between px-4 pb-2 gap-2">
               {[40, 65, 30, 85, 50, 75, 60].map((h, i) => (
                 <div key={i} className="w-full bg-gray-100 dark:bg-gray-800 rounded-t-xl relative group overflow-hidden">
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-teal-500 to-cyan-400 rounded-t-xl transition-all duration-1000" 
                      style={{ height: `${h}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-white font-bold text-sm transition-opacity z-10">
                      {h}
                    </div>
                 </div>
               ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
               <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
         </GlassCard>

         <GlassCard title="Quick Actions">
            <div className="space-y-3">
               <button className="w-full flex items-center justify-between p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors">
                  <span className="flex items-center gap-2"><Zap size={18} /> Start Instant Session</span>
               </button>
               <button className="w-full flex items-center justify-between p-3 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors">
                  <span className="flex items-center gap-2"><CheckCircle size={18} /> Review Pending Tasks</span>
               </button>
            </div>
         </GlassCard>
      </div>
    </div>
  );
};

export default TrainerDashboard;