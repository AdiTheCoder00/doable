import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ChatEntryComponent from './ChatEntry';

export default function ChatColumn() {
  const { state, askQuestion } = useApp();
  const [input, setInput] = useState('');

  const handleAsk = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    askQuestion(trimmed);
  };

  const fillExample = (text: string) => {
    setInput(text);
  };

  return (
    <div className="chat-col">
      <div className="goal-box" id="ask-block" style={{ marginTop: 0 }}>
        <h1 id="ask-heading">What do you want to know?</h1>
        <p>Ask it like you'd ask any AI. You'll get a real answer first \u2014 the plan is optional.</p>
        <textarea
          id="goal-input"
          placeholder="e.g. How do I get started with Python basics?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn-primary" id="ask-btn" onClick={handleAsk}>Ask Doable \u2192</button>
        <div className="chip-examples">
          {[
            ['How do I get started with Python basics?', 'python basics'],
            ['What is a hackathon and how do I participate?', 'hackathon basics'],
            ['How do I prepare for coding interviews?', 'coding interviews'],
            ['How do I get started with SQL?', 'SQL basics'],
          ].map(([full, label]) => (
            <span className="chip" key={label} onClick={() => fillExample(full)}>{label}</span>
          ))}
        </div>
      </div>
      <div id="chat-log">
        {[...state.chatLog].reverse().map((entry) => (
          <ChatEntryComponent key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
