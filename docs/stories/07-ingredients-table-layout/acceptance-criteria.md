# Acceptance Criteria: Ingredients Table Layout

## AC-1: Ingredients are displayed in a table

**Given**: A user navigates to a recipe page that has ingredients,
**When**: The page loads,
**Then**: The ingredients are displayed in an HTML table (not a bulleted list).

---

## AC-2: Table has a header row with correct column labels

**Given**: A user navigates to a recipe page,
**When**: The ingredients table is rendered,
**Then**: The table includes a header row with three columns labeled "Ingredient", "Quantity", and "Status" (in that order).

---

## AC-3: Each ingredient row displays all three data points

**Given**: A user navigates to a recipe page with ingredients,
**When**: The ingredients table is rendered,
**Then**: Each ingredient row displays the ingredient name in the first column, the quantity in the second column, and the status in the third column.

---

## AC-4: "In Stock" status text is still green

**Given**: A user navigates to a recipe page where one or more ingredients have a status of "In Stock",
**When**: The ingredients table is rendered,
**Then**: The "In Stock" text in the Status column is displayed in green, consistent with the existing styling.

---

## AC-5: Non-"In Stock" status text is not styled green

**Given**: A user navigates to a recipe page where one or more ingredients have a status other than "In Stock",
**When**: The ingredients table is rendered,
**Then**: The status text for those ingredients is not displayed in green.

---

## AC-6: Table renders correctly when a recipe has multiple ingredients

**Given**: A user navigates to a recipe page that has more than one ingredient,
**When**: The ingredients table is rendered,
**Then**: Each ingredient appears as its own row in the table, with no ingredients missing or duplicated.

---

## AC-7: No bulleted list is present

**Given**: A user navigates to a recipe page,
**When**: The ingredients section is rendered,
**Then**: There is no unordered list (`<ul>`) or list item (`<li>`) element used to display ingredients.
