import { useParams, Link } from 'react-router-dom'
import { useRecipe, EnrichedIngredient } from '../hooks/useRecipe'

function IngredientStatus({ ingredient }: { ingredient: EnrichedIngredient }) {
  if (ingredient.status === 'available') {
    return <span className="status-available">In stock</span>
  }
  if (ingredient.status === 'partial') {
    return (
      <span className="status-partial">
        Short by {ingredient.shortfall ?? '?'} {ingredient.unit}
      </span>
    )
  }
  return <span className="status-missing">Not in pantry</span>
}

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { recipe, loading, error } = useRecipe(id!)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!recipe) return <p>Recipe not found.</p>

  return (
    <div>
      <Link to="/">&larr; Back to recipes</Link>
      <h2>{recipe.title}</h2>
      <p>{recipe.instructions}</p>
      <h3>Ingredients</h3>
      {recipe.ingredients.length === 0 ? (
        <p>No ingredients listed.</p>
      ) : (
        <table className="ingredients-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recipe.ingredients.map((ingredient, index) => (
              <tr key={`${ingredient.name}-${index}`}>
                <td>{ingredient.name}</td>
                <td>{ingredient.amount} {ingredient.unit}</td>
                <td><IngredientStatus ingredient={ingredient} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
