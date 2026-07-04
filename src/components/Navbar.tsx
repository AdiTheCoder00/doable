import { useApp } from '../context/AppContext';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
];

export default function Navbar() {
  const { state, setView, enterApp, setTheme } = useApp();

  const toggleTheme = () => {
    setTheme(state.theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav id="mainnav">
      <div className="brand">
        <span className="mark">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2,8 6,12 14,4" />
          </svg>
        </span>
        Doable.
      </div>

      {!state.inApp && (
        <div className="navlinks">
          {links.map((l) => (
            <a key={l.label} className="navlink" href={l.href} onClick={(e) => { e.preventDefault(); enterApp(); }}>
              {l.label}
            </a>
          ))}
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
          <button className="btn-primary" style={{ padding: '9px 18px', fontSize: '14px' }} onClick={enterApp}>
            Get Started
          </button>
        )}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
          {state.theme === 'dark' ? '\u{1F319}' : '\u{2600}\u{FE0F}'}
        </button>
      </div>
    </nav>
  );
}
