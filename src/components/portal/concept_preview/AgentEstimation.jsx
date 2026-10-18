import React, { useState } from 'react';
import { 
  FileSpreadsheet, Sparkles, CheckCircle2, Download, Eye, 
  Layers, RefreshCw, ZoomIn, ZoomOut, Check, Sliders 
} from 'lucide-react';
import { TAKEOFF_DATA } from './conceptSampleData';
import confetti from 'canvas-confetti';

export function AgentEstimation({ activeProject }) {
  const [selectedDwg, setSelectedDwg] = useState('DWG A-3');
  const [items, setItems] = useState(TAKEOFF_DATA);
  const [isScanning, setIsScanning] = useState(false);
  const [activeItem, setActiveItem] = useState(items[0]);
  const [humanVerified, setHumanVerified] = useState(false);
  const [markupMargin, setMarkupMargin] = useState(12);

  // Run AI Takeoff extraction simulation
  const handleRunTakeoff = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1800);
  };

  // Toggle verification
  const handleVerify = () => {
    setHumanVerified(!humanVerified);
    if (!humanVerified) {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 }
      });
    }
  };

  // Calculate totals
  const totalBaseCost = items.reduce((acc, curr) => acc + curr.total, 0);
  const totalCostWithMargin = totalBaseCost * (1 + markupMargin / 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Agent Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0f766e 0%, #1e3a8a 100%)', 
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
              AGENT 01
            </span>
            <span style={{ fontSize: 13, color: '#a7f3d0', fontWeight: 600 }}>Residential & Commercial Pre-construction</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>
            Residential Takeoff & BOQ AI
          </h2>
          <p style={{ fontSize: 14, color: '#e0e7ff', maxWidth: 650, marginTop: 4 }}>
            Reads bungalow, villa & apartment CAD floor plans, extracts concrete, rebar, brickwork, plaster & tile quantities, and builds accurate quotation BOQs with contractor markup in 4 minutes.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button 
            onClick={handleRunTakeoff}
            disabled={isScanning}
            style={{ 
              background: '#eb4d4b', 
              color: '#fff', 
              padding: '12px 20px', 
              borderRadius: 8, 
              fontWeight: 700, 
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(235, 77, 75, 0.4)'
            }}
          >
            <RefreshCw size={16} className={isScanning ? 'spin' : ''} />
            <span>{isScanning ? 'Scanning CAD Geometries...' : 'Re-run AI Takeoff'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout: Drawing Viewer + BOQ Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: 24 }}>
        
        {/* Left: Interactive CAD Drawing Canvas */}
        <div className="agent-workspace-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <strong style={{ fontSize: 15, color: '#0f172a' }}>Architectural Plan Viewer</strong>
              <span style={{ fontSize: 11, background: '#ecfdf5', color: '#0f766e', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                {selectedDwg}
              </span>
            </div>

            {/* Sheet Selector */}
            <div style={{ display: 'flex', gap: 4 }}>
              {['DWG A-3', 'DWG S-02', 'DWG A-4', 'DWG P-01'].map((dwg) => (
                <button
                  key={dwg}
                  onClick={() => setSelectedDwg(dwg)}
                  style={{ 
                    padding: '4px 8px', 
                    borderRadius: 4, 
                    fontSize: 11, 
                    fontWeight: 700,
                    background: selectedDwg === dwg ? '#0f766e' : '#f1f5f9',
                    color: selectedDwg === dwg ? '#fff' : '#64748b'
                  }}
                >
                  {dwg}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Simulated Blueprint Canvas */}
          <div style={{ 
            position: 'relative', 
            height: 380, 
            background: '#091834', 
            borderRadius: 8, 
            border: '2px solid #1e3a6a',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Grid overlay */}
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              opacity: 0.6
            }}></div>

            {/* Simulated Architectural Floor Plan Vector */}
            <svg width="90%" height="90%" viewBox="0 0 500 350" style={{ position: 'relative', zIndex: 2 }}>
              {/* Perimeter Outline */}
              <rect x="30" y="30" width="440" height="290" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
              
              {/* Internal Rooms / Slabs */}
              <rect x="30" y="30" width="220" height="150" fill="rgba(37, 99, 235, 0.15)" stroke="#60a5fa" strokeWidth="1.5" />
              <rect x="250" y="30" width="220" height="150" fill="rgba(16, 185, 129, 0.1)" stroke="#34d399" strokeWidth="1.5" />
              <rect x="30" y="180" width="440" height="140" fill="rgba(245, 158, 11, 0.1)" stroke="#fbbf24" strokeWidth="1.5" />

              {/* Columns */}
              {[40, 140, 240, 340, 440].map((cx) => 
                [40, 180, 310].map((cy, idx) => (
                  <rect key={`${cx}-${cy}-${idx}`} x={cx - 8} y={cy - 8} width="16" height="16" fill="#eb4d4b" />
                ))
              )}

              {/* Highlight Box of Active Item */}
              {activeItem && activeItem.highlightZone && (
                <g>
                  <rect 
                    x={activeItem.highlightZone.x * 4} 
                    y={activeItem.highlightZone.y * 3} 
                    width={activeItem.highlightZone.w * 3} 
                    height={activeItem.highlightZone.h * 2.5} 
                    fill="none" 
                    stroke="#f43f5e" 
                    strokeWidth="3" 
                    strokeDasharray="6 3" 
                  />
                  <text 
                    x={activeItem.highlightZone.x * 4 + 6} 
                    y={activeItem.highlightZone.y * 3 + 20} 
                    fill="#f43f5e" 
                    fontSize="12" 
                    fontWeight="bold"
                  >
                    AI MATCH: {activeItem.id} ({activeItem.confidence}%)
                  </text>
                </g>
              )}

              {/* Dimension text */}
              <text x="210" y="24" fill="#93c5fd" fontSize="11" fontFamily="monospace">142.00 METERS</text>
              <text x="475" y="180" fill="#93c5fd" fontSize="11" fontFamily="monospace" transform="rotate(90, 475, 180)">72.00 M</text>
            </svg>

            {/* Live scanning line animation */}
            {isScanning && (
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                height: 4, 
                background: '#eb4d4b',
                boxShadow: '0 0 16px #eb4d4b',
                animation: 'scanLine 1.5s infinite linear',
                zIndex: 10
              }}></div>
            )}

            {/* Bottom Floating Info Pill */}
            <div style={{ 
              position: 'absolute', 
              bottom: 12, 
              left: 12, 
              right: 12,
              background: 'rgba(7, 21, 48, 0.85)',
              backdropFilter: 'blur(6px)',
              padding: '8px 14px',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 11,
              color: '#cbd5e1'
            }}>
              <span>Selected Element: <strong style={{ color: '#fff' }}>{activeItem ? activeItem.description : 'Select line item'}</strong></span>
              <span style={{ color: '#34d399', fontWeight: 700 }}>Geometric Link Active ✓</span>
            </div>
          </div>

          {/* Formula Breakdown */}
          {activeItem && (
            <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, marginTop: 14, border: '1px solid #e2e8f0', fontSize: 12 }}>
              <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, marginBottom: 2 }}>
                AI COMPUTATION FORMULA & DEDUCTIONS:
              </div>
              <div style={{ fontFamily: 'monospace', color: '#1e293b', fontWeight: 600 }}>
                {activeItem.formula}
              </div>
            </div>
          )}
        </div>

        {/* Right: Auto-generated Bill of Quantities (BOQ) */}
        <div className="agent-workspace-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <strong style={{ fontSize: 16, color: '#0f172a' }}>Generated Bill of Quantities (BOQ)</strong>
              <div style={{ fontSize: 12, color: '#64748b' }}>
                Auto-extracted from {items.length} structural drawings
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                onClick={handleVerify}
                style={{ 
                  background: humanVerified ? '#059669' : '#ffffff', 
                  color: humanVerified ? '#ffffff' : '#0f172a', 
                  border: '1px solid',
                  borderColor: humanVerified ? '#059669' : '#cbd5e1',
                  padding: '6px 12px', 
                  borderRadius: 6, 
                  fontSize: 12, 
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <CheckCircle2 size={14} />
                <span>{humanVerified ? 'Verified by Contractor ✓' : 'Contractor Sign Off'}</span>
              </button>
            </div>
          </div>

          {/* BOQ Table */}
          <div className="data-table-container" style={{ flex: 1, maxHeight: 340, overflowY: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>DWG</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Rate (₹)</th>
                  <th>Total (₹)</th>
                  <th>AI Conf.</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr 
                    key={it.id}
                    onClick={() => setActiveItem(it)}
                    style={{ 
                      background: activeItem?.id === it.id ? '#eff6ff' : 'transparent',
                      cursor: 'pointer' 
                    }}
                  >
                    <td style={{ fontWeight: 700, color: '#2563eb' }}>{it.dwg}</td>
                    <td style={{ fontSize: 12.5, fontWeight: 600 }}>{it.description}</td>
                    <td style={{ fontWeight: 700 }}>{it.qty.toLocaleString()} {it.unit}</td>
                    <td>₹{it.rate.toLocaleString()}</td>
                    <td style={{ fontWeight: 800 }}>₹{(it.total / 100000).toFixed(2)} L</td>
                    <td>
                      <span style={{ 
                        fontSize: 11, 
                        background: '#ecfdf5', 
                        color: '#059669', 
                        padding: '2px 6px', 
                        borderRadius: 4, 
                        fontWeight: 700 
                      }}>
                        {it.confidence}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Summary & Margin Slider */}
          <div style={{ marginTop: 16, padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Contractor Overhead Margin:</span>
                <strong style={{ color: '#2563eb' }}>{markupMargin}%</strong>
              </div>
              <input 
                type="range" 
                min="5" 
                max="25" 
                value={markupMargin} 
                onChange={(e) => setMarkupMargin(Number(e.target.value))}
                style={{ width: 140 }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: 11, color: '#64748b' }}>Estimated Tender Bid Total:</span>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
                  ₹{(totalCostWithMargin / 10000000).toFixed(2)} Cr
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button 
                  onClick={() => alert('Exporting full tender BOQ as formatted Excel sheet (.xlsx)...')}
                  style={{ 
                    background: '#ffffff', 
                    border: '1px solid #cbd5e1', 
                    padding: '8px 14px', 
                    borderRadius: 6, 
                    fontSize: 12, 
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <Download size={14} />
                  <span>Export Excel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
