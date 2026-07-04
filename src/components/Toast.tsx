import { useApp } from '../context/AppContext';

export default function Toast() {
  const { state } = useApp();
  if (state.toasts.length === 0) return null;
  return (
    <div id="toast-container">
      {state.toasts.map((msg, i) => (
        <div className="toast" key={i}>{msg}</div>
      ))}
    </div>
  );
}
