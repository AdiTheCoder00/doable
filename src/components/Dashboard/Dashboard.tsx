import { useApp } from '../../context/AppContext';
import StatsStack from './StatsStack';
import WorldPanel from './WorldPanel';
import RecentTasks from './RecentTasks';

export default function Dashboard() {
  const { setView, resetApp } = useApp();
  return (
    <section id="view-dashboard" className="mx-auto max-w-[1200px] px-4 py-8 md:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text)]">Your World</h1>
          <p className="mt-2 text-lg text-[var(--text-dim)]">Every completed task builds something real.</p>
        </div>
        <button className="rounded-full bg-[var(--accent)] px-6 py-3 font-bold text-white shadow-sm transition-transform hover:scale-105 active:scale-95" onClick={() => setView('workspace')}>
          + New Task
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <WorldPanel />
        <StatsStack />
      </div>

      <div className="mt-10">
        <RecentTasks />
      </div>

      <div className="mt-20 border-t border-red-500/20 pt-8 pb-12 flex justify-center">
        <button 
          onClick={resetApp}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Reset all data
        </button>
      </div>
    </section>
  );
}
