import React from 'react';
import { GlassCard } from '../../components/GlassCard';
import { Lock, RefreshCw, Save, Shield } from 'lucide-react';

const AdminSettings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">System Settings</h1>

      {/* Credential Management */}
      <GlassCard className="border-l-4 border-orange-500">
         <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl">
               <Lock size={24} />
            </div>
            <div>
               <h2 className="text-xl font-bold text-slate-800 dark:text-white">Credential Management</h2>
               <p className="text-slate-500 dark:text-slate-400">Reset passwords and generate temporary access keys for users.</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Select User Role</label>
               <select className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 outline-none">
                  <option>Student</option>
                  <option>Trainer</option>
               </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">User Email / ID</label>
               <input type="text" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 outline-none" placeholder="Search user..." />
            </div>
         </div>
         
         <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl flex justify-between items-center">
            <div>
               <p className="font-bold text-slate-800 dark:text-white">Generate Temporary Password</p>
               <p className="text-xs text-slate-500">User will be prompted to change it upon login.</p>
            </div>
            <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors">
               <RefreshCw size={16} /> Reset Credentials
            </button>
         </div>
      </GlassCard>

      {/* General Settings */}
      <GlassCard>
         <div className="flex items-center gap-2 mb-4">
            <Shield size={20} className="text-slate-400" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">General Platform Preferences</h2>
         </div>
         <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
               <span className="text-slate-700 dark:text-slate-300">Enable Maintenance Mode</span>
               <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div></div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
               <span className="text-slate-700 dark:text-slate-300">Allow New Student Registrations</span>
               <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div></div>
            </div>
         </div>
         <div className="mt-6 flex justify-end">
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 shadow-lg">
               <Save size={18} /> Save Changes
            </button>
         </div>
      </GlassCard>
    </div>
  );
};

export default AdminSettings;