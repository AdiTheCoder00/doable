import { useApp } from '../../context/AppContext';

export default function Hero() {
  const { enterApp } = useApp();

  const scrollToHow = () => {
    document.getElementById('how-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero">
      <span className="eyebrow">
        <span className="dot" /> Personal accountability, not plagiarism policing
      </span>
      <h1>
        AI that will <br /><span className="hl">HELP YOU MASTER TOPICS.</span>
      </h1>
      <p className="sub">
        Ask your question, get a real roadmap, and actually finish it. Upload proof, earn tokens, watch your island grow \u2014 no plagiarism checker required.
      </p>
      <div className="hero-ctas">
        <button className="btn-primary" onClick={enterApp}>Start a Task \u2192</button>
        <button className="btn-ghost" onClick={scrollToHow}>How it works</button>
      </div>
    </div>
  );
}
