import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from 'react';
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
  unlocked: {},
  chatLog: [],
  pendingTask: null,
  toasts: [],
};

function init(initial: AppState): AppState {
  try {
    const saved = localStorage.getItem('doable-state');
    if (saved) {
      const parsed = JSON.parse(saved);
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
  | { type: 'RECEIVE_ANSWER'; id: number; answer: string; templateKey: string }
  | { type: 'DECIDE_NO'; id: number }
  | { type: 'DECIDE_YES'; id: number; seriousness: Seriousness }
  | { type: 'SET_SERIOUSNESS'; id: number; seriousness: Seriousness }
  | { type: 'OPEN_PROOF_MODAL'; pendingTask: PendingTask }
  | { type: 'COMPLETE_TASK'; pendingTask: PendingTask }
  | { type: 'CLOSE_MODAL' }
  | { type: 'ADD_TOAST'; message: string }
  | { type: 'REMOVE_TOAST' }
  | { type: 'CLEAR_ROADMAP' }
  | { type: 'RESUME_TASK'; id: string };

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
        chatLog: state.chatLog.map((e) => (e.id === action.id ? { ...e, decided: 'no' } : e)),
        recent: [
          { id: Date.now().toString(), title: entry?.question ?? '', date: new Date().toLocaleDateString(), done: false, chatOnly: true },
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
      const completedSteps = newRoadmap.milestones.reduce((acc, m) => acc + m.tasks.filter(t => t.done).length, 0);
      const totalSteps = newRoadmap.milestones.reduce((acc, m) => acc + m.tasks.length, 0);
      
      const newRecent = state.recent.map(r => 
        r.id === newRoadmap.id 
          ? { ...r, done: allDone, completedSteps, totalSteps, roadmap: newRoadmap } 
          : r
      );
      
      const newTotal = state.totalCompletedTasks + 1;
      
      // Streak calculation
      const today = new Date().toDateString();
      let newStreak = state.streak;
      if (state.lastCompletedDate) {
        const last = new Date(state.lastCompletedDate);
        const curr = new Date(today);
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
        lastCompletedDate: today,
        unlocked: newUnlocked,
        pendingTask: null,
        recent: newRecent,
      };
    }
    case 'CLOSE_MODAL':
      return { ...state, pendingTask: null };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.message] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.slice(1) };
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
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  askQuestion: (text: string) => void;
  decideYes: (id: number, seriousness: Seriousness) => void;
  decideNo: (id: number) => void;
  setSeriousness: (id: number, seriousness: Seriousness) => void;
  openProofModal: (mIdx: number, tIdx: number) => void;
  completeTask: (task?: PendingTask) => void;
  closeModal: () => void;
  addToast: (msg: string) => void;
  enterApp: () => void;
  exitApp: () => void;
  setView: (view: View) => void;
  setTheme: (theme: Theme) => void;
  clearRoadmap: () => void;
  resumeTask: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('doable-state', JSON.stringify({
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
      id: Date.now(),
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

  const decideYes = useCallback((id: number, seriousness: Seriousness) => {
    dispatch({ type: 'DECIDE_YES', id, seriousness });
  }, []);

  const decideNo = useCallback((id: number) => {
    dispatch({ type: 'DECIDE_NO', id });
  }, []);

  const setSeriousness = useCallback((id: number, seriousness: Seriousness) => {
    dispatch({ type: 'SET_SERIOUSNESS', id, seriousness });
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

  const addToast = useCallback((msg: string) => {
    dispatch({ type: 'ADD_TOAST', message: msg });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST' }), 2600);
  }, []);

  const clearRoadmap = useCallback(() => {
    dispatch({ type: 'CLEAR_ROADMAP' });
  }, []);

  const resumeTask = useCallback((id: string) => {
    dispatch({ type: 'RESUME_TASK', id });
  }, []);

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
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
