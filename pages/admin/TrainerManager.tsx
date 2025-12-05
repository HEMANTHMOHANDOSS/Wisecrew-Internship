import React, { useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { Search, Plus, Trash2, Edit, User, Mail, Briefcase, Calendar, Star, ArrowLeft } from 'lucide-react';

const TrainerManager: React.FC = () => {
  const [view, setView] = useState<'list' | 'add' | 'detail'>('list');
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);

  const trainers = [
    { id: 1, name: "David Miller", idNum: "TR001", role: "Full Stack Trainer", students: 45, rating: 4.8 },
    { id: 2, name: "Eva Green", idNum: "TR002", role: "AI/ML Specialist", students: 32, rating: 4.9 },
  ];

  const handleViewDetail = (trainer: any) => {
    setSelectedTrainer(trainer);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedTrainer(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Trainer Management</h1>
          <p className="text-slate-500 dark:text-slate-400">
             {view === 'list' && 'Oversee trainer performance & allocation'}
             {view === 'add' && 'Onboard a new trainer'}
             {view === 'detail' && 'Trainer Profile & Metrics'}
          </p>
        </div>
        {view === 'list' && (
          <button onClick={() => setView('add')} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl shadow-lg transition-all active:scale-95">
            <Plus size={18} /> Add Trainer
          </button>
        )}
        {view !== 'list' && (
          <button onClick={handleBack} className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all">
            <ArrowLeft size={18} /> Back
          </button>
        )}
      </div>

      {view === 'list' && (
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {trainers.map(trainer => (
               <GlassCard key={trainer.id} className="relative group hover:border-teal-400 transition-all duration-300">
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="p-1.5 bg-slate-100 hover:bg-white rounded-lg text-slate-600"><Edit size={16} /></button>
                     <button className="p-1.5 bg-red-100 hover:bg-red-200 rounded-lg text-red-600"><Trash2 size={16} /></button>
                  </div>
                  <div className="flex flex-col items-center text-center pt-4 pb-2">
                     <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-2xl font-bold mb-3">
                        {trainer.name.charAt(0)}
                     </div>
                     <h3 className="text-xl font-bold text-slate-800 dark:text-white">{trainer.name}</h3>
                     <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">{trainer.role}</p>
                     
                     <div className="grid grid-cols-2 gap-4 w-full mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
                        <div>
                           <p className="text-2xl font-bold text-slate-800 dark:text-white">{trainer.students}</p>
                           <p className="text-xs text-slate-500 uppercase">Students</p>
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-slate-800 dark:text-white flex items-center justify-center gap-1">
                              {trainer.rating} <Star size={14} className="fill-yellow-400 text-yellow-400" />
                           </p>
                           <p className="text-xs text-slate-500 uppercase">Rating</p>
                        </div>
                     </div>
                     <button onClick={() => handleViewDetail(trainer)} className="mt-6 w-full py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        View Full Profile
                     </button>
                  </div>
               </GlassCard>
            ))}
         </div>
      )}

      {view === 'add' && (
         <GlassCard className="max-w-2xl mx-auto">
            <h2 className="text-lg font-bold mb-4">New Trainer Onboarding</h2>
            <form className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                     <input type="text" className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700" />
                  </div>
                  <div>
                     <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                     <input type="text" className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700" />
                  </div>
               </div>
               <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Expertise / Role</label>
                  <input type="text" className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700" placeholder="e.g. Senior Python Instructor" />
               </div>
               <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                  <input type="email" className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700" />
               </div>
               <button className="w-full py-3 bg-teal-600 text-white font-bold rounded-xl mt-4 shadow-lg">Create Trainer Account</button>
            </form>
         </GlassCard>
      )}

      {view === 'detail' && selectedTrainer && (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="lg:col-span-1">
               <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-3xl font-bold mb-4">{selectedTrainer.name.charAt(0)}</div>
                  <h2 className="text-2xl font-bold">{selectedTrainer.name}</h2>
                  <p className="text-teal-500">{selectedTrainer.role}</p>
                  <div className="w-full mt-6 space-y-2">
                     <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm">
                        <Mail size={16} /> trainer@wisecrew.com
                     </div>
                     <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm">
                        <Briefcase size={16} /> Employee ID: {selectedTrainer.idNum}
                     </div>
                  </div>
               </div>
            </GlassCard>
            <GlassCard className="lg:col-span-2">
               <h3 className="font-bold text-lg mb-4">Performance Metrics</h3>
               <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30">
                     <p className="text-2xl font-bold text-green-700 dark:text-green-400">98%</p>
                     <p className="text-xs text-green-600">Attendance Rate</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                     <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">12</p>
                     <p className="text-xs text-blue-600">Sessions this week</p>
                  </div>
               </div>
               <h3 className="font-bold text-lg mb-4">Assigned Batches</h3>
               <div className="space-y-2">
                  <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg flex justify-between items-center">
                     <span>Batch A - Python Basics</span>
                     <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">20 Students</span>
                  </div>
                  <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg flex justify-between items-center">
                     <span>Batch B - Advanced React</span>
                     <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">15 Students</span>
                  </div>
               </div>
            </GlassCard>
         </div>
      )}
    </div>
  );
};

export default TrainerManager;