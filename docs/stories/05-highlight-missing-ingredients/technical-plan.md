# Technical Plan: Highlight Missing Ingredients in Red

## Summary

Add CSS rules to display the availability indicator in red for ingredients with `missing` or `partial` status on the recipe detail page.

## Context

`RecipeDetailPage.tsx` renders an `IngredientStatus` component that already applies class names based on ingredient status:

- `status-available` → "In stock"
- `status-partial` → "Short by X unit"
- `status-missing` → "Not in pantry"

No CSS rules currently exist for these classes. The fix is purely additive CSS.

## Design Decisions

- **Which statuses are red:** `missing` (not in pantry at all) and `partial` (in pantry but insufficient quantity). Both represent a shortfall that requires a store trip.
- **Which statuses are unchanged:** `available` — rendered in default text color.
- **Shade of red:** `#c00`, consistent with the existing `.form-error` color in `styles.css`.
- **Scope of change:** CSS only — no changes to React components, API, or data layer.

## Implementation

### 1. `public/styles.css`

Add two rules at the end of the file:

```css
.status-missing {
  color: #c00;
}

.status-partial {
  color: #c00;
}
```

That is the complete implementation. No other files require changes.

## Testing

Unit tests will cover the `IngredientStatus` component:

- Renders red (`color: #c00` via class) when status is `missing`
- Renders red (`color: #c00` via class) when status is `partial`
- Does not render red when status is `available`
