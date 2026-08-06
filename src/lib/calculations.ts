import type {
  AllocationRow,
  AllocationSummary,
  PayFrequency,
  PaysplitState,
} from '../types/paysplit'

export const seedState = (): PaysplitState => ({
  pay: 1000,
  frequency: 'fortnightly',
  rows: [
    { id: 'pay', name: 'Pay account', percentage: 40 },
    { id: 'card', name: 'Card account', percentage: 20 },
    { id: 'debt-buster', name: 'Debt buster account', percentage: 20 },
    { id: 'short-term', name: 'Short term account', percentage: 10 },
    { id: 'long-term', name: 'Long term account', percentage: 10 },
  ],
})

export const roundMoney = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100

export const roundPercentage = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100

const toFiniteNumber = (value: unknown, fallback = 0): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback

const nonNegative = (value: number): number => Math.max(0, value)

export const normalizeState = (value: unknown): PaysplitState => {
  const candidate = value as Partial<PaysplitState> | null
  const frequency: PayFrequency =
    candidate?.frequency === 'weekly' ||
    candidate?.frequency === 'monthly' ||
    candidate?.frequency === 'fortnightly'
      ? candidate.frequency
      : 'fortnightly'
  const rows = Array.isArray(candidate?.rows)
    ? candidate.rows.map((row, index) => {
        const candidateRow = row as Partial<AllocationRow> | null
        return {
          id:
            typeof candidateRow?.id === 'string' && candidateRow.id.length > 0
              ? candidateRow.id
              : `allocation-${index + 1}`,
          name:
            typeof candidateRow?.name === 'string' && candidateRow.name.trim()
              ? candidateRow.name.trim()
              : `Allocation ${index + 1}`,
          percentage: roundPercentage(
            nonNegative(toFiniteNumber(candidateRow?.percentage)),
          ),
        }
      })
    : seedState().rows

  return {
    pay: roundMoney(nonNegative(toFiniteNumber(candidate?.pay))),
    frequency,
    rows,
  }
}

export const summarizeAllocations = (
  state: PaysplitState,
): AllocationSummary => {
  const pay = roundMoney(nonNegative(state.pay))
  const rows = state.rows.map((row) => ({
    ...row,
    percentage: roundPercentage(nonNegative(row.percentage)),
    amount: roundMoney((pay * nonNegative(row.percentage)) / 100),
  }))
  const totalAllocated = roundMoney(
    rows.reduce((total, row) => total + row.amount, 0),
  )
  const remainingAmount = roundMoney(pay - totalAllocated)
  const remainingPercentage = pay
    ? roundPercentage((remainingAmount / pay) * 100)
    : 0
  const allocatedPercentage = roundPercentage(
    rows.reduce((total, row) => total + row.percentage, 0),
  )

  return {
    rows,
    totalAllocated,
    allocatedPercentage,
    remaining: {
      amount: remainingAmount,
      percentage: remainingPercentage,
      isOverAllocated: remainingAmount < 0,
      isLargePositive: remainingAmount > 0,
      isBalanced: remainingAmount === 0,
    },
  }
}

export const updatePay = (state: PaysplitState, pay: number): PaysplitState => ({
  ...state,
  pay: roundMoney(nonNegative(pay)),
})

export const updateFrequency = (
  state: PaysplitState,
  frequency: PayFrequency,
): PaysplitState => ({ ...state, frequency })

export const updateAllocationName = (
  state: PaysplitState,
  rowId: string,
  name: string,
): PaysplitState => ({
  ...state,
  rows: state.rows.map((row) =>
    row.id === rowId ? { ...row, name } : row,
  ),
})

export const updateAllocationPercentage = (
  state: PaysplitState,
  rowId: string,
  percentage: number,
): PaysplitState => ({
  ...state,
  rows: state.rows.map((row) =>
    row.id === rowId
      ? { ...row, percentage: roundPercentage(nonNegative(percentage)) }
      : row,
  ),
})

export const updateAllocationAmount = (
  state: PaysplitState,
  rowId: string,
  amount: number,
): PaysplitState => {
  if (state.pay <= 0) {
    return state
  }

  const nextPercentage = roundPercentage(
    (nonNegative(amount) / state.pay) * 100,
  )
  return updateAllocationPercentage(state, rowId, nextPercentage)
}

export const addAllocationRow = (
  state: PaysplitState,
  rowId: string,
): PaysplitState => ({
  ...state,
  rows: [
    ...state.rows,
    { id: rowId, name: `New allocation ${state.rows.length + 1}`, percentage: 0 },
  ],
})

export const removeAllocationRow = (
  state: PaysplitState,
  rowId: string,
): PaysplitState => ({
  ...state,
  rows: state.rows.filter((row) => row.id !== rowId),
})

export const clearAllocations = (state: PaysplitState): PaysplitState => ({
  ...state,
  rows: [],
})
