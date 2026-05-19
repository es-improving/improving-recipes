# Unit Test Implementation Plan: Recipe Detail Page with Ingredients

## Overview

The primary testable logic in this story is the **pantry availability enrichment** performed server-side in `GET /api/recipes/:id`. The enrichment rules (available / partial / missing), shortfall calculation, case-insensitive name matching, exact unit matching, and alphabetical sorting are all pure business logic — ideal candidates for unit tests.

UI-only acceptance criteria (AC-1, AC-2, AC-3, AC-11) are excluded per constraints.

---

## Test Setup

Jest is not yet installed. Add these packages before writing tests:

```bash
npm install --save-dev jest ts-jest @types/jest supertest @types/supertest
```

Add to `package.json`:

```json
"scripts": {
  "test": "jest"
},
"jest": {
  "preset": "ts-jest",
  "testEnvironment": "node",
  "testMatch": ["**/__tests__/**/*.test.ts"]
}
```

---

## Recommended Refactor: Extract Pure Enrichment Function

The `GET /:id` handler in `src/routes/recipes.ts` should delegate to a pure function so it can be tested without HTTP overhead:

```ts
// src/lib/enrichIngredients.ts
export function enrichIngredients(
  ingredients: RecipeIngredient[],
  pantryItems: PantryItem[]
): EnrichedIngredient[]
```

The handler calls this function and then sorts the result alphabetically by name before returning.

---

## Test Files

### 1. `src/__tests__/enrichIngredients.test.ts`

Tests the pure `enrichIngredients` function directly.

#### AC-6 — Fully available (exact name + unit, quantity ≥ required)

```
given: ingredient { name: "Flour", amount: 2, unit: "cups" }
and: pantry has { name: "Flour", quantity: 3, unit: "cups" }
expect: status = "available", no shortfall property
```

#### AC-6 variant — Exact quantity match (quantity === required)

```
given: ingredient { name: "Flour", amount: 2, unit: "cups" }
and: pantry has { name: "Flour", quantity: 2, unit: "cups" }
expect: status = "available"
```

#### AC-7 — Partially available (unit matches, quantity < required)

```
given: ingredient { name: "Flour", amount: 5, unit: "cups" }
and: pantry has { name: "Flour", quantity: 3, unit: "cups" }
expect: status = "partial", shortfall = 2
```

#### AC-9 / Failure mode — Different unit treated as missing

```
given: ingredient { name: "Olive oil", amount: 1, unit: "cups" }
and: pantry has { name: "Olive oil", quantity: 500, unit: "liters" }
expect: status = "missing", no shortfall property
```

#### AC-8 — Ingredient absent from pantry entirely

```
given: ingredient { name: "Saffron", amount: 1, unit: "pinch" }
and: pantry has no entry for "Saffron"
expect: status = "missing"
```

#### Case-insensitive name match (covers the case-insensitive rule in the technical plan)

```
given: ingredient { name: "olive oil", amount: 1, unit: "cups" }
and: pantry has { name: "Olive Oil", quantity: 2, unit: "cups" }
expect: status = "available"
```

#### AC-10 — Empty ingredient list

```
given: ingredients = []
and: pantry has items
expect: result = []
```

---

### 2. `src/__tests__/ingredientSorting.test.ts`

Tests that enriched ingredients are sorted alphabetically by name (AC-5). This can be a separate test of the sort step or verified as part of the API response.

#### Ingredients returned in alphabetical order

```
given: ingredients ["Zucchini", "Basil", "Mozzarella"]
expect: returned order is ["Basil", "Mozzarella", "Zucchini"]
```

#### Single ingredient — no-op sort

```
given: ingredients ["Tomato"]
expect: returned order is ["Tomato"]
```

---

### 3. `src/__tests__/recipesRoute.test.ts`

Integration tests for the `GET /api/recipes/:id` endpoint using `supertest`. These verify the HTTP contract including status codes.

#### Returns 404 for unknown recipe id

```
GET /api/recipes/nonexistent-id
expect: 404, body { error: "Not found" }
```

#### Returns enriched RecipeDetail for valid id

```
given: a seeded recipe with ingredients
GET /api/recipes/:id
expect: 200
body contains: id, title, instructions, ingredients[]
each ingredient has: name, amount, unit, status
```

#### Ingredients in response are sorted alphabetically

```
given: a recipe with ingredients ["Zucchini", "Basil"]
GET /api/recipes/:id
expect: response ingredients[0].name = "Basil", ingredients[1].name = "Zucchini"
```

---

## Acceptance Criteria Coverage

| AC   | Description                              | Test File                        | Covered |
|------|------------------------------------------|----------------------------------|---------|
| AC-4 | Ingredient list displayed (name/amt/unit)| recipesRoute.test.ts             | ✅      |
| AC-5 | Ingredients in alphabetical order        | ingredientSorting.test.ts + route| ✅      |
| AC-6 | Fully covered by pantry                  | enrichIngredients.test.ts        | ✅      |
| AC-7 | Partially covered — shortfall shown      | enrichIngredients.test.ts        | ✅      |
| AC-8 | Missing from pantry entirely             | enrichIngredients.test.ts        | ✅      |
| AC-9 | Different unit → treated as missing      | enrichIngredients.test.ts        | ✅      |
| AC-10| Recipe with no ingredients               | enrichIngredients.test.ts        | ✅      |

UI-only criteria excluded: AC-1, AC-2, AC-3, AC-11.

---

## Failure Modes Covered

- Unknown recipe ID → 404 (recipesRoute.test.ts)
- Unit mismatch → `missing` instead of partial/available (enrichIngredients.test.ts, AC-9)
- Pantry quantity exactly at zero / ingredient not in pantry → `missing` (AC-8)
