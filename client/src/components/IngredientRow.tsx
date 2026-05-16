import type { PantryItem } from '../hooks/useIngredients'

interface Props {
  item: PantryItem
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function IngredientRow({ item, onEdit, onDelete }: Props) {
  return (
    <li>
      <span className="item-info">{item.name} — {item.quantity} {item.unit}</span>
      <span className="item-actions">
        <button onClick={() => onEdit(item.id)}>Edit</button>
        <button onClick={() => onDelete(item.id)}>Delete</button>
      </span>
    </li>
  )
}
