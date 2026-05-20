import { enrichIngredients } from '../lib/enrichIngredients'
import { RecipeIngredient } from '../types/recipe'
import { PantryItem } from '../types/pantryItem'

function makeIngredient(name: string, amount: number, unit: string): RecipeIngredient {
  return { name, amount, unit }
}

function makePantryItem(name: string, quantity: number, unit: string): PantryItem {
  return { id: 'test-id', name, quantity, unit }
}

describe('enrichIngredients', () => {
  it('AC-6: marks ingredient as available when pantry quantity >= required', () => {
    const ingredients = [makeIngredient('Flour', 2, 'cups')]
    const pantry = [makePantryItem('Flour', 3, 'cups')]
    const result = enrichIngredients(ingredients, pantry)
    expect(result[0].status).toBe('available')
    expect(result[0].shortfall).toBeUndefined()
  })

  it('AC-6 variant: marks ingredient as available when pantry quantity === required', () => {
    const ingredients = [makeIngredient('Flour', 2, 'cups')]
    const pantry = [makePantryItem('Flour', 2, 'cups')]
    const result = enrichIngredients(ingredients, pantry)
    expect(result[0].status).toBe('available')
  })

  it('AC-7: marks ingredient as partial when pantry quantity < required and calculates shortfall', () => {
    const ingredients = [makeIngredient('Flour', 5, 'cups')]
    const pantry = [makePantryItem('Flour', 3, 'cups')]
    const result = enrichIngredients(ingredients, pantry)
    expect(result[0].status).toBe('partial')
    expect(result[0].shortfall).toBe(2)
  })

  it('AC-9: treats ingredient as missing when units do not match', () => {
    const ingredients = [makeIngredient('Olive oil', 1, 'cups')]
    const pantry = [makePantryItem('Olive oil', 500, 'liters')]
    const result = enrichIngredients(ingredients, pantry)
    expect(result[0].status).toBe('missing')
    expect(result[0].shortfall).toBeUndefined()
  })

  it('AC-8: marks ingredient as missing when not in pantry at all', () => {
    const ingredients = [makeIngredient('Saffron', 1, 'pinch')]
    const pantry = [makePantryItem('Flour', 5, 'cups')]
    const result = enrichIngredients(ingredients, pantry)
    expect(result[0].status).toBe('missing')
  })

  it('case-insensitive name matching: matches regardless of case', () => {
    const ingredients = [makeIngredient('olive oil', 1, 'cups')]
    const pantry = [makePantryItem('Olive Oil', 2, 'cups')]
    const result = enrichIngredients(ingredients, pantry)
    expect(result[0].status).toBe('available')
  })

  it('AC-10: returns empty array when ingredient list is empty', () => {
    const pantry = [makePantryItem('Flour', 5, 'cups')]
    const result = enrichIngredients([], pantry)
    expect(result).toEqual([])
  })
})
