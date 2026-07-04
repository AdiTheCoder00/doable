import { useApp } from '../../context/AppContext';

function totalTasks(roadmap: NonNullable<ReturnType<typeof useApp>['state']['roadmap']>) {
  return roadmap.milestones.reduce((s, m) => s + m.tasks.length, 0);
}
function doneTasks(roadmap: NonNullable<ReturnType<typeof useApp>['state']['roadmap']>) {
  return roadmap.milestones.reduce((s, m) => s + m.tasks.filter((t) => t.done).length, 0);
}

export default function StatsGrid() {
  const { state } = useApp();
  const total = state.roadmap ? totalTasks(state.roadmap) : 0;
  const done = state.roadmap ? doneTasks(state.roadmap) : 0;
  const pct = total ? Math.round((100 * done) / total) : 0;

  return (
    <div className="stat-grid">
      <div className="stat-card">
        <div className="label">{'\u{1F525}'} Current streak</div>
        <div className="value streak">{state.streak > 0 ? `${state.streak} days` : 'Start today'}</div>
        <div className="sub">Prove one step today to keep it alive</div>
      </div>
      <div className="stat-card">
        <div className="label">{'\u{1FA99}'} AI tokens</div>
        <div className="value tokens" id="stat-tokens">{state.tokens}</div>
        <div className="sub">Spend these on the Rewards page</div>
      </div>
      <div className="stat-card">
        <div className="label">{'\u2705'} Progress</div>
        <div className="value tasks">{total > 0 ? `${done} / ${total}` : '\u2014'}</div>
        {total > 0 && <div className="bar"><i style={{ width: pct + '%' }} /></div>}
      </div>
    </div>
  );
}
