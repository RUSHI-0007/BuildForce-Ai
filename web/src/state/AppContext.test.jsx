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
    expect(contextValue.migrationReport).toBeDefined();
    expect(Array.isArray(contextValue.migrationWarnings)).toBe(true);
    expect(typeof contextValue.recordsNeedReview).toBe('boolean');
  });

  it('exposes migration warnings and recordsNeedReview in app state for UI review banner', () => {
    mockStorage.setItem('buildsite_projects', JSON.stringify([
      { id: 'site_bad', name: 'Corrupt Site', budget: -1000 }
    ]));
    mockStorage.setItem('buildsite_labour', JSON.stringify([
      { id: 'lab_bad', name: 'Corrupt Labour', daily_wage: 'bad_wage' }
    ]));

    const contextValue = renderWithContext();
    expect(contextValue.recordsNeedReview).toBe(true);
    expect(contextValue.migrationWarnings.length).toBeGreaterThanOrEqual(2);
    expect(contextValue.migrationWarnings.some(w => w.field === 'budget')).toBe(true);
    expect(contextValue.migrationWarnings.some(w => w.field === 'daily_wage')).toBe(true);
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

  it('initializes, adds, and persists Phase 3 entities (deliveries, quotes, rfqs, plan_versions)', () => {
    const contextValue = renderWithContext();

    expect(Array.isArray(contextValue.deliveries)).toBe(true);
    expect(Array.isArray(contextValue.quotes)).toBe(true);
    expect(Array.isArray(contextValue.rfqs)).toBe(true);
    expect(Array.isArray(contextValue.planVersions)).toBe(true);

    const delivery = contextValue.addDelivery({
      challan_no: 'CH-4091',
      items: [{ material_id: 'mat_1', quantity: 150 }]
    });
    expect(delivery.challan_no).toBe('CH-4091');

    const quote = contextValue.addQuote({
      dealer_name: 'Apex Steel',
      total_amount: 154000
    });
    expect(quote.dealer_name).toBe('Apex Steel');
    expect(quote.total_amount).toBe(154000);

    const rfq = contextValue.addRFQ({
      title: 'Cement 500 Bags RFQ',
      rfq_number: 'RFQ-C-01'
    });
    expect(rfq.title).toBe('Cement 500 Bags RFQ');

    const plan = contextValue.addPlanVersion({
      version: 1,
      total_duration_days: 40
    });
    expect(plan.version).toBe(1);
    expect(plan.total_duration_days).toBe(40);

    const ledger = contextValue.eventLedger.read();
    expect(ledger.some(e => e.type === 'DELIVERY_RECORDED')).toBe(true);
    expect(ledger.some(e => e.type === 'QUOTE_RECEIVED')).toBe(true);
    expect(ledger.some(e => e.type === 'RFQ_CREATED')).toBe(true);
    expect(ledger.some(e => e.type === 'PLAN_VERSION_COMMITTED')).toBe(true);
  });

  it('creates tasks with complete Phase 3 fields (start_date, duration_days, depends_on, weight, progress_pct, material_needs)', () => {
    const contextValue = renderWithContext();

    const task = contextValue.addTask({
      name: 'Foundation Concrete Pouring',
      start_date: '2026-10-25',
      duration_days: 3,
      depends_on: ['tsk_0'],
      weight: 3.5,
      progress_pct: 25,
      material_needs: [{ material_id: 'mat_1', quantity: 100, unit: 'Bags' }]
    });

    expect(task.name).toBe('Foundation Concrete Pouring');
    expect(task.start_date).toBe('2026-10-25');
    expect(task.duration_days).toBe(3);
    expect(task.depends_on).toEqual(['tsk_0']);
    expect(task.weight).toBe(3.5);
    expect(task.progress_pct).toBe(25);
    expect(task.material_needs).toHaveLength(1);
    expect(task.material_needs[0].material_id).toBe('mat_1');
  });

  it('enforces size guard for event ledger in localStorage (capping at 500 and handling QuotaExceededError)', () => {
    const contextValue = renderWithContext();

    // Append 550 events
    for (let i = 1; i <= 550; i++) {
      contextValue.logEvent('BULK_TEST_EVENT', { sequence: i });
    }

    // In-memory ledger holds all 550 events
    expect(contextValue.eventLedger.read().length).toBeGreaterThanOrEqual(550);

    // But localStorage persistence must be capped at 500 entries (sliding window)
    const storedEvents = JSON.parse(mockStorage.getItem(`${STORAGE_KEYS.EVENT_LOG}_v1`));
    expect(storedEvents.length).toBeLessThanOrEqual(500);
    // Sliding window keeps the latest events
    expect(storedEvents[storedEvents.length - 1].payload.sequence).toBe(550);

    // Test QuotaExceededError handling in storage
    const originalSetItem = mockStorage.setItem;
    let quotaErrorFired = false;
    mockStorage.setItem = (k, v) => {
      if (k.includes('buildsite_event_log') && !quotaErrorFired) {
        quotaErrorFired = true;
        const err = new Error('QuotaExceeded');
        err.name = 'QuotaExceededError';
        err.code = 22;
        throw err;
      }
      return originalSetItem.call(mockStorage, k, v);
    };

    // Logging another event should trigger size guard / emergency prune and not throw
    expect(() => {
      contextValue.logEvent('QUOTA_TEST_EVENT', { test: true });
    }).not.toThrow();
  });
});
