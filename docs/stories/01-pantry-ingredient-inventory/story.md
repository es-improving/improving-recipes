# Story: Pantry Ingredient Inventory

## Problem / Context
When a user wants to cook a recipe, they need to know what ingredients they already have on hand and in what quantities. Without a way to track this, they can't easily tell whether they have what they need or whether a trip to the store is required. This story establishes the foundation — a personal pantry inventory — that will eventually enable recipe-to-pantry comparisons.

## User Story
As a home cook, I want to manage a list of ingredients I have on hand (including their quantities and units) so that I know what is currently in my pantry.

## Scope
- Each ingredient has a name, a numeric quantity, and a unit selected from a dropdown of typical cooking units (e.g., cups, tablespoons, teaspoons, ounces, grams, pounds, liters, count, etc.)
- The user can create, view, edit, and delete ingredients
- All fields on an ingredient (name, quantity, unit) are editable
- Ingredients are displayed as a scrollable list sorted alphabetically by name
- This is a single-user experience — no multi-user or sharing concerns
- Deleting an ingredient requires a confirmation step

**Out of scope:**
- Comparing pantry inventory against a recipe to determine if the user can cook it or needs to go shopping
- Linking or associating pantry ingredients with recipe ingredients

## Open Questions
None.
