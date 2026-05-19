import { Link } from 'react-router-dom'
import { useRecipes } from '../hooks/useRecipes'

export default function RecipesPage() {
  const { recipes } = useRecipes()

  return (
    <ul id="recipes">
      {recipes.map(recipe => (
        <li key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
        </li>
      ))}
    </ul>
  )
}
