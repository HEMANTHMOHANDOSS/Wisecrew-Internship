import React from 'react';
import { GlassCard } from '../../components/GlassCard';
import { Plus, List, Eye, BarChart2 } from 'lucide-react';

const FeedbackManager: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Feedback Manager</h1>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg">
           <Plus size={18} /> Create New Form
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Active Forms */}
         <GlassCard title="Active Feedback Forms">
            <div className="space-y-4">
               {[
                 { name: "Monthly Trainer Evaluation", responses: 45, status: "Active" },
                 { name: "Platform Experience Survey", responses: 12, status: "Draft" }
               ].map((form, i) => (
                 <div key={i} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-black/20">
                    <div>
                       <h4 className="font-bold text-slate-800 dark:text-white">{form.name}</h4>
                       <p className="text-xs text-slate-500">{form.responses} Responses</p>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2 text-slate-500 hover:text-indigo-500"><Eye size={18} /></button>
                       <button className="p-2 text-slate-500 hover:text-indigo-500"><BarChart2 size={18} /></button>
                    </div>
                 </div>
               ))}
            </div>
         </GlassCard>

         {/* Create Form Mock UI */}
         <GlassCard title="Form Builder Preview">
            <div className="space-y-3 opacity-70 pointer-events-none">
               <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
               <div className="h-24 w-full bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
               <div className="flex gap-2">
                  <div className="h-4 w-4 rounded-full bg-slate-300"></div>
                  <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
               </div>
            </div>
            <div className="mt-4 text-center text-sm text-slate-500">
               Click "Create New Form" to open the editor.
            </div>
         </GlassCard>
      </div>
      
      {/* Recent Responses */}
      <GlassCard title="Recent Responses">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="text-slate-500 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                     <th className="p-3">Student</th>
                     <th className="p-3">Form</th>
                     <th className="p-3">Rating</th>
                     <th className="p-3">Comment Preview</th>
                  </tr>
               </thead>
               <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                     <td className="p-3 font-medium">John Doe</td>
                     <td className="p-3">Trainer Eval</td>
                     <td className="p-3 text-green-600 font-bold">5/5</td>
                     <td className="p-3 text-slate-500 truncate max-w-xs">The sessions were extremely helpful and interactive.</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </GlassCard>
    </div>
  );
};

export default FeedbackManager;