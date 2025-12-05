import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Video, Calendar, Clock, Check } from 'lucide-react';

const RequestSession: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <GlassCard className="text-center p-12 max-w-md w-full animate-scale-in">
           <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
             <Check size={40} className="text-green-600 dark:text-green-400" />
           </div>
           <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Request Sent!</h2>
           <p className="text-gray-500 dark:text-gray-400 mb-6">Your trainer will receive your request for an online session. You will be notified once confirmed.</p>
           <button onClick={() => setSubmitted(false)} className="text-indigo-600 hover:underline">Request Another</button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <GlassCard title="Request Online Session">
        <div className="space-y-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4 flex items-start gap-3">
             <div className="p-2 bg-indigo-100 dark:bg-indigo-800/50 rounded-lg text-indigo-600 dark:text-indigo-300"><Video size={20} /></div>
             <div>
               <h4 className="font-semibold text-gray-800 dark:text-white text-sm">Session Policy</h4>
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                 Sessions are typically 1-on-1 calls via Google Meet or Zoom. Default available slots are between 7 PM - 8 PM on weekdays.
               </p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Date</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Calendar size={16} /></div>
                 <input type="date" className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 outline-none text-gray-800 dark:text-white" />
               </div>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Time</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Clock size={16} /></div>
                 <input type="time" className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 outline-none text-gray-800 dark:text-white" />
               </div>
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topic / Agenda</label>
            <textarea 
              rows={3} 
              className="w-full p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 outline-none text-gray-800 dark:text-white placeholder-gray-400"
              placeholder="What specific topic do you want to discuss?"
            ></textarea>
          </div>

          <button 
            onClick={() => setSubmitted(true)}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Send Request
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default RequestSession;