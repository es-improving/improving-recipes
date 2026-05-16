import { useState } from 'react'

export function useDeleteIngredient() {
  const [submitting, setSubmitting] = useState(false)

  async function deleteIngredient(id: string) {
    setSubmitting(true)
    try {
      await fetch(`/api/ingredients/${id}`, { method: 'DELETE' })
    } finally {
      setSubmitting(false)
    }
  }

  return { deleteIngredient, submitting }
}
