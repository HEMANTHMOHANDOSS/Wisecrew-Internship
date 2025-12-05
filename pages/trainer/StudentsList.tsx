import React, { useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { Search, ChevronRight, X, MessageCircle, PlayCircle, ExternalLink, CheckCircle } from 'lucide-react';

const TrainerStudentsList: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const students = [
    { id: 1, name: "John Doe", dept: "CSE", year: "4th", project: "AI Attendance", avatar: "https://picsum.photos/id/1011/50/50" },
    { id: 2, name: "Jane Smith", dept: "ECE", year: "3rd", project: "IoT Home Auto", avatar: "https://picsum.photos/id/1027/50/50" },
    { id: 3, name: "Mike Ross", dept: "IT", year: "4th", project: "Blockchain Voting", avatar: "https://picsum.photos/id/1005/50/50" },
  ];

  const doubts = {
    unresolved: [
      { id: 1, subject: "API CORS Error", time: "2 hours ago", desc: "Getting Access-Control-Allow-Origin error when calling backend.", media: "image" },
    ],
    resolved: [
      { id: 2, subject: "React Hooks", time: "Yesterday", desc: "Understanding useEffect dependency array.", media: "video" },
    ]
  };

  return (
    <div className="animate-fade-in relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Students</h1>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input type="text" placeholder="Search students..." className="pl-10 pr-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 outline-none text-gray-800 dark:text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student.id} onClick={() => setSelectedStudent(student)} className="cursor-pointer group">
            <GlassCard className="hover:border-teal-400 transition-colors">
               <div className="flex items-center space-x-4">
                 <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full" />
                 <div className="flex-1">
                   <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-teal-600 transition-colors">{student.name}</h3>
                   <p className="text-xs text-gray-500">{student.dept} - {student.year} Year</p>
                 </div>
                 <ChevronRight size={20} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
               </div>
               <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                 <p className="text-xs text-gray-500 mb-1">Project</p>
                 <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{student.project}</p>
               </div>
            </GlassCard>
          </div>
        ))}
      </div>

      {/* Student Detail Modal / Overlay */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedStudent(null)}></div>
          <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 h-full shadow-2xl p-6 overflow-y-auto animate-slide-up border-l border-white/20">
             <button onClick={() => setSelectedStudent(null)} className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:rotate-90 transition-transform">
               <X size={20} className="text-gray-600 dark:text-gray-300" />
             </button>
             
             <div className="flex items-center space-x-4 mb-8">
                <img src={selectedStudent.avatar} className="w-20 h-20 rounded-full border-4 border-teal-100 dark:border-teal-900" />
                <div>
                   <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedStudent.name}</h2>
                   <p className="text-teal-600 dark:text-teal-400">{selectedStudent.dept} | {selectedStudent.year} Year</p>
                   <p className="text-sm text-gray-500 mt-1">{selectedStudent.project}</p>
                </div>
             </div>

             <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Unresolved Doubts
             </h3>
             <div className="space-y-4 mb-8">
               {doubts.unresolved.map(doubt => (
                 <div key={doubt.id} className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-semibold text-gray-800 dark:text-white">{doubt.subject}</h4>
                       <span className="text-xs text-gray-500">{doubt.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{doubt.desc}</p>
                    <div className="flex items-center gap-2 mb-3">
                       {doubt.media === 'image' && <span className="text-xs flex items-center gap-1 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded"><ExternalLink size={12}/> Screenshot.png</span>}
                    </div>
                    <button className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors">Mark as Solved</button>
                 </div>
               ))}
             </div>

             <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500"></span> Resolved Doubts
             </h3>
             <div className="space-y-4">
               {doubts.resolved.map(doubt => (
                 <div key={doubt.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 opacity-75">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-semibold text-gray-800 dark:text-white">{doubt.subject}</h4>
                       <span className="text-xs text-gray-500">{doubt.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{doubt.desc}</p>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-xs font-semibold">
                       <CheckCircle size={14} /> Solved
                    </div>
                 </div>
               ))}
             </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerStudentsList;