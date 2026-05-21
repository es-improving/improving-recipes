# Acceptance Criteria: Highlight Missing Ingredients in Red

---

**AC1: Missing ingredient text is red**

**Given**: A user navigates to a recipe detail page,
**When**: An ingredient in the recipe is not present in the pantry,
**Then**: The availability indicator for that ingredient is displayed in red text.

---

**AC2: Available ingredient text is unchanged**

**Given**: A user navigates to a recipe detail page,
**When**: An ingredient in the recipe is present in the pantry,
**Then**: The availability indicator for that ingredient is displayed in its default color (not red).

---

**AC3: All ingredients missing — all red**

**Given**: A user navigates to a recipe detail page,
**When**: None of the recipe's ingredients are present in the pantry,
**Then**: The availability indicator for every ingredient on the page is displayed in red text.

---

**AC4: All ingredients available — none red**

**Given**: A user navigates to a recipe detail page,
**When**: All of the recipe's ingredients are present in the pantry,
**Then**: No ingredient availability indicator on the page is displayed in red text.

---

**AC5: Mixed availability — only missing ones are red**

**Given**: A user navigates to a recipe detail page,
**When**: Some ingredients are in the pantry and some are not,
**Then**: Only the availability indicators for ingredients not in the pantry are displayed in red; indicators for pantry-available ingredients remain their default color.
