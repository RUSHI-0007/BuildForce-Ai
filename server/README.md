# BuildForce Server (Node / Express + Supabase Postgres)

This folder contains the backend API skeleton for BuildForce.

## Architecture & Migration Note
The existing backend code is located in `/Users/rushi/Projects/buildforce` and will be migrated here by the backend developer in a designated migration step.

### Security & Role Enforcement Rule
> **IMPORTANT FOR BACKEND DEVELOPERS**:
> When using `SUPABASE_SERVICE_KEY`, queries **bypass** Row Level Security (RLS) policies in PostgreSQL.
> Therefore, every Express controller and service **must explicitly enforce role and org boundaries** (e.g., verifying `req.user.org_id === resource.org_id`), or create the Supabase client using the caller's JWT token via `supabase.auth.setSession(token)`.
