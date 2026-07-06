import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, User, Bot, CheckSquare } from 'lucide-react';

export default function InteractiveDemo() {
  const [phase, setPhase] = useState(0); // 0: Idle, 1: Typing Ask, 2: Do List, 3: Prove
  const [text, setText] = useState('');
  const fullText = "I want to build a simple landing page.";

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (phase === 0) {
      setText('');
      timeout = setTimeout(() => setPhase(1), 1000);
    } else if (phase === 1) {
      let i = 0;
      const typeChar = () => {
        if (i < fullText.length) {
          setText(fullText.slice(0, i + 1));
          i++;
          timeout = setTimeout(typeChar, 40);
        } else {
          timeout = setTimeout(() => setPhase(2), 800);
        }
      };
      typeChar();
    } else if (phase === 2) {
      timeout = setTimeout(() => setPhase(3), 1500);
    } else if (phase === 3) {
      timeout = setTimeout(() => setPhase(0), 3500);
    }
    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <div className="max-w-[800px] mx-auto mt-24 p-6 md:p-8 rounded-[2rem] bg-[var(--bg-elev)] border border-[var(--border)] shadow-xl relative overflow-hidden text-left z-10">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent)] to-[#fcd34d] opacity-80" />
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[var(--border)]">
        <div className="w-3 h-3 rounded-full bg-red-400/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <div className="w-3 h-3 rounded-full bg-green-400/80" />
        <div className="ml-4 text-[13px] font-mono text-[var(--text-faint)] tracking-wider">doable-demo.exe</div>
      </div>

      <div className="min-h-[300px] relative">
        {/* Phase 1: Ask */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
              className="flex gap-4 mb-6"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--bg-elev-2)] flex items-center justify-center shrink-0">
                <User size={16} className="text-[var(--text-dim)]" />
              </div>
              <div className="bg-[var(--bg-elev-2)] border border-[var(--border)] rounded-2xl rounded-tl-none px-4 py-3 text-[15px] text-[var(--text)] font-medium">
                {text}
                {phase === 1 && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-1.5 h-4 ml-1 bg-[var(--accent)] align-middle" />}
              </div>
            </motion.div>
          )}

          {/* Phase 2: Do */}
          {phase >= 2 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
              className="flex gap-4 mb-6"
            >
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-[var(--accent)]" />
              </div>
              <div className="w-full">
                <div className="bg-[var(--bg-elev-2)] border border-[var(--border)] rounded-2xl rounded-tl-none p-4 w-full md:w-[80%] lg:w-[60%]">
                  <div className="font-semibold text-[14px] text-[var(--text)] mb-3 flex justify-between items-center">
                    <span>Your Roadmap</span>
                    <span className="text-[12px] font-normal text-[var(--text-faint)] bg-[var(--bg-elev)] px-2 py-0.5 rounded-full border border-[var(--border)]">3 steps</span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {['Design hero section', 'Setup React project', 'Add framer-motion'].map((step, idx) => (
                      <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${idx === 0 && phase >= 3 ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 'bg-[var(--bg-elev)] border-[var(--border)]'}`}>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${idx === 0 && phase >= 3 ? 'bg-green-500 border-green-500 text-white scale-110 shadow-sm' : 'border-[var(--text-faint)] bg-[var(--bg-elev-2)]'}`}>
                          {idx === 0 && phase >= 3 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={12} strokeWidth={3} /></motion.div>}
                        </div>
                        <span className={`text-[14px] font-medium transition-all ${idx === 0 && phase >= 3 ? 'line-through text-[var(--text-faint)]' : 'text-[var(--text-dim)]'}`}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase 3: Prove */}
          {phase >= 3 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} 
              className="absolute bottom-6 right-6 md:right-10 bg-[var(--bg-elev)] border border-green-200 dark:border-green-900 rounded-2xl p-4 shadow-2xl flex items-center gap-4 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0 shadow-inner">
                <CheckSquare size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="font-bold text-[14px] text-[var(--text)]">Proof Accepted</div>
                <div className="text-[13px] text-[var(--text-dim)] mt-0.5">Step 1 complete. Streak +1!</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
