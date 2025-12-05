import React from 'react';
import { GlassCard } from '../../components/GlassCard';
import { Video, Calendar, Clock, Check, X } from 'lucide-react';

const TrainerSessionRequests: React.FC = () => {
  const requests = [
    { id: 1, student: "John Doe", topic: "Project Architecture Discussion", date: "2023-10-28", time: "07:00 PM" },
    { id: 2, student: "Sarah Connor", topic: "React State Management Debugging", date: "2023-10-29", time: "07:30 PM" },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Session Requests</h1>
      
      <div className="grid gap-4">
        {requests.map((req) => (
          <GlassCard key={req.id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
               <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-xl">
                 <Video size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-lg text-gray-800 dark:text-white">{req.student}</h3>
                 <p className="text-sm text-gray-500 mb-1">{req.topic}</p>
                 <div className="flex items-center gap-3 text-xs font-medium text-gray-600 dark:text-gray-300">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {req.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {req.time}</span>
                 </div>
               </div>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
               <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                 <Check size={18} /> <span className="md:hidden">Accept</span>
               </button>
               <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                 <X size={18} /> <span className="md:hidden">Reject</span>
               </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default TrainerSessionRequests;