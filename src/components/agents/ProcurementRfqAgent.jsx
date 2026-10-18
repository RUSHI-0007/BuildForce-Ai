import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Truck, AlertTriangle, ArrowRight } from 'lucide-react';

export function ProcurementRfqAgent({ activeProject }) {
  const { materials = [], materialTransactions = [] } = useApp();

  const lowStockItems = materials.filter(m => Number(m.in_stock || 0) <= Number(m.min_threshold || 0));

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)',
        borderRadius: '12px',
        padding: '24px',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontWeight: '800' }}>
              AGENT 02 • LIVE
            </span>
            <span style={{ fontSize: '13px', color: '#fed7aa', fontWeight: '600' }}>
              Material Runout & Quote Comparison
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginTop: '6px', color: '#ffffff' }}>
            Procurement & RFQ AI
          </h2>
          <p style={{ fontSize: '14px', color: '#ffedd5', maxWidth: '650px', marginTop: '4px' }}>
            Calculates days of stock cover from actual outward site consumption, drafts multilingual WhatsApp RFQs, and ranks typed local dealer quotes.
          </p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px 20px', borderRadius: '8px', backdropFilter: 'blur(4px)' }}>
          <div style={{ fontSize: '11px', color: '#fed7aa' }}>Tracked Materials:</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff' }}>
            {materials.length} Items ({lowStockItems.length} Low)
          </div>
        </div>
      </div>

      {/* Material Stock Runout Preview */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Truck size={17} style={{ color: '#ea580c' }} />
          On-Site Material Inventory (Calculated from Inward/Outward Logs)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {materials.map((mat) => {
            const isLow = Number(mat.in_stock || 0) <= Number(mat.min_threshold || 0);
            return (
              <div key={mat.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <strong style={{ fontSize: '13px', color: '#0f172a' }}>{mat.name}</strong>
                  {isLow && (
                    <span style={{ fontSize: '10px', background: '#fef2f2', color: '#dc2626', padding: '1px 5px', borderRadius: '4px', fontWeight: '700' }}>
                      LOW STOCK
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: isLow ? '#dc2626' : '#059669', marginTop: '6px' }}>
                  {mat.in_stock} {mat.unit}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                  Threshold: {mat.min_threshold} {mat.unit} • Rate: ₹{mat.unit_price}/{mat.unit}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
