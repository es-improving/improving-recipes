import { randomUUID } from "crypto";
import { PantryItem } from "../types/pantryItem";

const store = new Map<string, PantryItem>();

[
  { id: randomUUID(), name: "All-purpose flour", quantity: 2, unit: "cups" },
  { id: randomUUID(), name: "Butter", quantity: 1, unit: "pounds" },
  { id: randomUUID(), name: "Eggs", quantity: 12, unit: "count" },
  { id: randomUUID(), name: "Olive oil", quantity: 500, unit: "liters" },
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
