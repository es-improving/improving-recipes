import { RecipeIngredient, EnrichedIngredient } from '../types/recipe'
import { PantryItem } from '../types/pantryItem'

export function enrichIngredients(
  ingredients: RecipeIngredient[],
  pantryItems: PantryItem[]
): EnrichedIngredient[] {
  const enriched = ingredients.map((ingredient): EnrichedIngredient => {
    const match = pantryItems.find(
      (item) =>
        item.name.toLowerCase() === ingredient.name.toLowerCase() &&
        item.unit === ingredient.unit
    )

    if (!match) {
      return { ...ingredient, status: 'missing' }
    }

    if (match.quantity >= ingredient.amount) {
      return { ...ingredient, status: 'available' }
    }

    return {
      ...ingredient,
      status: 'partial',
      shortfall: Math.round((ingredient.amount - match.quantity) * 1000) / 1000,
    }
  })

  return enriched.sort((a, b) => a.name.localeCompare(b.name))
}
