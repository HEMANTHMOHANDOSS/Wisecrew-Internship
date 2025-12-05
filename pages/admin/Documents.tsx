import React from 'react';
import { GlassCard } from '../../components/GlassCard';
import { FileText, Download, Upload, DollarSign, Bell, BadgeCheck } from 'lucide-react';

const DocumentsManager: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Documents & Fees</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Offer Letter Management */}
         <GlassCard title="Offer Letters">
            <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center mb-4">
               <Upload className="mx-auto text-slate-400 mb-2" size={32} />
               <p className="text-sm font-medium">Bulk Upload Offer Letters (ZIP/PDF)</p>
               <button className="mt-2 text-xs bg-indigo-600 text-white px-3 py-1 rounded-md">Browse Files</button>
            </div>
            <div className="space-y-2">
               <div className="flex justify-between items-center p-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                     <FileText size={18} className="text-indigo-500" />
                     <span className="text-sm font-medium">John_Doe_Offer.pdf</span>
                  </div>
                  <span className="text-xs text-green-500 font-bold">Sent</span>
               </div>
               <div className="flex justify-between items-center p-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                     <FileText size={18} className="text-indigo-500" />
                     <span className="text-sm font-medium">Jane_Smith_Offer.pdf</span>
                  </div>
                  <button className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">Send</button>
               </div>
            </div>
         </GlassCard>

         {/* Fee Management */}
         <GlassCard title="Fee Receipts & Reminders">
             <div className="flex gap-2 mb-4">
                <button className="flex-1 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                   <Bell size={16} /> Send Reminders
                </button>
                <button className="flex-1 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                   <DollarSign size={16} /> Generate Receipts
                </button>
             </div>
             <div className="space-y-3">
                <div className="p-3 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-lg">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Pending Payments: 12 Students</h4>
                   <p className="text-xs text-slate-500">Total Outstanding: $4,500</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 rounded-r-lg">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Receipts Generated Today</h4>
                   <p className="text-xs text-slate-500">24 Receipts Sent</p>
                </div>
             </div>
         </GlassCard>

         {/* Badges / Certs */}
         <GlassCard title="Badges & Certifications" className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {['Top Performer', 'Project Completion', 'Full Attendance', 'Skill Master'].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                     <BadgeCheck size={32} className="text-yellow-500 mb-2" />
                     <span className="text-sm font-bold text-center">{badge}</span>
                     <button className="mt-2 text-xs text-indigo-500">Assign to Student</button>
                  </div>
               ))}
            </div>
         </GlassCard>
      </div>
    </div>
  );
};

export default DocumentsManager;