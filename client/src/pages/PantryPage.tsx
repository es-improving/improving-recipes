import { useIngredients } from '../hooks/useIngredients'
import { useCreateIngredient } from '../hooks/useCreateIngredient'
import { useUpdateIngredient } from '../hooks/useUpdateIngredient'
import { useDeleteIngredient } from '../hooks/useDeleteIngredient'
import IngredientRow from '../components/IngredientRow'
import IngredientForm from '../components/IngredientForm'
import DeleteConfirm from '../components/DeleteConfirm'

type PantryState =
  | { mode: 'list' }
  | { mode: 'adding' }
  | { mode: 'editing'; id: string }
  | { mode: 'deleting'; id: string }

import { useState } from 'react'

export default function PantryPage() {
  const { ingredients, refresh } = useIngredients()
  const { createIngredient, submitting: creating } = useCreateIngredient()
  const { updateIngredient, submitting: updating } = useUpdateIngredient()
  const { deleteIngredient, submitting: deleting } = useDeleteIngredient()
  const [state, setState] = useState<PantryState>({ mode: 'list' })

  async function handleCreate(name: string, quantity: number, unit: string) {
    await createIngredient(name, quantity, unit)
    await refresh()
    setState({ mode: 'list' })
  }

  async function handleUpdate(name: string, quantity: number, unit: string) {
    if (state.mode !== 'editing') return
    await updateIngredient(state.id, name, quantity, unit)
    await refresh()
    setState({ mode: 'list' })
  }

  async function handleDelete() {
    if (state.mode !== 'deleting') return
    await deleteIngredient(state.id)
    await refresh()
    setState({ mode: 'list' })
  }

  return (
    <>
      <div className="page-header">
        <h2>My Pantry</h2>
        {state.mode === 'list' && (
          <button onClick={() => setState({ mode: 'adding' })}>Add Ingredient</button>
        )}
      </div>
      <ul id="ingredients">
        {state.mode === 'adding' && (
          <IngredientForm
            submitting={creating}
            onSave={handleCreate}
            onCancel={() => setState({ mode: 'list' })}
          />
        )}
        {ingredients.length === 0 && state.mode !== 'adding' && (
          <li className="empty-message">Your pantry is empty.</li>
        )}
        {ingredients.map(item => {
          if (state.mode === 'editing' && state.id === item.id) {
            return (
              <IngredientForm
                key={item.id}
                item={item}
                submitting={updating}
                onSave={handleUpdate}
                onCancel={() => setState({ mode: 'list' })}
              />
            )
          }
          if (state.mode === 'deleting' && state.id === item.id) {
            return (
              <DeleteConfirm
                key={item.id}
                item={item}
                submitting={deleting}
                onConfirm={handleDelete}
                onCancel={() => setState({ mode: 'list' })}
              />
            )
          }
          return (
            <IngredientRow
              key={item.id}
              item={item}
              onEdit={id => setState({ mode: 'editing', id })}
              onDelete={id => setState({ mode: 'deleting', id })}
            />
          )
        })}
      </ul>
    </>
  )
}
