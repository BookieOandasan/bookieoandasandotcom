# Contract: Theme State (Client-Side)

**Feature**: 001-angular-project-setup
**Type**: Angular Service API (no backend endpoint — client only)
**Date**: 2026-05-14

---

## ThemeService

Angular injectable service (`providedIn: 'root'`) responsible for reading,
applying, and persisting the current theme preference.

### Interface

```typescript
interface ThemeService {
  // Current theme value as an observable
  readonly theme$: Observable<'light' | 'dark'>;

  // Toggle between light and dark
  toggle(): void;

  // Load saved preference from sessionStorage (called at app init)
  load(): void;
}
```

### Behaviour contract

| Method / Property | Precondition | Postcondition |
|-------------------|-------------|---------------|
| `theme$` | Service initialised | Emits current theme; replays latest on subscribe |
| `toggle()` | Any state | Emits opposite theme; updates `document.body` CSS class; writes to `sessionStorage` |
| `load()` | Called once at app init | Reads `sessionStorage['theme']`; emits stored value or `'light'` if absent |

### sessionStorage contract

| Key | Values | Default |
|-----|--------|---------|
| `theme` | `'light'` or `'dark'` | `'light'` |

### Body class contract

| Theme | Class applied to `<body>` |
|-------|--------------------------|
| `light` | *(no class — default)* |
| `dark` | `mat-dark-theme` |

---

## NavigationItem (static data contract)

Provided by the navigation component; no service call required.

```typescript
interface NavigationItem {
  label: string;   // Display text shown in the menu
  route: string;   // Angular router path (e.g., '/', '/about')
}

const NAV_ITEMS: NavigationItem[] = [
  { label: 'Home',  route: '/' },
  { label: 'About', route: '/about' },
];
```
