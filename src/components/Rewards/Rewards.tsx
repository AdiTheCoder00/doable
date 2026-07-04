import { useApp } from '../../context/AppContext';
import REWARDS from '../../data/rewards';
import { motion } from 'framer-motion';

export default function Rewards() {
  const { state, unlockReward, addToast } = useApp();

  const handleUnlock = (id: string, cost: number, title: string) => {
    if (state.tokens < cost) return;
    unlockReward(id, cost);
    addToast(`Unlocked "${title}"`);
  };

  return (
    <section id="view-rewards">
      <div className="app-head">
        <div>
          <div className="eyebrow2">Spend what you earn</div>
          <h1>Rewards</h1>
        </div>
        <div className="stat-pill">{'\u{1FA99}'} {state.tokens} tokens</div>
      </div>
      <div className="reward-grid">
        {REWARDS.map((r, i) => {
          const unlocked = !!state.unlocked[r.id];
          const canAfford = state.tokens >= r.cost;
          return (
            <motion.div 
              className={`reward-card${unlocked ? ' unlocked' : ''}`} 
              key={r.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.1 }}
            >
              <div className="re">{r.icon}</div>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
              <div className="cost">{unlocked ? ' Unlocked' : `${r.cost} \u{1FA99}`}</div>
              {!unlocked && (
                <motion.button
                  whileHover={canAfford ? { scale: 1.05 } : {}}
                  whileTap={canAfford ? { scale: 0.95 } : {}}
                  className={`btn-small${canAfford ? ' solid' : ''}`}
                  disabled={!canAfford}
                  onClick={() => handleUnlock(r.id, r.cost, r.title)}
                >
                  {canAfford ? 'Unlock' : 'Need more tokens'}
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
