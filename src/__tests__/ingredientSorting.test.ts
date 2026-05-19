import { enrichIngredients } from '../lib/enrichIngredients'
import { RecipeIngredient } from '../types/recipe'
import { PantryItem } from '../types/pantryItem'

describe('ingredient sorting (AC-5)', () => {
  const pantry: PantryItem[] = []

  function makeIngredients(names: string[]): RecipeIngredient[] {
    return names.map(name => ({ name, amount: 1, unit: 'cup' }))
  }

  it('returns enriched ingredients sorted alphabetically by name', () => {
    const ingredients = makeIngredients(['Zucchini', 'Basil', 'Mozzarella'])
    const result = enrichIngredients(ingredients, pantry)
    expect(result.map(i => i.name)).toEqual(['Basil', 'Mozzarella', 'Zucchini'])
  })

  it('single ingredient — no-op sort', () => {
    const ingredients = makeIngredients(['Tomato'])
    const result = enrichIngredients(ingredients, pantry)
    expect(result.map(i => i.name)).toEqual(['Tomato'])
  })
})
