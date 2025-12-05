import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Send, Paperclip, Image as ImageIcon, Github, MessageCircle, Filter } from 'lucide-react';
import { Doubt } from '../types';

const AskDoubt: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [explanation, setExplanation] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Dummy conversation for the "Trainer Reply" requirement
  const [doubts, setDoubts] = useState<Doubt[]>([
    {
      id: 1,
      subject: "React UseEffect Loop",
      explanation: "I keep getting an infinite loop when fetching data inside useEffect.",
      status: 'Resolved',
      replies: [
        { sender: 'Student', message: "I keep getting an infinite loop when fetching data inside useEffect.", timestamp: '10:00 AM' },
        { sender: 'Trainer', message: "Check your dependency array. If you are updating state that is also in the dependency array, it causes a loop. Ensure you only include what's needed.", timestamp: '10:15 AM' }
      ]
    }
  ]);

  const [currentView, setCurrentView] = useState<'form' | 'chat'>('form');
  const [activeDoubtId, setActiveDoubtId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Resolved'>('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoubt: Doubt = {
      id: Date.now(),
      subject,
      explanation,
      githubLink,
      status: 'Pending',
      imageUrl: selectedImage || undefined,
      replies: [
        { sender: 'Student', message: explanation, timestamp: 'Just Now' },
        { sender: 'Trainer', message: "Thank you for posting. A trainer will review your query shortly. (Automated Reply)", timestamp: 'Just Now' }
      ]
    };
    setDoubts([newDoubt, ...doubts]);
    setSubject('');
    setExplanation('');
    setGithubLink('');
    setSelectedImage(null);
    setCurrentView('chat');
    setActiveDoubtId(newDoubt.id);
    setFilterStatus('All'); // Reset filter to show the new doubt
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setSelectedImage(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const activeDoubt = doubts.find(d => d.id === activeDoubtId);

  const filteredDoubts = doubts.filter(d => {
    if (filterStatus === 'All') return true;
    return d.status === filterStatus;
  });

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      
      {/* Left Sidebar: List of Doubts */}
      <GlassCard className="w-full md:w-1/3 flex flex-col h-full p-4">
        <button 
          onClick={() => setCurrentView('form')}
          className="w-full mb-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all"
        >
          + New Doubt
        </button>

        {/* Filter Buttons */}
        <div className="flex bg-white/30 dark:bg-black/20 p-1 rounded-xl mb-4">
           {(['All', 'Pending', 'Resolved'] as const).map((status) => (
             <button
               key={status}
               onClick={() => setFilterStatus(status)}
               className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                 filterStatus === status
                   ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                   : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
               }`}
             >
               {status}
             </button>
           ))}
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {filteredDoubts.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              No {filterStatus !== 'All' ? filterStatus.toLowerCase() : ''} doubts found.
            </div>
          ) : (
            filteredDoubts.map(d => (
              <div 
                key={d.id}
                onClick={() => { setActiveDoubtId(d.id); setCurrentView('chat'); }}
                className={`p-3 rounded-xl cursor-pointer transition-all border ${activeDoubtId === d.id ? 'bg-indigo-100 dark:bg-indigo-900/40 border-indigo-300 dark:border-indigo-700' : 'bg-white/30 dark:bg-black/20 border-transparent hover:bg-white/50 dark:hover:bg-white/10'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-gray-800 dark:text-white truncate max-w-[70%]">{d.subject}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${d.status === 'Resolved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>{d.status}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{d.explanation}</p>
              </div>
            ))
          )}
        </div>
      </GlassCard>

      {/* Right Area: Form or Chat */}
      <GlassCard className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {currentView === 'form' ? (
          <div className="flex-1 overflow-y-auto p-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Ask a Doubt</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input 
                  type="text" 
                  required 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-800 dark:text-white"
                  placeholder="e.g., CSS Grid Alignment"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Explanation</label>
                <textarea 
                  required
                  rows={5}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-800 dark:text-white"
                  placeholder="Describe your issue in detail..."
                ></textarea>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub Link (Optional)</label>
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Github size={18} /></div>
                    <input 
                      type="url" 
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className="w-full pl-10 p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-800 dark:text-white"
                      placeholder="https://github.com/..."
                    />
                 </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Screenshot (Optional)</label>
                <div className="relative">
                   <input type="file" id="img-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
                   <label htmlFor="img-upload" className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-indigo-500 hover:text-indigo-500 text-gray-500 dark:text-gray-400 transition-colors">
                      <ImageIcon size={18} />
                      <span className="truncate">{selectedImage ? 'Image Selected' : 'Upload Image'}</span>
                   </label>
                </div>
              </div>

              {selectedImage && (
                <div className="mt-4 w-32 h-32 rounded-lg overflow-hidden border border-gray-200 shadow-md">
                   <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform transition-transform hover:-translate-y-1">
                Submit Query
              </button>
            </form>
          </div>
        ) : activeDoubt ? (
          <div className="flex flex-col h-full animate-fade-in">
             {/* Chat Header */}
             <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                     <h3 className="font-bold text-lg text-gray-800 dark:text-white">{activeDoubt.subject}</h3>
                     <span className="text-xs text-gray-500">Ticket #{activeDoubtId}</span>
                  </div>
                  <button className="text-xs border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-full text-gray-500 cursor-not-allowed opacity-70">Mark as Clarified</button>
                </div>
                
                {activeDoubt.githubLink && (
                  <div className="mt-2 flex items-center text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg">
                    <Github size={14} className="mr-2 shrink-0" />
                    <a href={activeDoubt.githubLink} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                      {activeDoubt.githubLink}
                    </a>
                  </div>
                )}
             </div>

             {/* Messages */}
             <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {activeDoubt.replies.map((reply, idx) => (
                  <div key={idx} className={`flex ${reply.sender === 'Student' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                      reply.sender === 'Student' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-700'
                    }`}>
                       <p className="text-sm">{reply.message}</p>
                       <p className={`text-[10px] mt-1 opacity-70 ${reply.sender === 'Student' ? 'text-indigo-200' : 'text-gray-400'}`}>{reply.timestamp}</p>
                    </div>
                  </div>
                ))}
             </div>

             {/* Input Area */}
             <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
               <div className="flex gap-2">
                 <input type="text" placeholder="Type a reply..." className="flex-1 bg-white/50 dark:bg-black/20 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 dark:text-white" />
                 <button className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"><Send size={18} /></button>
               </div>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <MessageCircle size={48} className="mb-2 opacity-50" />
            <p>Select a doubt to view conversation</p>
          </div>
        )}

      </GlassCard>
    </div>
  );
};

export default AskDoubt;