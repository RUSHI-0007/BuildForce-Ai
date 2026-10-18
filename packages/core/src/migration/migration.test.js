import { describe, it, expect, beforeEach } from 'vitest';
import legacyLocalStorageFixture from './fixtures/legacyLocalStorage.json';
import {
  migrateLocalStorage,
  migrateLegacyState,
  migrateProjects,
  migrateTasks,
  migrateMaterials,
  migrateMaterialTransactions,
  migrateLabour,
  migrateAttendance,
  migratePayments,
  LEGACY_STORAGE_KEYS,
  MIGRATION_FLAG_KEY,
  SCHEMA_VERSION
} from './migrate.js';

describe('Storage Migration Engine (packages/core/src/migration)', () => {
  describe('Legacy Fixture Snapshot Transformation', () => {
    it('successfully loads and validates real captured snapshot from fixtures/', () => {
      expect(legacyLocalStorageFixture).toBeDefined();
      expect(typeof legacyLocalStorageFixture).toBe('object');
      expect(legacyLocalStorageFixture['buildsite_projects']).toBeTypeOf('string');
      expect(legacyLocalStorageFixture['buildsite_tasks']).toBeTypeOf('string');
      expect(legacyLocalStorageFixture['buildsite_materials']).toBeTypeOf('string');
      expect(legacyLocalStorageFixture['buildsite_material_tx']).toBeTypeOf('string');
      expect(legacyLocalStorageFixture['buildsite_labour']).toBeTypeOf('string');
      expect(legacyLocalStorageFixture['buildsite_attendance']).toBeTypeOf('string');
      expect(legacyLocalStorageFixture['buildsite_payments']).toBeTypeOf('string');
    });

    it('migrates projects: coerces string budgets to numbers and assigns canonical org_id', () => {
      const { data, errors } = migrateProjects(legacyLocalStorageFixture['buildsite_projects']);
      expect(errors).toHaveLength(0);
      expect(data).toHaveLength(2);

      const villa = data.find(p => p.id === 'site_101');
      expect(villa).toBeDefined();
      expect(typeof villa.budget).toBe('number');
      expect(villa.budget).toBe(4500000);
      expect(typeof villa.progress).toBe('number');
      expect(villa.progress).toBe(42);
      expect(villa.org_id).toBe('org_primary_01');
    });

    it('migrates tasks: maps legacy duration strings to duration_days number and ensures depends_on array', () => {
      const { data, errors } = migrateTasks(legacyLocalStorageFixture['buildsite_tasks']);
      expect(errors).toHaveLength(0);
      expect(data).toHaveLength(4);

      const slabTask = data.find(t => t.id === 'tsk_1');
      expect(slabTask).toBeDefined();
      expect(slabTask.duration_days).toBe(12);
      expect(Array.isArray(slabTask.depends_on)).toBe(true);
      expect(slabTask.status).toBe('In Progress');
    });

    it('migrates materials: coerces string inventory counts and unit prices to numbers', () => {
      const { data, errors } = migrateMaterials(legacyLocalStorageFixture['buildsite_materials']);
      expect(errors).toHaveLength(0);
      expect(data).toHaveLength(4);

      const cement = data.find(m => m.id === 'mat_1');
      expect(cement).toBeDefined();
      expect(cement.in_stock).toBe(140);
      expect(cement.unit_price).toBe(385);
      expect(cement.min_threshold).toBe(50);
      expect(typeof cement.unit_price).toBe('number');
    });

    it('migrates material transactions: maps legacy item_id to material_id and coerces quantities', () => {
      const { data, errors } = migrateMaterialTransactions(legacyLocalStorageFixture['buildsite_material_tx']);
      expect(errors).toHaveLength(0);
      expect(data).toHaveLength(3);

      const tx1 = data.find(tx => tx.id === 'tx_1');
      expect(tx1).toBeDefined();
      expect(tx1.material_id).toBe('mat_1');
      expect(tx1.type).toBe('INWARD');
      expect(tx1.quantity).toBe(200);

      // Verify lowercase 'inward' in fixture is normalized to uppercase 'INWARD'
      const tx3 = data.find(tx => tx.id === 'tx_3');
      expect(tx3.type).toBe('INWARD');
      expect(tx3.material_id).toBe('mat_2');
      expect(tx3.quantity).toBe(2.5);
    });

    it('migrates labour: coerces string daily_wage ("1100", "850") to positive numbers', () => {
      const { data, errors } = migrateLabour(legacyLocalStorageFixture['buildsite_labour']);
      expect(errors).toHaveLength(0);
      expect(data).toHaveLength(5);

      const mason = data.find(l => l.id === 'lab_2');
      expect(mason).toBeDefined();
      expect(mason.daily_wage).toBe(850);
      expect(typeof mason.daily_wage).toBe('number');
      expect(mason.status).toBe('Active');
    });

    it('migrates attendance: uppercases status and coerces advance_paid', () => {
      const { data, errors } = migrateAttendance(legacyLocalStorageFixture['buildsite_attendance']);
      expect(errors).toHaveLength(0);
      expect(data).toHaveLength(5);

      const halfDay = data.find(a => a.id === 'att_4');
      expect(halfDay).toBeDefined();
      expect(halfDay.status).toBe('HALF_DAY');
      expect(halfDay.advance_paid).toBe(0);

      const withAdvance = data.find(a => a.id === 'att_2');
      expect(withAdvance.advance_paid).toBe(200);
      expect(typeof withAdvance.advance_paid).toBe('number');
    });

    it('migrates payments: normalizes legacy "Due Soon" to canonical "Pending"', () => {
      const { data, errors } = migratePayments(legacyLocalStorageFixture['buildsite_payments']);
      expect(errors).toHaveLength(0);
      expect(data).toHaveLength(5);

      const dueSoonPayment = data.find(p => p.id === 'pay_3');
      expect(dueSoonPayment).toBeDefined();
      expect(dueSoonPayment.status).toBe('Pending');
      expect(dueSoonPayment.amount).toBe(800000);
      expect(typeof dueSoonPayment.amount).toBe('number');

      const expensePayment = data.find(p => p.id === 'pay_4');
      expect(expensePayment.type).toBe('EXPENSE');
      expect(expensePayment.status).toBe('Paid');
      expect(expensePayment.amount).toBe(320000);
    });

    it('migrates complete legacy state dictionary with accurate counts', () => {
      const { state, report } = migrateLegacyState(legacyLocalStorageFixture);
      expect(report.success).toBe(true);
      expect(report.errors).toHaveLength(0);
      expect(report.counts.projects).toBe(2);
      expect(report.counts.tasks).toBe(4);
      expect(report.counts.materials).toBe(4);
      expect(report.counts.materialTransactions).toBe(3);
      expect(report.counts.labour).toBe(5);
      expect(report.counts.attendance).toBe(5);
      expect(report.counts.payments).toBe(5);

      expect(state.schemaVersion).toBe(SCHEMA_VERSION);
      expect(state.activeProjectId).toBe('site_101');
      expect(state.user.company_name).toBe('Patil & Sons Constructions');
    });
  });

  describe('migrateLocalStorage Storage Adapter & Idempotency', () => {
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

      // Populate mockStorage with real captured snapshot fixture
      for (const [k, v] of Object.entries(legacyLocalStorageFixture)) {
        mockStorage.setItem(k, v);
      }
    });

    it('executes migration across localStorage and writes both legacy and v1 keys', () => {
      const result = migrateLocalStorage(mockStorage);
      expect(result.success).toBe(true);
      expect(result.alreadyMigrated).toBe(false);
      expect(result.schemaVersion).toBe('1.0.0');

      // Check migration flag
      expect(mockStorage.getItem(MIGRATION_FLAG_KEY)).toBe('true');
      expect(mockStorage.getItem('buildforce_schema_version')).toBe('1.0.0');

      // Check legacy keys contain migrated JSON
      const projectsJson = mockStorage.getItem(LEGACY_STORAGE_KEYS.PROJECTS);
      const projects = JSON.parse(projectsJson);
      expect(projects[0].budget).toBe(4500000);
      expect(typeof projects[0].budget).toBe('number');

      // Check versioned _v1 key
      const projectsV1Json = mockStorage.getItem(`${LEGACY_STORAGE_KEYS.PROJECTS}_v1`);
      expect(projectsV1Json).toBe(projectsJson);

      // Check material tx item_id -> material_id
      const txs = JSON.parse(mockStorage.getItem(LEGACY_STORAGE_KEYS.MATERIAL_TX));
      expect(txs[0].material_id).toBe('mat_1');
    });

    it('is strictly idempotent: second call does not re-run or alter data', () => {
      // First run
      const firstRun = migrateLocalStorage(mockStorage);
      expect(firstRun.success).toBe(true);
      expect(firstRun.alreadyMigrated).toBe(false);

      const projectsSnapshot = mockStorage.getItem(LEGACY_STORAGE_KEYS.PROJECTS);

      // Second run
      const secondRun = migrateLocalStorage(mockStorage);
      expect(secondRun.success).toBe(true);
      expect(secondRun.alreadyMigrated).toBe(true);
      expect(mockStorage.getItem(LEGACY_STORAGE_KEYS.PROJECTS)).toBe(projectsSnapshot);
    });

    it('allows forced re-migration when options.force is true', () => {
      migrateLocalStorage(mockStorage);
      expect(mockStorage.getItem(MIGRATION_FLAG_KEY)).toBe('true');

      const forcedRun = migrateLocalStorage(mockStorage, { force: true });
      expect(forcedRun.success).toBe(true);
      expect(forcedRun.alreadyMigrated).toBe(false);
      expect(forcedRun.counts.projects).toBe(2);
    });

    it('handles empty storage gracefully without throwing errors', () => {
      mockStorage.clear();
      const result = migrateLocalStorage(mockStorage);
      expect(result.success).toBe(true);
      expect(result.alreadyMigrated).toBe(false);
      expect(result.counts.projects).toBe(0);
      expect(mockStorage.getItem(MIGRATION_FLAG_KEY)).toBe('true');
    });

    it('handles invalid storage object gracefully', () => {
      const result = migrateLocalStorage(null);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Invalid storage object provided');
    });
  });
});
