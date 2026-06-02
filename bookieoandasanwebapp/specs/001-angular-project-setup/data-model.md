# Data Model: Angular Project Bootstrap with Navigation & Dark Mode

**Feature**: 001-angular-project-setup
**Date**: 2026-05-14

---

## Overview

This feature establishes the foundational data model. Only session-state
entities are required now; persistent SQLite entities (Comments, Profile) belong
to future features but are noted here for schema planning.

---

## Entity 1: ThemePreference (session state — not persisted to DB)

Represents the user's current colour scheme choice within a browser session.

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `value` | `'light' \| 'dark'` | Required | Default: `'light'` |

**Storage**: `sessionStorage` key `theme` on the client.

**State transitions**:
```
light ──toggle──> dark
dark  ──toggle──> light
```

---

## Entity 2: NavigationItem (in-memory, static)

Represents a single entry in the site navigation menu. Defined statically in
the Angular navigation component; not stored in the database.

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `label` | `string` | Required, non-empty | Display text (e.g., "Home") |
| `route` | `string` | Required, valid URL path | e.g., `/`, `/about` |
| `isActive` | `boolean` | Derived | Set by Angular Router `routerLinkActive` |

**Initial dataset** (hardcoded for this feature):

| label | route |
|-------|-------|
| Home | `/` |
| About | `/about` |

---

## Entity 3: Page (routing concept — no DB table for this feature)

Each navigable page is an Angular routed component. No database persistence
is needed for page content at this stage.

| Page | Route | Component | Content |
|------|-------|-----------|---------|
| Home | `/` | `HomeComponent` | Intentionally blank main area |


---

## Future entities (out of scope for this feature — for schema planning)

The following entities will be added by subsequent features but are noted here
to avoid schema conflicts:

### Comment (future — SQLite)

| Field | Type | Constraints |
|-------|------|-------------|
| `id` | INTEGER | Primary key, auto-increment |
| `page_route` | TEXT | Not null; foreign reference to page slug |
| `author_name` | TEXT | Not null, max 100 chars |
| `body` | TEXT | Not null, min 1 char after trim |
| `created_at` | TEXT | ISO 8601 timestamp, not null |
| `approved` | INTEGER | 0 or 1 (boolean), default 0 |

### Profile (future — SQLite)

| Field | Type | Constraints |
|-------|------|-------------|
| `id` | INTEGER | Primary key (single row) |
| `full_name` | TEXT | Not null |
| `headline` | TEXT | Nullable |
| `bio` | TEXT | Nullable |
| `updated_at` | TEXT | ISO 8601 timestamp |

---

## SQLite schema (minimal — for this feature's DB bootstrap only)

```sql
-- Migrations versioning table (required from the start per constitution)
CREATE TABLE IF NOT EXISTS schema_migrations (
  version   INTEGER PRIMARY KEY,
  applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Migration 001: initial schema
INSERT INTO schema_migrations (version) VALUES (1);
```

No application tables are required by this feature. The migrations table is
created now so future features can append numbered migrations cleanly.
