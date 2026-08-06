import { RotateCcw, Trash2 } from 'lucide-react'
import type { PayFrequency, PaysplitState } from '../types/paysplit'

const frequencyLabels: Record<PayFrequency, string> = {
  weekly: 'Weekly',
  fortnightly: 'Fortnightly',
  monthly: 'Monthly',
}

type PayControlsProps = {
  state: PaysplitState
  onPayChange: (pay: number) => void
  onFrequencyChange: (frequency: PayFrequency) => void
  onClear: () => void
  onDefaults: () => void
}

export function PayControls({
  state,
  onPayChange,
  onFrequencyChange,
  onClear,
  onDefaults,
}: PayControlsProps) {
  return (
    <div className="pay-controls">
      <div className="pay-control-main">
        <label className="field-label" htmlFor="pay-amount">
          Take-home pay
        </label>
        <div className="money-input">
          <span aria-hidden="true">$</span>
          <input
            id="pay-amount"
            inputMode="decimal"
            min="0"
            onChange={(event) => onPayChange(Number(event.target.value) || 0)}
            step="0.01"
            type="number"
            value={state.pay}
          />
        </div>
      </div>
      <div className="frequency-control">
        <label className="field-label" htmlFor="pay-frequency">
          Pay arrives
        </label>
        <select
          id="pay-frequency"
          onChange={(event) =>
            onFrequencyChange(event.target.value as PayFrequency)
          }
          value={state.frequency}
        >
          {Object.entries(frequencyLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <button className="defaults-button" onClick={onDefaults} type="button">
        <RotateCcw aria-hidden="true" size={16} strokeWidth={2.2} />
        <span>Defaults</span>
      </button>
      <button className="clear-button" onClick={onClear} type="button">
        <Trash2 aria-hidden="true" size={16} strokeWidth={2.2} />
        <span>Clear</span>
      </button>
    </div>
  )
}
