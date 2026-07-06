import { CheckSquare, Camera, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';

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
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

const floatVariants = {
  float: (custom: number) => ({
    y: [0, -8, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: custom * 0.4
    }
  })
};

export default function HowItWorks() {
  const { enterApp } = useApp();

  return (
    <div id="how-it-works" className="py-32 px-6 md:px-12 max-w-[1100px] mx-auto text-center font-sans bg-transparent z-10 relative">
      <motion.h2 
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-20 font-['Plus_Jakarta_Sans']"
      >
        How it works
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-20"
      >
        {/* Card 1 */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
          className="bg-[var(--bg-elev)] border border-[var(--border)] rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-shadow flex flex-col"
        >
          <motion.div 
            custom={0}
            variants={floatVariants}
            animate="float"
            className="mb-12 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFEAE0] dark:bg-[#3E2519] text-[#FF7A1A]"
          >
            <CheckSquare size={28} strokeWidth={2.5} />
          </motion.div>
          <div className="text-[var(--text-faint)] font-bold text-sm mb-3 uppercase tracking-wider">01</div>
          <h3 className="text-[28px] font-bold text-[var(--text)] mb-4 font-['Plus_Jakarta_Sans']">Ask</h3>
          <p className="text-[var(--text-dim)] leading-[1.7] text-[17px]">
            Describe your goal. AI breaks it into 3-6 real steps you must complete yourself.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
          className="bg-[var(--bg-elev)] border border-[var(--border)] rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-shadow flex flex-col"
        >
          <motion.div 
            custom={1}
            variants={floatVariants}
            animate="float"
            className="mb-12 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E3F6EB] dark:bg-[#193225] text-[#10B981]"
          >
            <Camera size={28} strokeWidth={2.5} />
          </motion.div>
          <div className="text-[var(--text-faint)] font-bold text-sm mb-3 uppercase tracking-wider">02</div>
          <h3 className="text-[28px] font-bold text-[var(--text)] mb-4 font-['Plus_Jakarta_Sans']">Do</h3>
          <p className="text-[var(--text-dim)] leading-[1.7] text-[17px]">
            Follow each step at your own pace. No shortcuts, no AI writing it for you.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
          className="bg-[var(--bg-elev)] border border-[var(--border)] rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-shadow flex flex-col"
        >
          <motion.div 
            custom={2}
            variants={floatVariants}
            animate="float"
            className="mb-12 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E5F0FF] dark:bg-[#19273E] text-[#3B82F6]"
          >
            <Star size={28} strokeWidth={2.5} />
          </motion.div>
          <div className="text-[var(--text-faint)] font-bold text-sm mb-3 uppercase tracking-wider">03</div>
          <h3 className="text-[28px] font-bold text-[var(--text)] mb-4 font-['Plus_Jakarta_Sans']">Prove</h3>
          <p className="text-[var(--text-dim)] leading-[1.7] text-[17px]">
            Submit a screenshot, photo, or short note. AI checks it actually matches the step.
          </p>
        </motion.div>
      </motion.div>

      <motion.button 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={enterApp}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--accent)] text-white shadow-[0_10px_30px_rgba(255,122,26,0.3)] hover:shadow-[0_15px_40px_rgba(255,122,26,0.4)] hover:bg-[var(--accent-strong)] transition-all font-semibold text-[16px] border-none cursor-pointer"
      >
        Start your first task &rarr;
      </motion.button>
    </div>
  );
}
