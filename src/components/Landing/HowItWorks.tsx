import { CheckSquare, Camera, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function HowItWorks() {
  const { enterApp } = useApp();

  return (
    <div id="how-it-works" className="py-24 px-6 md:px-12 max-w-[1100px] mx-auto text-center font-sans bg-transparent z-10 relative">
      <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-16 font-['Plus_Jakarta_Sans']">
        How it works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16">
        {/* Card 1 */}
        <div className="bg-[var(--bg-elev)] border border-[var(--border)] rounded-3xl p-8 md:p-10 shadow-sm flex flex-col">
          <div className="mb-12 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFEAE0] dark:bg-[#3E2519] text-[#FF7A1A]">
            <CheckSquare size={28} strokeWidth={2.5} />
          </div>
          <div className="text-[var(--text-faint)] font-bold text-sm mb-3">01</div>
          <h3 className="text-[28px] font-bold text-[var(--text)] mb-4 font-['Plus_Jakarta_Sans']">Ask</h3>
          <p className="text-[var(--text-dim)] leading-[1.7] text-[17px]">
            Describe your goal. AI breaks it into 3-6 real steps you must complete yourself.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[var(--bg-elev)] border border-[var(--border)] rounded-3xl p-8 md:p-10 shadow-sm flex flex-col">
          <div className="mb-12 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E3F6EB] dark:bg-[#193225] text-[#10B981]">
            <Camera size={28} strokeWidth={2.5} />
          </div>
          <div className="text-[var(--text-faint)] font-bold text-sm mb-3">02</div>
          <h3 className="text-[28px] font-bold text-[var(--text)] mb-4 font-['Plus_Jakarta_Sans']">Do</h3>
          <p className="text-[var(--text-dim)] leading-[1.7] text-[17px]">
            Follow each step at your own pace. No shortcuts, no AI writing it for you.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[var(--bg-elev)] border border-[var(--border)] rounded-3xl p-8 md:p-10 shadow-sm flex flex-col">
          <div className="mb-12 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E5F0FF] dark:bg-[#19273E] text-[#3B82F6]">
            <Star size={28} strokeWidth={2.5} />
          </div>
          <div className="text-[var(--text-faint)] font-bold text-sm mb-3">03</div>
          <h3 className="text-[28px] font-bold text-[var(--text)] mb-4 font-['Plus_Jakarta_Sans']">Prove</h3>
          <p className="text-[var(--text-dim)] leading-[1.7] text-[17px]">
            Submit a screenshot, photo, or short note. AI checks it actually matches the step.
          </p>
        </div>
      </div>

      <button 
        onClick={enterApp}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--text-faint)] text-[var(--text)] hover:bg-[var(--bg-elev-2)] transition-colors font-semibold text-[15px] bg-transparent"
      >
        Try it now &rarr;
      </button>
    </div>
  );
}
