import { Router, Request, Response } from "express";
import { recipesStore } from "../db";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json(recipesStore.list());
});

router.get("/:id", (req: Request, res: Response) => {
  const recipe = recipesStore.get(req.params.id);
  if (!recipe) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(recipe);
});

router.post("/", (req: Request, res: Response) => {
  const { title } = req.body as { title?: string };
  if (!title) {
    res.status(400).json({ error: "title is required" });
    return;
  }
  const created = recipesStore.create({ title });
  res.status(201).json(created);
});

router.put("/:id", (req: Request, res: Response) => {
  const { title } = req.body as { title?: string };
  if (!title) {
    res.status(400).json({ error: "title is required" });
    return;
  }
  const updated = recipesStore.update(req.params.id, { title });
  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(updated);
});

router.delete("/:id", (req: Request, res: Response) => {
  const removed = recipesStore.remove(req.params.id);
  if (!removed) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.status(204).send();
});

export default router;
