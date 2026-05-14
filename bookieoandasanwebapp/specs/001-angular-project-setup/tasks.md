---

description: "Task list for angular project bootstrap with navigation and dark mode"
---

# Tasks: Angular Project Bootstrap with Navigation & Dark Mode

**Input**: Design documents from `specs/001-angular-project-setup/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation
and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend (Angular SPA)**: `frontend/src/`
- **Backend (Express + SQLite)**: `backend/src/`
- Both directories live at the repository root

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Scaffold both frontend and backend projects; verify tooling.

- [ ] T001 Scaffold Angular 17 standalone project with routing and SCSS: run `ng new frontend --routing --style scss --standalone` from the repo root
- [ ] T002 Add Angular Material 17 to frontend: run `ng add @angular/material` inside `frontend/` (choose Custom theme, enable global typography and animations)
- [ ] T003 [P] Install Bootstrap 5.3 CSS-only in frontend: run `npm install bootstrap` inside `frontend/` then add `"node_modules/bootstrap/dist/css/bootstrap.min.css"` to `styles` array in `frontend/angular.json`
- [ ] T004 [P] Initialise Express TypeScript backend: create `backend/` directory, run `npm init -y` inside it, create `backend/tsconfig.json` with `strict: true` and `outDir: dist`, create `backend/nodemon.json` pointing to `src/index.ts`
- [ ] T005 Install backend npm dependencies inside `backend/`: run `npm install express better-sqlite3 cors` and `npm install --save-dev typescript @types/node @types/express @types/better-sqlite3 ts-node nodemon`

**Checkpoint**: Both `frontend/` and `backend/` directories exist with their `package.json` files; `ng serve` starts without errors; `ts-node --version` works from `backend/`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any user story can be implemented.

**CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T006 Create Angular Material custom theme file at `frontend/src/theme/custom-theme.scss` defining a light palette, dark palette, and typography config using `mat.define-theme()`
- [ ] T007 Update `frontend/src/styles.scss` to import Bootstrap (`@import 'bootstrap/scss/bootstrap'` or link via `angular.json`) and include the Angular Material theme from `theme/custom-theme.scss`; ensure Bootstrap import comes before Material styles
- [ ] T008 [P] Create `frontend/src/app/app.component.ts` as a standalone root shell component containing only `<app-nav></app-nav>` and `<router-outlet></router-outlet>` in its template
- [ ] T009 Define Angular client-side routes in `frontend/src/app/app.routes.ts`: path `''` → `HomeComponent`, path `'about'` → `AboutComponent`, wildcard `'**'` → redirect to `''`
- [ ] T010 Configure Angular providers in `frontend/src/app/app.config.ts` with `provideRouter(appRoutes)`, `provideAnimations()`, and register `ThemeService`
- [ ] T011 Create SQLite database connection singleton in `backend/src/db/database.ts` using `better-sqlite3`; open (or create) `backend/data/site.db`; export the `Database` instance
- [ ] T012 [P] Create initial SQL migration file at `backend/migrations/001_initial.sql` with DDL to create `schema_migrations` table and insert version row `1`
- [ ] T013 Create migration runner at `backend/src/db/migrate.ts` that reads all `.sql` files from `backend/migrations/` in version order, checks `schema_migrations` for already-applied versions, and executes new ones using the singleton from `database.ts`
- [ ] T014 Create Express application entry point at `backend/src/index.ts`: apply `cors({ origin: 'http://localhost:4200' })`, parse JSON body, register routes from `backend/src/routes/`, listen on port `3000`

**Checkpoint**: Run `npx ts-node src/db/migrate.ts` from `backend/` — `schema_migrations` table exists in `backend/data/site.db`. Run `ng build` from `frontend/` — zero compilation errors.

---

## Phase 3: User Story 1 — Navigate the Site (Priority: P1) MVP

**Goal**: A navigation menu is visible on every page with "Home" and "About" links;
active link is highlighted; unknown routes redirect to Home.

**Independent Test**: Open `http://localhost:4200`. Verify menu shows both links.
Click "About" — URL becomes `/about`, "About" link is highlighted. Click "Home" — URL
returns to `/`, "Home" link is highlighted. Navigate to `/xyz` — redirected to `/`.

