import { motion } from 'framer-motion'

const algorithms = [
  {
    id: 'knapsack',
    name: 'Dynamic Programming',
    subtitle: 'Knapsack Algorithm',
    color: '#6366f1',
    badge: 'Optimal',
    description: 'Builds a DP table of size (vendors × budget). For each subproblem, computes the maximum value achievable. Backtracks to recover the exact optimal vendor set.',
    complexity: 'O(n × W)',
    guarantee: 'Global Optimum',
    steps: [
      { label: 'Build DP table', code: 'dp[i][w] = max(dp[i-1][w], val + dp[i-1][w-cost])' },
      { label: 'Backtrack selection', code: 'if dp[i][w] ≠ dp[i-1][w] → select vendor[i]' },
      { label: 'Return optimal set', code: 'vendors with maxValue ≤ budget' },
    ],
    pros: ['Globally optimal', 'Consistent results', 'Handles all edge cases'],
    metric: { label: 'Optimality', value: '100%' },
  },
  {
    id: 'greedy',
    name: 'Greedy Algorithm',
    subtitle: 'Value/Cost Ratio',
    color: '#10b981',
    badge: 'Fast',
    description: 'Sorts vendors by value/cost ratio in descending order, then greedily selects the highest-ratio vendors that fit within the remaining budget.',
    complexity: 'O(n log n)',
    guarantee: 'Near-Optimal',
    steps: [
      { label: 'Compute ratios', code: 'ratio = vendor.value / vendor.cost' },
      { label: 'Sort descending', code: 'vendors.sort((a,b) => b.ratio - a.ratio)' },
      { label: 'Greedy pick', code: 'while (remaining ≥ vendor.cost) → select' },
    ],
    pros: ['Lightning fast', 'Low memory', 'Scales infinitely'],
    metric: { label: 'Speed', value: '<1ms' },
  },
]

export default function AlgorithmShowcase() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      {algorithms.map((algo, i) => (
        <motion.div
          key={algo.id}
          initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ y: -4 }}
          style={{
            padding: '32px 28px',
            borderRadius: 20,
            background: 'var(--glass-bg)',
            border: `1px solid ${algo.color}25`,
            transition: 'box-shadow var(--transition-base)',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${algo.color}15, 0 0 0 1px ${algo.color}30`
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none'
          }}
        >
          {/* Background glow */}
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 200, height: 200,
            background: `radial-gradient(circle, ${algo.color}12, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <div style={{
                display: 'inline-flex', padding: '4px 10px', borderRadius: 999,
                background: `${algo.color}18`, border: `1px solid ${algo.color}30`,
                fontSize: 11, fontWeight: 700, color: algo.color,
                textTransform: 'uppercase', letterSpacing: '0.06em',
                marginBottom: 12,
              }}>
                {algo.badge}
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {algo.name}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>{algo.subtitle}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: algo.color, letterSpacing: '-0.03em' }}>
                {algo.metric.value}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {algo.metric.label}
              </div>
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
            {algo.description}
          </p>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {algo.steps.map((step, j) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + j * 0.1 }}
                style={{
                  padding: '10px 14px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ fontSize: 10, color: algo.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                  Step {j + 1} · {step.label}
                </div>
                <code style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'var(--text-secondary)', wordBreak: 'break-all',
                }}>
                  {step.code}
                </code>
              </motion.div>
            ))}
          </div>

          {/* Meta */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{
              flex: 1, padding: '10px 14px', borderRadius: 10,
              background: `${algo.color}0d`, border: `1px solid ${algo.color}20`,
            }}>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Complexity</div>
              <code style={{ fontSize: 14, fontWeight: 700, color: algo.color, fontFamily: 'var(--font-mono)' }}>
                {algo.complexity}
              </code>
            </div>
            <div style={{
              flex: 1, padding: '10px 14px', borderRadius: 10,
              background: `${algo.color}0d`, border: `1px solid ${algo.color}20`,
            }}>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Guarantee</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: algo.color }}>{algo.guarantee}</div>
            </div>
          </div>

          {/* Pros */}
          <div style={{ marginTop: 16, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {algo.pros.map(p => (
              <span key={p} style={{
                padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 500,
                background: `${algo.color}12`, color: algo.color,
                border: `1px solid ${algo.color}25`,
              }}>
                ✓ {p}
              </span>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Hybrid mode banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        style={{
          gridColumn: '1 / -1',
          padding: '24px 28px',
          borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))',
          border: '1px solid rgba(99,102,241,0.25)',
          display: 'flex', alignItems: 'center', gap: 24,
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          boxShadow: '0 0 20px rgba(99,102,241,0.3)',
        }}>
          ⚡
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
            Hybrid Mode — Best of Both
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Runs both algorithms in parallel and picks the winner. Typically 2–8% more efficient than either alone, combining DP's optimality guarantee with Greedy's speed.
          </div>
        </div>
        <div style={{
          marginLeft: 'auto', padding: '8px 16px', borderRadius: 999, flexShrink: 0,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          fontSize: 12, fontWeight: 700, color: 'white',
        }}>
          Recommended
        </div>
      </motion.div>
    </div>
  )
}
