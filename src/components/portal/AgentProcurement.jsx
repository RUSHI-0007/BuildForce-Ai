import React, { useState } from 'react';
import { 
  ShoppingBag, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, 
  Truck, Clock, DollarSign, Download, Printer, Tag 
} from 'lucide-react';
import { PROCUREMENT_QUOTES } from '../../data/mockData';
import confetti from 'canvas-confetti';

export function AgentProcurement({ activeProject }) {
  const [selectedVendorId, setSelectedVendorId] = useState('VND-1');
  const [poCreated, setPoCreated] = useState(false);
  const [showPoModal, setShowPoModal] = useState(false);

  const selectedVendor = PROCUREMENT_QUOTES.find(v => v.id === selectedVendorId) || PROCUREMENT_QUOTES[0];

  const handlePlaceOrder = () => {
    setPoCreated(true);
    setShowPoModal(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Agent Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)', 
        borderRadius: 12, 
        padding: '24px', 
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 4, fontWeight: 800 }}>
              AGENT 04
            </span>
            <span style={{ fontSize: 13, color: '#fed7aa', fontWeight: 600 }}>Material & Supply Chain AI</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>
            Procurement & Vendor AI
          </h2>
          <p style={{ fontSize: 14, color: '#ffedd5', maxWidth: 650, marginTop: 4 }}>
            Evaluates multi-vendor price quotes, delivery SLAs, and 30-day payment credit terms across BuildForce's verified vendor network. Saves ₹14,000+ per bulk material order.
          </p>
        </div>

        <button 
          onClick={handlePlaceOrder}
          style={{ 
            background: '#ffffff', 
            color: '#c2410c', 
            padding: '12px 20px', 
            borderRadius: 8, 
            fontWeight: 800, 
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          <ShoppingBag size={16} />
          <span>{poCreated ? 'PO #PO-2026-8841 Active' : 'Generate & Dispatch PO'}</span>
        </button>
      </div>

      {/* Upcoming Material Requirement Deficit Card */}
      <div style={{ 
        background: '#fff', 
        border: '1px solid #e2e8f0', 
        borderRadius: 12, 
        padding: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <strong style={{ fontSize: 15, color: '#0f172a' }}>Upcoming Material Requisition</strong>
            <div style={{ fontSize: 12, color: '#64748b' }}>
              Linked to Kothrud Residence 1st Floor Slab Pour Schedule (Target Date: 22 Oct 2026)
            </div>
          </div>
          <span style={{ fontSize: 11, background: '#fef2f2', color: '#dc2626', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
            DEFICIT DETECTED
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: 11, color: '#64748b' }}>Item Description</span>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>OPC 53 Grade Cement</div>
            <div style={{ fontSize: 11, color: '#2563eb', marginTop: 4 }}>IS 12269 Certified</div>
          </div>

          <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: 11, color: '#64748b' }}>Current On-Site Stock</span>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#dc2626', marginTop: 2 }}>20 Bags (Critically Low)</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Godown Bay 3</div>
          </div>

          <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: 11, color: '#64748b' }}>Required for Next Pour</span>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>75 Bags (250 Bag Order)</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Includes buffer</div>
          </div>

          <div style={{ background: '#ecfdf5', padding: 12, borderRadius: 8, border: '1px solid #a7f3d0' }}>
            <span style={{ fontSize: 11, color: '#065f46' }}>Estimated Savings</span>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#059669', marginTop: 2 }}>₹14,000 Saved</div>
            <div style={{ fontSize: 11, color: '#047857', marginTop: 4 }}>Via BuildForce Direct</div>
          </div>
        </div>
      </div>

      {/* 3-Vendor Quotation Matrix Comparison (Exact recreation from screenshot) */}
      <div className="agent-workspace-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <strong style={{ fontSize: 16, color: '#0f172a' }}>Multi-Vendor Quotation Matrix</strong>
            <div style={{ fontSize: 12, color: '#64748b' }}>
              Real-time bids submitted for RFQ #RFQ-2026-904
            </div>
          </div>

          <span style={{ fontSize: 11, background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
            3 VENDORS EVALUATED
          </span>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>OPC Cement (Bag)</th>
                <th>25mm PVC Pipes</th>
                <th>Delivery Lead Time</th>
                <th>Payment Terms</th>
                <th>Order Total</th>
                <th>Savings</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {PROCUREMENT_QUOTES.map((vnd) => {
                const isSelected = selectedVendorId === vnd.id;

                return (
                  <tr 
                    key={vnd.id}
                    style={{ 
                      background: isSelected ? '#eff6ff' : (vnd.isRecommended ? '#f0fdf4' : 'transparent'),
                      fontWeight: isSelected ? 600 : 'normal'
                    }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <strong>{vnd.vendorName}</strong>
                        {vnd.isRecommended && (
                          <span style={{ fontSize: 10, background: '#10b981', color: '#fff', padding: '1px 5px', borderRadius: 3, fontWeight: 800 }}>
                            AI PICK
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>Rating: {vnd.rating} ★ • Reliability: {vnd.reliabilityScore}</div>
                    </td>
                    <td>
                      <strong style={{ color: vnd.isRecommended ? '#059669' : '#0f172a' }}>₹{vnd.cementRate}</strong>
                      <span style={{ fontSize: 11, color: '#94a3b8', textDecoration: 'line-through', marginLeft: 4 }}>₹{vnd.cementPrev}</span>
                    </td>
                    <td>₹{vnd.pvcRate}</td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#334155' }}>
                        <Truck size={13} style={{ color: '#2563eb' }} />
                        {vnd.leadTime}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        color: vnd.paymentTerms.includes('30 Days') ? '#2563eb' : '#64748b',
                        fontWeight: vnd.paymentTerms.includes('30 Days') ? 700 : 500 
                      }}>
                        {vnd.paymentTerms}
                      </span>
                    </td>
                    <td style={{ fontSize: 15, fontWeight: 800 }}>₹{vnd.totalOrderAmount.toLocaleString()}</td>
                    <td>
                      {vnd.savings > 0 ? (
                        <span style={{ background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: 4, fontWeight: 800, fontSize: 12 }}>
                          Save ₹{vnd.savings.toLocaleString()}
                        </span>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>Baseline</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setSelectedVendorId(vnd.id);
                          handlePlaceOrder();
                        }}
                        style={{ 
                          background: vnd.isRecommended ? '#2563eb' : '#ffffff', 
                          color: vnd.isRecommended ? '#ffffff' : '#0f172a', 
                          border: '1px solid',
                          borderColor: vnd.isRecommended ? '#2563eb' : '#cbd5e1',
                          padding: '6px 14px', 
                          borderRadius: 6, 
                          fontSize: 12, 
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Place Order
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Purchase Order Modal */}
      {showPoModal && (
        <div className="modal-overlay" onClick={() => setShowPoModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <span style={{ fontSize: 11, background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: 4, fontWeight: 800 }}>
                  PURCHASE ORDER GENERATED
                </span>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginTop: 4 }}>
                  PO #PO-2026-8841
                </h3>
              </div>
              <button onClick={() => setShowPoModal(false)} style={{ fontSize: 20, color: '#64748b' }}>×</button>
            </div>

            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, marginBottom: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <span style={{ color: '#64748b', fontSize: 11 }}>Vendor:</span>
                  <div style={{ fontWeight: 700 }}>{selectedVendor.vendorName}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>GSTIN: 29AABCP1429B1Z2</div>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: 11 }}>Delivery Destination:</span>
                  <div style={{ fontWeight: 700 }}>{activeProject.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{activeProject.location}</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                <span>Cement (250 Bags) + PVC (300 Pipes)</span>
                <strong>₹{selectedVendor.totalOrderAmount.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: 700, marginTop: 4 }}>
                <span>BuildForce Verified Discount:</span>
                <span>- ₹{selectedVendor.savings.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb', fontWeight: 700, marginTop: 4 }}>
                <span>Payment Credit Term:</span>
                <span>{selectedVendor.paymentTerms}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button 
                onClick={() => {
                  window.print();
                }}
                style={{ 
                  background: '#ffffff', 
                  border: '1px solid #cbd5e1', 
                  padding: '8px 16px', 
                  borderRadius: 6, 
                  fontSize: 13, 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <Printer size={15} />
                <span>Print PO</span>
              </button>
              <button 
                onClick={() => setShowPoModal(false)}
                style={{ 
                  background: '#2563eb', 
                  color: '#fff', 
                  padding: '8px 18px', 
                  borderRadius: 6, 
                  fontSize: 13, 
                  fontWeight: 700 
                }}
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