### Implementation for User Story 1

- [ ] T015 [P] [US1] Create `frontend/src/app/pages/home/home.component.ts` as a standalone Angular component with an empty template (only a wrapping `<main>` element)
- [ ] T016 [P] [US1] Create `frontend/src/app/pages/about/about.component.ts` as a standalone Angular component with a placeholder `<h1>About</h1>` heading and Bootstrap container class
- [ ] T017 [US1] Create `frontend/src/app/components/nav/nav.component.ts` as a standalone component using Angular Material `MatToolbarModule` and `MatButtonModule`; define `navItems` array matching the `NavigationItem` contract from `contracts/theme-api.md` with entries for Home (`/`) and About (`/about`)
- [ ] T018 [US1] Add navigation links to NavComponent template in `frontend/src/app/components/nav/nav.component.html` using `*ngFor` over `navItems`, Angular `routerLink`, and `routerLinkActive="active-link"` directive; apply Bootstrap `d-flex` and `gap-2` classes for layout
- [ ] T019 [US1] Import and declare `NavComponent` in `AppComponent` (`frontend/src/app/app.component.ts`) so it renders above `<router-outlet>`; update `app.routes.ts` to lazy-load `HomeComponent` and `AboutComponent`

**Checkpoint**: `ng serve` — navigation menu with two links visible; clicking each link loads the correct component; unknown route redirects to Home; active link has a distinct style.

---

## Phase 4: User Story 2 — Blank Home Page (Priority: P2)

**Goal**: The Home page main content area is verifiably empty — no placeholder text,
images, or child elements visible to the user.

**Independent Test**: Navigate to `/`. Inspect the DOM — the `<main>` element inside
`HomeComponent` must have no child elements. No text is visible in the page body.

### Implementation for User Story 2

- [ ] T020 [US2] Update `frontend/src/app/pages/home/home.component.html` to contain exactly one element: `<main class="container-fluid p-4"></main>` with no children; remove any default Angular generated placeholder content
- [ ] T021 [US2] Add SCSS rule in `frontend/src/app/pages/home/home.component.scss` to set `min-height: 80vh` on the `<main>` element so the blank page has deliberate visual weight without adding content

**Checkpoint**: Open `http://localhost:4200`. Page body is visually empty below the navigation bar. DevTools Elements panel shows `<main>` with no child nodes.

---

## Phase 5: User Story 3 — Toggle Dark Mode (Priority: P3)

**Goal**: A dark/light toggle in the navigation bar switches the entire site theme
instantly and the choice persists across route changes for the session.

**Independent Test**: Click the toggle — all pages switch to dark background and light
text. Navigate to About — theme persists. Click toggle again — site reverts to light.
Refresh browser — theme restores from `sessionStorage`.

### Implementation for User Story 3

- [ ] T022 [US3] Create `frontend/src/app/services/theme.service.ts` implementing the `ThemeService` contract from `contracts/theme-api.md`: expose `theme$` as a `BehaviorSubject<'light'|'dark'>`, implement `toggle()` to flip state and write to `sessionStorage['theme']`, implement `load()` to read from `sessionStorage` and emit (default `'light'`)
- [ ] T023 [US3] Extend the Angular Material theme in `frontend/src/theme/custom-theme.scss` to include a `.mat-dark-theme` class block using `@include mat.all-component-colors(dark-theme)` so dark Material styles activate via a CSS class on `<body>`
- [ ] T024 [US3] Inject `ThemeService` into `AppComponent` (`frontend/src/app/app.component.ts`) and subscribe to `theme$`; apply class `mat-dark-theme` to `document.body` when theme is `'dark'`, remove it when `'light'`; call `ThemeService.load()` in `ngOnInit`
- [ ] T025 [P] [US3] Add a dark mode toggle control to `NavComponent` (`frontend/src/app/components/nav/nav.component.ts`): inject `ThemeService`, add a `MatSlideToggleModule` or `MatIconButton` bound to `theme$ | async`; clicking it calls `themeService.toggle()`
- [ ] T026 [US3] Add a global CSS rule in `frontend/src/styles.scss` for `body.mat-dark-theme` to set Bootstrap-compatible background and text colours (e.g., `background-color: #121212; color: #e0e0e0;`) so Bootstrap layout areas also reflect the dark theme

