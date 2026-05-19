# Acceptance Criteria: Recipe Detail Page with Ingredients

## Navigation

**AC-1: Clicking a recipe name opens the detail page**

**Given**: A user is on the recipes list page,
**When**: The user clicks on the name of a recipe,
**Then**: The user is taken to the detail page for that specific recipe.

---

## Recipe Detail Page — Content

**AC-2: Detail page displays the recipe name**

**Given**: A user has navigated to a recipe detail page,
**When**: The page loads,
**Then**: The recipe's name is displayed prominently on the page.

**AC-3: Detail page displays the recipe instructions**

**Given**: A user has navigated to a recipe detail page,
**When**: The page loads,
**Then**: The recipe's instructions are displayed as a single paragraph with no lists or paragraph breaks.

**AC-4: Detail page displays the ingredient list**

**Given**: A user has navigated to a recipe detail page,
**When**: The page loads,
**Then**: All ingredients for the recipe are displayed, each showing the ingredient name, required amount, and unit.

**AC-5: Ingredients are displayed in alphabetical order**

**Given**: A user has navigated to a recipe detail page with multiple ingredients,
**When**: The page loads,
**Then**: The ingredients are listed in alphabetical order by name.

---

## Pantry Availability — Sufficient Stock

**AC-6: Ingredient is fully covered by pantry**

**Given**: A user has navigated to a recipe detail page,
**And**: The pantry contains at least the required amount of an ingredient with the exact matching unit,
**When**: The page loads,
**Then**: That ingredient is shown with a visual indicator that it is fully available (e.g., "In stock" or a checkmark).

---

## Pantry Availability — Partial Stock

**AC-7: Ingredient is partially covered by pantry**

**Given**: A user has navigated to a recipe detail page,
**And**: The pantry contains the ingredient with the exact matching unit but in a quantity less than what the recipe requires,
**When**: The page loads,
**Then**: That ingredient is shown with an indicator that it is partially available and the specific shortfall amount and unit are displayed (e.g., "Short by 2 cups").

---

## Pantry Availability — No Stock

**AC-8: Ingredient is completely missing from pantry**

**Given**: A user has navigated to a recipe detail page,
**And**: The pantry contains no entry for that ingredient name,
**When**: The page loads,
**Then**: That ingredient is shown with an indicator that it is missing (e.g., "Not in pantry"), and the full required amount and unit are displayed.

**AC-9: Ingredient exists in pantry but with a different unit**

**Given**: A user has navigated to a recipe detail page,
**And**: The pantry contains the ingredient but with a different unit than the recipe requires (e.g., recipe requires "cups", pantry has "liters"),
**When**: The page loads,
**Then**: That ingredient is treated as missing (no unit conversion is performed) and shown with a missing indicator.

---

## Edge Cases

**AC-10: Recipe with no ingredients**

**Given**: A user has navigated to a recipe detail page for a recipe that has no ingredients in the seed data,
**When**: The page loads,
**Then**: The ingredients section is displayed but shows an empty state (e.g., "No ingredients listed").

**AC-11: Navigating back to the recipe list**

**Given**: A user is on a recipe detail page,
**When**: The user uses the browser back button or a back link on the page,
**Then**: The user is returned to the recipe list page.
