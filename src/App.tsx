import { useLocalStorage } from 'usehooks-ts'
import { Check, X } from 'lucide-react'
import { AccountStructure } from './components/AccountStructure'
import { AllocationEditor } from './components/AllocationEditor'
import { AllocationVisual } from './components/AllocationVisual'
import { AutomationGuide } from './components/AutomationGuide'
import { PayControls } from './components/PayControls'
import { StepSection } from './components/StepSection'
import {
  addAllocationRow,
  clearAllocations,
  normalizeState,
  removeAllocationRow,
  seedState,
  summarizeAllocations,
  updateAllocationAmount,
  updateAllocationName,
  updateAllocationPercentage,
  updateFrequency,
  updatePay,
} from './lib/calculations'
import { formatMoney } from './lib/formatters'
import type { PayFrequency, PaysplitState } from './types/paysplit'

const STORAGE_KEY = 'paysplit-state-v2'

function App() {
  const [persistedState, setPersistedState] = useLocalStorage<PaysplitState>(
    STORAGE_KEY,
    seedState(),
  )
  const state = normalizeState(persistedState)
  const summary = summarizeAllocations(state)

  const updateState = (nextState: PaysplitState) => setPersistedState(nextState)
  const createRowId = () =>
    `allocation-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

  const handleClear = () => {
    if (
      window.confirm(
        'Remove all accounts from your split? This cannot be undone.',
      )
    ) {
      setPersistedState(clearAllocations(state))
    }
  }

  const handleDefaults = () =>
    setPersistedState({ ...state, rows: seedState().rows })

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Paysplit home">
          <span className="brand-mark">P</span>
          <span>Paysplit</span>
        </a>
        <nav className="main-nav">
          <a href="#calculate">Calculate</a>
          <a href="#accounts">Accounts</a>
          <a href="#automate">Automate</a>
        </nav>
      </header>

      <main id="top">
        <StepSection
          className="calculate-section"
          description="Start with the number that arrives in your account. Set a share for each destination and the rest takes care of itself. The default accounts and percentages are just the RECOMMENDED ones. You can rename them, remove them, or add more. But it is advised that you should have the minimum number of accounts necessary to keep your money organized."
          eyebrow="Make a plan"
          id="calculate"
          number="01"
          title="Calculate your split"
        >
          <div className="calculator-layout">
            <div className="calculator-tool">
              <PayControls
                onClear={handleClear}
                onDefaults={handleDefaults}
                onFrequencyChange={(frequency: PayFrequency) =>
                  updateState(updateFrequency(state, frequency))
                }
                onPayChange={(pay) => updateState(updatePay(state, pay))}
                state={state}
              />
              <div className="allocation-header">
                <AllocationVisual summary={summary} />
              </div>
              <AllocationEditor
                onAdd={() => updateState(addAllocationRow(state, createRowId()))}
                onAmountChange={(rowId, amount) =>
                  updateState(updateAllocationAmount(state, rowId, amount))
                }
                onNameChange={(rowId, name) =>
                  updateState(updateAllocationName(state, rowId, name))
                }
                onPercentageChange={(rowId, percentage) =>
                  updateState(updateAllocationPercentage(state, rowId, percentage))
                }
                onRemove={(rowId) => updateState(removeAllocationRow(state, rowId))}
                summary={summary}
              />
              <div
                className={`remaining-banner ${summary.remaining.isOverAllocated ? 'is-over' : ''} ${summary.remaining.isLargePositive ? 'is-large' : ''}`}
              >
                <div className="remaining-icon" aria-hidden="true">
                  {summary.remaining.isOverAllocated ? <X size={18} /> : <Check size={18} />}
                </div>
                <div>
                  <span>
                    {summary.remaining.isOverAllocated
                      ? 'You have assigned more than your pay'
                      : summary.remaining.isLargePositive
                        ? 'Some of this pay is still unassigned'
                        : summary.remaining.isBalanced
                          ? 'Every dollar has a destination'
                          : ''}
                  </span>
                  <strong>{formatMoney(summary.remaining.amount)} remaining</strong>
                </div>
                <span className="remaining-percentage">
                  {summary.remaining.percentage.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </StepSection>

        <StepSection
          className="accounts-section"
          description="You do not need a dozen accounts. A small handful with clear jobs makes your money easier to see and easier to leave alone."
          eyebrow="Make it visible"
          id="accounts"
          number="02"
          title="Understand your accounts"
        >
          <AccountStructure />
        </StepSection>

        <StepSection
          className="automate-section"
          description="EXTREMELY IMPORTANT: The purpose of this is to set and forget, and automatic payments / transfers is the key to making this work. A few automatic payments setup the day AFTER payday (just incase incoming and outgoing dont overlap perfectly) means your savings plan happens before you get a chance to spend it."
          eyebrow="Make it automatic"
          id="automate"
          number="03"
          title="Automate it"
        >
          <AutomationGuide frequency={state.frequency} summary={summary} />
        </StepSection>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><span className="brand-mark">P</span> Paysplit</div>
        <p>Your split stays on this device. No account, no tracking, no fuss.</p>
        <span className="footer-year">2026</span>
      </footer>
    </div>
  )
}

export default App
