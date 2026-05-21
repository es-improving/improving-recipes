# Recipe Management

## Overview

Recipes are the core entity of the app. Each recipe has a title, instructions, and a list of ingredients. The recipe list page links to individual detail pages that show ingredients cross-referenced against the user's pantry.

## Pages

### RecipesPage (`client/src/pages/RecipesPage.tsx`)

Displays all recipes as a linked list. Fetches from `GET /api/recipes` via the `useRecipes` hook. Each item links to `/recipes/:id`.

### RecipeDetailPage (`client/src/pages/RecipeDetailPage.tsx`)

Displays a single recipe: title, instructions, and a per-ingredient availability breakdown. Fetches from `GET /api/recipes/:id` via the `useRecipe` hook, which returns enriched ingredient data.

Each ingredient shows one of three statuses:
- **In stock** — pantry quantity meets or exceeds the required amount (displayed in green)
- **Short by N unit** — pantry has some but not enough; shows the shortfall (displayed in red)
- **Not in pantry** — ingredient is absent from the pantry entirely (displayed in red)

## Hooks

### `useRecipes` (`client/src/hooks/useRecipes.ts`)

Fetches the recipe list (`id`, `title`) on mount. Returns `{ recipes }`.

### `useRecipe` (`client/src/hooks/useRecipe.ts`)

Fetches a single recipe by ID, including enriched ingredients. Returns `{ recipe, loading, error }`.

The `EnrichedIngredient` type carries `name`, `amount`, `unit`, `status`, and an optional `shortfall` (only present when `status === 'partial'`).

## API Endpoints

All routes are mounted at `/api/recipes`.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | List all recipes (`id`, `title`) |
| GET | `/:id` | Get a recipe with enriched ingredient availability |
| POST | `/` | Create a recipe (`title` required) |
| PUT | `/:id` | Update a recipe's `title` |
| DELETE | `/:id` | Delete a recipe |

The `GET /:id` endpoint enriches ingredient data by comparing each ingredient against the current pantry via `enrichIngredients` (`server/lib/enrichIngredients.ts`).

## Data

Recipes are stored in an in-memory store (`server/db/memoryStore.ts`) and reset on server restart. The store is seeded with sample data at startup.
