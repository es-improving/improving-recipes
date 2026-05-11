// Placeholder in-memory store — resets on server restart.
// Replace this module with a real DB adapter when ready.
import { randomUUID } from "crypto";
import { Recipe } from "../types/recipe";

const store = new Map<string, Recipe>();

// Seed data
[
  { id: randomUUID(), title: "Classic Margherita Pizza" },
  { id: randomUUID(), title: "Chicken Tikka Masala" },
].forEach((r) => store.set(r.id, r));

export const recipesStore = {
  list(): Recipe[] {
    return Array.from(store.values());
  },

  get(id: string): Recipe | undefined {
    return store.get(id);
  },

  create(data: { title: string }): Recipe {
    const recipe: Recipe = { id: randomUUID(), title: data.title };
    store.set(recipe.id, recipe);
    return recipe;
  },

  update(id: string, data: { title: string }): Recipe | undefined {
    const existing = store.get(id);
    if (!existing) return undefined;
    const updated: Recipe = { ...existing, title: data.title };
    store.set(id, updated);
    return updated;
  },

  remove(id: string): boolean {
    return store.delete(id);
  },
};
