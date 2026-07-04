import { useApp } from '../../context/AppContext';
import PixelBlast from '../PixelBlast/PixelBlast';

export default function Hero() {
  const { enterApp } = useApp();

  return (
    <div className="hero">
      <div className="hero-bg">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#F97316"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>
      <div className="hero-content">
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
        </div>
      </div>
    </div>
  );
}
