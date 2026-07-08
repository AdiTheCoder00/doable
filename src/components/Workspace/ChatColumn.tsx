import { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2 } from 'lucide-react';
import ChatEntryComponent from './ChatEntry';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

export default function ChatColumn() {
  const { state, askQuestion, clearChat } = useApp();
  const [input, setInput] = useState('');
  const chatTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.chatLog.length > 0) {
      chatTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.chatLog.length]);

  const handleAsk = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    askQuestion(trimmed);
  };

  const fillExample = (text: string) => {
    setInput(text);
  };

  return (
    <div className="chat-col">
      <motion.div 
        className="goal-box" 
        id="ask-block" 
        style={{ marginTop: 0 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between items-start mb-2">
          <h1 id="ask-heading">What do you want to know?</h1>
          {state.chatLog.length > 0 && (
            <button 
              onClick={clearChat}
              className="text-[var(--text-dim)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 p-2 rounded-lg transition-colors flex items-center gap-2"
              title="Clear Chat"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
        <p>Ask it like you'd ask any AI. You'll get a real answer first — the plan is optional.</p>
        <textarea
          id="goal-input"
          placeholder="e.g. How do I get started with Python basics?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
              e.preventDefault();
              handleAsk();
            }
          }}
        />
        <Button id="ask-btn" style={{ borderRadius: '12px' }} onClick={handleAsk}>Ask Doable</Button>
        <div className="chip-examples">
          {[
            ['How do I get started with Python basics?', 'python basics'],
            ['What is a hackathon and how do I participate?', 'hackathon basics'],
            ['How do I prepare for coding interviews?', 'coding interviews'],
            ['How do I get started with SQL?', 'SQL basics'],
          ].map(([full, label], i) => (
            <motion.span 
              className="chip" 
              key={label} 
              onClick={() => fillExample(full)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.2 }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </motion.div>
      <div id="chat-log">
        <div ref={chatTopRef} />
        {[...state.chatLog].reverse().map((entry) => (
          <ChatEntryComponent key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
