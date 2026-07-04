import { useApp } from '../context/AppContext';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { state, setView, enterApp, exitApp, setTheme } = useApp();

  const toggleTheme = () => {
    setTheme(state.theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav id="mainnav">
      <div className="brand" onClick={exitApp} style={{ cursor: 'pointer' }} role="button" tabIndex={0}>
        <img src={logo} alt="Doable" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
      </div>

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
