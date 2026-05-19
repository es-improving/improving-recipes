# Technical Plan: Recipe Detail Page with Ingredients

## Overview

Add ingredients and instructions to the Recipe data model, enrich the `GET /api/recipes/:id` endpoint with server-side pantry availability, and build a recipe detail page in the React frontend.

---

## Data Model Changes

### `src/types/recipe.ts`

Expand the `Recipe` interface and introduce supporting types:

```ts
export interface RecipeIngredient {
  name: string
  amount: number
  unit: string
}

export interface Recipe {
  id: string
  title: string
  instructions: string
  ingredients: RecipeIngredient[]
}

export interface EnrichedIngredient extends RecipeIngredient {
  status: 'available' | 'partial' | 'missing'
  shortfall?: number  // only present when status is 'partial'
}

export interface RecipeDetail {
  id: string
  title: string
  instructions: string
  ingredients: EnrichedIngredient[]
}
```

---

## Backend Changes

### `src/db/memoryStore.ts`

- Update the seed data for both existing recipes (`Classic Margherita Pizza`, `Chicken Tikka Masala`) to include `instructions` (single paragraph) and an `ingredients` array.
- Update `create` and `update` store methods to accept and persist `instructions` and `ingredients`.

### `src/routes/recipes.ts`

- The `GET /:id` handler enriches the recipe before responding:
  1. Fetch the raw recipe from `recipesStore`.
  2. Fetch all pantry items from `pantryStore`.
  3. For each ingredient, find a pantry item where `name` matches (case-insensitive) **and** `unit` matches exactly.
     - If found and `pantryItem.quantity >= ingredient.amount`: `status = 'available'`
     - If found and `pantryItem.quantity < ingredient.amount`: `status = 'partial'`, `shortfall = ingredient.amount - pantryItem.quantity`
     - If not found (no name+unit match): `status = 'missing'`
  4. Sort enriched ingredients alphabetically by name before returning.
  5. Return a `RecipeDetail` object.
- The `GET /` (list) endpoint remains unchanged — returns lightweight `{ id, title }` objects only.

---

## Frontend Changes

### `client/src/hooks/useRecipe.ts` *(new file)*

A hook that accepts a recipe `id`, fetches `GET /api/recipes/:id`, and returns the enriched `RecipeDetail` (plus a loading state).

```ts
export function useRecipe(id: string) {
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null)
  // fetch on mount / id change
  return { recipe }
}
```

### `client/src/pages/RecipeDetailPage.tsx` *(new file)*

- Reads `:id` from the URL via React Router's `useParams`.
- Calls `useRecipe(id)`.
- Renders:
  - Recipe title
  - Instructions paragraph
  - Ingredient list (alphabetical, pre-sorted by server), each row showing:
    - Name, amount, unit
    - Status indicator:
      - `available` — e.g., a checkmark or "In stock"
      - `partial` — e.g., "Short by X unit"
      - `missing` — e.g., "Not in pantry"
- Empty state if ingredient list is empty.

### `client/src/pages/RecipesPage.tsx` *(update)*

Wrap each recipe title in a React Router `<Link to={`/recipes/${recipe.id}`}>` so clicking navigates to the detail page.

### `client/src/App.tsx` *(update)*

Add a new route:

```tsx
<Route path="/recipes/:id" element={<RecipeDetailPage />} />
```

---

## Implementation Order

1. Update `src/types/recipe.ts`
2. Update `src/db/memoryStore.ts` (seed data + store methods)
3. Update `src/routes/recipes.ts` (enrich GET /:id)
4. Create `client/src/hooks/useRecipe.ts`
5. Create `client/src/pages/RecipeDetailPage.tsx`
6. Update `client/src/pages/RecipesPage.tsx` (add links)
7. Update `client/src/App.tsx` (add route)
