import { motion, type Variants } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ShapeGrid from '../ShapeGrid/ShapeGrid';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const { enterApp } = useApp();

  return (
    <div className="hero">
      <div className="hero-bg">
        <ShapeGrid
          speed={0.5}
          squareSize={56}
          direction="diagonal"
          borderColor="rgba(255, 122, 26, 0.08)"
          hoverFillColor="rgba(255,122,26,0.15)"
          shape="square"
          hoverTrailAmount={5}
        />
      </div>
      <motion.div
        className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center justify-center px-6 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span
          variants={scaleUp}
          className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{
            background: '#FFFFFF',
            borderColor: '#F3E2D2',
            color: '#6F6F76',
          }}
        >
          <Zap size={16} color="#FF7A1A" fill="#FF7A1A" />
          ⚡ AI that holds you accountable — not AI that does the work
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="hero-h1 mx-auto mb-5 text-[color:var(--text)]"
        >
          AI that won't do your <br />
          <span style={{ color: 'var(--accent)' }}>WORK FOR<br/>YOU.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="hero-p mx-auto mb-9 text-[color:var(--text-dim)]"
        >
          Get guided, prove you did it, build a track record you can actually trust — no plagiarism checker required.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-primary"
            style={{ padding: '0 24px', height: '52px' }}
            onClick={enterApp}
          >
            Start a Task <ArrowRight size={18} />
          </motion.button>
          <div style={{ color: '#A89A8E', fontSize: '13px', fontWeight: 500, marginTop: '12px' }}>
            Free to use. No sign-in required.
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
