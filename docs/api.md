# BuildForce API Specifications

Standard HTTP Status Codes:
- `200 OK` / `201 Created`
- `400 Bad Request` — Schema validation failed: `{ error: { code: 'INVALID_INPUT', message: '...' } }`
- `401 Unauthorized` — Missing or invalid Bearer JWT
- `403 Forbidden` — Role/Org access denied
- `404 Not Found` — Resource does not exist
- `500 Internal Error` — Unexpected server failure

---

## Endpoints Catalog

### Authentication (`/api/auth`)
- `POST /api/auth/login`: Authenticate contractor or site engineer.
- `GET /api/auth/me`: Fetch authenticated profile and assigned organization.

### Sites & Projects (`/api/projects`)
- `GET /api/projects`: List all sites within caller's organization.
- `POST /api/projects`: Create a new project bungalow or commercial site.
- `GET /api/projects/:id`: Get site details, budget, and progress.
- `PATCH /api/projects/:id`: Update site status or milestones.
- `DELETE /api/projects/:id`: Soft delete / archive site.

### Materials & Inventory (`/api/materials`)
- `GET /api/materials`: List current inventory and min thresholds.
- `POST /api/materials`: Add new tracked material.
- `POST /api/materials/transactions`: Record INWARD (delivery challan) or OUTWARD (consumption) transaction.

### Labour & Haazri (`/api/labour`)
- `GET /api/labour`: List registered tradesmen and helpers.
- `POST /api/labour`: Register worker with trade and daily wage rate.
- `GET /api/labour/attendance`: Get daily haazri for selected date.
- `POST /api/labour/attendance`: Record bulk daily haazri and cash advance.

### Finance & Payments (`/api/cashflow`)
- `GET /api/cashflow/payments`: List payments (inflows from client, outflows to vendors/wages).
- `POST /api/cashflow/payments`: Record milestone receipt or vendor payout.
- `GET /api/cashflow/invoices`: List dealer invoices and 3-way match audit results.
- `POST /api/cashflow/invoices`: Upload or create dealer invoice for audit.

### Agents & Proposals (`/api/agents`)
- `GET /api/agents/proposals`: Get pending "Needs You Today" coordinator proposals.
- `POST /api/agents/proposals/:id/decision`: Approve, reject, or modify proposal.
