interface Recipe {
  id: string;
  title: string;
}

async function loadRecipes(): Promise<void> {
  const res = await fetch("/api/recipes");
  const recipes: Recipe[] = await res.json();

  const list = document.getElementById("recipes") as HTMLUListElement;
  list.innerHTML = "";

  for (const recipe of recipes) {
    const li = document.createElement("li");
    li.textContent = recipe.title;
    list.appendChild(li);
  }
}

loadRecipes();
