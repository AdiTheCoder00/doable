import { useApp } from '../../context/AppContext';
import { getBuildingPositions } from '../../utils/helpers';
import { motion } from 'framer-motion';

function doneTasks(roadmap: NonNullable<ReturnType<typeof useApp>['state']['roadmap']>) {
  return roadmap.milestones.reduce((s, m) => s + m.tasks.filter((t) => t.done).length, 0);
}

export default function WorldPanel() {
  const { state } = useApp();
  const done = state.roadmap ? doneTasks(state.roadmap) : 0;
  const buildings = getBuildingPositions(done);

  return (
    <motion.div 
      className="panel"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      style={{ boxShadow: '0 0 40px -15px var(--accent)' }}
    >
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
    </motion.div>
  );
}
