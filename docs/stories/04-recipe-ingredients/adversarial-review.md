## Adversarial Review Report

### Verdict: FAIL

### Summary
The `recipesRoute.test.ts` integration test for alphabetical sorting (AC-5) does not guard against vacuous passes (no minimum ingredient count assertion), and there is no route-level integration test for the empty-ingredients edge case (AC-10); additionally, `RecipeDetailPage.tsx` uses a non-null assertion on `id` from `useParams` with no null guard, and client-side types in `useRecipe.ts` duplicate server-side types creating a silent divergence hazard.

### Findings

#### AC Coverage

- [PASS] AC-1: Recipe list items are wrapped in `<Link to={`/recipes/${recipe.id}`}>` in `RecipesPage.tsx`. Navigation to detail page is implemented.
- [PASS] AC-2: `<h2>{recipe.title}</h2>` renders the recipe name prominently on the detail page.
- [PASS] AC-3: `<p>{recipe.instructions}</p>` renders instructions as a single paragraph.
- [PASS] AC-4: Each ingredient row renders `{ingredient.name} — {ingredient.amount} {ingredient.unit}` plus status indicator.
- [PASS] AC-5: `enrichIngredients` sorts by `localeCompare`, and the route returns the sorted result.
- [PASS] AC-6: `enrichIngredients` correctly returns `status: 'available'` when `pantryItem.quantity >= ingredient.amount`.
- [PASS] AC-7: `enrichIngredients` correctly returns `status: 'partial'` with `shortfall` calculated.
- [PASS] AC-8: `enrichIngredients` returns `status: 'missing'` when the ingredient name is absent from pantry.
- [PASS] AC-9: Unit mismatch causes no match, resulting in `status: 'missing'`. Tested directly.
- [PASS] AC-10: `recipe.ingredients.length === 0` guard renders "No ingredients listed." empty state.
- [PASS] AC-11: `<Link to="/">&larr; Back to recipes</Link>` is rendered on the detail page; browser back button is inherently supported.

#### Technical Plan Adherence

- [PASS] All planned types (`RecipeIngredient`, `EnrichedIngredient`, `RecipeDetail`) are present in `src/types/recipe.ts` exactly as specified.
- [PASS] Seed data updated with `instructions` and `ingredients` for both recipes. `list()` returns `Pick<Recipe, 'id' | 'title'>[]`.
- [PASS] `enrichIngredients` pure function extracted to `src/lib/enrichIngredients.ts` as planned.
- [PASS] `GET /:id` handler fetches pantry items, calls `enrichIngredients`, and returns a `RecipeDetail`.
- [PASS] `useRecipe` hook created at `client/src/hooks/useRecipe.ts` returning `{ recipe, loading, error }`.
- [PASS] `RecipeDetailPage.tsx` created and renders all required elements.
- [PASS] `RecipesPage.tsx` updated with `<Link>` elements.
- [PASS] `App.tsx` route `/recipes/:id` added.
- [ISSUE] The technical plan states the route handler calls `enrichIngredients` and **then sorts alphabetically** as a separate step. Instead, sorting is baked into `enrichIngredients` itself. The route handler never performs a sort step. This is a silent deviation from the plan's explicit separation of concerns.

#### Unit Test Adequacy

- [PASS] All 7 planned `enrichIngredients.test.ts` cases are present and assert correct fields.
- [PASS] Both `ingredientSorting.test.ts` cases are present and assert the correct sorted output.
- [PASS] The 404 test is present and asserts both status and body shape.
- [ISSUE] `recipesRoute.test.ts` — the "returns ingredients sorted alphabetically" test uses `recipes[0]` but does not assert `ingredients.length > 1`. If the recipe has 0 or 1 ingredients, the sort assertion passes trivially.
- [ISSUE] `recipesRoute.test.ts` — The integration test "returns enriched RecipeDetail for a valid recipe id" now seeds a pantry item and asserts `oliveOil.status === 'available'`. This is solid for the `available` path. However, there is no integration test covering `GET /api/recipes/:id` for a recipe with `ingredients: []` (AC-10 at the HTTP layer).

#### Code Quality

- [PASS] `enrichIngredients.ts` correctly handles floating-point shortfall via `Math.round(...* 1000) / 1000`. No off-by-one in the `>=` comparison.
- [PASS] Case-insensitive matching via `.toLowerCase()` on both sides is correct.
- [PASS] `shortfall` is absent for `available` and `missing` cases — the spread `{ ...ingredient, status: 'missing' }` does not include `shortfall`, satisfying the type contract.
- [ISSUE] `RecipeDetailPage.tsx` uses `id!` (non-null assertion) on the result of `useParams`. If the route is ever misconfigured or the component used elsewhere, `useRecipe(undefined as unknown as string)` would produce a fetch to `/api/recipes/undefined`. A guard (`if (!id) return <p>Invalid recipe.</p>`) would prevent this.
- [ISSUE] `useRecipe.ts` duplicates `EnrichedIngredient` and `RecipeDetail` type definitions that already exist in `src/types/recipe.ts`. If the server-side type changes, the client type will silently diverge.
- [PASS] No dead code or leftover scaffolding detected in the diff.
- [PASS] No security concerns: the `:id` parameter is used only as a `Map` key lookup; no injection surface.
- [PASS] Error handling in `useRecipe` covers non-2xx responses via `if (!res.ok) throw new Error(...)`.

### Required fixes before re-run

- **`recipesRoute.test.ts` — sort test fragility**: Add an assertion that `res.body.ingredients.length > 1` before checking sort order to prevent vacuous passes.
- **`recipesRoute.test.ts` — missing AC-10 route-level coverage**: Add an integration test that calls `GET /api/recipes/:id` for a recipe with no ingredients and asserts the response returns HTTP 200 with `ingredients: []`.
- **`RecipeDetailPage.tsx` — `id!` non-null assertion**: Replace `useRecipe(id!)` with a null guard that renders an error state when `id` is undefined.
- **Technical plan deviation — sort ownership**: Either update the technical plan to reflect that `enrichIngredients` owns sorting, or move the sort back into the route handler to match the plan.
