import { randomUUID } from "crypto";
import { Recipe } from "../types/recipe";

const store = new Map<string, Recipe>();

[
  {
    id: randomUUID(),
    title: "Classic Margherita Pizza",
    instructions:
      "Preheat your oven to 475°F. Stretch the pizza dough on a floured surface to form a 12-inch circle, then transfer it to a greased baking sheet. Spread a thin layer of crushed tomatoes over the dough, leaving a half-inch border. Tear the mozzarella into pieces and distribute evenly over the sauce. Drizzle with olive oil and season with salt and pepper. Bake for 10–12 minutes until the crust is golden and the cheese is bubbling. Remove from the oven, scatter fresh basil leaves over the top, and serve immediately.",
    ingredients: [
      { name: "Pizza dough", amount: 1, unit: "ball" },
      { name: "Crushed tomatoes", amount: 0.5, unit: "cups" },
      { name: "Fresh mozzarella", amount: 8, unit: "oz" },
      { name: "Olive oil", amount: 2, unit: "tbsp" },
      { name: "Fresh basil", amount: 0.25, unit: "cups" },
    ],
  },
  {
    id: randomUUID(),
    title: "Chicken Tikka Masala",
    instructions:
      "Marinate the chicken in yogurt, lemon juice, and spices for at least an hour. Cook the marinated chicken in a hot skillet until charred and cooked through, then set aside. In the same pan, sauté onions until golden, add ginger and garlic paste, then stir in tomato purée and the remaining spices. Pour in the heavy cream and simmer for ten minutes until the sauce thickens. Add the chicken back to the pan, stir to coat, and cook for another five minutes. Garnish with fresh cilantro and serve with naan or basmati rice.",
    ingredients: [
      { name: "Chicken breast", amount: 1.5, unit: "pounds" },
      { name: "Plain yogurt", amount: 0.5, unit: "cups" },
      { name: "Heavy cream", amount: 1, unit: "cups" },
      { name: "Tomato purée", amount: 1, unit: "cups" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tbsp" },
      { name: "Olive oil", amount: 2, unit: "tbsp" },
      { name: "Garam masala", amount: 2, unit: "tsp" },
    ],
  },
].forEach((r) => store.set(r.id, r));

export const recipesStore = {
  list(): Pick<Recipe, "id" | "title">[] {
    return Array.from(store.values()).map(({ id, title }) => ({ id, title }));
  },

  get(id: string): Recipe | undefined {
    return store.get(id);
  },

  create(data: { title: string; instructions?: string; ingredients?: Recipe["ingredients"] }): Recipe {
    const recipe: Recipe = {
      id: randomUUID(),
      title: data.title,
      instructions: data.instructions ?? "",
      ingredients: data.ingredients ?? [],
    };
    store.set(recipe.id, recipe);
    return recipe;
  },

  update(
    id: string,
    data: { title: string; instructions?: string; ingredients?: Recipe["ingredients"] }
  ): Recipe | undefined {
    const existing = store.get(id);
    if (!existing) return undefined;
    const updated: Recipe = {
      ...existing,
      title: data.title,
      ...(data.instructions !== undefined && { instructions: data.instructions }),
      ...(data.ingredients !== undefined && { ingredients: data.ingredients }),
    };
    store.set(id, updated);
    return updated;
  },

  remove(id: string): boolean {
    return store.delete(id);
  },
};
