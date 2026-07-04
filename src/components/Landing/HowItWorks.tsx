import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <div className="section" id="how-section">
      <div className="section-head">
        <span className="kicker">The loop</span>
        <h2>Ask. Do. Prove.</h2>
        <p>Every other AI tool ends the moment it gives you the answer. Doable starts there.</p>
      </div>
      <div className="steps">
        <motion.div className="step-card" whileHover={{ y: -5, boxShadow: 'var(--shadow)' }} transition={{ duration: 0.2 }}>
          <div className="stepnum">01</div>
          <h3>Ask</h3>
          <p>Tell Doable what you're trying to do  an assignment, a job app, a new skill. It answers like any AI would.</p>
        </motion.div>
        <motion.div className="step-card" whileHover={{ y: -5, boxShadow: 'var(--shadow)' }} transition={{ duration: 0.2 }}>
          <div className="stepnum">02</div>
          <h3>Do</h3>
          <p>It hands you a step-by-step roadmap, broken into small milestones. You do the actual work, one step at a time.</p>
        </motion.div>
        <motion.div className="step-card" whileHover={{ y: -5, boxShadow: 'var(--shadow)' }} transition={{ duration: 0.2 }}>
          <div className="stepnum">03</div>
          <h3>Prove</h3>
          <p>Snap a screenshot. AI checks it plausibly matches the step  tokens land, your streak holds, the next step unlocks.</p>
        </motion.div>
      </div>
      <div className="note-band">
        <h4>A note on what this actually is {'\u{1F44B}'}</h4>
        <p>Proof of work today checks plausibility with AI  it's not tamper-proof. Think of it as building your own honest record over time, not a courtroom-grade audit.</p>
      </div>
    </div>
  );
}
