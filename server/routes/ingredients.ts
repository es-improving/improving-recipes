import { Router, Request, Response } from "express";
import { pantryStore } from "../db";
import { COOKING_UNITS } from "../constants/units";

const router = Router();

function validate(body: unknown): { name: string; quantity: number; unit: string } | string {
  const { name, quantity, unit } = body as Record<string, unknown>;
  if (!name || typeof name !== "string" || name.trim() === "") {
    return "name is required";
  }
  if (quantity === undefined || quantity === null || quantity === "") {
    return "quantity is required";
  }
  const qty = Number(quantity);
  if (!isFinite(qty)) {
    return "quantity must be a number";
  }
  if (!unit || !(COOKING_UNITS as readonly string[]).includes(unit as string)) {
    return "unit must be a valid cooking unit";
  }
  return { name: name.trim(), quantity: qty, unit: unit as string };
}

router.get("/", (_req: Request, res: Response) => {
  res.json(pantryStore.list());
});

router.get("/:id", (req: Request, res: Response) => {
  const item = pantryStore.get(req.params.id);
  if (!item) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(item);
});

router.post("/", (req: Request, res: Response) => {
  const result = validate(req.body);
  if (typeof result === "string") {
    res.status(400).json({ error: result });
    return;
  }
  res.status(201).json(pantryStore.create(result));
});

router.put("/:id", (req: Request, res: Response) => {
  const result = validate(req.body);
  if (typeof result === "string") {
    res.status(400).json({ error: result });
    return;
  }
  const updated = pantryStore.update(req.params.id, result);
  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(updated);
});

router.delete("/:id", (req: Request, res: Response) => {
  const removed = pantryStore.remove(req.params.id);
  if (!removed) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.status(204).send();
});

export default router;