**Checkpoint**: Toggle in nav bar visible. Clicking it switches site to dark mode. Navigate between pages — dark mode persists. Refresh — dark mode restored. Toggle again — light mode restored.

---

## Phase 6: Backend Health Check

**Purpose**: Expose and verify the backend health endpoint defined in `contracts/backend-api.md`.

- [ ] T027 [P] Create GET `/api/health` route handler in `backend/src/routes/health.ts`: query `schema_migrations` table via the DB singleton; respond with `{ status: 'ok', db: 'connected', timestamp: new Date().toISOString() }`; respond `500` with `{ status: 'error', message: 'Database unavailable' }` on failure
- [ ] T028 Register the health router in `backend/src/index.ts` under the `/api` prefix: `app.use('/api', healthRouter)`

**Checkpoint**: Run backend with `npx ts-node src/index.ts` from `backend/`. GET `http://localhost:3000/api/health` returns `{ "status": "ok", "db": "connected", ... }`.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Dev experience, scripts, and final validation.

- [ ] T029 [P] Add npm run scripts to `backend/package.json`: `"dev": "nodemon"`, `"build": "tsc"`, `"migrate": "ts-node src/db/migrate.ts"`; add scripts to `frontend/package.json` if not already present: `"start": "ng serve"`, `"build": "ng build"`
- [ ] T030 Run the full quickstart validation from `quickstart.md` step 7: start both servers, open `http://localhost:4200`, and verify all 7 acceptance checks pass (menu visible, About navigates, Home is blank, dark mode toggles, dark mode persists across routes, dark mode restores on refresh, unknown route redirects to Home)

**Checkpoint**: All 7 quickstart validation steps pass.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2 — no dependency on US2/US3
- **User Story 2 (Phase 4)**: Depends on Phase 3 (HomeComponent created in T015)
- **User Story 3 (Phase 5)**: Depends on Phase 2 — no dependency on US1/US2 but builds on NavComponent from T017
- **Backend Health (Phase 6)**: Depends on Phase 2 (T011-T014); independent of frontend phases
- **Polish (Phase 7)**: Depends on all phases

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — no story dependencies
- **US2 (P2)**: Depends on T015 (HomeComponent exists) from US1
- **US3 (P3)**: Can start after Phase 2; integrates with NavComponent from T017

### Parallel Opportunities

- T003 and T004 can run in parallel with T002 (different directories)
- T008 and T012 can run in parallel within Phase 2 (different files)
- T015 and T016 can run in parallel (different component files)
- T025 can run in parallel with T022/T023 (different files)
- T027 and T029 can run in parallel with other Phase 7 tasks

---

## Parallel Example: Phase 2 Foundational

```
Parallel group A: T006, T008, T012  (different files)
Then: T007 (depends on T006)
Then: T009, T010, T011, T013, T014  (T011 before T013, T014 uses routes)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (Navigation)
4. **STOP and VALIDATE**: Menu works, routes work, wildcard redirect works
5. Demo navigation independently

### Incremental Delivery

1. Setup + Foundational → infrastructure ready
2. Add US1 (Navigation) → test independently → MVP
3. Add US2 (Blank Home) → test independently
4. Add US3 (Dark Mode) → test independently
5. Add Backend Health → test independently
6. Polish → final validation

---

## Notes

- [P] tasks = different files, no shared state dependencies
- [Story] label maps task to specific user story for traceability
- No test tasks generated (not requested in spec)
- Bootstrap JS must never be added — use Angular Material for all interactive behaviour
- `better-sqlite3` is synchronous — no async/await needed in migration runner
- `sessionStorage` (not `localStorage`) for theme persistence — matches spec requirement
