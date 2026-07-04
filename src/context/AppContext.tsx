import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import type { AppState, Theme, View, ChatEntry, Seriousness, PendingTask } from '../types';
import { pickTemplate, getAnswer, genericAnswer, buildRoadmapFromTemplate } from '../data/answers';

const initialState: AppState = {
  theme: 'light',
  inApp: false,
  tokens: 0,
  streak: 0,
  view: 'dashboard',
  roadmap: null,
  recent: [],
  unlocked: {},
  chatLog: [],
  pendingTask: null,
  toasts: [],
};

type Action =
  | { type: 'SET_THEME'; theme: Theme }
  | { type: 'ENTER_APP' }
  | { type: 'SET_VIEW'; view: View }
  | { type: 'ASK_QUESTION'; entry: ChatEntry }
  | { type: 'RECEIVE_ANSWER'; id: number; answer: string; templateKey: string }
  | { type: 'DECIDE_NO'; id: number }
  | { type: 'DECIDE_YES'; id: number; seriousness: Seriousness }
  | { type: 'SET_SERIOUSNESS'; id: number; seriousness: Seriousness }
  | { type: 'OPEN_PROOF_MODAL'; pendingTask: PendingTask }
  | { type: 'COMPLETE_TASK'; pendingTask: PendingTask }
  | { type: 'CLOSE_MODAL' }
  | { type: 'UNLOCK_REWARD'; id: string; cost: number }
  | { type: 'ADD_TOAST'; message: string }
  | { type: 'REMOVE_TOAST' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    case 'ENTER_APP':
      return { ...state, inApp: true };
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
          { title: entry?.question ?? '', date: new Date().toLocaleDateString(), done: false, chatOnly: true },
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
        recent: [{ title: roadmap.title, date: new Date().toLocaleDateString(), done: false }, ...state.recent],
      };
    }
    case 'OPEN_PROOF_MODAL':
      return { ...state, pendingTask: action.pendingTask };
    case 'COMPLETE_TASK': {
      const { mIdx, tIdx } = action.pendingTask;
      if (!state.roadmap) return state;
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
      const newRecent = state.recent.length > 0
        ? [{ ...state.recent[0], done: allDone }, ...state.recent.slice(1)]
        : state.recent;
      return {
        ...state,
        roadmap: newRoadmap,
        tokens: state.tokens + task.tokens,
        pendingTask: null,
        recent: newRecent,
      };
    }
    case 'CLOSE_MODAL':
      return { ...state, pendingTask: null };
    case 'UNLOCK_REWARD':
      return {
        ...state,
        tokens: state.tokens - action.cost,
        unlocked: { ...state.unlocked, [action.id]: true },
      };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.message] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.slice(1) };
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
  completeTask: () => void;
  closeModal: () => void;
  unlockReward: (id: string, cost: number) => void;
  addToast: (msg: string) => void;
  enterApp: () => void;
  setView: (view: View) => void;
  setTheme: (theme: Theme) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setTheme = useCallback((theme: Theme) => {
    dispatch({ type: 'SET_THEME', theme });
  }, []);

  const enterApp = useCallback(() => {
    dispatch({ type: 'ENTER_APP' });
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

  const completeTask = useCallback(() => {
    if (state.pendingTask) {
      dispatch({ type: 'COMPLETE_TASK', pendingTask: state.pendingTask });
    }
  }, [state.pendingTask]);

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, []);

  const unlockReward = useCallback((id: string, cost: number) => {
    dispatch({ type: 'UNLOCK_REWARD', id, cost });
  }, []);

  const addToast = useCallback((msg: string) => {
    dispatch({ type: 'ADD_TOAST', message: msg });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST' }), 2600);
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
        unlockReward,
        addToast,
        enterApp,
        setView,
        setTheme,
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
