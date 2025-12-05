import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { AttendanceRecord } from '../types';
import { CheckCircle, XCircle, FileSpreadsheet, FileText, Download } from 'lucide-react';
import { format } from 'date-fns';

const Attendance: React.FC = () => {
  const [history, setHistory] = useState<AttendanceRecord[]>([
    { id: 1, date: '2023-10-25', time: '09:00 AM', status: 'Present', remarks: '-' },
    { id: 2, date: '2023-10-24', time: '09:15 AM', status: 'Present', remarks: 'Late entry' },
    { id: 3, date: '2023-10-23', time: '-', status: 'Absent', remarks: 'Medical Leave' },
  ]);
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [reason, setReason] = useState('');

  const handleMark = (status: 'Present' | 'Absent') => {
    if (status === 'Absent') {
      setShowReasonInput(true);
      return;
    }
    // Mark Present Logic
    addRecord('Present', '-');
  };

  const submitAbsent = () => {
    addRecord('Absent', reason);
    setReason('');
    setShowReasonInput(false);
  };

  const addRecord = (status: 'Present' | 'Absent', remarks: string) => {
    const newRecord: AttendanceRecord = {
      id: Date.now(),
      date: format(new Date(), 'yyyy-MM-dd'),
      time: status === 'Present' ? format(new Date(), 'hh:mm a') : '-',
      status,
      remarks,
    };
    setHistory([newRecord, ...history]);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col items-center text-center space-y-4">
         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Daily Attendance</h1>
         <p className="text-gray-500 dark:text-gray-400">Mark your attendance for today. Default session: 7 PM - 8 PM.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
         <button 
           onClick={() => handleMark('Present')}
           className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 p-8 text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
         >
           <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="flex flex-col items-center space-y-3">
             <CheckCircle size={48} />
             <span className="text-2xl font-bold">Mark Present</span>
           </div>
         </button>

         <button 
           onClick={() => handleMark('Absent')}
           className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-400 to-rose-600 p-8 text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
         >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex flex-col items-center space-y-3">
             <XCircle size={48} />
             <span className="text-2xl font-bold">Mark Absent</span>
           </div>
         </button>
      </div>

      {showReasonInput && (
        <GlassCard className="max-w-md mx-auto animate-fade-in-down">
           <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Reason for Absence</h3>
           <textarea 
             className="w-full bg-white/50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-800 dark:text-white mb-4 focus:ring-2 focus:ring-red-500 outline-none"
             rows={3}
             placeholder="Please specify why you are absent..."
             value={reason}
             onChange={(e) => setReason(e.target.value)}
           ></textarea>
           <div className="flex justify-end gap-2">
             <button onClick={() => setShowReasonInput(false)} className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Cancel</button>
             <button onClick={submitAbsent} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Submit</button>
           </div>
        </GlassCard>
      )}

      <GlassCard title="Attendance History" className="mt-8">
        <div className="flex justify-end gap-2 mb-4">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium hover:bg-green-200 transition-colors">
            <FileSpreadsheet size={16} /> Excel
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium hover:bg-red-200 transition-colors">
            <FileText size={16} /> PDF
          </button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300">
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Time</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Remarks</th>
                <th className="p-4 font-semibold">Signature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {history.map((record) => (
                <tr key={record.id} className="hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors text-gray-700 dark:text-gray-300">
                  <td className="p-4">{record.date}</td>
                  <td className="p-4">{record.time}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${record.status === 'Present' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4">{record.remarks}</td>
                  <td className="p-4">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-sm opacity-50 skew-x-12"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default Attendance;