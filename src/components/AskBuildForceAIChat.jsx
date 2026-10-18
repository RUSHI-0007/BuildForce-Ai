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
    "What is causing the 7-day delay in basement slab?",
    "Show me top 3 vendors for 25mm PVC pipes",
    "How much cement do we need this week?",
    "Check our available credit limit",
    "How does the Takeoff AI verify 99% accuracy?"
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

      if (lower.includes('delay') || lower.includes('basement')) {
        botResponse = "Agent 02 (Project Manager AI) reports a 6% productivity lag on Lower Basement soil backfilling by mason crews (140 sqm completed vs 190 sqm planned). Agent 03 recommends re-sequencing East side plastering 5 days early to completely recover this delay.";
      } else if (lower.includes('vendor') || lower.includes('pvc') || lower.includes('quote')) {
        botResponse = "Agent 04 (Procurement AI) evaluated 3 vendors for 25mm PVC pipes. BuildForce Verified Direct offers ₹100/pipe with 30-day credit, saving ₹14,000 on the combined order vs local dealers.";
      } else if (lower.includes('cement') || lower.includes('material') || lower.includes('stock')) {
        botResponse = "Current on-site OPC 53 Grade cement inventory is 20 Bags against an upcoming requirement of 75 Bags (Deficit: 55 Bags). Agent 04 has auto-drafted RFQ #RFQ-2026-904 for 250 bags.";
      } else if (lower.includes('credit') || lower.includes('capital') || lower.includes('limit')) {
        botResponse = "Your project has unlocked ₹50,00,000 in revolving credit at 0% interest for 30 days via BuildForce Capital. ₹18.50 Lakhs has been drawn, leaving ₹31.50 Lakhs available buffer.";
      } else if (lower.includes('accuracy') || lower.includes('takeoff') || lower.includes('boq')) {
        botResponse = "Agent 01 (Estimation AI) calculates takeoffs by extracting vector CAD geometry and linking each volume back to source sheet DWG tags (e.g. DWG A-5). With our human-in-the-loop review framework, accuracy reaches up to 99%.";
      } else {
        botResponse = `Understood. I am running a correlation check across your 5 active agents for "${query}". Your project RK Towers is at 46% actual progress with 52% planned. All critical path milestones are monitored in real time.`;
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
