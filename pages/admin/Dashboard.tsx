import React from 'react';
import { GlassCard } from '../../components/GlassCard';
import { Users, GraduationCap, DollarSign, AlertCircle, TrendingUp, Activity } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid } from 'recharts';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Students', value: 1240, icon: GraduationCap, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { label: 'Active Trainers', value: 48, icon: Users, color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-900/30' },
    { label: 'Pending Fees', value: '$12.5k', icon: DollarSign, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
    { label: 'System Issues', value: 3, icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  ];

  const chartData = [
    { name: 'Mon', active: 400 },
    { name: 'Tue', active: 300 },
    { name: 'Wed', active: 550 },
    { name: 'Thu', active: 450 },
    { name: 'Fri', active: 600 },
    { name: 'Sat', active: 200 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-slate-800 dark:text-white">System Overview</h1>
           <p className="text-slate-500 dark:text-slate-400">Real-time platform monitoring</p>
        </div>
        <button className="flex items-center space-x-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors shadow-lg">
          <Activity size={18} />
          <span>Generate Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <GlassCard key={idx} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2" title="User Activity (Weekly)">
           <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                 <Bar dataKey="active" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </GlassCard>

        <GlassCard title="Pending Actions">
           <div className="space-y-4">
             {[
               { title: "Review New Trainers", time: "2 pending", color: "bg-teal-100 text-teal-700" },
               { title: "Approve Fee Waivers", time: "5 requests", color: "bg-red-100 text-red-700" },
               { title: "Feedback Response", time: "12 unread", color: "bg-orange-100 text-orange-700" },
               { title: "System Updates", time: "Up to date", color: "bg-green-100 text-green-700" }
             ].map((item, i) => (
               <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.title}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${item.color}`}>{item.time}</span>
               </div>
             ))}
           </div>
           <button className="w-full mt-4 text-center text-sm text-indigo-500 font-medium hover:underline">View All Tasks</button>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminDashboard;