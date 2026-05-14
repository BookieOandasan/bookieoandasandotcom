# Implementation Plan: Angular Project Bootstrap with Navigation & Dark Mode

**Branch**: `001-angular-project-setup` | **Date**: 2026-05-14 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-angular-project-setup/spec.md`

## Summary

Scaffold the BookieOandasan personal site as a monorepo containing an Angular 17
standalone SPA (frontend) and a minimal Express/TypeScript backend (backend).
The frontend uses Angular Material for interactive components and Bootstrap 5.3
(CSS-only) for layout. A global dark/light theme toggle persists within the
browser session. Navigation has two routes: Home (blank) and About (placeholder).
The backend exposes a health-check endpoint and initialises a versioned SQLite
schema ready for future features.

## Technical Context

**Language/Version**: TypeScript 5.x (Angular 17 LTS enforces TS ≥ 5.2)
**Primary Dependencies**: Angular 17 LTS, Angular Material 17, Bootstrap 5.3 (CSS only),
Express 4.x, better-sqlite3 6.x
**Storage**: SQLite (single file `backend/data/site.db`); schema versioned via
`schema_migrations` table
**Testing**: Karma + Jasmine (Angular default unit tests); Playwright for E2E (optional)
**Target Platform**: Web browser, desktop-first, mobile-responsive via Bootstrap grid
**Project Type**: Web application — Angular SPA + Express REST API backend
**Performance Goals**: Page transitions < 200 ms; initial bundle < 500 kB gzipped
**Constraints**: Bootstrap JS excluded (conflict with Angular Material); session-only
theme persistence (no localStorage); home page main area must be empty
**Scale/Scope**: Personal site, single developer, low traffic (~10 concurrent users max)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Angular-First Components | PASS | All UI as standalone Angular components; Angular Material for nav + toggle |
| II. Simple Pages — YAGNI | PASS | Home is blank, About is a placeholder; no speculative features |
| III. Visitor Comments Support | DEFERRED | Comment feature is out of scope for this bootstrap feature; DB schema is prepared |
| IV. SQLite as Single Data Store | PASS | SQLite initialised with migrations table; service layer planned |
| V. Consistent Theming | PASS | Single theme file; Bootstrap CSS-only for layout; Material for components |

**Constitution Check — Post-Design (Phase 1)**:

All gates still pass. Principle III is intentionally deferred to a future feature
(comment endpoints and DB table will be added then). The `schema_migrations` table
created in this feature ensures the DB is ready for that work.

## Project Structure

### Documentation (this feature)

```text
specs/001-angular-project-setup/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   ├── theme-api.md     # ThemeService + NavigationItem contracts
│   └── backend-api.md   # Express REST API contracts
└── tasks.md             # Phase 2 output (/speckit-tasks command)
```

### Source Code (repository root)

```text
frontend/                         ← Angular 17 standalone SPA
├── angular.json
├── package.json
├── tsconfig.json
├── src/
│   ├── main.ts
│   ├── styles.scss               ← global styles + Angular Material theme import
│   ├── app/
│   │   ├── app.config.ts         ← provideRouter, provideAnimations, etc.
│   │   ├── app.routes.ts         ← route definitions (home, about, wildcard)
│   │   ├── app.component.ts      ← root shell (nav bar + router-outlet)
│   │   ├── components/
│   │   │   └── nav/
│   │   │       └── nav.component.ts   ← Angular Material toolbar + dark toggle
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   │   └── home.component.ts  ← blank page
│   │   │   └── about/
│   │   │       └── about.component.ts ← placeholder heading
│   │   └── services/
│   │       └── theme.service.ts       ← dark/light toggle + sessionStorage
│   └── theme/
│       └── custom-theme.scss          ← Angular Material palette + typography

backend/                          ← Express + TypeScript + better-sqlite3
├── package.json
├── tsconfig.json
├── nodemon.json
├── data/
│   └── site.db                   ← SQLite file (gitignored)
└── src/
    ├── index.ts                  ← Express app entry point
    ├── db/
    │   ├── database.ts           ← DB connection singleton
    │   └── migrate.ts            ← migration runner
    ├── migrations/
    │   └── 001_initial.sql       ← schema_migrations table DDL
    └── routes/
        └── health.ts             ← GET /api/health
```

**Structure Decision**: Web application (Option 2) — Angular SPA + Express backend as
monorepo. Frontend and backend are in separate top-level directories with independent
`package.json` files. No root-level `package.json` for this feature (can be added later
as a workspace if desired).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Principle III deferred | Angular project bootstrap is a prerequisite feature; comments require a separate feature with their own spec and tasks | Combining bootstrap + comments in one feature would create an unmanageable task set and violate YAGNI for the initial scaffold |
