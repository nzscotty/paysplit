export type PayFrequency = 'weekly' | 'fortnightly' | 'monthly'

export type AllocationRow = {
  id: string
  name: string
  percentage: number
}

export type PaysplitState = {
  pay: number
  frequency: PayFrequency
  rows: AllocationRow[]
}

export type DerivedAllocationRow = AllocationRow & {
  amount: number
}

export type RemainingAllocation = {
  amount: number
  percentage: number
  isOverAllocated: boolean
  isLargePositive: boolean
  isBalanced: boolean
}

export type AllocationSummary = {
  rows: DerivedAllocationRow[]
  totalAllocated: number
  allocatedPercentage: number
  remaining: RemainingAllocation
}
