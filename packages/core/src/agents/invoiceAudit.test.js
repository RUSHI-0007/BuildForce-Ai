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
});
