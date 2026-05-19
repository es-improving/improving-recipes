# Story: Recipe Detail Page with Ingredients

## Problem / Context
Recipes currently have no ingredients or instructions, making them useless for actually cooking. Users need to see the full details of a recipe — what ingredients are required and how to make it — and know whether they have everything on hand based on their pantry inventory.

## User Story
As a home cook browsing recipes, I want to view a recipe's ingredients and instructions and see whether I have enough of each ingredient in my pantry, so that I know if I can make the recipe and what I'm short on.

## Scope
- Recipes will have a list of ingredients, each with an amount and unit
- Recipes will have a single-paragraph instructions field (no lists or paragraph breaks)
- A recipe detail page will be created, navigated to by clicking a recipe name in the recipe list
- The detail page will display ingredients alongside pantry availability:
  - If the user has enough of an ingredient, show that it's covered
  - If the user has some but not enough, show how much they are short
  - If the user has none, show it as missing
- Ingredient and recipe data will be seeded (no authoring UI)

**Out of scope:**
- Editing recipes or ingredients through the UI
- Generating a shopping list
- Any other actions on the recipe detail page beyond viewing

## Decisions
- Ingredients are displayed alphabetically
- Pantry matching uses exact unit matching only (no unit conversion)
