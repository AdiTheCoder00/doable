import { useApp } from '../../context/AppContext';

export default function CTABand() {
  const { enterApp } = useApp();
  return (
    <div className="cta-band">
      <h2>Ready to keep yourself honest?</h2>
      <button className="btn-primary" onClick={enterApp}>Start a Task </button>
    </div>
  );
}
