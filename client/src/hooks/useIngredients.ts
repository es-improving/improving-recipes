import { useState, useEffect } from 'react'

export interface PantryItem {
  id: string
  name: string
  quantity: number
  unit: string
}

export function useIngredients() {
  const [ingredients, setIngredients] = useState<PantryItem[]>([])

  async function refresh() {
    const res = await fetch('/api/ingredients')
    if (res.ok) setIngredients(await res.json())
  }

  useEffect(() => { refresh() }, [])

  return { ingredients, refresh }
}
