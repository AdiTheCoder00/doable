import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { state, setView, enterApp, setTheme } = useApp();

  const toggleTheme = () => {
    setTheme(state.theme === 'dark' ? 'light' : 'dark');
  };

  const handleScrollToHow = () => {
    document.getElementById('how-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav id="mainnav">
      <div className="brand">
        <span className="mark">\u2713</span> Doable.
      </div>

      {!state.inApp && (
        <div className="navlinks" id="navlinks-landing">
          <a className="navlink" onClick={handleScrollToHow}>How it works</a>
        </div>
      )}

      {state.inApp && (
        <div className="navlinks" id="navlinks-app">
          {(['dashboard', 'workspace', 'rewards'] as const).map((v) => (
            <a
              key={v}
              className={`navlink${state.view === v ? ' active' : ''}`}
              onClick={() => setView(v)}
            >
              {v === 'dashboard' ? 'Home' : v === 'workspace' ? 'Ask & Plan' : 'Rewards'}
            </a>
          ))}
        </div>
      )}

      <div className="navright">
        {state.inApp && (
          <span className="stat-pill" id="navlinks-app-pill">
            {'\u{1F525}'} {state.streak} &middot; {'\u{1FA99}'} {state.tokens}
          </span>
        )}
        {!state.inApp && (
          <button className="btn-ghost" style={{ padding: '9px 16px', fontSize: '14px' }} onClick={enterApp}>
            Dashboard
          </button>
        )}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
          {state.theme === 'dark' ? '\u{1F319}' : '\u{2600}\u{FE0F}'}
        </button>
      </div>
    </nav>
  );
}
