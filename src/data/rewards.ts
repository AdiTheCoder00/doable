import type { Reward } from '../types';

const REWARDS: Reward[] = [
  // Achievement Badges
  { id: 'first_step', category: 'badge', icon: 'star', title: 'First Step', desc: 'Complete your very first proof of work', unlocksAtTask: 1 },
  { id: 'week_warrior', category: 'badge', icon: 'flame', title: 'Consistent Earner', desc: 'Complete 3 tasks', unlocksAtTask: 3 },
  { id: 'deep_worker', category: 'badge', icon: 'brain', title: 'Deep Worker', desc: 'Complete 10 tasks', unlocksAtTask: 10 },
  { id: 'focus_ninja', category: 'badge', icon: 'zap', title: 'Focus Ninja', desc: 'Complete 25 tasks', unlocksAtTask: 25 },
  { id: 'ai_apprentice', category: 'badge', icon: 'award', title: 'AI Apprentice', desc: 'Complete 50 tasks', unlocksAtTask: 50 },
  { id: 'master_builder', category: 'badge', icon: 'trophy', title: 'Master Builder', desc: 'Complete 100 tasks', unlocksAtTask: 100 },

  // Color Themes
  { id: 'theme_warm', category: 'theme', icon: 'palette', title: 'Warm Theme', desc: 'Unlock a warm sunset color theme', unlocksAtTask: 5 },
  { id: 'theme_forest', category: 'theme', icon: 'leaf', title: 'Forest Theme', desc: 'Unlock a calm forest green theme', unlocksAtTask: 15 },
  { id: 'theme_night', category: 'theme', icon: 'moon', title: 'Night Owl Theme', desc: 'Unlock a deep midnight theme', unlocksAtTask: 35 },
];

export default REWARDS;
