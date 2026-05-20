export interface RecipeIngredient {
  name: string
  amount: number
  unit: string
}

export interface Recipe {
  id: string
  title: string
  instructions: string
  ingredients: RecipeIngredient[]
}

export interface EnrichedIngredient extends RecipeIngredient {
  status: 'available' | 'partial' | 'missing'
  shortfall?: number
}

export interface RecipeDetail {
  id: string
  title: string
  instructions: string
  ingredients: EnrichedIngredient[]
}
