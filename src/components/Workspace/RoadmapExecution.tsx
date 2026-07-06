import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Upload, Check, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RoadmapExecution() {
  const { state, setView, completeTask, clearRoadmap } = useApp();
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!state.roadmap) return null;

  const steps = state.roadmap.milestones.flatMap((m, mIdx) => 
    m.tasks.map((t, tIdx) => ({ ...t, mIdx, tIdx }))
  );

  const total = steps.length;
  const completed = steps.filter((s) => s.done).length;
  
  // Find the first unfinished step to be the active one
  const activeIndex = steps.findIndex((s) => !s.done);
  
  // If all are done, activeIndex is -1.

  const handleSubmit = (mIdx: number, tIdx: number) => {
    completeTask({ mIdx, tIdx });
    setDesc('');
    setImage(null);
  };

  return (
    <div className="mx-auto max-w-[800px] px-4 md:px-8 py-10 pb-32">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('dashboard')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-elev)] border border-[var(--border)] text-[var(--text-dim)] shadow-sm transition-colors hover:bg-[var(--bg-elev-2)] hover:text-[var(--text)]"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">{state.roadmap.title}</h1>
        </div>
        <button 
          onClick={clearRoadmap}
          className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] px-4 py-2 font-semibold text-[var(--text-dim)] shadow-sm transition-colors hover:bg-[var(--bg-elev-2)] hover:text-[var(--text)]"
        >
          <Plus size={18} />
          New Task
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="text-sm text-[var(--text-dim)]">
          {completed} of {total} steps complete
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isDone = step.done;

          return (
            <div key={`${step.mIdx}-${step.tIdx}`} className="flex flex-col gap-4">
              <div 
                className={`flex gap-4 rounded-xl border p-5 transition-all ${
                  isActive 
                    ? 'border-[var(--accent)] bg-orange-50/50 dark:bg-orange-950/20 shadow-sm' 
                    : 'border-[var(--border)] bg-[var(--bg-elev)]'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--bg-elev-2)] border border-[var(--border)]">
                      <Check size={12} className="text-[var(--text-dim)]" strokeWidth={3} />
                    </div>
                  ) : isActive ? (
                    <div className="h-5 w-5 rounded-full border-2 border-[var(--accent)] bg-white dark:bg-transparent shadow-[inset_0_0_0_2px_#FFF7ED]" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-[var(--border)]" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className={`text-[15.5px] font-semibold ${isDone ? 'text-[var(--text-dim)] line-through decoration-[var(--border)]' : 'text-[var(--text)]'}`}>
                    <span className="text-[var(--text-dim)] font-medium">Step {index + 1}.</span> {step.title}
                  </div>
                  {step.description && (
                    <div className={`mt-1.5 text-[14px] leading-relaxed ${isDone ? 'text-[var(--text-dim)] opacity-70' : 'text-[var(--text-faint)]'}`}>
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-6 shadow-sm mb-2 mt-2">
                      <h3 className="font-semibold text-[var(--text)] mb-1">Submit proof for step {index + 1}</h3>
                      <p className="text-[14px] text-[var(--text-dim)] mb-5">A screenshot, photo, or short description of what you did.</p>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setImage(URL.createObjectURL(e.target.files[0]));
                          }
                        }}
                      />
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-10 transition-colors mb-4 ${
                          image 
                            ? 'border-green-500 bg-green-50 dark:bg-green-950/20' 
                            : 'border-[var(--border)] bg-[var(--bg)]/50 hover:bg-[var(--bg-elev-2)] hover:border-[var(--text-dim)]'
                        }`}
                      >
                        {image ? (
                          <>
                            <Check size={24} className="text-green-500" />
                            <span className="text-[14px] font-medium text-green-600 dark:text-green-400">Image attached</span>
                          </>
                        ) : (
                          <>
                            <Upload size={24} className="text-[var(--text-dim)]" />
                            <span className="text-[14px] font-medium text-[var(--text-dim)]">Tap to upload a screenshot or photo</span>
                          </>
                        )}
                      </div>

                      <textarea
                        className="w-full min-h-[90px] rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-4 text-[14px] text-[var(--text)] placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] mb-4 resize-y"
                        placeholder="Optional: describe what you did in a sentence."
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />

                      <button 
                        onClick={() => handleSubmit(step.mIdx, step.tIdx)}
                        disabled={!desc.trim() && !image}
                        className={`w-full rounded-xl py-3.5 text-[15px] font-bold text-white transition-all ${
                          (!desc.trim() && !image)
                            ? 'bg-[var(--border)] text-[var(--text-faint)] cursor-not-allowed opacity-60'
                            : 'bg-[var(--accent)] hover:bg-[var(--accent-strong)] hover:shadow-md active:scale-[0.98]'
                        }`}
                      >
                        Submit proof
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
