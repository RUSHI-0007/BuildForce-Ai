-- 001_initial_schema.sql
-- BuildForce AI PostgreSQL Schema for Supabase
-- Enforces multi-tenancy, relational integrity, and RLS boundaries.

-- 1. Organizations (Tenancy Root)
CREATE TABLE IF NOT EXISTS organizations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id TEXT,
  gst_number TEXT,
  pan_number TEXT,
  plan TEXT NOT NULL DEFAULT 'Starter Pro',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. User Profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id TEXT PRIMARY KEY,
  org_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'supervisor', 'accountant', 'client')),
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Projects (Sites)
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  org_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location TEXT,
  client_name TEXT,
  budget NUMERIC(15,2) NOT NULL DEFAULT 0 CHECK (budget >= 0),
  status TEXT NOT NULL DEFAULT 'In Progress' CHECK (status IN ('Planning', 'In Progress', 'On Hold', 'Completed')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Tasks (CPM Scheduled Work)
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  stage TEXT NOT NULL DEFAULT 'General',
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed')),
  due_date DATE,
  duration_days INTEGER NOT NULL DEFAULT 1 CHECK (duration_days > 0),
  depends_on TEXT[] NOT NULL DEFAULT '{}',
  progress_pct INTEGER NOT NULL DEFAULT 0 CHECK (progress_pct >= 0 AND progress_pct <= 100),
  assigned_to TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Materials (Inventory Items)
CREATE TABLE IF NOT EXISTS materials (
  id TEXT PRIMARY KEY,
  org_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  in_stock NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (in_stock >= 0),
  unit_price NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (unit_price >= 0),
  min_threshold NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (min_threshold >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Material Transactions (Inward / Outward Movement)
CREATE TABLE IF NOT EXISTS material_transactions (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
  material_id TEXT NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('INWARD', 'OUTWARD', 'CONSUMED')),
  quantity NUMERIC(12,2) NOT NULL CHECK (quantity > 0),
  challan_no TEXT,
  receiver TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Labour (Workers)
CREATE TABLE IF NOT EXISTS labour (
  id TEXT PRIMARY KEY,
  org_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  trade TEXT NOT NULL DEFAULT 'General Labour',
  daily_wage NUMERIC(10,2) NOT NULL CHECK (daily_wage > 0),
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Attendance (Daily Haazri)
CREATE TABLE IF NOT EXISTS attendance (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
  labour_id TEXT NOT NULL REFERENCES labour(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PRESENT', 'ABSENT', 'HALF_DAY')),
  advance_paid NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (advance_paid >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(project_id, labour_id, date)
);

-- 9. Payments (Milestones & Disbursements)
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
  milestone TEXT,
  amount NUMERIC(15,2) NOT NULL CHECK (amount > 0),
  type TEXT NOT NULL CHECK (type IN ('INCOME', 'EXPENSE')),
  status TEXT NOT NULL DEFAULT 'Received' CHECK (status IN ('Received', 'Paid', 'Pending')),
  mode TEXT NOT NULL DEFAULT 'Bank/NEFT',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Dealers (Vendors)
CREATE TABLE IF NOT EXISTS dealers (
  id TEXT PRIMARY KEY,
  org_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  default_credit_days INTEGER NOT NULL DEFAULT 30 CHECK (default_credit_days >= 0),
  default_lead_days INTEGER NOT NULL DEFAULT 2 CHECK (default_lead_days >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. Invoices (3-Way Matching Records)
CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  po_id TEXT,
  dealer_id TEXT REFERENCES dealers(id) ON DELETE SET NULL,
  invoice_no TEXT NOT NULL,
  total NUMERIC(15,2) NOT NULL CHECK (total >= 0),
  status TEXT NOT NULL DEFAULT 'CLEAN_MATCH' CHECK (status IN ('CLEAN_MATCH', 'PARTIAL_HOLD', 'REJECTED')),
  due_date DATE,
  lines JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. Proposals (Multi-Agent Proposals Queue)
CREATE TABLE IF NOT EXISTS proposals (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL CHECK (agent_id IN ('cash', 'procurement', 'scheduler', 'capture', 'client', 'coordinator')),
  project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  why TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
  action_type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for performance & tenancy filtering
CREATE INDEX IF NOT EXISTS idx_projects_org ON projects(org_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_material_tx_project ON material_transactions(project_id);
CREATE INDEX IF NOT EXISTS idx_attendance_project_date ON attendance(project_id, date);
CREATE INDEX IF NOT EXISTS idx_payments_project ON payments(project_id);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE labour ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
