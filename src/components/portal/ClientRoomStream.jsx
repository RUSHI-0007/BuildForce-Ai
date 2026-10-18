import React, { useState } from 'react';
import { 
  MessageSquare, Send, Plus, Image, CheckCheck, 
  IndianRupee, Clock, CheckCircle2, ShieldCheck, Sparkles, User, FileText 
} from 'lucide-react';
import { CLIENT_ROOM_STREAM } from '../../data/mockData';

export function ClientRoomStream() {
  const [messages, setMessages] = useState(CLIENT_ROOM_STREAM);
  const [inputText, setInputText] = useState('');
  const [showChangeOrderModal, setShowChangeOrderModal] = useState(false);
  const [newChangeOrder, setNewChangeOrder] = useState({
    title: '',
    cost: '',
    timelineImpact: '+2 Days'
  });

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const msg = {
      id: `msg-${Date.now()}`,
      sender: 'contractor',
      senderName: 'Omkar (Contractor)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputText,
      isChangeOrder: false
    };
    setMessages(prev => [...prev, msg]);
    setInputText('');

    // Simulate Client response after 1 second
    setTimeout(() => {
      const clientReply = {
        id: `msg-reply-${Date.now()}`,
        sender: 'client',
        senderName: 'Ramesh Chavan (Client)',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: "Noted Omkar. Thanks for keeping me updated on today's progress.",
        isChangeOrder: false
      };
      setMessages(prev => [...prev, clientReply]);
    }, 1200);
  };

  const handleProposeChangeOrder = (e) => {
    e.preventDefault();
    if (!newChangeOrder.title || !newChangeOrder.cost) return;

    const changeMsg = {
      id: `msg-co-${Date.now()}`,
      sender: 'contractor',
      senderName: 'Omkar (Contractor)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Change Order Proposed: ${newChangeOrder.title}. Cost: +₹${Number(newChangeOrder.cost).toLocaleString()}. Timeline: ${newChangeOrder.timelineImpact}.`,
      isChangeOrder: true,
      changeOrderDetails: {
        title: newChangeOrder.title,
        cost: `₹${Number(newChangeOrder.cost).toLocaleString()}`,
        timelineImpact: newChangeOrder.timelineImpact
      }
    };

    setMessages(prev => [...prev, changeMsg]);
    setShowChangeOrderModal(false);
    setNewChangeOrder({ title: '', cost: '', timelineImpact: '+2 Days' });

    // Client auto-signs change order
    setTimeout(() => {
      const clientSign = {
        id: `msg-sign-${Date.now()}`,
        sender: 'client',
        senderName: 'Ramesh Chavan (Client)',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Change order approved. Happy with +₹${Number(newChangeOrder.cost).toLocaleString()} and ${newChangeOrder.timelineImpact}.`,
        isSignedApproval: true,
        badgeText: "Client Signed Scope & Terms"
      };
      setMessages(prev => [...prev, clientSign]);
    }, 2000);
  };

  return (
    <div className="agent-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
              CLIENT ROOM • WHATSAPP-STYLE STREAM
            </span>
            <span style={{ fontSize: 12, color: '#64748b' }}>End-to-End Logged & Realtime</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a' }}>
            Client Communications & Decision Hub
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, maxWidth: 750, marginTop: 4 }}>
            Direct authenticated stream with property owner. Payment requests, change order sign-offs, and live site photo ticks with legal audit trail.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>SELECT SITE:</span>
          <select style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13, fontWeight: 600 }}>
            <option>Kothrud Residence Renovation (Ramesh Chavan)</option>
            <option>Katraj Commercial Building (Sunita Patil)</option>
          </select>
        </div>
      </div>

      {/* Main WhatsApp-Style Card */}
      <div style={{ 
        background: '#ffffff', 
        borderRadius: 12, 
        border: '1px solid #cbd5e1', 
        boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '620px'
      }}>
        {/* Chat Header */}
        <div style={{ 
          background: '#f8fafc', 
          borderBottom: '1px solid #e2e8f0', 
          padding: '14px 20px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ 
              width: 38, 
              height: 38, 
              borderRadius: '50%', 
              background: '#0f766e', 
              color: '#fff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 800
            }}>
              RC
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <strong style={{ fontSize: 15, color: '#0f172a' }}>Ramesh Chavan</strong>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span>
              </div>
              <div style={{ fontSize: 11.5, color: '#64748b' }}>
                Kothrud Residence Renovation • 📞 +91 98220 12345
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={() => alert('Generated Stage 3 payment request for ₹3,68,750 sent to Ramesh Chavan.')}
              style={{ 
                background: '#ecfdf5', 
                color: '#065f46', 
                border: '1px solid #a7f3d0', 
                padding: '7px 12px', 
                borderRadius: 6, 
                fontSize: 12, 
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <IndianRupee size={13} />
              <span>Request Payment</span>
            </button>
            <button 
              onClick={() => setShowChangeOrderModal(true)}
              style={{ 
                background: '#eff6ff', 
                color: '#1d4ed8', 
                border: '1px solid #bfdbfe', 
                padding: '7px 12px', 
                borderRadius: 6, 
                fontSize: 12, 
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Plus size={13} />
              <span>Propose Change Order</span>
            </button>
            <button 
              onClick={() => {
                const photoMsg = {
                  id: `photo-${Date.now()}`,
                  sender: 'contractor',
                  senderName: 'Omkar (Contractor)',
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  text: "Site update photo: Main living room brickwork aligned and cured. Electrical conduits placed.",
                  isPhoto: true
                };
                setMessages(prev => [...prev, photoMsg]);
              }}
              style={{ 
                background: '#f1f5f9', 
                color: '#475569', 
                border: '1px solid #cbd5e1', 
                padding: '7px 12px', 
                borderRadius: 6, 
                fontSize: 12, 
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Image size={13} />
              <span>Send Photo</span>
            </button>
          </div>
        </div>

        {/* Message Stream Body */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '20px', 
          background: '#f0f4f8', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 16 
        }}>
          {messages.map((m) => {
            const isMe = m.sender === 'contractor';
            return (
              <div 
                key={m.id} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  alignSelf: isMe ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4, display: 'flex', gap: 6 }}>
                  <span>{m.senderName}</span>
                  <span>{m.time}</span>
                </div>

                <div style={{ 
                  background: isMe ? '#0f766e' : '#ffffff', 
                  color: isMe ? '#ffffff' : '#0f172a',
                  padding: '12px 16px',
                  borderRadius: isMe ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  fontSize: 13.5,
                  lineHeight: 1.5
                }}>
                  {m.text}

                  {m.isChangeOrder && m.changeOrderDetails && (
                    <div style={{ 
                      marginTop: 10, 
                      background: 'rgba(0,0,0,0.15)', 
                      padding: '10px 12px', 
                      borderRadius: 6, 
                      fontSize: 12,
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      <div style={{ fontWeight: 800 }}>{m.changeOrderDetails.title}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                        <span>Cost: <strong>+{m.changeOrderDetails.cost}</strong></span>
                        <span>Timeline: <strong>{m.changeOrderDetails.timelineImpact}</strong></span>
                      </div>
                    </div>
                  )}

                  {m.isSignedApproval && (
                    <div style={{ 
                      marginTop: 8, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 6, 
                      background: '#ecfdf5', 
                      color: '#065f46', 
                      padding: '4px 8px', 
                      borderRadius: 4, 
                      fontSize: 11.5, 
                      fontWeight: 800 
                    }}>
                      <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                      <span>{m.badgeText}</span>
                    </div>
                  )}

                  {m.isPhoto && (
                    <div style={{ 
                      marginTop: 8, 
                      height: 120, 
                      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', 
                      borderRadius: 6, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#94a3b8',
                      fontSize: 12
                    }}>
                      [Site Photo: Living Room Brickwork & Conduits - Verified]
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2, fontSize: 10.5, color: '#94a3b8' }}>
                  {isMe && <CheckCheck size={14} style={{ color: '#0f766e' }} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input Bar */}
        <div style={{ 
          padding: '14px 20px', 
          background: '#ffffff', 
          borderTop: '1px solid #e2e8f0', 
          display: 'flex', 
          gap: 12,
          alignItems: 'center'
        }}>
          <input 
            type="text" 
            placeholder="Message Ramesh Chavan directly regarding site updates, drawings, or milestone invoices..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            style={{ 
              flex: 1, 
              padding: '11px 16px', 
              borderRadius: 8, 
              border: '1px solid #cbd5e1', 
              fontSize: 13.5 
            }}
          />
          <button 
            onClick={handleSendMessage}
            style={{ 
              background: '#0f766e', 
              color: '#ffffff', 
              border: 'none', 
              padding: '11px 20px', 
              borderRadius: 8, 
              fontSize: 13, 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6,
              cursor: 'pointer' 
            }}
          >
            <Send size={15} />
            <span>Send</span>
          </button>
        </div>
      </div>

      {/* Propose Change Order Modal */}
      {showChangeOrderModal && (
        <div className="modal-backdrop" onClick={() => setShowChangeOrderModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Propose Client Change Order</h3>
              <button onClick={() => setShowChangeOrderModal(false)} style={{ background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleProposeChangeOrder} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>
                  Change Item / Additional Work Description
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Italian Marble upgrade in Master Bed"
                  value={newChangeOrder.title}
                  onChange={e => setNewChangeOrder({...newChangeOrder, title: e.target.value})}
                  required
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>
                    Additional Cost (₹)
                  </label>
                  <input 
                    type="number" 
                    placeholder="e.g. 45000"
                    value={newChangeOrder.cost}
                    onChange={e => setNewChangeOrder({...newChangeOrder, cost: e.target.value})}
                    required
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>
                    Timeline Impact
                  </label>
                  <select 
                    value={newChangeOrder.timelineImpact}
                    onChange={e => setNewChangeOrder({...newChangeOrder, timelineImpact: e.target.value})}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                  >
                    <option value="+0 Days (No delay)">+0 Days (No delay)</option>
                    <option value="+2 Days">+2 Days</option>
                    <option value="+3 Days">+3 Days</option>
                    <option value="+5 Days">+5 Days</option>
                    <option value="+7 Days">+7 Days</option>
                  </select>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: 12, borderRadius: 6, fontSize: 12, color: '#475569', border: '1px solid #e2e8f0' }}>
                ℹ️ Once proposed, the homeowner will receive a one-click digital approval prompt in WhatsApp to sign off on price and extension.
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button 
                  type="submit"
                  style={{ flex: 1, background: '#0f766e', color: '#fff', border: 'none', padding: '10px', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}
                >
                  Propose to Client
                </button>
                <button 
                  type="button"
                  onClick={() => setShowChangeOrderModal(false)}
                  style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '10px 16px', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
