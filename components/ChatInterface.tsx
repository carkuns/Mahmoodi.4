
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { geminiService } from '../services/geminiService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await geminiService.getAdvice(messages, input);
      const modelMessage: Message = { role: 'model', content: response };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: Message = { role: 'model', content: "Error: Service unavailable." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto px-4 pb-24">
      <div className="flex-1 space-y-8 mb-12">
        {messages.length === 0 && (
          <div className="text-center py-20 opacity-30 select-none">
            <p className="text-sm tracking-widest uppercase">Ready.</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`
              max-w-[85%] px-6 py-4 border border-black 
              ${msg.role === 'user' ? 'bg-black text-white' : 'bg-white text-black'}
            `}>
              <span className="block text-[10px] uppercase tracking-widest mb-2 opacity-60">
                {msg.role === 'user' ? 'User' : 'Mahmoodi.34'}
              </span>
              <p className="text-lg leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="border border-black px-6 py-4 animate-pulse">
              <span className="text-[10px] uppercase tracking-widest opacity-60">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black p-4 flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Input query"
            className="flex-1 border border-black px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black placeholder:opacity-30"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-black text-white px-8 py-3 uppercase tracking-widest font-bold hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
