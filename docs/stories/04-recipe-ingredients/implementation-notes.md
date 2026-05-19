# Implementation Notes: Recipe Detail Page with Ingredients

## What Was Built

- **Backend types** (`src/types/recipe.ts`): Added `RecipeIngredient`, expanded `Recipe` with `instructions` and `ingredients`, added `EnrichedIngredient` and `RecipeDetail`.
- **Seed data** (`src/db/memoryStore.ts`): Both recipes now have realistic `instructions` paragraphs and `ingredients` arrays. The `list()` method returns only `{ id, title }` to keep the list endpoint lightweight.
- **Pure enrichment function** (`src/lib/enrichIngredients.ts`): Extracted from the route handler so it can be unit-tested without HTTP overhead. Handles case-insensitive name matching, exact unit matching, available/partial/missing logic, and alphabetical sort.
- **Updated route** (`src/routes/recipes.ts`): `GET /:id` now fetches pantry items, calls `enrichIngredients`, and returns a `RecipeDetail`.
- **Frontend hook** (`client/src/hooks/useRecipe.ts`): Fetches `GET /api/recipes/:id` and returns `{ recipe, loading }`.
- **Recipe detail page** (`client/src/pages/RecipeDetailPage.tsx`): Shows title, instructions, and ingredient list with per-ingredient status indicators ("In stock", "Short by X unit", "Not in pantry"). Empty-state message for recipes with no ingredients.
- **Navigation**: Recipe titles in the list are now `<Link>` elements. `App.tsx` has a `/recipes/:id` route. The detail page has a back link.

## Testing

Jest was installed for the first time in this project. 12 tests across 3 suites — all passing:
- `enrichIngredients.test.ts` — 7 unit tests for availability logic
- `ingredientSorting.test.ts` — 2 tests for alphabetical sort
- `recipesRoute.test.ts` — 3 integration tests via supertest

## Decisions Made During Implementation

- `recipesStore.list()` return type narrowed to `Pick<Recipe, 'id' | 'title'>[]` to enforce that the list endpoint never leaks ingredients/instructions — this keeps the list fast and matches the technical plan's intent.
- `enrichIngredients` performs the alphabetical sort, so callers (route handler and tests) always get sorted output without extra steps.
