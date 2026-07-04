import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, BookOpen } from 'lucide-react';

export default function History() {
  const { state, setView, resumeTask } = useApp();

  return (
    <section id="view-history" className="mx-auto max-w-[1080px] px-8 py-10 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text)] mb-3">History</h1>
        <p className="text-lg text-[var(--text-dim)]">
          Look back at all the tasks you've started or completed.
        </p>
      </div>

      {state.recent.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-16 text-center shadow-sm">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950/30 text-[var(--accent)]">
            <BookOpen size={40} />
          </div>
          <h3 className="text-xl font-bold text-[var(--text)] mb-2">No history yet</h3>
          <p className="text-[var(--text-dim)] max-w-md mx-auto">
            When you create tasks or ask questions, they will appear here so you can revisit them anytime.
          </p>
          <button 
            className="mt-6 rounded-full bg-[var(--accent)] px-6 py-2.5 font-bold text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
            onClick={() => setView('workspace')}
          >
            Start a new task
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {state.recent.map((r, i) => {
            const stepsCount = r.chatOnly ? 0 : (r.totalSteps ?? ((r.title.length % 5) + 3));
            const completedSteps = r.done ? stepsCount : (r.chatOnly ? 0 : (r.completedSteps ?? 2));
            const statusText = r.chatOnly ? 'Answered only \u00B7 no plan' : `${completedSteps}/${stepsCount} steps completed`;
            
            return (
              <motion.div 
                key={i}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-5 shadow-sm transition-colors hover:bg-orange-50 dark:hover:bg-orange-950/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  if (!r.chatOnly && r.id) {
                    resumeTask(r.id);
                  }
                }}
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950/30 text-[var(--accent)]">
                    <Clock size={26} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-[var(--text)] mb-1">{r.title}</div>
                    <div className="text-sm font-semibold text-[var(--text-dim)]">{statusText} &middot; {r.date}</div>
                  </div>
                </div>
                <div className="text-[var(--border)]">
                  <ChevronRight size={24} strokeWidth={2.5} />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
