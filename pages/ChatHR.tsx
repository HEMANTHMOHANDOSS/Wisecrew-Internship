import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Send, User } from 'lucide-react';

const ChatHR: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'HR', text: 'Hello! How can I assist you with non-academic issues today?', time: '10:00 AM' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = { id: Date.now(), sender: 'Student', text: inputText, time: 'Now' };
    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate HR Reply
    setTimeout(() => {
       const reply = { id: Date.now() + 1, sender: 'HR', text: 'Thank you for your message. We have received your query and will get back to you shortly.', time: 'Now' };
       setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      <GlassCard className="h-full flex flex-col p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white/20 dark:bg-black/20 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white">HR Support</h3>
            <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/5 dark:bg-black/5">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'Student' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.sender === 'Student' 
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-br-none' 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-700'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right ${msg.sender === 'Student' ? 'text-pink-100' : 'text-gray-400'}`}>{msg.time}</p>
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
              className="flex-1 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-gray-800 dark:text-white"
            />
            <button type="submit" className="p-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl shadow-lg transition-colors">
              <Send size={20} />
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default ChatHR;