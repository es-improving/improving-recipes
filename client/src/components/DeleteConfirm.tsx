import type { PantryItem } from '../hooks/useIngredients'

interface Props {
  item: PantryItem
  submitting: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirm({ item, submitting, onConfirm, onCancel }: Props) {
  return (
    <li>
      <span className="item-info">{item.name} — {item.quantity} {item.unit}</span>
      <span className="item-actions">
        <span>Are you sure?</span>
        <button onClick={onConfirm} disabled={submitting}>Yes</button>
        <button onClick={onCancel}>No</button>
      </span>
    </li>
  )
}
