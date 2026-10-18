import { describe, it, expect } from 'vitest';
import { auditInvoice3Way } from './invoiceAudit.js';

describe('Invoice Audit Engine (packages/core/src/agents/invoiceAudit.js)', () => {
  it('flags price variance above 2% threshold and short delivery', () => {
    const po = { id: 'po-1', total: 100000 };
    const invoice = {
      id: 'inv-1',
      total: 105000, // 5% over PO, over 2% tolerance
      lines: [{ material_id: 'm1', qty: 100, rate: 1000 }]
    };
    const delivery = {
      id: 'dc-1',
      lines: [{ material_id: 'm1', qty: 90 }] // 10 units short
    };

    const audit = auditInvoice3Way(invoice, po, delivery, { priceTolerancePct: 2.0 });
    expect(audit.status).toBe('PARTIAL_HOLD');
    expect(audit.amountHeld).toBeGreaterThan(0);
    expect(audit.discrepancies.length).toBe(2); // Overcharge + short delivery
  });

  it('approves clean 3-way match within tolerance', () => {
    const po = { id: 'po-1', total: 50000 };
    const invoice = {
      id: 'inv-1',
      total: 50500, // 1% over PO (within 2% tolerance)
      lines: [{ material_id: 'm1', qty: 50, rate: 1010 }]
    };
    const delivery = {
      id: 'dc-1',
      lines: [{ material_id: 'm1', qty: 50 }]
    };

    const audit = auditInvoice3Way(invoice, po, delivery, { priceTolerancePct: 2.0 });
    expect(audit.status).toBe('CLEAN_MATCH');
    expect(audit.amountHeld).toBe(0);
    expect(audit.approvedPayable).toBe(50500);
  });

  describe('ISSUE-004 Regression: Missing PO or Delivery Challan handling', () => {
    it('holds full invoice, sets approvedPayable to 0, and status to "Needs review" when PO is missing', () => {
      const invoice = { id: 'inv-no-po', total: 75000 };
      const delivery = { id: 'dc-1', lines: [] };

      const audit = auditInvoice3Way(invoice, null, delivery);
      expect(audit.approvedPayable).toBe(0);
      expect(audit.amountHeld).toBe(75000);
      expect(audit.status).toBe('Needs review');
      expect(audit.poMatched).toBe(false);
      expect(audit.discrepancies.some(d => d.type === 'MISSING_PO')).toBe(true);
    });

    it('holds full invoice, sets approvedPayable to 0, and status to "Needs review" when delivery challan is missing', () => {
      const invoice = { id: 'inv-no-dc', total: 60000 };
      const po = { id: 'po-1', total: 60000 };

      const audit = auditInvoice3Way(invoice, po, null);
      expect(audit.approvedPayable).toBe(0);
      expect(audit.amountHeld).toBe(60000);
      expect(audit.status).toBe('Needs review');
      expect(audit.deliveryMatched).toBe(false);
      expect(audit.discrepancies.some(d => d.type === 'MISSING_DELIVERY')).toBe(true);
    });
  });
});
