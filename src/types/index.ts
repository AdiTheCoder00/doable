export type Theme = 'dark' | 'light' | 'theme_warm' | 'theme_forest' | 'theme_night';
export type Seriousness = 'curious' | 'learn' | 'master';
export type Diff = 'easy' | 'medium' | 'hard';
export type View = 'dashboard' | 'workspace' | 'rewards' | 'history';

export interface Task {
  title: string;
  diff: Diff;
  description: string;
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
  id: string;
  question: string;
  answering: boolean;
  answer: string | null;
  decided: 'roadmap' | 'no' | null;
  seriousness: Seriousness;
  templateKey: string | null;
}

export interface Reward {
  id: string;
  category: 'badge' | 'theme';
  icon: string;
  title: string;
  desc: string;
  unlocksAtTask: number;
}

export interface PendingTask {
  mIdx: number;
  tIdx: number;
}

export interface AppState {
  theme: Theme;
  inApp: boolean;
  totalCompletedTasks: number;
  streak: number;
  lastCompletedDate: string | null;
  view: View;
  roadmap: Roadmap | null;
  recent: RecentItem[];
  recentlyDeleted: { item: RecentItem; index: number } | null;
  unlocked: Record<string, boolean>;
  chatLog: ChatEntry[];
  pendingTask: PendingTask | null;
  toasts: { id: string; message: string; action?: { label: string; onClick: () => void } }[];
}
