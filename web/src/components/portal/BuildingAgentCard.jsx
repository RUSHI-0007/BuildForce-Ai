import React, { useState } from 'react';
import { Hammer, Sparkles, AlertCircle, ArrowRight, Eye, Database, ListChecks } from 'lucide-react';
import { ConceptPreviewBanner } from './concept_preview/ConceptPreviewBanner';

export function BuildingAgentCard({ agent, conceptComponent: ConceptComponent }) {
  const [showConceptPreview, setShowConceptPreview] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
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
            <span style={{
              fontSize: '11px',
              background: '#f59e0b',
              color: '#000000',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: '800'
            }}>
              HONEST ROADMAP • BUILDING
            </span>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>
              Planned Module
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginTop: '6px', color: '#ffffff' }}>
            {agent.name}
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '700px', marginTop: '4px', lineHeight: 1.5 }}>
            {agent.purpose}
          </p>
        </div>

        {ConceptComponent && (
          <button
            onClick={() => setShowConceptPreview(!showConceptPreview)}
            style={{
              background: showConceptPreview ? '#475569' : '#0284c7',
              color: '#ffffff',
              padding: '10px 16px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <Eye size={15} />
            <span>{showConceptPreview ? 'Hide Concept Preview' : 'View Concept Preview (Sample Data)'}</span>
          </button>
        )}
      </div>

      {showConceptPreview && ConceptComponent ? (
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
          <ConceptPreviewBanner agentName={agent.name} />
          <ConceptComponent />
        </div>
      ) : (
        /* Detailed Roadmap Cards */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {/* Card 1: What Exists Today */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <ListChecks size={18} style={{ color: '#10b981' }} />
              <strong style={{ fontSize: '15px', color: '#0f172a' }}>What Exists Today in BuildForce</strong>
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#475569', lineHeight: 1.7 }}>
              {agent.whatItDoes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Card 2: Required Data */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Database size={18} style={{ color: '#38bdf8' }} />
              <strong style={{ fontSize: '15px', color: '#0f172a' }}>Required Input Data</strong>
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#475569', lineHeight: 1.7 }}>
              {agent.dataItUses.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Card 3: Boundary Guarantees */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <AlertCircle size={18} style={{ color: '#f59e0b' }} />
              <strong style={{ fontSize: '15px', color: '#0f172a' }}>Integrity & Scope Rules</strong>
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#475569', lineHeight: 1.7 }}>
              {agent.whatItDoesNot.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
