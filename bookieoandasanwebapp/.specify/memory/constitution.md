<!--
SYNC IMPACT REPORT
==================
Version change: [TEMPLATE] → 1.0.0 (initial ratification)

Modified principles: N/A (initial fill from template)

Added sections:
  - Core Principles (5 principles)
  - Technology Stack
  - Development Workflow
  - Governance

Removed sections: None

Templates updated:
  - .specify/templates/plan-template.md     ✅ Constitution Check gates aligned
  - .specify/templates/spec-template.md     ✅ No changes required — template is agnostic
  - .specify/templates/tasks-template.md    ✅ No changes required — template is agnostic

Deferred TODOs: None — all placeholders resolved.
-->

# BookieOandasan Personal Site Constitution

## Core Principles

### I. Angular-First Components

Every UI feature MUST be implemented as an Angular standalone component.
Angular Material MUST be used for interactive UI elements (forms, dialogs, cards,
navigation). Bootstrap MUST be used for layout and responsive grid; it MUST NOT
duplicate Angular Material component functionality. Components MUST be reusable
and independently renderable.

**Rationale**: Keeps the framework surface area consistent, avoids style conflicts,
and makes each page independently testable.

### II. Simple Pages — YAGNI Enforced

Each page MUST serve a single, clearly stated purpose. Pages MUST remain
lightweight: no unnecessary third-party libraries, no premature abstractions,
no features added speculatively. Complexity MUST be justified against an
explicit user requirement before being introduced.

**Rationale**: A personal/resume site has a small, stable feature set. Keeping
pages simple ensures fast load times and low maintenance overhead.

### III. Visitor Comments Support

Every publishable page MUST support visitor comment submission. Comment data
MUST be validated before persistence (non-empty content, basic sanitisation).
Submitted comments MUST be stored persistently and displayed chronologically.
A moderation or approval mechanism SHOULD be provided to prevent spam.

**Rationale**: Comment reception is a stated core feature; it must be treated
as a first-class concern, not an afterthought.

### IV. SQLite as the Single Data Store

All persistent data (profile information, resume entries, received comments)
MUST be stored in a single SQLite database file. Data access MUST go through
a dedicated Angular service layer; components MUST NOT call the database
directly. Schema migrations MUST be versioned and reproducible.

**Rationale**: SQLite is sufficient for a personal site with low concurrent
write load, and a service layer keeps components decoupled from storage details.

### V. Consistent Theming — Bootstrap + Angular Material

The site MUST apply a single coherent visual theme across all pages.
Angular Material theming (palette, typography) MUST be defined once in a
shared theme file and imported globally. Bootstrap utility classes MUST be
scoped to layout concerns only (grid, spacing, display helpers). Custom CSS
MUST NOT contradict or override Angular Material or Bootstrap base styles
without an explicit, documented reason.

**Rationale**: A consistent look builds credibility for a personal/resume site;
mixed or conflicting styles undermine that goal.

## Technology Stack

- **Frontend Framework**: Angular (latest LTS) with Angular Material
- **CSS Framework**: Bootstrap (latest stable) — layout and grid only
- **Database**: SQLite — accessed via a Node/Electron-compatible SQLite adapter
  or via an Angular backend proxy service (e.g., Express + better-sqlite3)
- **Language**: TypeScript (strict mode enabled)
- **Package Manager**: npm
- **Target Platform**: Web browser (desktop-first, mobile-responsive via Bootstrap grid)

All dependencies MUST be pinned to a specific version in `package.json`.
Dependency upgrades MUST be treated as intentional changes, not automatic drift.

## Development Workflow

- Features MUST be developed on named branches following the convention
  `feature/###-short-description`.
- Every page MUST be manually verified in a browser before the feature branch
  is merged — automated unit tests alone are insufficient for UI correctness.
- Database schema changes MUST be accompanied by a migration script; no
  manual schema edits are permitted on a running database.
- Commits MUST be atomic: one logical change per commit, with a clear message.
- Bootstrap and Angular Material MUST both be imported and verified functional
  before any feature UI work begins (infrastructure gate).

## Governance

This constitution supersedes all informal agreements and ad-hoc decisions.
Amendments require:
1. A written description of the proposed change and motivation.
2. An update to this file with a version bump following semantic versioning:
   - **MAJOR**: Removal or redefinition of an existing principle.
   - **MINOR**: New principle or section added.
   - **PATCH**: Clarification, wording fix, or non-semantic refinement.
3. A corresponding update to affected templates in `.specify/templates/`.

All implementation plans (`plan.md`) MUST include a Constitution Check section
confirming compliance with the five core principles above before Phase 0 research
begins. Non-compliance MUST be justified in the Complexity Tracking table.

**Version**: 1.0.0 | **Ratified**: 2026-05-14 | **Last Amended**: 2026-05-14
