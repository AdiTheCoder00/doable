import { useState } from 'react';
import type { ChatEntry as ChatEntryType } from '../../types';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Copy, Check } from 'lucide-react';

import { motion } from 'framer-motion';

interface Props {
  entry: ChatEntryType;
}

export default function ChatEntry({ entry }: Props) {
  const { decideYes, decideNo } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!entry.answer) return;
    try {
      await navigator.clipboard.writeText(entry.answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
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
          <div className="answer-text" style={{ marginBottom: '16px' }}>{entry.question}</div>
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
          <div className="answer-text" style={{ marginBottom: '18px' }}>{entry.question}</div>
          <div className="flex items-center justify-between mb-1">
            <div className="answer-q mb-0">Doable</div>
            <button 
              onClick={handleCopy}
              className="flex items-center justify-center p-1.5 text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--bg-elev-2)] rounded-md transition-colors"
              title="Copy answer"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>
          <div className="answer-text">{entry.answer}</div>

          {!entry.decided && (
            <div className="followup-inline">
              <h3 style={{ fontSize: '16px', margin: '0 0 8px' }}>Want to actually go do this?</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '14px', margin: '0 0 14px' }}>
                Turn this into small steps you complete for real  with proof along the way.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                  onClick={() => decideYes(entry.id, entry.seriousness)}
                >
                  Yes, build my roadmap
                </Button>
                <Button variant="ghost" onClick={() => decideNo(entry.id)}>
                  No, that's all
                </Button>
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
