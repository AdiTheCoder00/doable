export type Theme = 'dark' | 'light';
export type Seriousness = 'curious' | 'learn' | 'master';
export type Diff = 'easy' | 'medium' | 'hard';
export type View = 'dashboard' | 'workspace' | 'rewards';

export interface Task {
  title: string;
  diff: Diff;
  tokens: number;
  done: boolean;
}

export interface Milestone {
  title: string;
  tasks: Task[];
}

export interface Roadmap {
  title: string;
  milestones: Milestone[];
}

export interface RecentItem {
  title: string;
  date: string;
  done: boolean;
  chatOnly?: boolean;
}

export interface ChatEntry {
  id: number;
  question: string;
  answering: boolean;
  answer: string | null;
  decided: 'roadmap' | 'no' | null;
  seriousness: Seriousness;
  templateKey: string | null;
}

export interface Reward {
  id: string;
  icon: string;
  title: string;
  desc: string;
  cost: number;
}

export interface PendingTask {
  mIdx: number;
  tIdx: number;
}

export interface AppState {
  theme: Theme;
  inApp: boolean;
  tokens: number;
  streak: number;
  view: View;
  roadmap: Roadmap | null;
  recent: RecentItem[];
  unlocked: Record<string, boolean>;
  chatLog: ChatEntry[];
  pendingTask: PendingTask | null;
  toasts: string[];
}
