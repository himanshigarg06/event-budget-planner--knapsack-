import type { Vendor, EventConfig, OptimizationResult, Recommendation } from '../types'

// ─── Knapsack (Dynamic Programming) ──────────────────────────────────────
function runKnapsack(vendors: Vendor[], budget: number): Vendor[] {
  const n = vendors.length
  const B = Math.floor(budget / 100) // scale to avoid huge table
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(B + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    const cost = Math.floor(vendors[i - 1].cost / 100)
    const val = vendors[i - 1].value
    for (let w = 0; w <= B; w++) {
      dp[i][w] = dp[i - 1][w]
      if (cost <= w) {
        dp[i][w] = Math.max(dp[i][w], val + dp[i - 1][w - cost])
      }
    }
  }

  // Backtrack
  const selected: Vendor[] = []
  let w = B
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(vendors[i - 1])
      w -= Math.floor(vendors[i - 1].cost / 100)
    }
  }
  return selected.reverse()
}

// ─── Greedy (Value/Cost Ratio) ────────────────────────────────────────────
function runGreedy(vendors: Vendor[], budget: number): Vendor[] {
  const sorted = [...vendors].sort((a, b) => (b.value / b.cost) - (a.value / a.cost))
  let remaining = budget
  const selected: Vendor[] = []
  for (const v of sorted) {
    if (v.available && v.cost <= remaining) {
      selected.push(v)
      remaining -= v.cost
    }
  }
  return selected
}

// ─── Recommendations ─────────────────────────────────────────────────────
function generateRecommendations(
  selected: Vendor[],
  rejected: Vendor[],
  budget: number,
  remaining: number
): Recommendation[] {
  const recs: Recommendation[] = []

  // Check if more budget can be used
  if (remaining > 5000 && rejected.length > 0) {
    const affordable = rejected
      .filter(v => v.cost <= remaining)
      .sort((a, b) => (b.value / b.cost) - (a.value / a.cost))
    if (affordable[0]) {
      recs.push({
        id: 'r1',
        type: 'add',
        message: `Add ${affordable[0].name} within remaining budget for +${affordable[0].value} value points`,
        impact: 'high',
        savings: 0,
      })
    }
  }

  // Category coverage
  const cats = new Set(selected.map(v => v.category))
  if (!cats.has('Photography')) {
    recs.push({
      id: 'r2',
      type: 'add',
      message: 'Consider adding photography — memories are priceless and no plan includes it',
      impact: 'medium',
    })
  }
  if (!cats.has('Catering') && budget > 30000) {
    recs.push({
      id: 'r3',
      type: 'add',
      message: 'Premium catering significantly elevates guest satisfaction',
      impact: 'high',
    })
  }

  // Swap recommendation
  if (selected.length > 0) {
    const lowestRatio = selected.reduce((min, v) =>
      (v.value / v.cost) < (min.value / min.cost) ? v : min, selected[0])
    recs.push({
      id: 'r4',
      type: 'swap',
      message: `${lowestRatio.name} has the lowest efficiency ratio — consider a higher-value alternative`,
      impact: 'low',
      savings: Math.floor(lowestRatio.cost * 0.1),
    })
  }

  return recs.slice(0, 4)
}

// ─── Main Optimizer ───────────────────────────────────────────────────────
export function optimize(vendors: Vendor[], config: EventConfig): OptimizationResult {
  const availableVendors = vendors.filter(v => v.available)
  const start = performance.now()

  let selected: Vendor[]

  if (config.optimizationMode === 'knapsack') {
    selected = runKnapsack(availableVendors, config.budget)
  } else if (config.optimizationMode === 'greedy') {
    selected = runGreedy(availableVendors, config.budget)
  } else {
    // Hybrid: run both and pick better total value
    const ks = runKnapsack(availableVendors, config.budget)
    const gr = runGreedy(availableVendors, config.budget)
    const ksVal = ks.reduce((s, v) => s + v.value, 0)
    const grVal = gr.reduce((s, v) => s + v.value, 0)
    selected = ksVal >= grVal ? ks : gr
  }

  const execTime = performance.now() - start
  const selectedIds = new Set(selected.map(v => v.id))
  const rejected = availableVendors.filter(v => !selectedIds.has(v.id))

  const totalCost = selected.reduce((s, v) => s + v.cost, 0)
  const totalValue = selected.reduce((s, v) => s + v.value, 0)
  const maxPossibleValue = availableVendors.reduce((s, v) => s + v.value, 0)
  const remainingBudget = config.budget - totalCost
  const savingsPercent = Math.round((remainingBudget / config.budget) * 100)
  const optimizationScore = Math.round((totalValue / maxPossibleValue) * 100)
  const efficiency = Math.round((totalValue / (totalCost / 1000)) * 10) / 10

  const recommendations = generateRecommendations(selected, rejected, config.budget, remainingBudget)

  return {
    selectedVendors: selected,
    rejectedVendors: rejected,
    totalCost,
    totalValue,
    remainingBudget,
    optimizationScore,
    savingsPercent,
    executionTimeMs: Math.round(execTime * 100) / 100,
    algorithm: config.optimizationMode,
    efficiency,
    recommendations,
  }
}

export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`
  }
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatCurrencyFull(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
