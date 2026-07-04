import { useApp } from '../../context/AppContext';
import REWARDS from '../../data/rewards';
import { motion } from 'framer-motion';
import { 
  Trophy, Palette, User, 
  Star, Flame, Brain, Zap, Award, 
  Leaf, Moon, Bot, Sparkles, Lock 
} from 'lucide-react';

const iconMap = {
  star: Star,
  flame: Flame,
  brain: Brain,
  zap: Zap,
  award: Award,
  trophy: Trophy,
  palette: Palette,
  leaf: Leaf,
  moon: Moon,
  bot: Bot,
  sparkles: Sparkles,
};

export default function Rewards() {
  const { state } = useApp();

  const groups = [
    { id: 'badge', title: 'Achievement Badges', icon: Trophy },
    { id: 'theme', title: 'Color Themes', icon: Palette },
    { id: 'skin', title: 'Avatar Skins', icon: User },
  ];

  return (
    <section id="view-rewards" className="mx-auto max-w-[1080px] px-8 py-10 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text)] mb-3">Rewards</h1>
        <p className="text-lg text-[var(--text-dim)]">
          Unlock rewards automatically by completing tasks. <span className="text-[var(--accent)] font-medium">You have completed {state.totalCompletedTasks} tasks.</span>
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {groups.map((group) => {
          const items = REWARDS.filter(r => r.category === group.id);
          const GroupIcon = group.icon;

          return (
            <div key={group.id}>
              <div className="flex items-center gap-3 mb-6">
                <GroupIcon className="text-[var(--text)]" size={26} strokeWidth={2.5} />
                <h2 className="text-2xl font-bold text-[var(--text)]">{group.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((r, i) => {
                  const isUnlocked = state.totalCompletedTasks >= r.unlocksAtTask;
                  const Icon = iconMap[r.icon as keyof typeof iconMap];

                  return (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`relative rounded-2xl p-6 transition-all ${
                        isUnlocked
                          ? 'border border-[var(--accent)] bg-[var(--bg-elev)] shadow-sm'
                          : 'border border-[var(--border)] bg-transparent opacity-80'
                      }`}
                    >
                      {/* Top Right Status */}
                      <div className="absolute top-5 right-5">
                        {isUnlocked ? (
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                        ) : (
                          <Lock size={16} className="text-[var(--text-faint)]" />
                        )}
                      </div>

                      {/* Icon Circle */}
                      <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full ${
                        isUnlocked
                          ? 'bg-orange-100 dark:bg-orange-950/30 text-[var(--accent)]'
                          : 'bg-[var(--bg-elev-2)] text-[var(--text-faint)]'
                      }`}>
                        {Icon && <Icon size={26} strokeWidth={2.5} />}
                      </div>

                      {/* Content */}
                      <h3 className={`mb-2 text-[18px] font-bold ${isUnlocked ? 'text-[var(--text)]' : 'text-[var(--text-dim)]'}`}>
                        {r.title}
                      </h3>
                      <p className={`text-[14.5px] leading-relaxed mb-8 ${isUnlocked ? 'text-[var(--text-dim)] font-medium' : 'text-[var(--text-faint)]'}`}>
                        {r.desc}
                      </p>

                      {/* Bottom Price / Status */}
                      <div className="mt-auto font-bold text-[15px]">
                        {isUnlocked ? (
                          <span className="text-green-600 dark:text-green-500">Unlocked</span>
                        ) : (
                          <span className="text-[var(--text-faint)]">Unlocks at {r.unlocksAtTask} tasks</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
