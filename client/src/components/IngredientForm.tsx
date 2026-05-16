import { useState } from 'react'
import type { PantryItem } from '../hooks/useIngredients'

const COOKING_UNITS = [
  'count', 'cups', 'grams', 'liters', 'ounces', 'pounds', 'tablespoons', 'teaspoons',
] as const

interface Props {
  item?: PantryItem
  submitting: boolean
  onSave: (name: string, quantity: number, unit: string) => void
  onCancel: () => void
}

export default function IngredientForm({ item, submitting, onSave, onCancel }: Props) {
  const [name, setName] = useState(item?.name ?? '')
  const [quantity, setQuantity] = useState(item != null ? String(item.quantity) : '')
  const [unit, setUnit] = useState(item?.unit ?? '')
  const [error, setError] = useState('')

  function handleSave() {
    if (!name.trim()) { setError('Name is required.'); return }
    if (!quantity.trim()) { setError('Quantity is required.'); return }
    const qty = Number(quantity)
    if (!isFinite(qty)) { setError('Quantity must be a number.'); return }
    if (!unit) { setError('A unit must be selected.'); return }
    setError('')
    onSave(name.trim(), qty, unit)
  }

  return (
    <li className="inline-form">
      <input
        type="text"
        placeholder="Ingredient name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />
      <select value={unit} onChange={e => setUnit(e.target.value)}>
        <option value="" disabled>— select unit —</option>
        {COOKING_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
      </select>
      <button onClick={handleSave} disabled={submitting}>Save</button>
      <button onClick={onCancel}>Cancel</button>
      {error && <span className="form-error">{error}</span>}
    </li>
  )
}
