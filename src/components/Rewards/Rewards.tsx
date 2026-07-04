import { useApp } from '../../context/AppContext';
import REWARDS from '../../data/rewards';

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
        {REWARDS.map((r) => {
          const unlocked = !!state.unlocked[r.id];
          const canAfford = state.tokens >= r.cost;
          return (
            <div className={`reward-card${unlocked ? ' unlocked' : ''}`} key={r.id}>
              <div className="re">{r.icon}</div>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
              <div className="cost">{unlocked ? ' Unlocked' : `${r.cost} \u{1FA99}`}</div>
              {!unlocked && (
                <button
                  className={`btn-small${canAfford ? ' solid' : ''}`}
                  disabled={!canAfford}
                  onClick={() => handleUnlock(r.id, r.cost, r.title)}
                >
                  {canAfford ? 'Unlock' : 'Need more tokens'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
