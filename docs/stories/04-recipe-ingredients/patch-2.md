# Patch 2

## Bug Report

Issues Found

1. Route integration test only validates shape, not correctness (src/__tests__/recipesRoute.test.ts)

The "returns enriched RecipeDetail" test checks that each ingredient has a status matching /^(available|partial|missing)$/ — but never asserts what specific status any ingredient should have. Because the test's pantry data has no matches for the seeded recipe ingredients (unit mismatches), every ingredient comes back as missing. The test would pass even if enrichIngredients were completely broken and always returned missing.

Fix: Add a pantry entry that matches a seeded recipe ingredient (same name + unit), then assert that ingredient's status is available.

2. shortfall rendered without type narrowing (client/src/pages/RecipeDetailPage.tsx line 11)

IngredientStatus renders {ingredient.shortfall} {ingredient.unit} for the partial case, but shortfall is typed as number | undefined. TypeScript doesn't error here — if a partial ingredient ever arrives without shortfall, it silently renders "Short by undefined cups."

Fix: Add a fallback or narrow the type, e.g., {ingredient.shortfall ?? '?'}.

## Work Done

### Issue 1: Test correctness for enriched ingredient status

Updated `src/__tests__/recipesRoute.test.ts` to import `pantryStore` alongside `recipesStore`. In the "returns enriched RecipeDetail" test, a pantry item is now seeded with `{ name: 'Olive oil', quantity: 10, unit: 'tbsp' }` — an exact name+unit match for the "Olive oil" ingredient in the first seeded recipe (Classic Margherita Pizza). After the request, the test finds the Olive Oil ingredient by name and asserts `status === 'available'`. A `try/finally` block removes the created pantry item after the assertion so it doesn't pollute other tests.

### Issue 2: Shortfall fallback for undefined

Changed `{ingredient.shortfall}` to `{ingredient.shortfall ?? '?'}` in `RecipeDetailPage.tsx`. This prevents a silent "Short by undefined cups" render if a partial ingredient ever arrives without a shortfall value.
