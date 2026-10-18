import React from 'react';
import { PARTNER_LOGOS } from '../data/mockData';

export function SocialProof() {
  return (
    <div className="partners-section">
      <div className="partners-inner">
        <div className="partners-title">
          Trusted by 40,000+ Businesses across India
        </div>

        <div className="partners-list">
          {PARTNER_LOGOS.map((partner, index) => (
            <div key={index} className="partner-logo-item">
              <span className="partner-name">{partner.name}</span>
              <span className="partner-sub">{partner.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
