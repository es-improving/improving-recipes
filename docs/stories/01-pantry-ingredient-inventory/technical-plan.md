# Technical Plan: Pantry Ingredient Inventory

## Decisions Summary

| Decision | Choice |
|---|---|
| Page structure | Separate `/pantry.html` with shared nav bar |
| API route | `/api/ingredients` |
| Delete confirmation | Custom inline (replaces row with Yes/No) |
| Add/Edit form | Inline in the list |
| Units list | Shared `src/constants/units.ts` |
| Store | Separate `src/db/pantryStore.ts` |
| Seed data | Yes — a few sample ingredients |
| Client source | `client/src/pantry.ts` → `public/js/pantry.js` |

---

## Data Model

### `src/types/pantryItem.ts`
```ts
export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}
```

### `src/constants/units.ts`
```ts
export const COOKING_UNITS = [
  "cups",
  "tablespoons",
  "teaspoons",
  "ounces",
  "grams",
  "pounds",
  "liters",
  "count",
] as const;
```

---

## Backend

### `src/db/pantryStore.ts`
Mirrors the pattern of `memoryStore.ts`:
- `Map<string, PantryItem>` as the backing store
- Seeded with 3–4 sample ingredients on startup
- Exports a `pantryStore` object with: `list()`, `get(id)`, `create(data)`, `update(id, data)`, `remove(id)`
- `list()` returns items sorted alphabetically by name

### `src/db/index.ts`
Re-export `pantryStore` alongside the existing `recipesStore`.

### `src/routes/ingredients.ts`
Standard CRUD router mounted at `/api/ingredients`:

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | List all pantry items (sorted by name) |
| `GET` | `/:id` | Get one item |
| `POST` | `/` | Create item — validates `name` (required string), `quantity` (required number), `unit` (required, must be in `COOKING_UNITS`) |
| `PUT` | `/:id` | Update item — same validations as POST |
| `DELETE` | `/:id` | Remove item |

Validation errors respond with `400` and `{ error: "<message>" }`. Not found responds with `404`.

### `src/server.ts`
Mount the new router:
```ts
import ingredientsRouter from "./routes/ingredients";
app.use("/api/ingredients", ingredientsRouter);
```

---

## Frontend

### `public/pantry.html`
- Shares the same `<header>` structure as `index.html`
- Adds a `<nav>` with links to `/` (Recipes) and `/pantry.html` (Pantry)
- `<main>` contains:
  - An "Add Ingredient" button
  - A `<ul id="ingredients">` for the list
- Loads `/js/pantry.js` as a module

### `public/index.html`
- Add the same `<nav>` bar so users can navigate back to Pantry from Recipes

### `client/src/pantry.ts`
Compiled to `public/js/pantry.js`. Responsibilities:

**Load & render**
- `GET /api/ingredients` on page load
- Render each item as a `<li>` showing name, quantity, unit, plus Edit and Delete buttons
- Show "Your pantry is empty." when the list is empty

**Add ingredient**
- Clicking "Add Ingredient" inserts a form row at the top of the list with: name text input, quantity number input, unit `<select>` (populated from `COOKING_UNITS`), Save and Cancel buttons
- On Save: validate client-side (name required, quantity required and numeric, unit selected), `POST /api/ingredients`, re-render list
- On Cancel: remove the form row

**Edit ingredient**
- Clicking Edit on a row replaces that row with a pre-populated form (same fields as Add)
- On Save: validate client-side, `PUT /api/ingredients/:id`, re-render list
- On Cancel: re-render list (restores original row)

**Delete ingredient**
- Clicking Delete on a row replaces the row's action buttons with "Are you sure? [Yes] [No]"
- Yes: `DELETE /api/ingredients/:id`, re-render list
- No: re-render the row normally

**Validation (client-side)**
- Name: non-empty string
- Quantity: required, must parse as a finite number
- Unit: must be one of the known cooking units (non-empty selection)
- Show inline error messages within the form row on failure

**Units**
- `tsconfig.client.json` sets `rootDir: "client/src"`, so `pantry.ts` cannot directly import from `src/constants/units.ts`.
- During implementation, adjust `tsconfig.client.json` to allow importing from a shared path (e.g., broaden `rootDir` or use `paths`), then import `COOKING_UNITS` directly in `pantry.ts`.
- If that proves too disruptive to the build, fall back to a local copy in `pantry.ts` with a comment pointing to `src/constants/units.ts` as the source of truth.

---

## File Checklist

New files:
- `src/types/pantryItem.ts`
- `src/constants/units.ts`
- `src/db/pantryStore.ts`
- `src/routes/ingredients.ts`
- `client/src/pantry.ts`
- `public/pantry.html`

Modified files:
- `src/db/index.ts` — re-export `pantryStore`
- `src/server.ts` — mount `/api/ingredients`
- `public/index.html` — add nav bar

---

## Out of Scope

- Persisting data across server restarts (in-memory only)
- Comparing pantry inventory against recipes
- Linking pantry ingredients to recipe ingredients
- Multi-user support
