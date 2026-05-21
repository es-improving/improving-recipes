# Technical Plan: Ingredients Table Layout

## Overview

Replace the `<ul>/<li>` ingredient list on the recipe detail page with an HTML table. Add light gray borders and cell padding via the global stylesheet.

## Files to Change

### 1. `client/src/pages/RecipeDetailPage.tsx`

Replace the `<ul>` block (lines 35–45) with a `<table>`. Structure:

```tsx
<table className="ingredients-table">
  <thead>
    <tr>
      <th>Ingredient</th>
      <th>Quantity</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {recipe.ingredients.map((ingredient, index) => (
      <tr key={`${ingredient.name}-${index}`}>
        <td>{ingredient.name}</td>
        <td>{ingredient.amount} {ingredient.unit}</td>
        <td><IngredientStatus ingredient={ingredient} /></td>
      </tr>
    ))}
  </tbody>
</table>
```

The `IngredientStatus` sub-component is unchanged.

### 2. `public/styles.css`

Add a new rule block at the bottom of the file:

```css
.ingredients-table {
  border-collapse: collapse;
  width: 100%;
}

.ingredients-table th,
.ingredients-table td {
  padding: 6px 8px;
  border: 1px solid #d0d0d0;
  text-align: left;
}
```

`border-collapse: collapse` prevents double borders between adjacent cells. `#d0d0d0` is a light gray consistent with the existing `#e5e5e5` border color used elsewhere in the stylesheet. `6px 8px` padding keeps cells readable without being heavy.

## No Other Files Change

- No backend changes — data shape is unchanged.
- No new components — `IngredientStatus` stays in place.
- No changes to `PantryPage`, `IngredientRow`, or any hooks.

## Acceptance Criteria Mapping

| AC | Addressed by |
|----|-------------|
| AC-1 | `<table>` replaces `<ul>` |
| AC-2 | `<thead>` row with `<th>` labels |
| AC-3 | Each `<tr>` has three `<td>` cells |
| AC-4 | `IngredientStatus` unchanged; `.status-available` still green |
| AC-5 | `IngredientStatus` unchanged; non-available classes unchanged |
| AC-6 | `map()` produces one row per ingredient |
| AC-7 | `<ul>` and `<li>` removed entirely |
