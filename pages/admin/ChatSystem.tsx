import React, { useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { MessageSquare, Search, Send, User, MoreVertical } from 'lucide-react';

const AdminChat: React.FC = () => {
  const [activeChat, setActiveChat] = useState<number | null>(null);

  const users = [
    { id: 1, name: "John Doe", type: "Student", lastMsg: "Regarding my internship...", time: "2m", unread: 2 },
    { id: 2, name: "David Miller", type: "Trainer", lastMsg: "Session completed for Batch A", time: "1h", unread: 0 },
    { id: 3, name: "Alice Johnson", type: "Student", lastMsg: "Thank you!", time: "1d", unread: 0 },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 animate-fade-in">
      
      {/* Sidebar List */}
      <GlassCard className="w-1/3 flex flex-col p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
           <h2 className="font-bold text-lg mb-3">Messages</h2>
           <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none" />
           </div>
           <div className="flex gap-2 mt-3 text-xs font-medium">
              <button className="px-3 py-1 bg-slate-800 text-white rounded-full">All</button>
              <button className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-300">Students</button>
              <button className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-300">Trainers</button>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto">
           {users.map(user => (
              <div 
                key={user.id} 
                onClick={() => setActiveChat(user.id)}
                className={`p-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${activeChat === user.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
              >
                 <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">{user.name}</h4>
                    <span className="text-xs text-slate-400">{user.time}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-500 truncate max-w-[140px]">{user.lastMsg}</p>
                    {user.unread > 0 && <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{user.unread}</span>}
                 </div>
                 <span className={`text-[10px] uppercase font-bold tracking-wider mt-1 inline-block ${user.type === 'Student' ? 'text-indigo-400' : 'text-teal-400'}`}>{user.type}</span>
              </div>
           ))}
        </div>
      </GlassCard>

      {/* Chat Area */}
      <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden relative">
         {activeChat ? (
            <>
               <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-white/50 dark:bg-black/20">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                        <User size={20} />
                     </div>
                     <div>
                        <h3 className="font-bold text-slate-800 dark:text-white">John Doe</h3>
                        <span className="text-xs text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online</span>
                     </div>
                  </div>
                  <button><MoreVertical size={20} className="text-slate-400" /></button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-black/20">
                  <div className="flex justify-start">
                     <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[70%] border border-slate-100 dark:border-slate-700">
                        <p className="text-sm text-slate-800 dark:text-slate-200">Hello Admin, I have a query regarding my internship offer letter.</p>
                        <span className="text-[10px] text-slate-400 block mt-1">10:30 AM</span>
                     </div>
                  </div>
                  <div className="flex justify-end">
                     <div className="bg-slate-800 text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[70%]">
                        <p className="text-sm">Hi John, sure. Please let me know what the issue is.</p>
                        <span className="text-[10px] text-slate-400 block mt-1 text-right">10:32 AM</span>
                     </div>
                  </div>
               </div>

               <div className="p-4 bg-white/50 dark:bg-black/20 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex gap-2">
                     <input type="text" placeholder="Type a message..." className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500" />
                     <button className="p-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors"><Send size={20} /></button>
                  </div>
               </div>
            </>
         ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
               <MessageSquare size={48} className="mb-4 opacity-30" />
               <p>Select a conversation to start chatting</p>
            </div>
         )}
      </GlassCard>
    </div>
  );
};

export default AdminChat;