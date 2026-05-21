import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const AUDIT_LOGS_DIR = path.join(__dirname, "..", "..", ".audit-logs");

router.get("/", (_req: Request, res: Response) => {
  if (!fs.existsSync(AUDIT_LOGS_DIR)) {
    res.json([]);
    return;
  }
  const files = fs
    .readdirSync(AUDIT_LOGS_DIR)
    .filter((f) => f.endsWith(".jsonl"))
    .sort()
    .reverse();
  res.json(files);
});

router.get("/:filename", (req: Request, res: Response) => {
  const filename = req.params.filename;
  if (!filename.match(/^[\w\-]+\.jsonl$/)) {
    res.status(400).json({ error: "Invalid filename" });
    return;
  }
  const filePath = path.join(AUDIT_LOGS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  const lines = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => JSON.parse(l));
  res.json(lines);
});

export default router;
