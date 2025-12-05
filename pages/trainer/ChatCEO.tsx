import React, { useState } from 'react';
import { GlassCard } from '../../components/GlassCard';
import { Send, Briefcase } from 'lucide-react';

const ChatCEO: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'CEO', text: 'Welcome to the team! Feel free to reach out directly if you have strategic ideas.', time: 'Yesterday' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'Trainer', text: inputText, time: 'Now' }]);
    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] max-w-4xl mx-auto animate-fade-in">
      <GlassCard className="h-full flex flex-col p-0 overflow-hidden border-teal-200 dark:border-teal-900">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-teal-50 dark:bg-teal-900/10 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-md">
            <Briefcase size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white">CEO Office</h3>
            <span className="text-xs text-gray-500">Direct Line</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/5 dark:bg-black/5">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'Trainer' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.sender === 'Trainer' 
                  ? 'bg-teal-600 text-white rounded-br-none' 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-700'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right ${msg.sender === 'Trainer' ? 'text-teal-100' : 'text-gray-400'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/20 dark:bg-black/20">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-gray-800 dark:text-white"
            />
            <button type="submit" className="p-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-lg transition-colors">
              <Send size={20} />
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default ChatCEO;