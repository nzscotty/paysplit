import { ArrowUpRight, CalendarClock, Check } from 'lucide-react'
import type { AllocationSummary, PayFrequency } from '../types/paysplit'

const frequencyLabels: Record<PayFrequency, string> = {
  weekly: 'weekly',
  fortnightly: 'fortnightly',
  monthly: 'monthly',
}

const formatAmount = (amount: number) =>
  amount.toLocaleString('en-US', {
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
  })

type AutomationGuideProps = {
  summary: AllocationSummary
  frequency: PayFrequency
}

export function AutomationGuide({ summary, frequency }: AutomationGuideProps) {
  return (
    <div className="automation-layout">
      <div className="automation-copy">
        <div className="automation-note">
          <CalendarClock aria-hidden="true" size={22} strokeWidth={1.8} />
          <div>
            <p className="mini-label">Timing matters</p>
            <p>
              Set transfers for payday, or the day after, so money moves once your
              {` ${frequencyLabels[frequency]} `}pay has cleared.
            </p>
          </div>
        </div>
        <h3>Pay yourself first.</h3>
        <p>
          Saving whatever is left over rarely works. Automatic payments move your
          plan out of reach before it becomes spending money, making the good choice
          the easy one.
        </p>
        <a
          className="text-link"
          href="#calculate"
          onClick={(event) => {
            event.preventDefault()
            document.querySelector('#calculate')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Adjust your split <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </div>
      <div className="checklist-panel">
        <div className="checklist-heading">
          <div>
            <p className="mini-label">Your payday checklist</p>
            <h3>Set up these transfers</h3>
          </div>
          <span>{summary.rows.length} steps</span>
        </div>
        <ol className="transfer-list">
          {summary.rows.map((row) => (
            <li key={row.id}>
              <span className="check-icon" aria-hidden="true">
                <Check size={15} strokeWidth={2.4} />
              </span>
              <span className="transfer-name">{row.name}</span>
              <strong>{formatAmount(row.amount)}</strong>
            </li>
          ))}
        </ol>
        {summary.remaining.amount > 0 && !summary.remaining.isLargePositive ? (
          <p className="checklist-footnote">
            {formatAmount(summary.remaining.amount)} remains available for a buffer.
          </p>
        ) : null}
      </div>
    </div>
  )
}
