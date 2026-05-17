# Acceptance Criteria: Test Page

## AC1 — Test page renders at /test

**Given**: A user navigates directly to `/test` in their browser,
**When**: The page loads,
**Then**: The page displays the text "This is a test page".

---

## AC2 — Test link appears in the navigation

**Given**: A user is on any page in the application,
**When**: They look at the navigation bar,
**Then**: A "Test" link is visible alongside the existing Recipes, Pantry, and About links.

---

## AC3 — Navigation link routes to /test

**Given**: A user is on any page in the application,
**When**: They click the "Test" nav link,
**Then**: The browser navigates to `/test` and the test page content is displayed without a full page reload.

---

## AC4 — Active state is applied to the Test nav link

**Given**: A user is on the `/test` page,
**When**: They look at the navigation bar,
**Then**: The "Test" link has the active styling applied, and no other nav link is marked active.

---

## AC5 — Navigating away from /test clears active state

**Given**: A user is on the `/test` page with the "Test" nav link marked active,
**When**: They click a different nav link (e.g., "Recipes"),
**Then**: The "Test" nav link loses its active styling and the clicked link becomes active.

---

## AC6 — Direct URL access does not break other pages

**Given**: A user navigates directly to `/test` and then uses the nav to go to another page,
**When**: The other page loads,
**Then**: That page renders correctly with no errors or blank content.
