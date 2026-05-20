import { randomUUID } from "crypto";
import { PantryItem } from "../types/pantryItem";

const store = new Map<string, PantryItem>();

[
  // Margherita Pizza — available: pizza dough, crushed tomatoes, mozzarella, olive oil | missing: fresh basil
  { id: randomUUID(), name: "Pizza dough", quantity: 2, unit: "count" },
  { id: randomUUID(), name: "Crushed tomatoes", quantity: 1, unit: "cups" },
  { id: randomUUID(), name: "Fresh mozzarella", quantity: 12, unit: "ounces" },
  // Chicken Tikka Masala — available: chicken, yogurt, tomato purée, garlic, ginger, olive oil | partial: heavy cream | missing: garam masala
  { id: randomUUID(), name: "Chicken breast", quantity: 2, unit: "pounds" },
  { id: randomUUID(), name: "Plain yogurt", quantity: 1, unit: "cups" },
  { id: randomUUID(), name: "Heavy cream", quantity: 0.5, unit: "cups" },
  { id: randomUUID(), name: "Tomato purée", quantity: 1, unit: "cups" },
  { id: randomUUID(), name: "Garlic", quantity: 8, unit: "count" },
  { id: randomUUID(), name: "Ginger", quantity: 3, unit: "tablespoons" },
  // Shared — used by both recipes
  { id: randomUUID(), name: "Olive oil", quantity: 10, unit: "tablespoons" },
].forEach((item) => store.set(item.id, item));

export const pantryStore = {
  list(): PantryItem[] {
    return Array.from(store.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  },

  get(id: string): PantryItem | undefined {
    return store.get(id);
  },

  create(data: { name: string; quantity: number; unit: string }): PantryItem {
    const item: PantryItem = { id: randomUUID(), ...data };
    store.set(item.id, item);
    return item;
  },

  update(
    id: string,
    data: { name: string; quantity: number; unit: string }
  ): PantryItem | undefined {
    const existing = store.get(id);
    if (!existing) return undefined;
    const updated: PantryItem = { ...existing, ...data };
    store.set(id, updated);
    return updated;
  },

  remove(id: string): boolean {
    return store.delete(id);
  },
};
