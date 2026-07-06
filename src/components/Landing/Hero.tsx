import { motion, type Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { BlurText } from '../ui/BlurText';
import { useApp } from '../../context/AppContext';
import ShapeGrid from '../ShapeGrid/ShapeGrid';

export default function Hero() {
  const { enterApp } = useApp();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="relative overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)' }}>
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0">
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

      {/* Main Hero Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-140px)] flex-col items-center justify-center pt-24 pb-10">
        <motion.div
          className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center justify-center px-6 text-center mt-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={scaleUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
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
            className="hero-h1 mx-auto mb-4 text-[color:var(--text)] flex flex-col md:inline-block items-center justify-center"
            style={{ lineHeight: 1 }}
          >
            <BlurText text="AI that won't do your " delay={0} />
            <span className="text-orange-500 inline-block md:ml-2">
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
    </div>
  );
}
