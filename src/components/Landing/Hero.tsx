import { motion, type Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
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
          borderColor="rgba(255, 122, 26, 0.04)"
          hoverFillColor="rgba(255,122,26,0.08)"
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
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          AI that holds you accountable — not AI that does the work
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="hero-h1 mx-auto mb-8 text-[color:var(--text)]"
          style={{ lineHeight: 1.1 }}
        >
          AI that won't do your <br />
          <span style={{ color: 'var(--accent)' }}>work for you</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="hero-p mx-auto mb-6 text-[color:var(--text-dim)] max-w-[640px]"
          style={{ lineHeight: 1.5 }}
        >
          Get guided, prove you did the work, and build a track record you can trust.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col items-center justify-center">
          <Button 
            style={{ borderRadius: '18px' }}
            className="px-8 py-6 text-lg group bg-orange-500 text-white hover:bg-orange-600 shadow-[0_10px_30px_rgba(255,122,26,0.3)] hover:shadow-[0_15px_40px_rgba(255,122,26,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border-none"
            onClick={enterApp}
          >
            Start doing
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
          <div style={{ color: '#A89A8E', fontSize: '13px', fontWeight: 500, marginTop: '12px' }}>
            Free to use. No sign-in required.
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
