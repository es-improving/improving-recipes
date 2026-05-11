import express from "express";
import path from "path";
import recipesRouter from "./routes/recipes";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/recipes", recipesRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
