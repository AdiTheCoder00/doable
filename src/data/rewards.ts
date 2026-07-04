import type { Reward } from '../types';

const REWARDS: Reward[] = [
  { id: 'ask', icon: '\u{1F4AC}', title: 'Ask AI anything', desc: 'One free-form question outside your roadmap.', cost: 100 },
  { id: 'research', icon: '\u{1F50E}', title: 'Deep research', desc: 'A longer, sourced answer on any topic.', cost: 300 },
  { id: 'resume-gen', icon: '\u{1F4C4}', title: 'Generate a resume', desc: 'A full draft resume from your inputs.', cost: 250 },
  { id: 'mock', icon: '\u{1F3A4}', title: 'Mock interview', desc: 'A simulated interview with feedback.', cost: 400 },
  { id: 'review', icon: '\u{1F9D1}\u200D\u{1F4BB}', title: 'Coding review', desc: 'Line-by-line review of one submission.', cost: 350 },
  { id: 'templates', icon: '\u{1F3A8}', title: 'Premium templates', desc: 'Unlock the full template library.', cost: 150 },
];

export default REWARDS;
