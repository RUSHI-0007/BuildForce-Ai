# BuildForce Data Model & Permissions

## Core Entities

1. **organizations**: Tenant boundary. `(id, name, owner_id, gst_number, pan_number, plan, created_at)`
2. **user_profiles**: User identity tied to Supabase Auth. `(id, org_id, name, email, role, phone)`
3. **projects**: Construction sites. `(id, org_id, name, location, budget, status, progress, start_date, end_date)`
4. **tasks**: CPM-linked work packages. `(id, project_id, name, stage, status, due_date, duration_days, depends_on, progress_pct, assigned_to)`
5. **materials**: Inventory items. `(id, org_id, name, unit, in_stock, unit_price, min_threshold)`
6. **material_transactions**: Inward/outward movement. `(id, project_id, material_id, type [INWARD|OUTWARD], quantity, challan_no, receiver, date)`
7. **labour**: Registered workers. `(id, org_id, name, phone, trade, daily_wage, status)`
8. **attendance**: Daily haazri. `(id, project_id, labour_id, date, status [PRESENT|ABSENT|HALF_DAY], advance_paid)`
9. **payments**: Milestone receipts and expense transactions. `(id, project_id, milestone, amount, type [INCOME|EXPENSE], status, date, mode)`
10. **dealers**: Material vendors. `(id, org_id, name, phone, default_credit_days, default_lead_days)`
11. **invoices**: Dealer bills for 3-way matching. `(id, po_id, dealer_id, invoice_no, total, status [CLEAN_MATCH|PARTIAL_HOLD|REJECTED], due_date, lines)`
12. **proposals**: Multi-agent recommendations queue. `(id, agent_id, project_id, title, why, priority, action_type, payload, status [PENDING|APPROVED|REJECTED])`

---

## Permission Matrix

| Role | Sites / Tasks | Haazri / Workers | Materials | Payments & Invoices | Agent Approvals | Settings |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Owner / Contractor** | Full | Full | Full | Full | Full | Full |
| **Site Engineer / Supervisor** | Read / Edit | Full | Inward / Outward | Read Only | View Proposals | Read Only |
| **Accountant** | Read Only | Wages View | Audit View | Full | Verify Payments | Read Only |
| **Client** | Progress View | None | None | Bills & Receipts | View Certs | None |
