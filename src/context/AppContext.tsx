import { createContext, useContext, useReducer, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import type { AppState, Theme, View, ChatEntry, Seriousness, PendingTask } from '../types';
import { pickTemplate, getAnswer, genericAnswer, buildRoadmapFromTemplate } from '../data/answers';

const initialState: AppState = {
  theme: 'light',
  inApp: false,
  totalCompletedTasks: 0,
  streak: 0,
  lastCompletedDate: null,
  view: 'dashboard',
  roadmap: null,
  recent: [],
  recentlyDeleted: null,
  unlocked: {},
  chatLog: [],
  pendingTask: null,
  toasts: [],
};

const STORAGE_VERSION = 1;

function init(initial: AppState): AppState {
  try {
    const saved = localStorage.getItem('doable-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.version !== STORAGE_VERSION) {
        return initial;
      }
      return { 
        ...initial, 
        ...parsed, 
        inApp: initial.inApp,
        view: initial.view,
        pendingTask: initial.pendingTask 
      };
    }
  } catch (e) {
    console.error('Failed to parse state from localStorage', e);
  }
  return initial;
}

type Action =
  | { type: 'SET_THEME'; theme: Theme }
  | { type: 'ENTER_APP' }
  | { type: 'EXIT_APP' }
  | { type: 'SET_VIEW'; view: View }
  | { type: 'ASK_QUESTION'; entry: ChatEntry }
  | { type: 'RECEIVE_ANSWER'; id: string; answer: string; templateKey: string }
  | { type: 'DECIDE_NO'; id: string }
  | { type: 'DECIDE_YES'; id: string; seriousness: Seriousness }
  | { type: 'SET_SERIOUSNESS'; id: string; seriousness: Seriousness }
  | { type: 'OPEN_PROOF_MODAL'; pendingTask: PendingTask }
  | { type: 'COMPLETE_TASK'; pendingTask: PendingTask }
  | { type: 'CLOSE_MODAL' }
  | { type: 'ADD_TOAST'; message: string; id: string; action?: { label: string; onClick: () => void } }
  | { type: 'REMOVE_TOAST'; id: string }
  | { type: 'CLEAR_ROADMAP' }
  | { type: 'RESUME_TASK'; id: string }
  | { type: 'DELETE_HISTORY'; id: string }
  | { type: 'UNDO_DELETE' }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'RESET_ALL' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    case 'ENTER_APP':
      return { ...state, inApp: true };
    case 'EXIT_APP':
      return { ...state, inApp: false };
    case 'SET_VIEW':
      return { ...state, view: action.view };
    case 'ASK_QUESTION': {
      return {
        ...state,
        chatLog: [...state.chatLog, action.entry],
      };
    }
    case 'RECEIVE_ANSWER': {
      return {
        ...state,
        chatLog: state.chatLog.map((e) =>
          e.id === action.id ? { ...e, answering: false, answer: action.answer, templateKey: action.templateKey } : e
        ),
      };
    }
    case 'SET_SERIOUSNESS': {
      return {
        ...state,
        chatLog: state.chatLog.map((e) =>
          e.id === action.id ? { ...e, seriousness: action.seriousness } : e
        ),
      };
    }
    case 'DECIDE_NO': {
      const entry = state.chatLog.find((e) => e.id === action.id);
      return {
        ...state,
        chatLog: state.chatLog.filter((e) => e.id !== action.id),
        recent: [
          { id: crypto.randomUUID(), title: entry?.question ?? '', date: new Date().toLocaleDateString(), done: false, chatOnly: true },
          ...state.recent,
        ],
      };
    }
    case 'DECIDE_YES': {
      const entry = state.chatLog.find((e) => e.id === action.id);
      if (!entry) return state;
      const roadmap = buildRoadmapFromTemplate(entry.templateKey ?? 'generic', action.seriousness, entry.question);
      if (!roadmap) return state;
      return {
        ...state,
        chatLog: state.chatLog.map((e) => (e.id === action.id ? { ...e, decided: 'roadmap' } : e)),
        roadmap,
        recent: [{ 
          id: roadmap.id,
          title: roadmap.title, 
          date: new Date().toLocaleDateString(), 
          done: false,
          completedSteps: 0,
          totalSteps: roadmap.milestones.reduce((acc, m) => acc + m.tasks.length, 0),
          roadmap
        }, ...state.recent],
      };
    }
    case 'OPEN_PROOF_MODAL':
      return { ...state, pendingTask: action.pendingTask };
    case 'COMPLETE_TASK': {
      const { mIdx, tIdx } = action.pendingTask || state.pendingTask || { mIdx: -1, tIdx: -1 };
      if (mIdx === -1 || !state.roadmap) return state;
      const task = state.roadmap.milestones[mIdx]?.tasks[tIdx];
      if (!task) return state;
      const newRoadmap = {
        ...state.roadmap,
        milestones: state.roadmap.milestones.map((m, mi) =>
          mi === mIdx
            ? { ...m, tasks: m.tasks.map((t, ti) => (ti === tIdx ? { ...t, done: true } : t)) }
            : m
        ),
      };
      const allDone = newRoadmap.milestones.every((m) => m.tasks.every((t) => t.done));
      const wasAllDone = state.roadmap.milestones.every((m) => m.tasks.every((t) => t.done));
      
      let newToasts = state.toasts;
      if (!wasAllDone && allDone) {
        newToasts = [...newToasts, { id: crypto.randomUUID(), message: '🎉 Roadmap complete! Great work.' }];
      }

      const completedSteps = newRoadmap.milestones.reduce((acc, m) => acc + m.tasks.filter(t => t.done).length, 0);
      const totalSteps = newRoadmap.milestones.reduce((acc, m) => acc + m.tasks.length, 0);
      
      const newRecent = state.recent.map(r => 
        r.id === newRoadmap.id 
          ? { ...r, done: allDone, completedSteps, totalSteps, roadmap: newRoadmap } 
          : r
      );
      
      const newTotal = state.totalCompletedTasks + 1;
      
      // Streak calculation
      const now = new Date();
      const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
      let newStreak = state.streak;
      if (state.lastCompletedDate) {
        const last = new Date(state.lastCompletedDate);
        const curr = new Date(todayUTC);
        const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      // Theme unlocks
      const newUnlocked = { ...state.unlocked };
      if (newTotal >= 5) newUnlocked['theme_warm'] = true;
      if (newTotal >= 15) newUnlocked['theme_forest'] = true;
      if (newTotal >= 35) newUnlocked['theme_night'] = true;

      return {
        ...state,
        roadmap: newRoadmap,
        totalCompletedTasks: newTotal,
        streak: newStreak,
        lastCompletedDate: todayUTC,
        unlocked: newUnlocked,
        pendingTask: null,
        recent: newRecent,
        toasts: newToasts,
      };
    }
    case 'CLOSE_MODAL':
      return { ...state, pendingTask: null };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, { id: action.id, message: action.message, action: action.action }] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.id) };
    case 'CLEAR_ROADMAP':
      return { ...state, roadmap: null, chatLog: [], pendingTask: null };
    case 'RESUME_TASK': {
      const task = state.recent.find(r => r.id === action.id);
      if (!task || !task.roadmap) return state;
      return {
        ...state,
        roadmap: task.roadmap,
        chatLog: [], // Clear chat log when resuming an old task, or restore if we saved it (but we didn't)
        view: 'workspace',
      };
    }
    case 'DELETE_HISTORY': {
      const index = state.recent.findIndex(r => r.id === action.id);
      if (index === -1) return state;
      const item = state.recent[index];
      return {
        ...state,
        recent: state.recent.filter((r) => r.id !== action.id),
        recentlyDeleted: { item, index },
      };
    }
    case 'UNDO_DELETE': {
      if (!state.recentlyDeleted) return state;
      const newRecent = [...state.recent];
      newRecent.splice(state.recentlyDeleted.index, 0, state.recentlyDeleted.item);
      return {
        ...state,
        recent: newRecent,
        recentlyDeleted: null,
      };
    }
    case 'CLEAR_HISTORY':
      return {
        ...state,
        recent: [],
      };
    case 'RESET_ALL':
      return {
        ...initialState,
        theme: state.theme, // Preserve theme preference
      };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  askQuestion: (text: string) => void;
  decideYes: (id: string, seriousness: Seriousness) => void;
  decideNo: (id: string) => void;
  setSeriousness: (id: string, seriousness: Seriousness) => void;
  openProofModal: (mIdx: number, tIdx: number) => void;
  completeTask: (task?: PendingTask) => void;
  closeModal: () => void;
  addToast: (msg: string, action?: { label: string; onClick: () => void }) => void;
  enterApp: () => void;
  exitApp: () => void;
  setView: (view: View) => void;
  setTheme: (theme: Theme) => void;
  clearRoadmap: () => void;
  resumeTask: (id: string) => void;
  deleteHistory: (id: string) => void;
  undoDelete: () => void;
  clearHistory: () => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('doable-state', JSON.stringify({
      version: STORAGE_VERSION,
      theme: state.theme,
      totalCompletedTasks: state.totalCompletedTasks,
      streak: state.streak,
      lastCompletedDate: state.lastCompletedDate,
      roadmap: state.roadmap,
      recent: state.recent,
      unlocked: state.unlocked,
      chatLog: state.chatLog,
    }));
  }, [
    state.theme, state.totalCompletedTasks, state.streak, state.lastCompletedDate, 
    state.roadmap, state.recent, state.unlocked, state.chatLog
  ]);

  const setTheme = useCallback((theme: Theme) => {
    dispatch({ type: 'SET_THEME', theme });
  }, []);

  const enterApp = useCallback(() => {
    dispatch({ type: 'ENTER_APP' });
  }, []);

  const exitApp = useCallback(() => {
    dispatch({ type: 'EXIT_APP' });
  }, []);

  const setView = useCallback((view: View) => {
    dispatch({ type: 'SET_VIEW', view });
  }, []);

  const askQuestion = useCallback((text: string) => {
    const entry: ChatEntry = {
      id: crypto.randomUUID(),
      question: text,
      answering: true,
      answer: null,
      decided: null,
      seriousness: 'learn',
      templateKey: null,
    };
    dispatch({ type: 'ASK_QUESTION', entry });

    setTimeout(() => {
      const key = pickTemplate(text);
      const ans = getAnswer(key) ?? genericAnswer(text);
      dispatch({ type: 'RECEIVE_ANSWER', id: entry.id, answer: ans, templateKey: key });
    }, 1100);
  }, []);

  const decideYes = useCallback((id: string, seriousness: Seriousness) => {
    dispatch({ type: 'DECIDE_YES', id, seriousness });
  }, []);

  const decideNo = useCallback((id: string) => {
    dispatch({ type: 'DECIDE_NO', id });
  }, []);

  const setSeriousness = useCallback((id: string, seriousness: Seriousness) => {
    dispatch({ type: 'SET_SERIOUSNESS', id, seriousness });
  }, []);

  const addToast = useCallback((msg: string, action?: { label: string; onClick: () => void }) => {
    const id = crypto.randomUUID();
    dispatch({ type: 'ADD_TOAST', message: msg, id, action });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', id }), 5000); // Give users more time to undo
  }, []);

  const openProofModal = useCallback((mIdx: number, tIdx: number) => {
    dispatch({ type: 'OPEN_PROOF_MODAL', pendingTask: { mIdx, tIdx } });
  }, []);

  const completeTask = useCallback((task?: PendingTask) => {
    if (task) {
      dispatch({ type: 'COMPLETE_TASK', pendingTask: task });
    } else if (state.pendingTask) {
      dispatch({ type: 'COMPLETE_TASK', pendingTask: state.pendingTask });
    }
  }, [state.pendingTask]);

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, []);

  const clearRoadmap = useCallback(() => {
    dispatch({ type: 'CLEAR_ROADMAP' });
  }, []);

  const resumeTask = useCallback((id: string) => {
    dispatch({ type: 'RESUME_TASK', id });
  }, []);

  const undoDelete = useCallback(() => {
    dispatch({ type: 'UNDO_DELETE' });
  }, []);

  const deleteHistory = useCallback((id: string) => {
    dispatch({ type: 'DELETE_HISTORY', id });
    addToast('Item removed', {
      label: 'Undo',
      onClick: () => {
        undoDelete();
      }
    });
  }, [addToast, undoDelete]);

  const clearHistory = useCallback(() => {
    dispatch({ type: 'CLEAR_HISTORY' });
  }, []);

  const resetApp = useCallback(() => {
    if (window.confirm("Are you sure you want to completely wipe all app data? This cannot be undone.")) {
      localStorage.removeItem('doable-state');
      dispatch({ type: 'RESET_ALL' });
    }
  }, []);

  const contextValue = useMemo(() => ({
    state,
    dispatch,
    askQuestion,
    decideYes,
    decideNo,
    setSeriousness,
    openProofModal,
    completeTask,
    closeModal,
    addToast,
    enterApp,
    exitApp,
    setView,
    setTheme,
    clearRoadmap,
    resumeTask,
    deleteHistory,
    undoDelete,
    clearHistory,
    resetApp,
  }), [
    state,
    dispatch,
    askQuestion,
    decideYes,
    decideNo,
    setSeriousness,
    openProofModal,
    completeTask,
    closeModal,
    addToast,
    enterApp,
    exitApp,
    setView,
    setTheme,
    clearRoadmap,
    resumeTask,
    deleteHistory,
    undoDelete,
    clearHistory,
    resetApp
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components, react/only-export-components
export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
