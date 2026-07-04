import type { Reward } from '../types';

const REWARDS: Reward[] = [
  // Achievement Badges
  { id: 'first_step', category: 'badge', icon: 'star', title: 'First Step', desc: 'Complete your very first proof of work', cost: 0 },
  { id: 'week_warrior', category: 'badge', icon: 'flame', title: 'Week Warrior', desc: 'Maintain a 7-day streak', cost: 100 },
  { id: 'deep_worker', category: 'badge', icon: 'brain', title: 'Deep Worker', desc: 'Reach 300 points', cost: 300 },
  { id: 'focus_ninja', category: 'badge', icon: 'zap', title: 'Focus Ninja', desc: 'Reach 600 points', cost: 600 },
  { id: 'ai_apprentice', category: 'badge', icon: 'award', title: 'AI Apprentice', desc: 'Reach 1000 points and earn elite status', cost: 1000 },
  { id: 'master_builder', category: 'badge', icon: 'trophy', title: 'Master Builder', desc: 'Reach 2500 points — the pinnacle', cost: 2500 },

  // Color Themes
  { id: 'theme_warm', category: 'theme', icon: 'palette', title: 'Warm Theme', desc: 'Unlock a warm sunset color theme', cost: 150 },
  { id: 'theme_forest', category: 'theme', icon: 'leaf', title: 'Forest Theme', desc: 'Unlock a calm forest green theme', cost: 400 },
  { id: 'theme_night', category: 'theme', icon: 'moon', title: 'Night Owl Theme', desc: 'Unlock a deep midnight theme', cost: 750 },

  // Avatar Skins
  { id: 'skin_robot', category: 'skin', icon: 'bot', title: 'Robot Mascot', desc: 'Unlock the robot avatar skin', cost: 200 },
  { id: 'skin_wizard', category: 'skin', icon: 'sparkles', title: 'Wizard Mascot', desc: 'Unlock the wizard avatar skin', cost: 500 },
];

export default REWARDS;
