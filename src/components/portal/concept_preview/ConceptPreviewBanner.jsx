import React from 'react';
import { AlertCircle } from 'lucide-react';

export function ConceptPreviewBanner({ agentName, plannedFeatures = [] }) {
  return (
    <div style={{
      background: '#fffbeb',
      borderBottom: '1px solid #fef3c7',
      padding: '12px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '8px',
      fontSize: '12px',
      color: '#92400e'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          background: '#d97706',
          color: '#ffffff',
          padding: '2px 8px',
          borderRadius: '4px',
          fontWeight: '800',
          fontSize: '10px',
          letterSpacing: '0.04em'
        }}>
          CONCEPT PREVIEW • SAMPLE DATA
        </span>
        <span>
          <strong>{agentName}</strong> is actively in development. This preview screen uses static sample demonstration data and does not calculate live site numbers.
        </span>
      </div>
      <div style={{ fontSize: '11.5px', color: '#b45309' }}>
        Live calculated agents: <strong>Cash & Bills</strong>, <strong>Procurement & RFQ</strong>, <strong>Site Scheduler & PM</strong>
      </div>
    </div>
  );
}
