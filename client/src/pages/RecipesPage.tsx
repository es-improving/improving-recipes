import { useRecipes } from '../hooks/useRecipes'

export default function RecipesPage() {
  const { recipes } = useRecipes()

  return (
    <ul id="recipes">
      {recipes.map(recipe => (
        <li key={recipe.id}>{recipe.title}</li>
      ))}
    </ul>
  )
}
