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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`/api/recipes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        return res.json()
      })
      .then(data => {
        setRecipe(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  return { recipe, loading, error }
}
