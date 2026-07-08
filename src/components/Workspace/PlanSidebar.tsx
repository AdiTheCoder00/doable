import { useState } from 'react';
import { useApp } from '../../context/AppContext';
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
  const { state, openProofModal } = useApp();

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
              <div className="big">🧭</div>
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
          <span className="stat-pill" style={{ display: 'inline-flex' }}>✅ {pct}%</span>
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
                  key={`milestone-${mIdx}`} 
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
                        let action: React.ReactNode;
                        if (t.done) {
                          action = <span className={`diff-tag diff-${t.diff}`}>Done</span>;
                        } else if (unlocked) {
                          action = (
                            <button className="btn-small solid" onClick={() => openProofModal(mIdx, tIdx)}>
                              Upload proof
                            </button>
                          );
                        } else {
                          action = <span className="diff-tag" style={{ background: 'transparent', color: 'var(--text-faint)' }}>🔒 locked</span>;
                        }
                        return (
                          <div className={`task-row ${doneClass}`} key={`task-${mIdx}-${tIdx}`}>
                            <div className="tleft">
                              <div className="check">{t.done ? '✓' : ''}</div>
                              <div>
                                <div className="ttitle">{t.title}</div>
                                <div className={`diff-tag diff-${t.diff}`} style={{ marginTop: '4px' }}>
                                  {t.diff}
                                </div>
                              </div>
                            </div>
                            {action}
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
