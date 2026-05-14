# Research: Angular Project Bootstrap with Navigation & Dark Mode

**Feature**: 001-angular-project-setup
**Date**: 2026-05-14
**Status**: Complete — all unknowns resolved

---

## Decision 1: SQLite Integration Strategy

**Decision**: Express.js backend (TypeScript) + better-sqlite3 for data persistence;
Angular SPA communicates with the backend via a REST API.

**Rationale**: SQLite is a file-based, server-side database engine — it cannot be
accessed directly from a browser JavaScript context. For a web application that
needs to receive visitor comments and store profile data, a thin Express backend
is the simplest approach:
- Minimal boilerplate (no ORM required for a personal site)
- better-sqlite3 is synchronous, type-safe, and well-maintained
- REST API cleanly separates concerns between Angular and storage

**Alternatives considered**:
- *SQLite WASM (in-browser)*: Experimental, data lives only in the browser — does
  not support cross-visitor comment storage. Rejected.
- *Capacitor SQLite*: Mobile-first; adds significant build complexity for a web-only
  personal site. Rejected.
- *Electron desktop app*: Overkill for a website. Rejected.
- *IndexedDB*: Browser-only, same problem as WASM — no server-side storage. Rejected.

---

## Decision 2: Angular Version and Component Strategy

**Decision**: Angular 17 LTS (or latest stable LTS at scaffold time), using
**standalone components** throughout (no NgModules).

**Rationale**: Angular 17 introduced standalone components as the default scaffolding
approach. They reduce boilerplate and improve tree-shaking. Angular Material 17
supports standalone APIs natively. For a new project there is no reason to use
the older NgModule pattern.

**Alternatives considered**:
- *NgModule-based architecture*: More boilerplate, largely superseded. Rejected.
- *Angular 18/19 (non-LTS)*: LTS provides 18-month security support, appropriate
  for a solo personal site. Using latest LTS is the safe choice.

---

## Decision 3: Dark Mode Implementation

**Decision**: Angular Material's theming system with two pre-defined palettes
(`light` and `dark`), toggled by adding/removing a CSS class on the `<body>` element.
Theme preference stored in `sessionStorage` (survives route changes, cleared on
browser close — matches spec requirement of session-level persistence).

**Rationale**:
- Angular Material generates `mat-dark-theme` / `mat-light-theme` variants from
  a single theme file — no custom CSS needed for Material components.
- A body-level CSS class toggle is the idiomatic approach; it cascades to Bootstrap
  utility classes and custom styles simultaneously.
- `sessionStorage` satisfies the spec exactly — no need for `localStorage` at this stage.

**Alternatives considered**:
- *CSS custom properties only (no Angular Material theming)*: Would require manually
  maintaining every colour token. Rejected.
- *localStorage persistence*: Out of scope per spec (session-only required). Deferred.
- *prefers-color-scheme media query auto-detection*: Nice enhancement but not in spec.
  Deferred.

---

## Decision 4: Bootstrap Integration Approach

**Decision**: Bootstrap 5.3 CSS-only (no Bootstrap JS / Popper). Import via npm and
reference in `angular.json` styles array.

**Rationale**:
- Bootstrap JS conflicts with Angular's change detection and Angular Material's
  interaction model (overlays, focus traps, etc.).
- CSS-only Bootstrap provides the grid, spacing, and display utilities we need
  without any JS collision.
- Angular Material handles all interactive component behaviours (drawer, toggle,
  dialogs) that Bootstrap JS would otherwise cover.

**Alternatives considered**:
- *ng-bootstrap*: An Angular wrapper for Bootstrap; adds a dependency and deviates
  from "CSS layout only" principle. Rejected.
- *ngx-bootstrap*: Same concern. Rejected.

---

## Decision 5: Project Architecture

**Decision**: Monorepo with two top-level directories — `frontend/` (Angular) and
`backend/` (Express + TypeScript). A single `package.json` at the root orchestrates
both via npm workspace scripts.

**Rationale**: Keeps both codebases in one repository (easy cross-reference, single
git history) while maintaining clear separation. For a solo developer this is the
right balance between isolation and convenience.

**Structure summary**:
```
frontend/   → Angular SPA (Angular Material + Bootstrap)
backend/    → Express API (TypeScript + better-sqlite3)
```

---

## All NEEDS CLARIFICATION items resolved

| Item | Resolution |
|------|-----------|
| SQLite access from browser | Express backend via REST API |
| Angular version | Angular 17 LTS, standalone components |
| Dark mode persistence | sessionStorage, body class toggle |
| Bootstrap conflict risk | CSS-only Bootstrap (no Bootstrap JS) |
| Project layout | Monorepo: `frontend/` + `backend/` |
