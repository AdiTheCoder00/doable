import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { BlurText } from '../ui/BlurText';
import { useApp } from '../../context/AppContext';
import ShapeGrid from '../ShapeGrid/ShapeGrid';

export default function Hero() {
  const { enterApp, state } = useApp();
  const isDark = state.theme === 'theme_night';

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const scaleUp: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="hero relative overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)' }}>
      {/* Dynamic Grid Background */}
      <div className="hero-bg">
        <ShapeGrid 
          speed={0.5}
          squareSize={56}
          direction="diagonal"
          borderColor={isDark ? "rgba(255, 122, 26, 0.06)" : "rgba(255, 122, 26, 0.08)"}
          hoverFillColor="rgba(255, 122, 26, 0.12)"
          shape="square"
          hoverTrailAmount={5}
        />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-140px)] flex-col items-center justify-center pt-8 pb-16">
        <motion.div
          className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center justify-center px-6 text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={scaleUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors"
            style={{
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#F3E2D2',
              color: isDark ? '#A1A1AA' : '#6F6F76',
            }}
          >
            <Zap size={16} color="#FF7A1A" fill="#FF7A1A" />
            AI that holds you accountable — not AI that does the work
          </motion.span>

          <motion.h1
            className="hero-h1 mx-auto mb-5 text-[color:var(--text)] flex flex-col items-center justify-center font-bold tracking-tight"
            style={{ lineHeight: 1.1 }}
          >
            <BlurText text="AI that won't do your" delay={0} />
            <span className="text-[#FF7A1A]">
              <BlurText text="work for you" delay={0.4} />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="hero-p mx-auto mb-5 text-[color:var(--text-dim)] max-w-[640px]"
            style={{ lineHeight: 1.5 }}
          >
            Get guided, prove you did the work, and build a track record you can trust.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col items-center justify-center">
          <Button 
            style={{ borderRadius: '24px' }}
            className="px-7 py-6 text-base font-semibold group bg-[#FF7A1A] text-white hover:bg-[#E66A12] shadow-none hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border-none"
            onClick={enterApp}
          >
            Start a Task
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
          <div style={{ color: isDark ? '#71717A' : '#A89A8E', fontSize: '13px', fontWeight: 500, marginTop: '16px' }}>
            Free to use. No sign-in required.
          </div>
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
