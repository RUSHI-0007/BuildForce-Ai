import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, Clock, AlertCircle, IndianRupee, 
  Send, Download, ShieldCheck, ExternalLink, Plus, MessageSquare 
} from 'lucide-react';
import { CONTRACT_STAGE_PAYMENTS } from '../../data/mockData';

export function ContractsStagePayments({ onOpenClientRoom }) {
  const [contract, setContract] = useState(CONTRACT_STAGE_PAYMENTS);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleOpenRequestPayment = (milestone) => {
    setSelectedMilestone(milestone);
    setShowPaymentModal(true);
    setSentSuccess(false);
  };

  const handleSendWhatsAppRequest = () => {
    setSentSuccess(true);
    setTimeout(() => {
      setShowPaymentModal(false);
      setSentSuccess(false);
      if (onOpenClientRoom) onOpenClientRoom();
    }, 1800);
  };

  return (
    <div className="agent-container">
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
              CONTRACT MANAGEMENT & MILESTONE SCHEDULES
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a' }}>
            Contract Terms & Stage Payments
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, maxWidth: 750, marginTop: 4 }}>
            Version-controlled contracts linked with client chat acknowledgements, automated milestone triggers, and payment verification proofs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <select style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13, fontWeight: 600 }}>
            <option>Kothrud Residence Renovation (Ramesh Chavan)</option>
            <option>Katraj Commercial Building (Sunita Patil)</option>
          </select>
          <button 
            style={{ 
              background: '#0f766e', 
              color: '#ffffff', 
              border: 'none', 
              padding: '9px 16px', 
              borderRadius: 6, 
              fontSize: 13, 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6,
              cursor: 'pointer' 
            }}
          >
            <Plus size={15} />
            <span>New Version</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="agent-metric-card">
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            GROSS CONTRACT VALUE (INCL. GST)
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: '6px 0 2px' }}>
            ₹{contract.grossContractValue.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: '#64748b' }}>
            Base: ₹{contract.baseValue.toLocaleString()} + 18% GST (₹{contract.gst18.toLocaleString()})
          </div>
        </div>

        <div className="agent-metric-card" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
            PAYMENTS RECEIVED
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#166534', margin: '6px 0 2px' }}>
            ₹{contract.paymentsReceived.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: '#15803d' }}>
            41% of total collected (Stage 1 & 2 Paid)
          </div>
        </div>

        <div className="agent-metric-card" style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>
            OUTSTANDING RECEIVABLE
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#b45309', margin: '6px 0 2px' }}>
            ₹{contract.outstandingReceivable.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: '#b45309' }}>
            3 milestones remaining
          </div>
        </div>

        <div className="agent-metric-card">
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            CONTRACT STATUS & VERSION
          </div>
          <div style={{ display: 'flex', gap: 6, margin: '6px 0 4px', alignItems: 'center' }}>
            <span style={{ fontSize: 12, background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
              Version {contract.version}
            </span>
            <span style={{ fontSize: 12, background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
              Acknowledged
            </span>
          </div>
          <div style={{ fontSize: 11, color: '#64748b' }}>
            Signed off on {contract.signedDate}
          </div>
        </div>
      </div>

      {/* Contract Specifications Summary Card */}
      <div className="agent-workspace-card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <strong style={{ fontSize: 15, color: '#0f172a' }}>Contract Specifications</strong>
            <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>Parties, commercial terms, and regulatory provisions</span>
          </div>
          <span style={{ fontSize: 11.5, fontFamily: 'monospace', color: '#64748b', background: '#f1f5f9', padding: '3px 8px', borderRadius: 4 }}>
            REF: {contract.contractRef}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
          <div>
            <div style={{ fontSize: 12, color: '#64748b' }}>Contractor / Builder:</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Omkar Infrastructure & Builders</div>

            <div style={{ fontSize: 12, color: '#64748b' }}>Client Party:</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Ramesh Chavan (+91 98220 12345)</div>

            <div style={{ fontSize: 12, color: '#64748b' }}>Scope Summary:</div>
            <div style={{ fontSize: 12.5, color: '#334155', lineHeight: 1.5 }}>
              Complete turnkey civil and interior execution for 3BHK flat including false ceiling, plumbing lines, Italian marble flooring, and concealed electricals as per architectural specifications.
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <span style={{ fontSize: 11, color: '#64748b' }}>Retention Security:</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                {contract.retentionPercent}% (₹{contract.retentionAmount.toLocaleString()})
              </div>
            </div>
            <div>
              <span style={{ fontSize: 11, color: '#64748b' }}>Defect Liability:</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                {contract.defectLiabilityMonths} Months
              </div>
            </div>
            <div>
              <span style={{ fontSize: 11, color: '#64748b' }}>Change Order Rule:</span>
              <div style={{ fontSize: 11.5, color: '#475569', lineHeight: 1.4 }}>
                All structural, material, or architectural alterations require prior written approval in chat before on-site execution.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Milestones Schedule Table (5 Stages) */}
      <div className="agent-workspace-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong style={{ fontSize: 16, color: '#0f172a' }}>Payment Milestones Schedule</strong>
            <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>Stage triggers, due dates, invoices, and payment receipts</span>
          </div>
          <span style={{ fontSize: 12, background: '#f1f5f9', color: '#475569', padding: '3px 10px', borderRadius: 12, fontWeight: 700 }}>
            5 Stages
          </span>
        </div>

        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 18px', textAlign: 'left' }}>STAGE & MILESTONE</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>% VALUE</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>AMOUNT</th>
              <th style={{ padding: '12px 14px', textAlign: 'center' }}>STATUS</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>PAYMENT DATE / REF</th>
              <th style={{ padding: '12px 18px', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {contract.milestones.map((m) => (
              <tr key={m.stage} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ 
                      width: 26, 
                      height: 26, 
                      borderRadius: '50%', 
                      background: m.status === 'Paid' ? '#dcfce7' : m.status.includes('Receivable') ? '#eff6ff' : '#f1f5f9',
                      color: m.status === 'Paid' ? '#166534' : m.status.includes('Receivable') ? '#1d4ed8' : '#64748b',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 800
                    }}>
                      {m.stage}
                    </div>
                    <div>
                      <strong style={{ fontSize: 14, color: '#0f172a', display: 'block' }}>{m.title}</strong>
                      <span style={{ fontSize: 11.5, color: '#64748b' }}>{m.notes}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 14px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#0f766e' }}>
                  {m.percentage}%
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right', fontSize: 14, fontWeight: 800, color: '#0f172a' }}>
                  ₹{m.amount.toLocaleString()}
                </td>
                <td style={{ padding: '14px 14px', textAlign: 'center' }}>
                  <span style={{ 
                    fontSize: 11, 
                    fontWeight: 700, 
                    padding: '3px 10px', 
                    borderRadius: 4, 
                    background: m.status === 'Paid' ? '#dcfce7' : m.status.includes('Receivable') ? '#dbeafe' : '#f1f5f9',
                    color: m.status === 'Paid' ? '#166534' : m.status.includes('Receivable') ? '#1e40af' : '#64748b'
                  }}>
                    {m.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 12, color: '#334155' }}>
                  <div>{m.paymentDate}</div>
                  <span style={{ fontSize: 10.5, color: '#64748b', fontFamily: 'monospace' }}>{m.reference}</span>
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                  {m.status === 'Paid' ? (
                    <span style={{ fontSize: 12, color: '#166534', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <CheckCircle2 size={14} /> Receipt
                    </span>
                  ) : m.status.includes('Receivable') ? (
                    <button 
                      onClick={() => handleOpenRequestPayment(m)}
                      style={{ 
                        background: '#0f766e', 
                        color: '#ffffff', 
                        border: 'none', 
                        padding: '6px 12px', 
                        borderRadius: 4, 
                        fontSize: 12, 
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      <Send size={12} />
                      <span>Request Payment</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>Upcoming</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Request Modal */}
      {showPaymentModal && selectedMilestone && (
        <div className="modal-backdrop" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Send Milestone Payment Request</h3>
              <button onClick={() => setShowPaymentModal(false)} style={{ background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>

            {sentSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle2 size={44} style={{ color: '#10b981', margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Payment Request Dispatched!</h4>
                <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
                  Sent to Ramesh Chavan via authenticated Client WhatsApp Room with GST invoice attached.
                </p>
              </div>
            ) : (
              <div>
                <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, marginBottom: 16, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Milestone:</div>
                  <strong style={{ fontSize: 15, color: '#0f172a' }}>Stage {selectedMilestone.stage}: {selectedMilestone.title}</strong>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0f766e', marginTop: 6 }}>
                    ₹{selectedMilestone.amount.toLocaleString()} (Due Now)
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6 }}>
                    WhatsApp Message Preview for Ramesh Chavan (+91 98220 12345):
                  </label>
                  <div style={{ background: '#e0f2fe', padding: 12, borderRadius: 6, fontSize: 12, color: '#0369a1', lineHeight: 1.5, border: '1px solid #bae6fd' }}>
                    "Dear Mr. Ramesh Chavan, Ground + 1 Slab formwork at Flat 402 Shanti Heights is successfully completed and inspected. As per our contract, Stage 3 milestone of ₹3,68,750 is now due. Please find the attached GST invoice and bank details."
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button 
                    onClick={handleSendWhatsAppRequest}
                    style={{ flex: 1, background: '#0f766e', color: '#fff', border: 'none', padding: '11px', borderRadius: 6, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <MessageSquare size={16} />
                    <span>Send via Client Room & WhatsApp</span>
                  </button>
                  <button 
                    onClick={() => setShowPaymentModal(false)}
                    style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '11px 16px', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
