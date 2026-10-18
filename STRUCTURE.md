# Repository Structure & Developer Guide

## Top-Level Layout
```text
/
├── .github/workflows/ci.yml   # CI pipeline: lint, test, and build
├── docs/                      # Architecture, API catalog, data model, and ADRs
├── packages/core/             # Shared pure business logic (agents, formatters)
├── web/                       # React 19 + Vite frontend application
├── server/                    # Node / Express backend API skeleton
├── scripts/                   # One-off database and seed utilities
├── package.json               # Root workspace configuration
├── STRUCTURE.md               # Folder map, "Where do I change X?", developer recipes
└── README.md                  # Quick-start guide
```

---

## "Where Do I Change X?" Quick Reference

| To change... | Go to... |
| :--- | :--- |
| **Brand colors, typography, or spacing tokens** | `web/src/styles/tokens.css` or `web/src/index.css` |
| **Look of standard Card, Button, or Table** | `web/src/components/ui/` (`Card/`, `Button/`, `Table/`, etc.) |
| **GST rates or HSN classifications** | `web/src/config/gstRates.js` |
| **Agent parameters** (12-week horizon, 2% tolerance, 2-wk wage reserve) | `web/src/config/agentsConfig.js` |
| **Event Bus event types or dispatch logic** | `packages/core/src/agents/bus.js` |
| **Coordinator rules & proposal triggers** | `packages/core/src/agents/coordinator.js` |
| **Role permissions & tenancy checks** | `server/src/middleware/auth.js` & `docs/data-model.md` |
| **Hindi or Marathi UI labels & WhatsApp RFQ templates** | `web/src/locales/` (`hi.js`, `mr.js`, `en.js`) |
| **Sidebar menu items, order, or icons** | `web/src/config/navigation.js` |
| **Data persistence (switch offline localStorage vs remote API)** | `web/src/services/index.js` via `VITE_DATA_SOURCE` |
| **Core calculations (runway, CPM float, 3-way match)** | `packages/core/src/agents/` |
| **A screen's layout or view composition** | `web/src/pages/` and `web/src/app/routes.jsx` |
| **Backend API endpoint or route** | `server/src/routes/` and `server/src/controllers/` |
| **Database schema or migrations** | `server/db/migrations/` (Option B) |

---

## Developer Recipes

### 1. Add a New Page
1. Create `web/src/pages/<domain>/<PageName>.jsx`.
2. Register the view key in `web/src/app/routes.jsx` inside `PORTAL_ROUTES`.
3. Add the navigation item in `web/src/config/navigation.js` and sidebar menu.
4. Add unit smoke test in `web/src/app/routes.test.js`.

### 2. Add an Agent Rule or Calculation
1. Write pure calculation function in `packages/core/src/agents/<agentName>.js`.
2. Add unit test directly next to it in `packages/core/src/agents/<agentName>.test.js`.
3. Export from `packages/core/src/agents/index.js`.
4. Run `npm test` to verify.

### 3. Add a Field to a Record End-to-End
1. Create timestamped migration in `server/db/migrations/`.
2. Update entity model in `docs/data-model.md` and repository in `server/src/repositories/`.
3. Update API response documentation in `docs/api.md`.
4. Add field to service in `web/src/services/` and state in `web/src/state/`.
5. Display or edit field in component using design tokens.
