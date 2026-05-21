import express from "express";
import path from "path";
import recipesRouter from "./routes/recipes";
import ingredientsRouter from "./routes/ingredients";
import auditLogsRouter from "./routes/auditLogs";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "dist", "public")));

app.use("/api/recipes", recipesRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/audit-logs", auditLogsRouter);

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
