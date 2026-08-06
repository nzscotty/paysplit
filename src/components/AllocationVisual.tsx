import type { AllocationSummary } from '../types/paysplit'
import { formatMoney } from '../lib/formatters'

const segmentColors = [
  '#e8694f',
  '#f1ad51',
  '#4e9a85',
  '#4578a9',
  '#7b6da8',
  '#c66c86',
  '#4e8190',
]

type AllocationVisualProps = {
  summary: AllocationSummary
}

export function AllocationVisual({ summary }: AllocationVisualProps) {
  const scale = Math.max(summary.allocatedPercentage, 100)
  let cursor = 0
  const segments = summary.rows.map((row, index) => {
    const start = (cursor / scale) * 100
    cursor += row.percentage
    const end = (cursor / scale) * 100
    return `${segmentColors[index % segmentColors.length]} ${start}% ${end}%`
  })
  if (summary.allocatedPercentage < 100) {
    segments.push(`#e7e0d4 ${(summary.allocatedPercentage / scale) * 100}% 100%`)
  }

  const ringStyle = {
    background: `conic-gradient(${segments.join(', ')})`,
  }
  const remainingPercentage = Math.abs(summary.remaining.percentage).toFixed(0)
  const remainingAmount = formatMoney(Math.abs(summary.remaining.amount))
  const remainingCaption = summary.remaining.isOverAllocated ? 'over' : 'left'

  return (
    <div className="allocation-graph">
      <div
        aria-label={`${remainingPercentage}% ${remainingCaption}, ${remainingAmount}`}
        className={`allocation-ring ${summary.remaining.isOverAllocated ? 'is-over' : ''}`}
        role="img"
        style={ringStyle}
      >
        <div className="allocation-ring-inner">
          <strong>{remainingPercentage}%</strong>
          <span>{remainingAmount}</span>
          <small>{remainingCaption}</small>
        </div>
      </div>
    </div>
  )
}
