import { useState } from 'react'

export function useCreateIngredient() {
  const [submitting, setSubmitting] = useState(false)

  async function createIngredient(name: string, quantity: number, unit: string) {
    setSubmitting(true)
    try {
      await fetch('/api/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, quantity, unit }),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return { createIngredient, submitting }
}
