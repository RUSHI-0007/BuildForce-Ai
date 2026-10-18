import { describe, it, expect } from 'vitest';
import { calculateStockCover, buildWhatsAppRfq, rankDealerQuotes } from './procurement.js';

describe('Procurement Agent Logic (packages/core/src/agents/procurement.js)', () => {
  it('identifies material shortages based on min threshold and burn rate', () => {
    const materials = [
      { id: 'm1', name: 'Cement', in_stock: 40, min_threshold: 50 },
      { id: 'm2', name: 'Sand', in_stock: 500, min_threshold: 100 }
    ];
    const txs = [
      { material_id: 'm1', type: 'OUTWARD', quantity: 70 } // 70 in 14 days = 5/day
    ];

    const result = calculateStockCover(materials, txs, 14);
    expect(result[0].isShortage).toBe(true);
    expect(result[0].daysRemaining).toBe(8);
    expect(result[1].isShortage).toBe(false);
  });

  it('builds WhatsApp RFQ in Hindi, Marathi, and English', () => {
    const items = [{ name: 'UltraTech Cement', qty: 100, unit: 'Bags' }];
    const mr = buildWhatsAppRfq({ dealerName: 'शिंदे ट्रेडर्स', siteName: 'शिवाजी नगर साईट', location: 'पुणे', items, lang: 'mr' });
    expect(mr).toContain('कोटेशन हवे आहेत');

    const hi = buildWhatsAppRfq({ dealerName: 'शर्मा जी', siteName: 'पुणे साईट', location: 'पुणे', items, lang: 'hi' });
    expect(hi).toContain('कोटेशन चाहिए');

    const en = buildWhatsAppRfq({ dealerName: 'Balaji Hardware', siteName: 'Villa Site', location: 'Pune', items, lang: 'en' });
    expect(en).toContain('Please quote your best rate');
  });

  it('ranks quotes by effective landed cost factoring in credit terms', () => {
    const quotes = [
      { vendor: 'Vendor A (Cash only)', price: 380, transport: 10, creditDays: 0 },
      { vendor: 'Vendor B (30 Days Credit)', price: 385, transport: 5, creditDays: 30 }
    ];

    const ranked = rankDealerQuotes(quotes, 15);
    expect(ranked.length).toBe(2);
    expect(ranked[0].effectiveLandedCost).toBeLessThanOrEqual(ranked[1].effectiveLandedCost);
  });
});
