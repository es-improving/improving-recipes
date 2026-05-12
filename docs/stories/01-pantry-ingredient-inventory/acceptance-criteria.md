# Acceptance Criteria: Pantry Ingredient Inventory

## Viewing the Pantry

**Given**: a user has ingredients in their pantry,
**When**: the user navigates to the pantry page,
**Then**: all pantry ingredients are displayed in a scrollable list sorted alphabetically by name, each showing the ingredient name, quantity, and unit.

---

**Given**: a user has no ingredients in their pantry,
**When**: the user navigates to the pantry page,
**Then**: the list is empty and a message is shown indicating the pantry is empty.

---

## Adding an Ingredient

**Given**: a user is on the pantry page,
**When**: the user clicks the "Add Ingredient" button,
**Then**: a form is displayed with fields for ingredient name, quantity (numeric), and unit (dropdown).

---

**Given**: a user has opened the add ingredient form and filled in a valid name, a valid numeric quantity, and selected a unit from the dropdown,
**When**: the user submits the form,
**Then**: the new ingredient appears in the pantry list in its correct alphabetical position and the form is dismissed.

---

**Given**: a user has opened the add ingredient form and left the name field blank,
**When**: the user submits the form,
**Then**: the form is not submitted, the ingredient is not added, and a validation error is shown indicating the name is required.

---

**Given**: a user has opened the add ingredient form and left the quantity field blank,
**When**: the user submits the form,
**Then**: the form is not submitted, the ingredient is not added, and a validation error is shown indicating the quantity is required.

---

**Given**: a user has opened the add ingredient form and entered a non-numeric value in the quantity field,
**When**: the user submits the form,
**Then**: the form is not submitted, the ingredient is not added, and a validation error is shown indicating the quantity must be a number.

---

**Given**: a user has opened the add ingredient form and has not selected a unit,
**When**: the user submits the form,
**Then**: the form is not submitted, the ingredient is not added, and a validation error is shown indicating a unit must be selected.

---

**Given**: a user has opened the add ingredient form,
**When**: the user cancels or dismisses the form without submitting,
**Then**: no ingredient is added and the pantry list is unchanged.

---

## Unit Dropdown

**Given**: a user has opened the add or edit ingredient form,
**When**: the user opens the unit dropdown,
**Then**: the dropdown contains a standard set of cooking units including at minimum: cups, tablespoons, teaspoons, ounces, grams, pounds, liters, and count.

---

## Editing an Ingredient

**Given**: a user is on the pantry page and at least one ingredient exists,
**When**: the user clicks the edit action on a specific ingredient,
**Then**: an edit form is displayed pre-populated with that ingredient's current name, quantity, and unit.

---

**Given**: a user has opened the edit form for an ingredient and changes the name to a new valid name,
**When**: the user submits the form,
**Then**: the ingredient is updated with the new name, the list re-sorts alphabetically to reflect the new name, and the form is dismissed.

---

**Given**: a user has opened the edit form for an ingredient and changes the quantity to a new valid numeric value,
**When**: the user submits the form,
**Then**: the ingredient is updated with the new quantity and the form is dismissed.

---

**Given**: a user has opened the edit form for an ingredient and changes the unit to a different unit from the dropdown,
**When**: the user submits the form,
**Then**: the ingredient is updated with the new unit and the form is dismissed.

---

**Given**: a user has opened the edit form for an ingredient and clears the name field,
**When**: the user submits the form,
**Then**: the form is not submitted, the ingredient is not updated, and a validation error is shown indicating the name is required.

---

**Given**: a user has opened the edit form for an ingredient and enters a non-numeric value in the quantity field,
**When**: the user submits the form,
**Then**: the form is not submitted, the ingredient is not updated, and a validation error is shown indicating the quantity must be a number.

---

**Given**: a user has opened the edit form for an ingredient,
**When**: the user cancels or dismisses the form without submitting,
**Then**: the ingredient is unchanged and the pantry list is unchanged.

---

## Deleting an Ingredient

**Given**: a user is on the pantry page and at least one ingredient exists,
**When**: the user clicks the delete action on a specific ingredient,
**Then**: a confirmation prompt is displayed asking the user to confirm deletion of that ingredient.

---

**Given**: a user has been shown the delete confirmation prompt for an ingredient,
**When**: the user confirms the deletion,
**Then**: the ingredient is removed from the pantry list and is no longer displayed.

---

**Given**: a user has been shown the delete confirmation prompt for an ingredient,
**When**: the user cancels the confirmation prompt,
**Then**: the ingredient is not deleted and remains in the pantry list unchanged.
