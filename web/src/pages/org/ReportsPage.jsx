import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
export function ReportsPage() {
  const [downloadingId, setDownloadingId] = useState(null);

  const reports = [
    {
      id: 'dpr',
      title: 'Daily Progress Report (DPR)',
      desc: 'Summary of labour present today, work executed, and materials consumed.',
      format: 'PDF',
      badge: 'Most Popular'
    },
    {
      id: 'wage',
      title: 'Weekly Labour Muster Roll & Wage Sheet',
      desc: 'Complete breakdown of daily haazri, cash advances deducted, and balance wages payable.',
      format: 'Excel / PDF'
    },
    {
      id: 'mat',
      title: 'Material Stock & Delivery Challan Ledger',
      desc: 'All cement, steel, and sand inward receipts with challan numbers and current balance.',
      format: 'PDF'
    },
    {
      id: 'billing',
      title: 'Client Stage Payment & Milestone Statement',
      desc: 'Certified invoices submitted to client, amounts received via bank, and upcoming dues.',
      format: 'PDF'
    }
  ];

  const handleDownload = (id) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Report downloaded successfully!`);
    }, 1000);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
          Reports & Data Extracts
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Generate professional, branded reports to share with clients, accountants, or keep on site.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
        {reports.map((r) => (
          <div
            key={r.id}
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={20} />
                </div>
                {r.badge && (
                  <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', background: '#dcfce7', color: '#15803d' }}>
                    {r.badge}
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '15.5px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0' }}>
                {r.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4, margin: '0 0 16px 0' }}>
                {r.desc}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Format: {r.format}</span>
              <button
                onClick={() => handleDownload(r.id)}
                disabled={downloadingId === r.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  background: '#0f1d3b',
                  color: '#ffffff',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Download size={14} />
                <span>{downloadingId === r.id ? 'Generating...' : 'Export'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
