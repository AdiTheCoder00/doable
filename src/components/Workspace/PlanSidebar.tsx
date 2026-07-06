import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Upload, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function totalTasks(roadmap: NonNullable<ReturnType<typeof useApp>['state']['roadmap']>) {
  return roadmap.milestones.reduce((s, m) => s + m.tasks.length, 0);
}
function doneTasks(roadmap: NonNullable<ReturnType<typeof useApp>['state']['roadmap']>) {
  return roadmap.milestones.reduce((s, m) => s + m.tasks.filter((t) => t.done).length, 0);
}
function milestoneState(roadmap: NonNullable<ReturnType<typeof useApp>['state']['roadmap']>, mIdx: number) {
  const m = roadmap.milestones[mIdx];
  const allDone = m.tasks.every((t) => t.done);
  if (allDone) return 'done';
  const prev = roadmap.milestones[mIdx - 1];
  if (mIdx === 0 || (prev && prev.tasks.every((t) => t.done))) return 'current';
  return 'locked';
}
function taskUnlocked(roadmap: NonNullable<ReturnType<typeof useApp>['state']['roadmap']>, mIdx: number, tIdx: number) {
  const mstate = milestoneState(roadmap, mIdx);
  if (mstate === 'locked') return false;
  const m = roadmap.milestones[mIdx];
  if (tIdx === 0) return true;
  return m.tasks[tIdx - 1].done;
}

export default function PlanSidebar() {
  const { state, completeTask } = useApp();

  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (mIdx: number, tIdx: number) => {
    completeTask({ mIdx, tIdx });
    setDesc('');
    setImage(null);
  };

  const [openMilestone, setOpenMilestone] = useState<number | null>(() => {
    if (!state.roadmap) return null;
    const idx = state.roadmap.milestones.findIndex((_, i) => milestoneState(state.roadmap!, i) === 'current');
    return idx >= 0 ? idx : null;
  });

  if (!state.roadmap) {
    return (
      <div className="plan-col">
        <div className="plan-sidebar">
          <div className="panel-head">
            <h3>Your plan</h3>
          </div>
          <div id="sidebar-body">
            <motion.div 
              className="empty-state" 
              style={{ padding: '30px 10px' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="big">{'\u{1F9ED}'}</div>
              Ask something on the left. If you choose to build a roadmap, it shows up here  right next to the chat, so you can mark steps done as you go.
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  const total = totalTasks(state.roadmap);
  const done = doneTasks(state.roadmap);
  const pct = total ? Math.round((100 * done) / total) : 0;

  return (
    <div className="plan-col">
      <div className="plan-sidebar">
        <div className="panel-head">
          <h3>{state.roadmap.title}</h3>
          <span className="stat-pill" style={{ display: 'inline-flex' }}>{'\u2705'} {pct}%</span>
        </div>
        <div id="sidebar-body">
          <div className="quest-path">
            {state.roadmap.milestones.map((m, mIdx) => {
              const mstate = milestoneState(state.roadmap!, mIdx);
              const doneCount = m.tasks.filter((t) => t.done).length;
              const icon = mstate === 'done' ? '' : (mIdx + 1).toString();
              const isOpen = openMilestone === mIdx && mstate !== 'locked';

              return (
                <motion.div 
                  className={`milestone ${mstate} ${isOpen ? 'open' : ''}`} 
                  key={mIdx} 
                  id={`m-${mIdx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: mIdx * 0.1 }}
                >
                  <div className="node">{icon}</div>
                  <div className="milestone-card">
                    <div
                      className="milestone-head"
                      onClick={() => {
                        if (mstate === 'locked') return;
                        setOpenMilestone(isOpen ? null : mIdx);
                      }}
                    >
                      <h4>{m.title}</h4>
                      <span className="mstat">{doneCount}/{m.tasks.length}</span>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div 
                          className="task-list"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          {m.tasks.map((t, tIdx) => {
                        const unlocked = taskUnlocked(state.roadmap!, mIdx, tIdx);
                        const doneClass = t.done ? 'done' : '';
                        const checkContent = t.done ? '' : '';

                        return (
                          <div className={`task-row-container flex flex-col border-b border-[var(--border)]`} key={tIdx}>
                            <div className={`task-row flex items-center justify-between py-3 ${doneClass} border-none`}>
                              <div className="tleft flex gap-3">
                                <div className="check">{checkContent}</div>
                                <div>
                                  <div className="ttitle text-[14.5px]">{t.title}</div>
                                  <div className={`diff-tag diff-${t.diff}`} style={{ marginTop: '4px' }}>
                                    {t.diff}
                                  </div>
                                </div>
                              </div>
                              {t.done && <span className={`diff-tag diff-${t.diff}`}>Done</span>}
                              {!t.done && !unlocked && <span className="diff-tag" style={{ background: 'transparent', color: 'var(--text-faint)' }}>{'\u{1F512}'} locked</span>}
                            </div>
                            
                            {/* Expandable Form if active */}
                            {unlocked && !t.done && (
                              <div className="pl-8 pr-2 pb-5 w-full">
                                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-4 shadow-sm">
                                  <h3 className="font-semibold text-[var(--text)] mb-1 text-[14px]">Submit proof</h3>
                                  <p className="text-[13px] text-[var(--text-dim)] mb-4">A screenshot, photo, or short description of what you did.</p>
                                  
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
                                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-6 transition-colors mb-3 ${
                                      image 
                                        ? 'border-green-500 bg-green-50 dark:bg-green-950/20' 
                                        : 'border-[var(--border)] bg-[var(--bg)]/50 hover:bg-[var(--bg-elev-2)] hover:border-[var(--text-dim)]'
                                    }`}
                                  >
                                    {image ? (
                                      <span className="text-[13px] font-medium text-green-600 dark:text-green-400">Image attached</span>
                                    ) : (
                                      <span className="text-[13px] font-medium text-[var(--text-dim)]">Tap to upload a screenshot</span>
                                    )}
                                  </div>

                                  <textarea
                                    className="w-full min-h-[70px] rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-3 text-[13px] text-[var(--text)] placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] mb-3 resize-y"
                                    placeholder="Optional: describe what you did..."
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                  />

                                  <button 
                                    onClick={() => handleSubmit(mIdx, tIdx)}
                                    disabled={!desc.trim() && !image}
                                    className={`w-full rounded-xl py-2.5 text-[14px] font-bold text-white transition-all ${
                                      (!desc.trim() && !image)
                                        ? 'bg-[var(--border)] text-[var(--text-faint)] cursor-not-allowed opacity-60'
                                        : 'bg-[var(--accent)] hover:bg-[var(--accent-strong)] hover:shadow-md active:scale-[0.98]'
                                    }`}
                                  >
                                    Submit proof
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
