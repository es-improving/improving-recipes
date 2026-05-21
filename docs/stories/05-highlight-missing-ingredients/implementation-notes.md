# Implementation Notes: Highlight Missing Ingredients in Red

## What was done

Added two CSS rules to `public/styles.css`:

- `.status-missing { color: #c00; }` — covers "Not in pantry" (ingredient absent from pantry entirely)
- `.status-partial { color: #c00; }` — covers "Short by X unit" (ingredient present but insufficient)

No other files were changed. The `IngredientStatus` component in `RecipeDetailPage.tsx` already applied these class names; they simply had no color rule before.

## No unit tests

All ACs are visual/CSS only. No logic was added or modified.
