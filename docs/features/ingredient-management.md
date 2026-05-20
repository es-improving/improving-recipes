# Ingredient Management

## Overview

The ingredient management feature lets users maintain a pantry — a personal inventory of ingredients they have on hand. The pantry is then used to enrich recipe detail pages, showing at a glance which ingredients are available, partially available, or missing.

## Key Concepts

**Pantry** — a list of items the user currently has. Each item has a name, a quantity, and a unit (e.g., "Flour — 2 cups").

**Enriched ingredient** — a recipe ingredient cross-referenced against the pantry. Each enriched ingredient carries one of three statuses:

| Status | Meaning |
|--------|---------|
| `available` | Pantry quantity ≥ recipe amount (same name + unit) |
| `partial` | Pantry has some but not enough; `shortfall` reports how much is missing |
| `missing` | Not found in pantry at all, or found under a different unit |

Matching is **case-insensitive on name** and **exact on unit** — "Olive oil" in cups and "Olive oil" in liters are treated as different ingredients.

## Architecture

```
client/src/pages/PantryPage.tsx        — CRUD UI for pantry items
client/src/components/IngredientForm.tsx  — add/edit form (inline list item)
client/src/components/IngredientRow.tsx   — read-only row with edit/delete actions
client/src/components/DeleteConfirm.tsx   — inline delete confirmation

client/src/hooks/useIngredients.ts     — fetch pantry list
client/src/hooks/useCreateIngredient.ts
client/src/hooks/useUpdateIngredient.ts
client/src/hooks/useDeleteIngredient.ts

server/routes/ingredients.ts           — REST API for pantry (CRUD)
server/db/pantryStore.ts               — in-memory Map store, seeded with sample data
server/lib/enrichIngredients.ts        — pure function: RecipeIngredient[] + PantryItem[] → EnrichedIngredient[]
server/constants/units.ts              — COOKING_UNITS enum used for validation

client/src/pages/RecipeDetailPage.tsx  — displays enriched ingredient list
server/routes/recipes.ts (GET /:id)    — fetches recipe then calls enrichIngredients before responding
```

## API Endpoints

### Pantry (`/api/ingredients`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/ingredients` | List all pantry items (sorted A–Z) |
| GET | `/api/ingredients/:id` | Get a single pantry item |
| POST | `/api/ingredients` | Create a pantry item |
| PUT | `/api/ingredients/:id` | Replace a pantry item |
| DELETE | `/api/ingredients/:id` | Remove a pantry item |

**Request body** (POST / PUT):
```json
{ "name": "Flour", "quantity": 2, "unit": "cups" }
```

**Validation rules:**
- `name` — required, non-empty string
- `quantity` — required, finite number
- `unit` — must be one of the allowed cooking units (see below)

### Recipe detail enrichment (`GET /api/recipes/:id`)

The recipe detail endpoint automatically enriches ingredients before responding. The response shape is:

```json
{
  "id": "...",
  "title": "...",
  "instructions": "...",
  "ingredients": [
    { "name": "Flour", "amount": 2, "unit": "cups", "status": "available" },
    { "name": "Saffron", "amount": 1, "unit": "grams", "status": "missing" },
    { "name": "Butter", "amount": 4, "unit": "ounces", "status": "partial", "shortfall": 2 }
  ]
}
```

Ingredients in the response are sorted alphabetically by name.

## Allowed Units

```
count, cups, grams, liters, ounces, pounds, tablespoons, teaspoons
```

Defined in [server/constants/units.ts](../../server/constants/units.ts) and duplicated in [client/src/components/IngredientForm.tsx](../../client/src/components/IngredientForm.tsx).

## Data Storage

The pantry uses an in-memory `Map` ([server/db/pantryStore.ts](../../server/db/pantryStore.ts)) seeded with four sample items on startup. **All pantry data resets when the server restarts.** There is no database persistence yet.

## UI Behavior

`PantryPage` manages its own local state machine with four modes:

- `list` — default; shows all pantry rows and an "Add Ingredient" button
- `adding` — renders `IngredientForm` at the top of the list (no id yet)
- `editing` — renders `IngredientForm` inline for the selected row
- `deleting` — renders `DeleteConfirm` inline for the selected row

Only one mode is active at a time. After any successful write, the list is refreshed and the mode returns to `list`.

## Tests

- [server/__tests__/enrichIngredients.test.ts](../../server/__tests__/enrichIngredients.test.ts) — unit tests for the `enrichIngredients` pure function covering available, partial, missing, case-insensitive matching, unit mismatch, and empty input.
- [server/__tests__/ingredientSorting.test.ts](../../server/__tests__/ingredientSorting.test.ts) — tests for alphabetical sort order of returned items.
- [server/__tests__/recipesRoute.test.ts](../../server/__tests__/recipesRoute.test.ts) — integration tests for the recipe detail endpoint, including enrichment behavior.
