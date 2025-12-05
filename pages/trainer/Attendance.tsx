import React from 'react';
import { GlassCard } from '../../components/GlassCard';
import { CalendarCheck, Bell, UserX } from 'lucide-react';

const TrainerAttendance: React.FC = () => {
  const absentees = [
    { name: "Tom Holland", date: "Today" },
    { name: "Zendaya", date: "Today" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
       {/* My Attendance */}
       <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Attendance</h2>
          <GlassCard className="text-center py-10">
             <div className="w-24 h-24 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CalendarCheck size={48} />
             </div>
             <p className="text-gray-500 mb-6">Mark your daily attendance</p>
             <div className="flex justify-center gap-4">
                <button className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold shadow-lg transition-transform hover:scale-105">Present</button>
                <button className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl font-bold transition-transform hover:scale-105">Leave</button>
             </div>
          </GlassCard>
       </div>

       {/* Student Attendance Panel */}
       <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Student Absentees</h2>
          <div className="space-y-4">
             {absentees.map((student, i) => (
                <GlassCard key={i} className="flex items-center justify-between p-4">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-lg">
                         <UserX size={20} />
                      </div>
                      <div>
                         <h4 className="font-bold text-gray-800 dark:text-white">{student.name}</h4>
                         <span className="text-xs text-red-500">Absent {student.date}</span>
                      </div>
                   </div>
                   <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-lg text-sm hover:bg-indigo-200 transition-colors">
                      <Bell size={14} /> Notify
                   </button>
                </GlassCard>
             ))}
          </div>
       </div>
    </div>
  );
};

export default TrainerAttendance;