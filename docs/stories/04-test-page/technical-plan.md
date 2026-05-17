# Technical Plan: Test Page

## Overview

Add a `/test` route to the React SPA with a nav link and static page content. No backend changes are needed — the Express server already serves `index.html` for all unmatched routes via a catch-all `*` handler.

## Changes

### 1. New file: `client/src/pages/TestPage.tsx`

Create a minimal page component following the same pattern as `AboutPage.tsx`:

```tsx
export default function TestPage() {
  return (
    <div>
      <h2>Test</h2>
      <p>This is a test page</p>
    </div>
  )
}
```

### 2. Update: `client/src/App.tsx`

- Import `TestPage`
- Add a `<NavLink to="/test">Test</NavLink>` to the `<nav>` block alongside the existing links
- Add `<Route path="/test" element={<TestPage />} />` inside the `<Routes>` block

No other files need to change.

## Acceptance Criteria Coverage

| AC | How it's met |
|----|-------------|
| AC1 — Page renders at /test | `<Route path="/test" element={<TestPage />} />` |
| AC2 — Nav link is visible | `<NavLink to="/test">Test</NavLink>` in the shared `Layout` header |
| AC3 — Nav link routes correctly | React Router `NavLink` handles client-side navigation |
| AC4 — Active state on /test | `NavLink` applies `active` class automatically when path matches |
| AC5 — Active state clears on navigation | React Router `NavLink` removes `active` class when path no longer matches |
| AC6 — Other pages unaffected | No changes to existing routes or components |
