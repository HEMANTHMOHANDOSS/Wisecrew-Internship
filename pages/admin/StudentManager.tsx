import React, { useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { Search, Plus, Trash2, Edit, MoreVertical, ChevronRight, GraduationCap, Mail, Phone, MapPin, X, ArrowLeft, CheckCircle } from 'lucide-react';

const StudentManager: React.FC = () => {
  const [view, setView] = useState<'list' | 'add' | 'detail'>('list');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Mock Data
  const students = [
    { id: 1, name: "Alice Johnson", reg: "REG2024001", dept: "CSE", status: "Active", progress: 75 },
    { id: 2, name: "Bob Smith", reg: "REG2024002", dept: "ECE", status: "Inactive", progress: 30 },
    { id: 3, name: "Charlie Brown", reg: "REG2024003", dept: "Mech", status: "Active", progress: 90 },
  ];

  const handleViewDetail = (student: any) => {
    setSelectedStudent(student);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedStudent(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Student Management</h1>
          <p className="text-slate-500 dark:text-slate-400">
             {view === 'list' && 'Manage all registered students'}
             {view === 'add' && 'Register a new student'}
             {view === 'detail' && 'Student Profile Details'}
          </p>
        </div>
        {view === 'list' && (
          <button 
            onClick={() => setView('add')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg transition-all active:scale-95"
          >
            <Plus size={18} /> Add Student
          </button>
        )}
        {view !== 'list' && (
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
          >
            <ArrowLeft size={18} /> Back to List
          </button>
        )}
      </div>

      {/* VIEW: LIST */}
      {view === 'list' && (
        <GlassCard>
           <div className="flex items-center mb-6 bg-slate-100 dark:bg-slate-800/50 rounded-xl p-2 border border-slate-200 dark:border-slate-700">
             <Search className="ml-3 text-slate-400" size={20} />
             <input 
                type="text" 
                placeholder="Search by name, register number or department..." 
                className="w-full bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white px-4 py-1"
             />
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 text-sm">
                   <th className="p-4 font-medium uppercase">Student</th>
                   <th className="p-4 font-medium uppercase">Reg Number</th>
                   <th className="p-4 font-medium uppercase">Department</th>
                   <th className="p-4 font-medium uppercase">Status</th>
                   <th className="p-4 font-medium uppercase">Progress</th>
                   <th className="p-4 font-medium uppercase text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                 {students.map((student) => (
                   <tr key={student.id} onClick={() => handleViewDetail(student)} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors">
                     <td className="p-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                           {student.name.charAt(0)}
                         </div>
                         <span className="font-semibold text-slate-800 dark:text-white">{student.name}</span>
                       </div>
                     </td>
                     <td className="p-4 text-slate-600 dark:text-slate-300">{student.reg}</td>
                     <td className="p-4 text-slate-600 dark:text-slate-300">{student.dept}</td>
                     <td className="p-4">
                       <span className={`px-2 py-1 rounded-full text-xs font-bold ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                         {student.status}
                       </span>
                     </td>
                     <td className="p-4">
                       <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1">
                          <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                       </div>
                       <span className="text-xs text-slate-400">{student.progress}%</span>
                     </td>
                     <td className="p-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 transition-colors ml-1">
                          <Trash2 size={16} />
                        </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </GlassCard>
      )}

      {/* VIEW: ADD FORM */}
      {view === 'add' && (
        <GlassCard className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">Student Registration Form</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
               <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
               <input type="text" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="space-y-1">
               <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Register Number</label>
               <input type="text" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="space-y-1">
               <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
               <input type="email" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="space-y-1">
               <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Department</label>
               <select className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none">
                 <option>Computer Science</option>
                 <option>Electronics</option>
                 <option>Mechanical</option>
               </select>
            </div>
            <div className="md:col-span-2 space-y-1">
               <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Address</label>
               <textarea rows={3} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
            </div>
            
            <div className="md:col-span-2 pt-4 flex gap-4">
              <button type="button" onClick={handleBack} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
              <button type="button" className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg transition-transform active:scale-95">Save Student</button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* VIEW: DETAIL PROFILE */}
      {view === 'detail' && selectedStudent && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <GlassCard className="lg:col-span-1 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 mb-4 p-1">
                 <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                    <span className="text-4xl font-bold text-indigo-500">{selectedStudent.name.charAt(0)}</span>
                 </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{selectedStudent.name}</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-4">{selectedStudent.reg}</p>
              
              <div className="flex gap-2 w-full">
                 <button className="flex-1 py-2 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 font-medium">Message</button>
                 <button className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-medium">Edit</button>
              </div>

              <div className="w-full mt-6 space-y-3 text-left">
                 <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Mail size={16} /> <span>student@wisecrew.com</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Phone size={16} /> <span>+1 234 567 8900</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <MapPin size={16} /> <span>New York, USA</span>
                 </div>
              </div>
           </GlassCard>

           <GlassCard className="lg:col-span-2">
              <h3 className="font-bold text-lg mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Academic & Project Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                 <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 uppercase">Department</p>
                    <p className="font-semibold text-slate-800 dark:text-white">{selectedStudent.dept}</p>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 uppercase">Year</p>
                    <p className="font-semibold text-slate-800 dark:text-white">Final Year</p>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 uppercase">Attendance</p>
                    <p className="font-semibold text-green-600">92% Present</p>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 uppercase">Project Status</p>
                    <p className="font-semibold text-indigo-600">{selectedStudent.progress}% Completed</p>
                 </div>
              </div>

              <h3 className="font-bold text-lg mb-4">Assigned Trainer</h3>
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                 <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">JD</div>
                 <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">John Doe</h4>
                    <p className="text-xs text-slate-500">Senior Technical Trainer</p>
                 </div>
                 <button className="ml-auto text-sm text-indigo-500 font-medium hover:underline">View Profile</button>
              </div>

              <div className="mt-6 flex justify-end">
                 <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium border border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
                    <Trash2 size={16} /> Delete Student Record
                 </button>
              </div>
           </GlassCard>
        </div>
      )}

    </div>
  );
};

export default StudentManager;