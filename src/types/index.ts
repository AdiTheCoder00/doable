export type Theme = 'dark' | 'light';
export type Seriousness = 'curious' | 'learn' | 'master';
export type Diff = 'easy' | 'medium' | 'hard';
export type View = 'dashboard' | 'workspace' | 'rewards' | 'history';

export interface Task {
  title: string;
  description?: string;
  diff: Diff;
  tokens: number;
  done: boolean;
}

export interface Milestone {
  title: string;
  tasks: Task[];
}

export interface Roadmap {
  id: string;
  title: string;
  milestones: Milestone[];
}

export interface RecentItem {
  id: string;
  title: string;
  date: string;
  done: boolean;
  chatOnly?: boolean;
  completedSteps?: number;
  totalSteps?: number;
  roadmap?: Roadmap;
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
  category: 'badge' | 'theme' | 'skin';
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
