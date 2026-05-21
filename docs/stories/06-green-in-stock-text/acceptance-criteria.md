# Acceptance Criteria: Green "In Stock" Text on Recipe Page

**AC-1: "In stock" text appears in green**

**Given**: A user navigates to a recipe page that has at least one ingredient marked as in stock,
**When**: The page renders the ingredient list,
**Then**: The "In stock" label for that ingredient is displayed in green text.

---

**AC-2: "In stock" text color is visually distinct from default text**

**Given**: A user views a recipe page with a mix of in-stock and unlabeled ingredients,
**When**: The user scans the ingredient list,
**Then**: The "In stock" labels stand out visually in green against the surrounding default-colored text.

---

**AC-3: Out-of-stock styling is unaffected**

**Given**: A user navigates to a recipe page that has at least one ingredient marked as out of stock,
**When**: The page renders the ingredient list,
**Then**: The out-of-stock ingredient text continues to appear in red, unchanged by this story.

---

**AC-4: Green applies only to the "In stock" label, not the ingredient name**

**Given**: A user views a recipe page with an in-stock ingredient,
**When**: The ingredient row renders,
**Then**: Only the "In stock" label text is green; the ingredient name and any other surrounding text remain in their default color.

---

**AC-5: No green text appears when no ingredients are in stock**

**Given**: A user navigates to a recipe page where no ingredients are marked as in stock,
**When**: The page renders the ingredient list,
**Then**: No green text appears anywhere in the ingredient list.
