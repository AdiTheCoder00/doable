import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, LayoutGrid } from 'lucide-react';

export default function RecentTasks() {
  const { state, resumeTask } = useApp();

  if (state.recent.length === 0) {
    return (
      <div className="w-full">
        <h2 className="mb-4 text-2xl font-bold text-[var(--text)]">Recent Tasks</h2>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-10 text-center shadow-sm">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--border)] text-[var(--accent)]">
            <LayoutGrid size={32} strokeWidth={2} />
          </div>
          <div className="text-[var(--text-dim)] font-medium">No tasks yet. Start one to build your world.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-bold text-[var(--text)]">Recent Tasks</h2>
      <div className="flex flex-col gap-3">
        {state.recent.map((r, i) => {
          const stepsCount = r.chatOnly ? 0 : (r.totalSteps ?? ((r.title.length % 5) + 3)); // Use real or fallback to mock
          const completedSteps = r.done ? stepsCount : (r.chatOnly ? 0 : (r.completedSteps ?? 2));
          const statusText = r.chatOnly ? 'Answered only \u00B7 no plan' : `${completedSteps}/${stepsCount} steps completed`;
          
          return (
            <motion.div 
              key={i}
              className="flex cursor-pointer items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-4 shadow-sm transition-colors hover:bg-orange-50 dark:hover:bg-orange-950/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              onClick={() => {
                if (!r.chatOnly && r.id) {
                  resumeTask(r.id);
                }
              }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--border)] text-[var(--accent)]">
                  <Clock size={24} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[17px] font-bold text-[var(--text)]">{r.title}</div>
                  <div className="text-sm font-semibold text-[var(--text-dim)]">{statusText} &middot; {r.date}</div>
                </div>
              </div>
              <div className="text-gray-300 dark:text-[var(--border)]">
                <ChevronRight size={24} strokeWidth={2.5} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
