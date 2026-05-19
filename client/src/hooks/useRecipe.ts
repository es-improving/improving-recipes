import { useState, useEffect } from 'react'

export interface EnrichedIngredient {
  name: string
  amount: number
  unit: string
  status: 'available' | 'partial' | 'missing'
  shortfall?: number
}

export interface RecipeDetail {
  id: string
  title: string
  instructions: string
  ingredients: EnrichedIngredient[]
}

export function useRecipe(id: string) {
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data)
        setLoading(false)
      })
  }, [id])

  return { recipe, loading }
}
