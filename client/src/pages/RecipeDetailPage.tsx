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
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={`${ingredient.name}-${index}`}>
              <span>
                {ingredient.name} — {ingredient.amount} {ingredient.unit}
              </span>
              {' '}
              <IngredientStatus ingredient={ingredient} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
