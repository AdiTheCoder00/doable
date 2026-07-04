import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ProofModal() {
  const { state, completeTask, closeModal } = useApp();
  const [fileName, setFileName] = useState('');
  const [step, setStep] = useState<'upload' | 'verifying' | 'done'>('upload');

  if (!state.pendingTask || !state.roadmap) return null;

  const { mIdx, tIdx } = state.pendingTask;
  const task = state.roadmap.milestones[mIdx]?.tasks[tIdx];
  if (!task) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.files?.[0]?.name ?? '';
    setFileName(name);
  };

  const handleSubmit = () => {
    setStep('verifying');
    setTimeout(() => {
      completeTask();
      setStep('done');
    }, 1300);
  };

  return (
    <div className="modal" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-card">
        {step === 'upload' && (
          <>
            <h3>Upload proof</h3>
            <p className="desc">{task.title}</p>
            <div className="dropzone">
              {'\u{1F4CE}'} Drop a screenshot here, or
              <div style={{ marginTop: '10px' }}>
                <label className="btn-small" style={{ cursor: 'pointer' }}>
                  Choose file
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                </label>
              </div>
              {fileName && <div className="fname">{'\u{1F4C4}'} {fileName}</div>}
            </div>
            <div className="modal-actions">
              <button className="btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="btn-primary" disabled={!fileName} onClick={handleSubmit}>Verify</button>
            </div>
          </>
        )}
        {step === 'verifying' && (
          <>
            <h3>Verifying\u2026</h3>
            <p className="desc">AI is checking this plausibly matches the step</p>
            <div className="spinner" />
          </>
        )}
        {step === 'done' && (
          <>
            <div className="verify-check">{'\u2705'}</div>
            <h3>Verified</h3>
            <div className="token-pop">+{task.tokens} {'\u{1FA99}'}</div>
            <p className="desc">Nice work \u2014 next step unlocked.</p>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => { setStep('upload'); setFileName(''); closeModal(); }}>
                Keep going
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
