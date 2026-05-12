import express from "express";
import path from "path";
import recipesRouter from "./routes/recipes";
import ingredientsRouter from "./routes/ingredients";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/recipes", recipesRouter);
app.use("/api/ingredients", ingredientsRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
