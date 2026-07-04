import { useApp } from '../../context/AppContext';

export default function RecentTasks() {
  const { state, setView } = useApp();

  if (state.recent.length === 0) {
    return (
      <div className="panel">
        <div className="panel-head"><h3>Recent tasks</h3></div>
        <div className="empty-state">
          <div className="big">{'\u{1F5FA}\u{FE0F}'}</div>
          No tasks yet. Start one and your roadmap shows up here.
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="panel-head"><h3>Recent tasks</h3></div>
      <div id="recent-list">
        {state.recent.map((r, i) => {
          const status = r.chatOnly ? 'Answered only \u00B7 no plan' : r.done ? 'Complete' : 'In progress';
          return (
            <div className="recent-item" key={i}>
              <div className="left">
                <div className={`dot${r.done ? ' on' : ''}`} />
                <div>
                  <div className="t">{r.title}</div>
                  <div className="m">{status} \u00B7 {r.date}</div>
                </div>
              </div>
              {!r.chatOnly && <button className="btn-small" onClick={() => setView('workspace')}>Open</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
