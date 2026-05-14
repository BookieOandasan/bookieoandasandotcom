# Contract: Backend REST API

**Feature**: 001-angular-project-setup
**Type**: HTTP REST (Express backend)
**Base URL**: `http://localhost:3000/api` (development)
**Date**: 2026-05-14

---

## Overview

For this feature, the backend exposes only a health-check endpoint.
Full comment and profile endpoints are out of scope and will be added
by subsequent features.

---

## Endpoints

### GET /api/health

Confirms the backend is running and the SQLite database is reachable.

**Request**: No body, no parameters.

**Response 200 OK**:

```json
{
  "status": "ok",
  "db": "connected",
  "timestamp": "2026-05-14T12:00:00.000Z"
}
```

**Response 500 Internal Server Error** (DB unreachable):

```json
{
  "status": "error",
  "message": "Database unavailable"
}
```

---

## General conventions

| Convention | Value |
|-----------|-------|
| Content-Type | `application/json` |
| Error envelope | `{ "status": "error", "message": "<human readable>" }` |
| Success envelope | `{ "status": "ok", ...data }` |
| Timestamps | ISO 8601 UTC strings |
| CORS | Allowed origin: `http://localhost:4200` (development) |

---

## Future endpoints (stub — out of scope for this feature)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/comments/:pageRoute` | List approved comments for a page |
| POST | `/api/comments` | Submit a new visitor comment |
| GET | `/api/profile` | Retrieve profile/resume data |
