import { useApp } from '../../context/AppContext';
import { getBuildingPositions } from '../../utils/helpers';

function doneTasks(roadmap: NonNullable<ReturnType<typeof useApp>['state']['roadmap']>) {
  return roadmap.milestones.reduce((s, m) => s + m.tasks.filter((t) => t.done).length, 0);
}

export default function WorldPanel() {
  const { state } = useApp();
  const done = state.roadmap ? doneTasks(state.roadmap) : 0;
  const buildings = getBuildingPositions(done);

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>Your world</h3>
        <span className="tag">{buildings.length} buildings</span>
      </div>
      <div className="world">
        <div className="sun" />
        <div className="island" />
        <div className="buildings" id="world-buildings">
          {buildings.map((b, i) => (
            <span className="b" key={i} style={{ left: b.left + 'px', bottom: b.bottom + 'px' }}>{b.icon}</span>
          ))}
        </div>
        {buildings.length === 0 && (
          <div className="empty-msg">Empty island  finish a step to plant your first tree</div>
        )}
      </div>
    </div>
  );
}
