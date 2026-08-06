import { describe, expect, it } from 'vitest'
import {
  addAllocationRow,
  clearAllocations,
  normalizeState,
  removeAllocationRow,
  seedState,
  summarizeAllocations,
  updateAllocationAmount,
  updateAllocationPercentage,
  updatePay,
} from './calculations'

describe('Paysplit calculations', () => {
  it('seeds the example allocation', () => {
    const summary = summarizeAllocations(seedState())

    expect(summary.totalAllocated).toBe(1000)
    expect(summary.remaining.amount).toBe(0)
    expect(summary.rows[0].amount).toBe(400)
  })

  it('derives a row percentage when its amount changes', () => {
    const next = updateAllocationAmount(seedState(), 'pay', 250)
    const card = summarizeAllocations(next).rows[0]

    expect(card.percentage).toBe(25)
    expect(card.amount).toBe(250)
  })

  it('derives a row amount when its percentage changes', () => {
    const next = updateAllocationPercentage(seedState(), 'pay', 22.5)
    const card = summarizeAllocations(next).rows[0]

    expect(card.percentage).toBe(22.5)
    expect(card.amount).toBe(225)
  })

  it('keeps percentages fixed when pay changes', () => {
    const next = updatePay(seedState(), 1200)
    const summary = summarizeAllocations(next)

    expect(summary.rows.map((row) => row.percentage)).toEqual([40, 20, 10, 10, 20])
    expect(summary.rows[0].amount).toBe(480)
    expect(summary.remaining.amount).toBe(0)
  })

  it('does not divide by zero when pay is zero', () => {
    const state = updatePay(seedState(), 0)
    const next = updateAllocationAmount(state, 'pay', 50)
    const summary = summarizeAllocations(next)

    expect(next).toEqual(state)
    expect(summary.rows[0].amount).toBe(0)
    expect(summary.rows[0].percentage).toBe(40)
  })

  it('flags over-allocation and a large positive remainder', () => {
    const overAllocated = updateAllocationPercentage(seedState(), 'pay', 80)
    const underAllocated = updateAllocationPercentage(seedState(), 'pay', 0)

    expect(summarizeAllocations(overAllocated).remaining.isOverAllocated).toBe(true)
    expect(summarizeAllocations(underAllocated).remaining.isLargePositive).toBe(true)
  })

  it('supports add, remove, and malformed-state normalization', () => {
    const added = addAllocationRow(seedState(), 'extra')
    const removed = removeAllocationRow(added, 'extra')
    const normalized = normalizeState({ pay: -20, frequency: 'unknown', rows: [{ name: '  ' }] })

    expect(added.rows).toHaveLength(6)
    expect(removed.rows).toHaveLength(5)
    expect(normalized.pay).toBe(0)
    expect(normalized.frequency).toBe('fortnightly')
    expect(normalized.rows[0].name).toBe('Allocation 1')
  })

  it('clears accounts without changing pay or frequency', () => {
    const state = seedState()
    const cleared = clearAllocations(state)

    expect(cleared.rows).toEqual([])
    expect(cleared.pay).toBe(state.pay)
    expect(cleared.frequency).toBe(state.frequency)
  })
})
