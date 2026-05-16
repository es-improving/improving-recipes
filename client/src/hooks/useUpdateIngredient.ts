import { useState } from 'react'

export function useUpdateIngredient() {
  const [submitting, setSubmitting] = useState(false)

  async function updateIngredient(id: string, name: string, quantity: number, unit: string) {
    setSubmitting(true)
    try {
      await fetch(`/api/ingredients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, quantity, unit }),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return { updateIngredient, submitting }
}
