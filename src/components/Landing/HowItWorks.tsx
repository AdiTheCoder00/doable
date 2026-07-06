import { CheckSquare, Camera, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';
import InteractiveDemo from './InteractiveDemo';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const floatVariants = {
  float: (custom: number) => ({
    y: [0, -8, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: custom * 0.4
    }
  })
};

export default function HowItWorks() {
  const { enterApp } = useApp();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div id="how-it-works" className="pt-32 pb-16 px-6 md:px-12 max-w-[1100px] mx-auto text-center bg-transparent z-10 relative">
      
      {/* Background Orbs */}
      <div className="absolute top-40 left-[5%] w-[400px] h-[400px] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-60 right-[5%] w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <motion.h2 
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-20 font-['Plus_Jakarta_Sans']"
      >
        How it works
      </motion.h2>

      <div className="relative">
        {/* Connecting Lines (Desktop only) */}
        <svg className="absolute top-[35%] left-[16%] w-[68%] h-16 -z-10 hidden md:block overflow-visible pointer-events-none" viewBox="0 0 100 10" preserveAspectRatio="none">
          <motion.path 
            d="M 0 5 Q 50 -10 100 5" 
            fill="none" 
            stroke="var(--border)" 
            strokeWidth="0.5" 
            strokeDasharray="2 2"
          />
          <motion.path 
            d="M 0 5 Q 50 -10 100 5" 
            fill="none" 
            stroke="var(--accent)" 
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-24"
        >
          {/* Card 1 */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
            onMouseMove={handleMouseMove}
            className="glow-card bg-[var(--bg-elev)] border border-[var(--border)] rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-shadow flex flex-col"
          >
            <motion.div 
              custom={0}
              variants={floatVariants}
              animate="float"
              className="mb-12 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFEAE0] dark:bg-[#3E2519] text-[#FF7A1A]"
            >
              <CheckSquare size={28} strokeWidth={2.5} />
            </motion.div>
            <div className="text-[var(--text-faint)] font-bold text-sm mb-3 uppercase tracking-wider z-10">01</div>
            <h3 className="text-[28px] font-bold text-[var(--text)] mb-4 font-['Plus_Jakarta_Sans'] z-10">Ask</h3>
            <p className="text-[var(--text-dim)] leading-[1.7] text-[17px] z-10">
              Describe your goal. AI breaks it into 3-6 real steps you must complete yourself.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
            onMouseMove={handleMouseMove}
            className="glow-card bg-[var(--bg-elev)] border border-[var(--border)] rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-shadow flex flex-col"
          >
            <motion.div 
              custom={1}
              variants={floatVariants}
              animate="float"
              className="mb-12 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E3F6EB] dark:bg-[#193225] text-[#10B981]"
            >
              <Camera size={28} strokeWidth={2.5} />
            </motion.div>
            <div className="text-[var(--text-faint)] font-bold text-sm mb-3 uppercase tracking-wider z-10">02</div>
            <h3 className="text-[28px] font-bold text-[var(--text)] mb-4 font-['Plus_Jakarta_Sans'] z-10">Do</h3>
            <p className="text-[var(--text-dim)] leading-[1.7] text-[17px] z-10">
              Follow each step at your own pace. No shortcuts, no AI writing it for you.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
            onMouseMove={handleMouseMove}
            className="glow-card bg-[var(--bg-elev)] border border-[var(--border)] rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-shadow flex flex-col"
          >
            <motion.div 
              custom={2}
              variants={floatVariants}
              animate="float"
              className="mb-12 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E5F0FF] dark:bg-[#19273E] text-[#3B82F6]"
            >
              <Star size={28} strokeWidth={2.5} />
            </motion.div>
            <div className="text-[var(--text-faint)] font-bold text-sm mb-3 uppercase tracking-wider z-10">03</div>
            <h3 className="text-[28px] font-bold text-[var(--text)] mb-4 font-['Plus_Jakarta_Sans'] z-10">Prove</h3>
            <p className="text-[var(--text-dim)] leading-[1.7] text-[17px] z-10">
              Submit a screenshot, photo, or short note. AI checks it actually matches the step.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Demo Component */}
      <InteractiveDemo />

      <div className="mt-20">
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={enterApp}
          className="rounded-full bg-orange-500 px-8 py-4 text-[17px] font-bold text-white transition-all hover:bg-orange-600 hover:scale-105 active:scale-95 border-none cursor-pointer inline-flex items-center gap-2 relative z-20"
        >
          Start your first task &rarr;
        </motion.button>
      </div>
    </div>
  );
}
