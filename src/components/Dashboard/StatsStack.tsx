import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { Flame, Trophy } from 'lucide-react';

function totalTasks(roadmap: NonNullable<ReturnType<typeof useApp>['state']['roadmap']>) {
  return roadmap.milestones.reduce((s, m) => s + m.tasks.length, 0);
}
function doneTasks(roadmap: NonNullable<ReturnType<typeof useApp>['state']['roadmap']>) {
  return roadmap.milestones.reduce((s, m) => s + m.tasks.filter((t) => t.done).length, 0);
}

export default function StatsStack() {
  const { state } = useApp();
  const total = state.roadmap ? totalTasks(state.roadmap) : 0;
  const done = state.roadmap ? doneTasks(state.roadmap) : 0;

  // Mock levels based on tasks
  const levelThresholds = [0, 5, 15, 30, 60];
  const levelNames = ['Newbie', 'Beginner', 'Consistent', 'Builder', 'Master'];
  const currentLevelIdx = Math.max(0, levelThresholds.findIndex(t => state.totalCompletedTasks <= t) - 1);
  const currentLevel = levelNames[currentLevelIdx] || levelNames[levelNames.length - 1];
  const nextLevel = currentLevelIdx + 1 < levelNames.length ? levelNames[currentLevelIdx + 1] : 'Maxed';
  
  const currentBase = levelThresholds[currentLevelIdx] || levelThresholds[levelThresholds.length - 1];
  const nextTarget = currentLevelIdx + 1 < levelThresholds.length ? levelThresholds[currentLevelIdx + 1] : currentBase + 50;
  const progressPct = Math.min(100, Math.round(((state.totalCompletedTasks - currentBase) / (nextTarget - currentBase)) * 100));

  return (
    <div className="flex flex-col gap-6">
      <motion.div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-6 shadow-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--text-dim)]">
          <Flame size={18} strokeWidth={2.5} className="text-[var(--accent)]" /> Current Streak
        </div>
        <div className="text-4xl font-bold text-[var(--accent)]">
          {state.streak > 0 ? <>{state.streak} <span className="text-xl font-semibold text-[var(--text-dim)]">days</span></> : 'Start today'}
        </div>
      </motion.div>

      <motion.div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-6 shadow-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--text-dim)]">
          <Trophy size={18} strokeWidth={2.5} className="text-[var(--gold)]" /> Total Tasks Completed
        </div>
        <div className="mb-1 text-4xl font-bold text-[var(--accent)]">{state.totalCompletedTasks}</div>
        <div className="mb-6 font-semibold text-[var(--text-dim)]">{currentLevel}</div>

        <div className="mb-2 flex justify-between text-xs font-semibold text-[var(--text-dim)] uppercase tracking-wider">
          <span>Progress to {nextLevel}</span>
          <span>{progressPct}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--bg-elev-2)]">
          <div className="h-full rounded-full bg-[var(--accent)] transition-all duration-500 ease-out" style={{ width: `${progressPct}%` }} />
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-5 shadow-sm text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="text-3xl font-bold text-[var(--text)]">{done}</div>
          <div className="mt-1 text-sm font-semibold text-[var(--text-dim)]">Tasks</div>
        </motion.div>
        <motion.div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-5 shadow-sm text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="text-3xl font-bold text-[var(--text)]">{total}</div>
          <div className="mt-1 text-sm font-semibold text-[var(--text-dim)]">Steps</div>
        </motion.div>
      </div>
    </div>
  );
}
