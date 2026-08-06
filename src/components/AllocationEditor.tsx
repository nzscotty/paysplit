import { Plus, Trash2 } from 'lucide-react'
import type { AllocationSummary } from '../types/paysplit'

type AllocationEditorProps = {
  summary: AllocationSummary
  onNameChange: (rowId: string, name: string) => void
  onAmountChange: (rowId: string, amount: number) => void
  onPercentageChange: (rowId: string, percentage: number) => void
  onAdd: () => void
  onRemove: (rowId: string) => void
}

const parseInputNumber = (value: string): number => Number(value) || 0

export function AllocationEditor({
  summary,
  onNameChange,
  onAmountChange,
  onPercentageChange,
  onAdd,
  onRemove,
}: AllocationEditorProps) {
  return (
    <div className="allocation-editor">
      <div className="allocation-table-head" aria-hidden="true">
        <span>Account or category</span>
        <span>Amount</span>
        <span>Share</span>
        <span />
      </div>
      <div className="allocation-rows">
        {summary.rows.length > 0 ? (
          summary.rows.map((row, index) => (
            <div className="allocation-row" key={row.id}>
              <div className="row-name-field">
                <span className="row-number">{String(index + 1).padStart(2, '0')}</span>
                <input
                  aria-label={`Account name for allocation ${index + 1}`}
                  className="account-name-input"
                  onChange={(event) => onNameChange(row.id, event.target.value)}
                  type="text"
                  value={row.name}
                />
              </div>
              <label className="row-number-field">
                <span className="sr-only">Dollar amount for {row.name}</span>
                <span className="input-prefix">$</span>
                <input
                  aria-label={`Dollar amount for ${row.name}`}
                  inputMode="decimal"
                  min="0"
                  onChange={(event) =>
                    onAmountChange(row.id, parseInputNumber(event.target.value))
                  }
                  step="0.01"
                  type="number"
                  value={row.amount}
                />
              </label>
              <label className="row-number-field percentage-field">
                <span className="sr-only">Percentage for {row.name}</span>
                <input
                  aria-label={`Percentage for ${row.name}`}
                  inputMode="decimal"
                  min="0"
                  onChange={(event) =>
                    onPercentageChange(row.id, parseInputNumber(event.target.value))
                  }
                  step="0.01"
                  type="number"
                  value={row.percentage}
                />
                <span className="input-suffix">%</span>
              </label>
              <button
                aria-label={`Remove ${row.name}`}
                className="icon-button remove-button"
                onClick={() => onRemove(row.id)}
                title="Remove allocation"
                type="button"
              >
                <Trash2 aria-hidden="true" size={17} strokeWidth={2} />
              </button>
            </div>
          ))
        ) : (
          <div className="empty-allocations">
            <p>No allocations yet.</p>
            <span>Add one below to give this pay a destination.</span>
          </div>
        )}
      </div>
      <div className="allocation-editor-footer">
        <button className="add-button" onClick={onAdd} type="button">
          <Plus aria-hidden="true" size={17} strokeWidth={2.5} />
          Add an allocation
        </button>
        <p>Change either amount or share. The other follows.</p>
      </div>
    </div>
  )
}
