import { useApp } from '../context/AppContext';

import { LayoutGrid, Plus, Book, Gift, Flame, Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const { state, setView, enterApp, exitApp, setTheme } = useApp();

  const toggleTheme = () => {
    setTheme(state.theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
    <nav 
      className={`sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 py-4 transition-colors ${
        state.inApp ? 'bg-[var(--bg)]' : 'bg-transparent'
      }`}
    >
      {/* Left: Logo */}
      <div className="brand flex items-center cursor-pointer border-none outline-none translate-y-1" onClick={exitApp} role="button" tabIndex={0}>
        <span className="shiny-logo">Doable.</span>
      </div>

      {/* Center: Nav Pills */}
      {state.inApp && (
        <div className="hidden md:flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elev)] p-1.5 shadow-sm">
          <button 
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${state.view === 'dashboard' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-dim)] hover:bg-[var(--bg-elev-2)]'}`}
            onClick={() => setView('dashboard')}
          >
            <LayoutGrid size={18} /> Home
          </button>
          <button 
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${state.view === 'workspace' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-dim)] hover:bg-[var(--bg-elev-2)]'}`}
            onClick={() => setView('workspace')}
          >
            <Plus size={18} /> New Task
          </button>
          <button 
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${state.view === 'history' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-dim)] hover:bg-[var(--bg-elev-2)]'}`}
            onClick={() => setView('history')}
          >
            <Book size={18} /> History
          </button>
          <button 
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${state.view === 'rewards' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-dim)] hover:bg-[var(--bg-elev-2)]'}`}
            onClick={() => setView('rewards')}
          >
            <Gift size={18} /> Rewards
          </button>
        </div>
      )}

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {state.inApp && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 font-bold text-orange-600 dark:bg-orange-950 dark:text-orange-500">
              <Flame size={16} fill="currentColor" />
              <span>{state.streak} days</span>
            </div>
          </div>
        )}
        {!state.inApp && (
          <button 
            className="rounded-full bg-orange-500 px-7 py-3 text-[15px] font-bold text-white transition-all hover:bg-orange-600 hover:scale-105 active:scale-95 border-none cursor-pointer" 
            onClick={enterApp}
          >
            Get Started
          </button>
        )}
        <div className="flex items-center gap-2 border-l border-[var(--border)] pl-4">

          <button className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-dim)] hover:bg-[var(--bg-elev-2)] hover:text-[var(--text)] transition-colors" onClick={toggleTheme}>
            {state.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Bottom Navigation */}
    {state.inApp && (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-[var(--border)] bg-[var(--bg-elev)] px-2 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button 
          className={`flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] font-semibold transition-colors ${state.view === 'dashboard' ? 'text-[var(--accent)]' : 'text-[var(--text-dim)] hover:text-[var(--text)]'}`}
          onClick={() => setView('dashboard')}
        >
          <LayoutGrid size={22} /> Home
        </button>
        <button 
          className={`flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] font-semibold transition-colors ${state.view === 'workspace' ? 'text-[var(--accent)]' : 'text-[var(--text-dim)] hover:text-[var(--text)]'}`}
          onClick={() => setView('workspace')}
        >
          <Plus size={22} /> New Task
        </button>
        <button 
          className={`flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] font-semibold transition-colors ${state.view === 'history' ? 'text-[var(--accent)]' : 'text-[var(--text-dim)] hover:text-[var(--text)]'}`}
          onClick={() => setView('history')}
        >
          <Book size={22} /> History
        </button>
        <button 
          className={`flex flex-col items-center gap-1 rounded-xl p-2 text-[10px] font-semibold transition-colors ${state.view === 'rewards' ? 'text-[var(--accent)]' : 'text-[var(--text-dim)] hover:text-[var(--text)]'}`}
          onClick={() => setView('rewards')}
        >
          <Gift size={22} /> Rewards
        </button>
      </div>
    )}
    </>
  );
}
