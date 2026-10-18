import { createContext } from 'react';

export const STORAGE_KEYS = {
  PROJECTS: 'buildsite_projects',
  TASKS: 'buildsite_tasks',
  ISSUES: 'buildsite_issues',
  MATERIALS: 'buildsite_materials',
  MATERIAL_TX: 'buildsite_material_tx',
  LABOUR: 'buildsite_labour',
  ATTENDANCE: 'buildsite_attendance',
  PAYMENTS: 'buildsite_payments',
  ACTIVE_PROJECT_ID: 'buildsite_active_project_id',
  DEALERS: 'buildsite_dealers',
  INVOICES: 'buildsite_invoices',
  PURCHASE_ORDERS: 'buildsite_purchase_orders',
  PROPOSALS: 'buildsite_proposals',
  CASH_SETTINGS: 'buildsite_cash_settings',
  EVENT_LOG: 'buildsite_event_log',
  DELIVERIES: 'buildsite_deliveries',
  QUOTES: 'buildsite_quotes',
  RFQS: 'buildsite_rfqs',
  PLAN_VERSIONS: 'buildsite_plan_versions'
};

export const MAX_LEDGER_STORAGE_ENTRIES = 500;

export const AppContext = createContext(null);
export default AppContext;
