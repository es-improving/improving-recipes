# Technical Plan: Green "In Stock" Text on Recipe Page

## Summary

Add a single CSS rule to color the existing `.status-available` span green. No JSX, logic, or data changes are needed — the class is already applied in `RecipeDetailPage.tsx`.

## Change

**File:** `public/styles.css`

Add after the existing `.status-partial` rule:

```css
.status-available {
  color: #2d7a2d;
}
```

## Why this is sufficient

- `RecipeDetailPage.tsx:6` already renders `<span className="status-available">In stock</span>` for ingredients with `status === 'available'`
- The class has no existing style rule, so the text currently inherits the default `#1a1a1a` body color
- The existing out-of-stock rules (`.status-missing`, `.status-partial`) use `color: #c00` and are untouched

## Files changed

| File | Change |
|------|--------|
| `public/styles.css` | Add `.status-available { color: #2d7a2d; }` |
