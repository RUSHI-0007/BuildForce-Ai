import React from 'react';

const COMMON_BRANDS = [
  { name: 'UltraTech Cement', sub: 'OPC 53 / PPC' },
  { name: 'Tata Tiscon', sub: 'Fe550 TMT Rebar' },
  { name: 'Jindal Panther', sub: 'TMT Steel' },
  { name: 'Supreme PVC', sub: 'Piping & Fittings' },
  { name: 'Asian Paints', sub: 'Tractor Emulsion' },
  { name: 'Birla White', sub: 'Wall Care Putty' }
];

export function SocialProof() {
  return (
    <div className="partners-section">
      <div className="partners-inner">
        <div className="partners-title">
          Compatible With Standard Indian Building Materials & Brands
        </div>

        <div className="partners-list">
          {COMMON_BRANDS.map((brand, index) => (
            <div key={index} className="partner-logo-item">
              <span className="partner-name">{brand.name}</span>
              <span className="partner-sub">{brand.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
