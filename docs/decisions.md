# Architecture Decision Records (ADRs)

## ADR 001: Monorepo with npm Workspaces
- **Date**: 2026-10-18
- **Decision**: Adopt native npm workspaces (`web`, `server`, `packages/core`) with zero extra build tools (no Turborepo/Nx).
- **Rationale**: Cleanest separation between browser UI, backend services, and pure agent logic while allowing single-command installs and atomic commits.

## ADR 002: Pure Agent Logic in `packages/core`
- **Date**: 2026-10-18
- **Decision**: All business calculations (12-week cash simulation, 3-way invoice match, CPM scheduling, RFQ quote ranking) live in `packages/core` free of React, DOM, or database imports.
- **Rationale**: Enables frontend offline simulation and backend scheduled workers to run the exact same logic with 100% test coverage.

## ADR 003: Plain JavaScript with JSDoc (No TypeScript Migration)
- **Date**: 2026-10-18
- **Decision**: Retain plain JavaScript/JSX across the repo, enriched with standard JSDoc typedefs.
- **Rationale**: Matches existing codebase idioms, prevents complex transpilation overhead, and keeps the code readily editable by hand.

## ADR 004: Standardized Asia/Kolkata Timezone Handling
- **Date**: 2026-10-18
- **Decision**: All human-facing dates and daily haazri timestamps evaluate against Asia/Kolkata (IST).
- **Rationale**: Eliminates UTC date rollover bugs where attendance logged at 10 PM IST could shift to the next or previous day.
