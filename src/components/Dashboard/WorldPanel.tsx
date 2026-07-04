import { Suspense, lazy } from 'react';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { IsoHouse, IsoTree } from './IsometricElements';

const World3D = lazy(() => import('./World3D'));

// Removed doneTasks function

// Extract the fallback SVG into a component so we can use it cleanly
const SvgFallback = ({ buildingsCount }: { buildingsCount: number }) => (
  <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[140px] rounded-[50%] bg-[#D1D5DB] shadow-[0_15px_20px_-10px_rgba(0,0,0,0.15)]" style={{ transform: 'translate(-50%, -20%)' }} />
    <svg viewBox="0 0 400 300" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] overflow-visible">
      {buildingsCount > 0 && <IsoHouse x={170} y={130} color="#6EE7B7" />}
      {buildingsCount > 1 && <IsoTree x={120} y={145} />}
      {buildingsCount > 2 && <IsoHouse x={220} y={150} color="#F97316" />}
      {buildingsCount > 3 && <IsoTree x={250} y={120} />}
      {buildingsCount > 4 && <IsoHouse x={140} y={170} color="#60A5FA" />}
      {buildingsCount > 5 && <IsoTree x={200} y={180} />}
      {buildingsCount > 6 && <IsoHouse x={270} y={160} color="#6EE7B7" />}
      {buildingsCount > 7 && <IsoTree x={100} y={160} />}
    </svg>
  </div>
);

export default function WorldPanel() {
  const { state } = useApp();
  const buildingsCount = state.totalCompletedTasks;
  
  const levelThresholds = [0, 5, 15, 30, 60];
  const currentLevelIdx = Math.max(0, levelThresholds.findIndex(t => state.totalCompletedTasks <= t) - 1);
  const currentLevel = currentLevelIdx + 1;

  // Flatten tasks for labels
  const tasks = state.roadmap?.milestones.flatMap(m => m.tasks) || [];

  return (
    <motion.div 
      className="relative flex h-[400px] lg:h-auto min-h-[400px] flex-col items-center justify-start rounded-2xl border border-[var(--border)] p-6 shadow-sm overflow-hidden"
      style={{ background: state.theme === 'dark' ? 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)' : 'linear-gradient(180deg, #d4eefa 0%, #e8f4f8 50%, #fdf8ed 100%)' }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-center text-sm font-semibold text-[var(--text-dim)] pointer-events-none">
        Level {currentLevel} World — {buildingsCount} buildings
      </div>
      
      <div className="absolute top-12 right-16 w-[60px] h-[60px] rounded-full bg-[#fad6a5] z-0" />
      
      <div className="absolute inset-0 top-12">
        <Suspense fallback={<SvgFallback buildingsCount={buildingsCount} />}>
          <World3D buildingsCount={buildingsCount} tasks={tasks} />
        </Suspense>
      </div>

      {buildingsCount === 0 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center gap-2">
          {/* Pulsing ring for empty state */}
          <div className="w-12 h-12 rounded-full border-2 border-[var(--accent)]/50 animate-ping absolute -top-8 opacity-50" />
          <div className="rounded-full bg-[var(--bg-elev)]/90 px-4 py-1.5 text-sm font-semibold text-[var(--text-dim)] backdrop-blur shadow-sm border border-[var(--border)]">
            Complete a task to build your first structure.
          </div>
        </div>
      )}
    </motion.div>
  );
}
