# Quickstart: Angular Project Bootstrap

**Feature**: 001-angular-project-setup
**Date**: 2026-05-14

---

## Prerequisites

- Node.js 20 LTS or later
- npm 10 or later
- Angular CLI 17+: `npm install -g @angular/cli`

---

## 1. Scaffold the Angular frontend

```bash
# From the repo root
ng new frontend --routing --style scss --standalone
cd frontend
```

## 2. Add Angular Material

```bash
ng add @angular/material
# When prompted:
#  Theme: Custom
#  Global Angular Material typography: Yes
#  Include animations: Yes (BrowserAnimationsModule)
```

## 3. Add Bootstrap (CSS only)

```bash
npm install bootstrap
```

Add to `frontend/angular.json` under `projects.frontend.architect.build.options.styles`:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
]
```

## 4. Bootstrap the Express backend

```bash
# From the repo root
mkdir backend && cd backend
npm init -y
npm install express better-sqlite3 cors
npm install --save-dev typescript @types/node @types/express @types/better-sqlite3 ts-node nodemon
npx tsc --init
```

## 5. Initialise the SQLite database

```bash
# From backend/
npx ts-node src/db/migrate.ts
```

This runs migration 001 which creates the `schema_migrations` table.

## 6. Start the development servers

```bash
# Terminal 1 — backend (from backend/)
npm run dev       # nodemon src/index.ts

# Terminal 2 — frontend (from frontend/)
ng serve          # http://localhost:4200
```

## 7. Validate the installation

1. Open http://localhost:4200
2. Confirm the navigation menu shows "Home" and "About" links.
3. Click "About" — confirm navigation works and the "About" link is highlighted.
4. Click "Home" — confirm the page body is blank.
5. Click the dark mode toggle — confirm the entire page switches to dark theme.
6. Navigate to "About" — confirm dark mode persists.
7. Navigate to an unknown route (e.g., `/xyz`) — confirm redirect to Home.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Angular Material styles not applied | Bootstrap overriding Material styles | Ensure Bootstrap is imported before `styles.scss` in `angular.json` |
| Dark mode toggle has no effect | CSS class not reaching `<body>` | Verify `ThemeService` applies class to `document.body` |
| SQLite file not found | Migration not run | Run `npx ts-node src/db/migrate.ts` from `backend/` |
| CORS error in browser | Backend CORS not configured | Ensure `cors()` middleware is applied in `backend/src/index.ts` |
