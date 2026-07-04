import { motion, type Variants } from 'framer-motion';
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
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(200,200,200,0.25)"
          hoverFillColor="var(--accent)"
          shape="square"
          hoverTrailAmount={5}
        />
      </div>
      <motion.div
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span
          variants={scaleUp}
          className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{
            background: 'var(--bg-elev)',
            borderColor: 'var(--border)',
            color: 'var(--text-dim)',
          }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: 'var(--coral)' }}
          />
          Personal accountability, not plagiarism policing
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mx-auto mb-5 text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.08] tracking-tight"
          style={{ color: 'var(--text)' }}
        >
          AI that will <br />
          <span style={{ color: 'var(--accent)' }}>HELP YOU MASTER TOPICS.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mb-9 max-w-[560px] text-lg leading-relaxed"
          style={{ color: 'var(--text-dim)' }}
        >
          Ask your question, get a real roadmap, and actually finish it.
          Upload proof, earn tokens, watch your island grow — no plagiarism
          checker required.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-primary"
            onClick={enterApp}
          >
            Start a Task
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
