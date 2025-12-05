import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { StudentProfile } from '../types';
import { 
  Briefcase, 
  GraduationCap, 
  HelpCircle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Download, 
  Eye,
  TrendingUp
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  profile: StudentProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  const stats = [
    { label: 'Questions Asked', value: 24, icon: HelpCircle, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Resolved', value: 21, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Attendance', value: '92%', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  ];

  const pieData = [
    { name: 'Completed', value: profile.projectProgress },
    { name: 'Remaining', value: 100 - profile.projectProgress },
  ];
  const COLORS = ['#8b5cf6', '#e5e7eb']; // Violet and Gray

  return (
    <div className="space-y-6">
      
      {/* Top Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, {profile.name}!</p>
        </div>
        <div className="flex space-x-2">
           <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-white/70 transition-all">
             <TrendingUp size={16} />
             <span>View Activity</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <GlassCard className="lg:col-span-2 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start z-10 relative">
            <div className="w-32 h-32 rounded-full border-4 border-white/50 shadow-lg overflow-hidden shrink-0">
              <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center sm:text-left space-y-2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{profile.name}</h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50">{profile.registerNumber}</span>
                <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50">{profile.year}</span>
                <span className="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/50">{profile.department}</span>
              </div>
              <div className="pt-2 text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <p className="flex items-center justify-center sm:justify-start gap-2">
                   <Briefcase size={16} />
                   <span>{profile.college}</span>
                </p>
                <p className="flex items-center justify-center sm:justify-start gap-2">
                   <GraduationCap size={16} />
                   <span>Internal Guide: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{profile.internalGuide}</span></span>
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Project Status */}
        <GlassCard title="Project Completion" className="flex flex-col items-center justify-center">
          <div className="h-40 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : 'rgba(156, 163, 175, 0.2)'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{profile.projectProgress}%</span>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-2 text-center">{profile.projectTitle}</p>
          
          {/* Added Linear Progress Bar */}
          <div className="w-full mt-5 px-2">
            <div className="flex justify-between mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
               <span>Progress</span>
               <span>{profile.projectProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
               <div 
                 className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                 style={{ width: `${profile.projectProgress}%` }}
               ></div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <GlassCard key={idx} className="flex items-center space-x-4">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Documents Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Offer Letter */}
        <GlassCard title="Offer Letter">
           <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white/20 dark:bg-black/20">
             <FileText size={48} className="text-indigo-400 mb-2" />
             <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-4">Internship_Offer_Letter.pdf</p>
             <div className="flex gap-2 w-full">
               <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm transition-colors">
                 <Eye size={16} /> Preview
               </button>
               <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-sm transition-colors">
                 <Download size={16} /> Download
               </button>
             </div>
           </div>
        </GlassCard>

        {/* Fee Receipt */}
        <GlassCard title="Fee Receipt">
           <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white/20 dark:bg-black/20">
             <FileText size={48} className="text-green-400 mb-2" />
             <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-4">Tuition_Fee_Receipt_2024.pdf</p>
             <div className="flex gap-2 w-full">
               <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm transition-colors">
                 <Eye size={16} /> Preview
               </button>
               <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-sm transition-colors">
                 <Download size={16} /> Download
               </button>
             </div>
           </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;