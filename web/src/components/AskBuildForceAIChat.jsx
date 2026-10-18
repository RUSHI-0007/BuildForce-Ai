import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User, CornerDownLeft } from 'lucide-react';

export function AskBuildForceAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am your BuildForce Construction AI Copilot, connected to your 5 workforce agents. Ask me about your BOQ takeoffs, site delays, procurement quotes, or credit lines."
    }
  ]);

  const quickChips = [
    "What is causing the delay in 1st Floor Slab?",
    "Compare quotes for 25mm PVC pipes",
    "How much cement do we need this week?",
    "Check our 12-week cash runway",
    "How does 3-way invoice matching work?"
  ];

  const handleSend = (textToSend = null) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulated AI domain response
    setTimeout(() => {
      let botResponse = "";
      const lower = query.toLowerCase();

      if (lower.includes('delay') || lower.includes('schedule') || lower.includes('cpm')) {
        botResponse = "Site Scheduler & PM AI computes Critical Path Method (CPM) floats, detects worker attendance deficits from your daily haazri logs, and prepares recovery plans while preserving your Version 1 baseline.";
      } else if (lower.includes('vendor') || lower.includes('quote') || lower.includes('procurement')) {
        botResponse = "Procurement & RFQ AI evaluates quotes you type in from your local dealers, calculating landed costs, GST, transport, and credit terms to rank the most cost-effective option.";
      } else if (lower.includes('cement') || lower.includes('material') || lower.includes('stock')) {
        botResponse = "Procurement AI calculates days of stock cover from actual outward consumption logs and alerts you when order-by dates are reached.";
      } else if (lower.includes('credit') || lower.includes('cash') || lower.includes('runway') || lower.includes('wage')) {
        botResponse = "Cash & Bills AI simulates your 12-week cashflow runway day-by-day, protecting Saturday worker wages first, checking dealer grace periods, and conducting 3-way invoice audits.";
      } else if (lower.includes('takeoff') || lower.includes('boq') || lower.includes('drawing')) {
        botResponse = "Estimator & Takeoff AI is currently marked 'Building'. You can record manual quantities and rates in the site ledger today.";
      } else {
        botResponse = `Understood. I am cross-referencing your active site records for "${query}". Your site tasks, attendance logs, and material transactions are calculated live in your workspace.`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button 
        className="floating-ai-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Ask BuildForce AI Chat"
      >
        <Sparkles size={18} style={{ color: '#eb4d4b' }} />
        <span>Ask BuildForce AI</span>
      </button>

      {/* Chat Drawer */}
      {isOpen && (
        <div className="ai-chat-drawer">
          {/* Header */}
          <div className="ai-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ 
                width: 30, 
                height: 30, 
                borderRadius: '50%', 
                background: '#2563eb', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Bot size={18} />
              </div>
              <div>
                <strong style={{ fontSize: 14 }}>BuildForce Construction AI</strong>
                <div style={{ fontSize: 10, color: '#93c5fd' }}>Connected to 5 Active Agents</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: '#cbd5e1', fontSize: 18, background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="ai-chat-messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}

            {/* Quick Chips */}
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>SUGGESTED QUERIES:</span>
              <div className="chat-chips">
                {quickChips.map((chip, i) => (
                  <button 
                    key={i} 
                    className="chat-chip"
                    onClick={() => handleSend(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="ai-chat-input-area">
            <input 
              type="text" 
              className="ai-chat-input"
              placeholder="Ask anything about takeoffs, delays, vendors..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="ai-chat-send" onClick={() => handleSend()}>
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
