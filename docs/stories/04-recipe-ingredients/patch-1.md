# Patch 1

## Bug Report

PR Review: Add recipe detail page with ingredient availability

Checked: useRecipe.ts, RecipeDetailPage.tsx, enrichIngredients.ts, recipes.ts route, memoryStore.ts, recipe.ts types, tests, package.json, tsconfig.json.

### Bugs

1. 404 (and any non-2xx) response crashes the component (client/src/hooks/useRecipe.ts)

```
fetch(`/api/recipes/${id}`)
  .then(res => res.json())       // parses { error: "Not found" } — no res.ok check
  .then(data => {
    setRecipe(data)              // recipe is now { error: "Not found" }, truthy
    setLoading(false)
  })
```

In RecipeDetailPage.tsx, if (!recipe) is false because the error object is truthy. The render then hits recipe.ingredients.length → TypeError: Cannot read properties of undefined. Navigating to /recipes/bad-id crashes the page.

Fix: check res.ok before calling res.json(), and add an error state.

2. Unhandled promise rejection on network failure (useRecipe.ts)

There is no .catch(). A network error leaves loading stuck as true indefinitely and throws an unhandled rejection.

3. React key collision risk (RecipeDetailPage.tsx:138)

```
<li key={ingredient.name}>
```

If a recipe ever has two ingredients with the same name, React will log a key warning and produce incorrect DOM diffing. Use a stable index or composite key.

### Minor Issues

4. Jest types leak into production code (tsconfig.json)

Adding "types": ["jest", "node"] to the root tsconfig.json makes describe, it, expect, etc. available as globals in all source files, not just tests. Scope this to a separate tsconfig.test.json for the test files, or remove it and let ts-jest handle it via its own config.

5. Floating-point shortfall display (enrichIngredients.ts:13)

shortfall: ingredient.amount - match.quantity is not rounded. Fractional amounts like 2.1 - 0.3 produce 1.7999999999999998. Consider Math.round((ingredient.amount - match.quantity) * 1000) / 1000 or similar for display safety.

6. Broken CLAUDE.md link

See [docs/story-system.md](story-system.md) — the link target is story-system.md (relative to CLAUDE.md at root), but the description says docs/story-system.md. One of these is wrong.

## Work Done

### Bug 1 & 2: useRecipe.ts error handling

Added `res.ok` check before parsing JSON — throws an error with the HTTP status when the server returns a non-2xx response. Added `.catch()` to handle both HTTP errors and network failures. Added an `error` state so callers can distinguish between loading, success, and failure.

Updated `RecipeDetailPage.tsx` to consume the new `error` return value and render an error message instead of crashing.

### Bug 3: React key collision

Changed `key={ingredient.name}` to `key={`${ingredient.name}-${index}`}` in `RecipeDetailPage.tsx`. Using a composite key of name + index eliminates collision risk while keeping the name readable in React DevTools.

### Minor 4: Jest types scoped to test files

Removed `"jest"` from `tsconfig.json`'s `types` array so Jest globals are no longer available in production source files. Created `tsconfig.test.json` extending the root config with `"types": ["jest", "node"]` scoped to `src/__tests__`. Updated the `jest` config in `package.json` to use the modern `transform` style (replacing the deprecated `globals` approach) and point ts-jest at `tsconfig.test.json`.

### Minor 5: Floating-point shortfall rounding

Wrapped the shortfall calculation in `enrichIngredients.ts` with `Math.round(... * 1000) / 1000` to avoid floating-point display artifacts like `1.7999999999999998`.

### Minor 6: CLAUDE.md broken link

Fixed the link target from `(story-system.md)` to `(docs/story-system.md)` so it correctly resolves relative to the repo root.
