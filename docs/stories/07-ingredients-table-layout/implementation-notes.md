# Implementation Notes: Ingredients Table Layout

## Changes Made

### `client/src/pages/RecipeDetailPage.tsx`
- Replaced `<ul>/<li>` ingredient list with a `<table className="ingredients-table">` containing `<thead>` and `<tbody>`.
- Header row has three `<th>` cells: Ingredient, Quantity, Status.
- Each ingredient maps to a `<tr>` with three `<td>` cells: name, amount+unit, and `<IngredientStatus />`.
- `IngredientStatus` sub-component is unchanged.

### `public/styles.css`
- Added `.ingredients-table` rule: `border-collapse: collapse`, `width: 100%`.
- Added `.ingredients-table th, .ingredients-table td` rule: `padding: 6px 8px`, `border: 1px solid #d0d0d0`, `text-align: left`.

## No Unit Tests
This story was pure UI — no business logic warranted unit tests.
