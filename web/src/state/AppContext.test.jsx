import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { AppProvider } from './AppContext';
import { AppContext, STORAGE_KEYS } from './appContextInstance';

describe('AppContext - Migration, New Entities & Event Ledger Persistence', () => {
  let mockStore;
  let mockStorage;

  beforeEach(() => {
    mockStore = new Map();
    mockStorage = {
      getItem: (k) => mockStore.has(k) ? mockStore.get(k) : null,
      setItem: (k, v) => mockStore.set(k, String(v)),
      removeItem: (k) => mockStore.delete(k),
      clear: () => mockStore.clear(),
      get length() { return mockStore.size; }
    };
    globalThis.localStorage = mockStorage;
    globalThis.window = globalThis;
    vi.restoreAllMocks();
  });

  function renderWithContext() {
    let captured = null;
    renderToString(
      <AppProvider>
        <AppContext.Consumer>
          {(val) => {
            captured = val;
            return <div>Ready</div>;
          }}
        </AppContext.Consumer>
      </AppProvider>
    );
    return captured;
  }

  it('runs storage migration on load when legacy data is detected', () => {
    mockStorage.setItem('buildsite_projects', JSON.stringify([
      { id: 'legacy_site_1', name: 'Legacy Bungalow', budget: 3000000, progress: 20 }
    ]));
    mockStorage.setItem('buildsite_labour', JSON.stringify([
      { id: 'lab_legacy', name: 'Legacy Worker', daily_wage: '750' }
    ]));

    const contextValue = renderWithContext();

    expect(mockStorage.getItem('buildforce_migrated_v1')).toBe('true');
    expect(mockStorage.getItem('buildsite_projects_v1')).toBeDefined();
    expect(mockStorage.getItem('buildsite_labour_v1')).toBeDefined();

    const savedLabour = JSON.parse(mockStorage.getItem('buildsite_labour_v1'));
    expect(savedLabour[0].daily_wage).toBe(750);
    expect(contextValue).not.toBeNull();
  });

  it('initializes and provides new entities: dealers, invoices, purchaseOrders, proposals, cashSettings', () => {
    const contextValue = renderWithContext();

    expect(Array.isArray(contextValue.dealers)).toBe(true);
    expect(contextValue.dealers.length).toBeGreaterThanOrEqual(1);

    expect(Array.isArray(contextValue.invoices)).toBe(true);
    expect(contextValue.invoices.length).toBeGreaterThanOrEqual(1);

    expect(Array.isArray(contextValue.purchaseOrders)).toBe(true);
    expect(contextValue.purchaseOrders.length).toBeGreaterThanOrEqual(1);

    expect(Array.isArray(contextValue.proposals)).toBe(true);
    expect(contextValue.proposals.length).toBeGreaterThanOrEqual(1);

    expect(contextValue.cashSettings).toBeDefined();
    expect(contextValue.cashSettings.openingBalance).toBe(150000);
  });

  it('persists new entities and appends domain events to append-only EventLedger on mutation', () => {
    const contextValue = renderWithContext();

    expect(contextValue.eventLedger).toBeDefined();
    expect(typeof contextValue.eventLedger.append).toBe('function');
    expect(typeof contextValue.eventLedger.read).toBe('function');
    expect(contextValue.eventLedger.update).toBeUndefined();
    expect(contextValue.eventLedger.delete).toBeUndefined();

    const createdDealer = contextValue.addDealer({ name: 'Om Traders', phone: '9988776655' });
    expect(createdDealer.name).toBe('Om Traders');

    const createdInvoice = contextValue.addInvoice({ invoice_no: 'INV-TEST-99', total: 12500 });
    expect(createdInvoice.invoice_no).toBe('INV-TEST-99');

    const createdPO = contextValue.addPurchaseOrder({ po_number: 'PO-TEST-1', total_amount: 50000 });
    expect(createdPO.po_number).toBe('PO-TEST-1');

    const createdProposal = contextValue.addProposal({ title: 'Finishings', amount: 800000 });
    expect(createdProposal.title).toBe('Finishings');

    contextValue.updateCashSettings({ openingBalance: 250000 });
    contextValue.logEvent('CUSTOM_AGENT_SIGNAL', { info: 'ok' });

    const history = contextValue.eventLedger.read();
    expect(history.length).toBeGreaterThanOrEqual(6);
    expect(history.some(e => e.type === 'DEALER_CREATED')).toBe(true);
    expect(history.some(e => e.type === 'INVOICE_CREATED')).toBe(true);
    expect(history.some(e => e.type === 'PURCHASE_ORDER_CREATED')).toBe(true);
    expect(history.some(e => e.type === 'PROPOSAL_CREATED')).toBe(true);
    expect(history.some(e => e.type === 'CASH_SETTINGS_UPDATED')).toBe(true);
    expect(history.some(e => e.type === 'CUSTOM_AGENT_SIGNAL')).toBe(true);

    const savedLog = JSON.parse(mockStorage.getItem(`${STORAGE_KEYS.EVENT_LOG}_v1`));
    expect(Array.isArray(savedLog)).toBe(true);
    expect(savedLog.some(e => e.type === 'DEALER_CREATED')).toBe(true);
  });
});
