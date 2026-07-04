import type { ChatEntry as ChatEntryType, Seriousness } from '../../types';
import { useApp } from '../../context/AppContext';
import { escapeHtml } from '../../utils/helpers';
import { motion } from 'framer-motion';

interface Props {
  entry: ChatEntryType;
}

export default function ChatEntry({ entry }: Props) {
  const { decideYes, decideNo, setSeriousness } = useApp();

  const handleSeriousness = (level: Seriousness) => {
    setSeriousness(entry.id, level);
  };

  return (
    <motion.div 
      className="panel chat-entry"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {entry.answering ? (
        <>
          <div className="answer-q">You asked</div>
          <div className="answer-text" style={{ marginBottom: '16px' }}>{escapeHtml(entry.question)}</div>
          <div className="thinking">
            Thinking
            <span className="dots">
              <span /><span /><span />
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="answer-q">You asked</div>
          <div className="answer-text" style={{ marginBottom: '18px' }}>{escapeHtml(entry.question)}</div>
          <div className="answer-q">Doable</div>
          <div className="answer-text">{entry.answer}</div>

          {!entry.decided && (
            <div className="followup-inline">
              <h3 style={{ fontSize: '16px', margin: '0 0 8px' }}>Want to actually go do this?</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '14px', margin: '0 0 14px' }}>
                Turn this into small steps you complete for real  with proof and tokens along the way.
              </p>
              <div className="seriousness" id={`ser-${entry.id}`}>
                {(['curious', 'learn', 'master'] as Seriousness[]).map((level) => (
                  <div
                    key={level}
                    className={`ser-opt${entry.seriousness === level ? ' sel' : ''}`}
                    onClick={() => handleSeriousness(level)}
                  >
                    <span className="e">
                      {level === 'curious' ? '\u{1F440}' : level === 'learn' ? '\u{1F4D8}' : '\u{1F3C6}'}
                    </span>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn-primary"
                  style={{ flex: '1', justifyContent: 'center', padding: '12px' }}
                  onClick={() => decideYes(entry.id, entry.seriousness)}
                >
                  Yes, build my roadmap 
                </button>
                <button className="btn-ghost" style={{ padding: '11px 18px' }} onClick={() => decideNo(entry.id)}>
                  No, that's all
                </button>
              </div>
            </div>
          )}

          {entry.decided === 'roadmap' && (
            <div className="decided-tag">{'\u2705'} Turned into a roadmap  check the plan on the right</div>
          )}
          {entry.decided === 'no' && (
            <div className="decided-tag">Saved as answer only  no plan started</div>
          )}
        </>
      )}
    </motion.div>
  );
}
