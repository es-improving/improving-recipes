import { useState, useEffect } from 'react'

interface Recipe {
  id: string
  title: string
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => { if (res.ok) return res.json() })
      .then(data => { if (data) setRecipes(data) })
  }, [])

  return { recipes }
}
