import request from 'supertest'
import express from 'express'
import recipesRouter from '../routes/recipes'
import { recipesStore, pantryStore } from '../db'

const app = express()
app.use(express.json())
app.use('/api/recipes', recipesRouter)

describe('GET /api/recipes/:id', () => {
  it('returns 404 for an unknown recipe id', async () => {
    const res = await request(app).get('/api/recipes/nonexistent-id')
    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: 'Not found' })
  })

  it('returns enriched RecipeDetail for a valid recipe id', async () => {
    const recipes = recipesStore.list()
    const { id } = recipes[0]
    // Seed a pantry item matching "Olive oil" (2 tbsp) in the first recipe so we
    // can assert a specific status, not just that the field has some valid value.
    const pantryItem = pantryStore.create({ name: 'Olive oil', quantity: 10, unit: 'tbsp' })
    try {
      const res = await request(app).get(`/api/recipes/${id}`)
      expect(res.status).toBe(200)
      expect(res.body).toMatchObject({
        id,
        title: expect.any(String),
        instructions: expect.any(String),
        ingredients: expect.any(Array),
      })
      for (const ingredient of res.body.ingredients) {
        expect(ingredient).toMatchObject({
          name: expect.any(String),
          amount: expect.any(Number),
          unit: expect.any(String),
          status: expect.stringMatching(/^(available|partial|missing)$/),
        })
      }
      const oliveOil = res.body.ingredients.find((i: { name: string }) => i.name === 'Olive oil')
      expect(oliveOil).toBeDefined()
      expect(oliveOil.status).toBe('available')
    } finally {
      pantryStore.remove(pantryItem.id)
    }
  })

  it('returns ingredients sorted alphabetically (AC-5)', async () => {
    const recipes = recipesStore.list()
    const { id } = recipes[0]
    const res = await request(app).get(`/api/recipes/${id}`)
    const names: string[] = res.body.ingredients.map((i: { name: string }) => i.name)
    const sorted = [...names].sort((a, b) => a.localeCompare(b))
    expect(names).toEqual(sorted)
  })
})
