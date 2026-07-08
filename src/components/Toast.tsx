import { useApp } from '../context/AppContext';

export default function Toast() {
  const { state } = useApp();
  if (state.toasts.length === 0) return null;
  return (
    <div id="toast-container">
      {state.toasts.map((toast) => (
        <div className="toast" key={toast.id}>
          <span>{toast.message}</span>
          {toast.action && (
            <button 
              onClick={() => {
                toast.action!.onClick();
              }}
              className="ml-4 text-[var(--accent)] hover:text-[var(--accent-strong)] font-semibold transition-colors"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
