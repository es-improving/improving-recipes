# Acceptance Criteria: React Frontend Conversion

## Recipes Page — Load and Display

**Given**: A user navigates to the home page (`/`),
**When**: The page finishes loading,
**Then**: A list of recipe titles is displayed on the page.

---

**Given**: A user navigates to the home page (`/`),
**When**: The API returns an empty list of recipes,
**Then**: No recipe items are shown (the list is empty with no errors).

---

**Given**: A user is on the home page (`/`),
**When**: The API call to `/api/recipes` fails (e.g., network error),
**Then**: The app does not crash and the user sees no broken or undefined content.

---

## Navigation

**Given**: A user is on the home page (`/`),
**When**: The user clicks the "Pantry" navigation link,
**Then**: The user is taken to the Pantry page.

---

**Given**: A user is on the Pantry page,
**When**: The user clicks the "Recipes" navigation link,
**Then**: The user is taken back to the home page.

---

## Pantry Page — Load and Display

**Given**: A user navigates to the Pantry page,
**When**: The page finishes loading and the pantry has ingredients,
**Then**: Each ingredient is shown with its name, quantity, and unit (e.g., "Flour — 2 cups").

---

**Given**: A user navigates to the Pantry page,
**When**: The page finishes loading and the pantry has no ingredients,
**Then**: The message "Your pantry is empty." is displayed.

---

**Given**: A user is on the Pantry page,
**When**: The page finishes loading,
**Then**: Each ingredient row has an "Edit" button and a "Delete" button.

---

## Pantry Page — Add Ingredient

**Given**: A user is on the Pantry page,
**When**: The user clicks the "Add Ingredient" button,
**Then**: An inline form appears at the top of the list with a name text input, a quantity number input, a unit dropdown, a "Save" button, and a "Cancel" button.

---

**Given**: A user is on the Pantry page with the add form open,
**When**: The user clicks "Add Ingredient" a second time,
**Then**: A second add form does not appear (only one form is shown at a time).

---

**Given**: A user has the add form open with all fields filled in correctly,
**When**: The user clicks "Save",
**Then**: A `POST` request is sent to `/api/ingredients` with the name, quantity, and unit, and the ingredient list refreshes to show the new item.

---

**Given**: A user has the add form open with the name field left blank,
**When**: The user clicks "Save",
**Then**: The form displays the error "Name is required." and no API call is made.

---

**Given**: A user has the add form open with the quantity field left blank,
**When**: The user clicks "Save",
**Then**: The form displays the error "Quantity is required." and no API call is made.

---

**Given**: A user has the add form open and enters a non-numeric value in the quantity field,
**When**: The user clicks "Save",
**Then**: The form displays the error "Quantity must be a number." and no API call is made.

---

**Given**: A user has the add form open with no unit selected from the dropdown,
**When**: The user clicks "Save",
**Then**: The form displays the error "A unit must be selected." and no API call is made.

---

**Given**: A user has the add form open,
**When**: The user clicks "Cancel",
**Then**: The form is removed and the ingredient list is shown in its normal state.

---

**Given**: A user has the add form open and clicks "Save",
**When**: The save API call is in flight,
**Then**: The "Save" button is disabled until the call completes.

---

## Pantry Page — Edit Ingredient

**Given**: A user is on the Pantry page viewing an ingredient,
**When**: The user clicks the "Edit" button on that ingredient,
**Then**: The ingredient row is replaced by an inline edit form pre-populated with the ingredient's current name, quantity, and unit.

---

**Given**: A user has the edit form open with valid updated values,
**When**: The user clicks "Save",
**Then**: A `PUT` request is sent to `/api/ingredients/{id}` with the updated name, quantity, and unit, and the ingredient list refreshes to show the updated values.

---

**Given**: A user has the edit form open with the name field cleared,
**When**: The user clicks "Save",
**Then**: The form displays the error "Name is required." and no API call is made.

---

**Given**: A user has the edit form open with the quantity field cleared,
**When**: The user clicks "Save",
**Then**: The form displays the error "Quantity is required." and no API call is made.

---

**Given**: A user has the edit form open and enters a non-numeric value in the quantity field,
**When**: The user clicks "Save",
**Then**: The form displays the error "Quantity must be a number." and no API call is made.

---

**Given**: A user has the edit form open with no unit selected,
**When**: The user clicks "Save",
**Then**: The form displays the error "A unit must be selected." and no API call is made.

---

**Given**: A user has the edit form open,
**When**: The user clicks "Cancel",
**Then**: The edit form is removed and the ingredient list is shown in its normal state.

---

## Pantry Page — Delete Ingredient

**Given**: A user is on the Pantry page viewing an ingredient,
**When**: The user clicks the "Delete" button on that ingredient,
**Then**: The ingredient row's action area changes to show the text "Are you sure?" with "Yes" and "No" buttons.

---

**Given**: A user has confirmed deletion intent and sees the "Yes"/"No" prompt,
**When**: The user clicks "Yes",
**Then**: A `DELETE` request is sent to `/api/ingredients/{id}` and the ingredient list refreshes with that item removed.

---

**Given**: A user has confirmed deletion intent and sees the "Yes"/"No" prompt,
**When**: The user clicks "No",
**Then**: No API call is made and the ingredient list is restored to its normal state.

---

## Unit Dropdown

**Given**: A user opens the add or edit form on the Pantry page,
**When**: The unit dropdown is rendered,
**Then**: It includes all supported cooking units: count, cups, grams, liters, ounces, pounds, tablespoons, teaspoons.

---

**Given**: A user opens the add form on the Pantry page,
**When**: The unit dropdown is rendered,
**Then**: A disabled placeholder option "— select unit —" is shown and selected by default.

---

## Build & Deployment

**Given**: A developer runs the production build command,
**When**: The build completes,
**Then**: Vite produces a compiled output that the Express server can serve as static files.

---

**Given**: A new commit is pushed to the main branch,
**When**: The GitHub Actions deployment workflow runs,
**Then**: The pipeline completes successfully using the Vite-based build without modification to the deploy steps.

---

**Given**: The app is running in production behind nginx,
**When**: A user navigates to any page of the app,
**Then**: All assets (JS, CSS) load correctly from the Vite-built output.
