import { useApp } from '../../context/AppContext';
import StatsGrid from './StatsGrid';
import WorldPanel from './WorldPanel';
import RecentTasks from './RecentTasks';

export default function Dashboard() {
  const { setView } = useApp();
  return (
    <section id="view-dashboard">
      <div className="app-head">
        <div>
          <div className="eyebrow2">Welcome back</div>
          <h1>Your proof-of-work</h1>
        </div>
        <button className="btn-primary" onClick={() => setView('workspace')}>+ New Task</button>
      </div>
      <StatsGrid />
      <WorldPanel />
      <RecentTasks />
    </section>
  );
}
