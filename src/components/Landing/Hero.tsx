import { motion, type Variants } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import PixelBlast from '../PixelBlast/PixelBlast';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

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
      <motion.div className="hero-content" variants={container} initial="hidden" animate="show">
        <motion.span className="eyebrow" variants={item}>
          <span className="dot" /> Personal accountability, not plagiarism policing
        </motion.span>
        <motion.h1 variants={item}>
          AI that will <br /><span className="hl">HELP YOU MASTER TOPICS.</span>
        </motion.h1>
        <motion.p className="sub" variants={item}>
          Ask your question, get a real roadmap, and actually finish it. Upload proof, earn tokens, watch your island grow  no plagiarism checker required.
        </motion.p>
        <motion.div className="hero-ctas" variants={item}>
          <button className="btn-primary" onClick={enterApp}>Start a Task</button>
        </motion.div>
      </motion.div>
    </div>
  );
}
