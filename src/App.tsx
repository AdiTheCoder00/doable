import { useEffect } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import Workspace from './components/Workspace/Workspace';
import Rewards from './components/Rewards/Rewards';
import ProofModal from './components/ProofModal';
import Toast from './components/Toast';

function AppContent() {
  const { state } = useApp();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  return (
    <>
      <Navbar />
      {!state.inApp && <Landing />}
      {state.inApp && (
        <div id="app-inner">
          {state.view === 'dashboard' && <Dashboard />}
          {state.view === 'workspace' && <Workspace />}
          {state.view === 'rewards' && <Rewards />}
        </div>
      )}
      {state.pendingTask && state.roadmap && <ProofModal />}
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppContent />
  );
}
