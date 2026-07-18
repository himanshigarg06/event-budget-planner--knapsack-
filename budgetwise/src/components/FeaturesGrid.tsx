import { motion } from 'framer-motion'
import { Brain, BarChart3, Shield, Zap, GitBranch, Clock, Sparkles, Lock } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Optimization',
    description: 'Dynamic programming knapsack solves the vendor selection problem optimally every time. No guesswork.',
    color: '#6366f1',
    span: 4,
    large: false,
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Live budget allocation charts, efficiency metrics, and ROI breakdowns update as you plan.',
    color: '#8b5cf6',
    span: 4,
    large: false,
  },
  {
    icon: GitBranch,
    title: 'Algorithm Comparison',
    description: 'Run Knapsack vs Greedy side-by-side and see exactly why one outperforms the other for your event.',
    color: '#0ea5e9',
    span: 4,
    large: false,
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Processes all 15 vendors and budget constraints in under 5ms. The algorithm is blazing fast.',
    color: '#10b981',
    span: 3,
    large: false,
  },
  {
    icon: Sparkles,
    title: 'Smart Recommendations',
    description: 'After optimization, our engine suggests swaps, upgrades, and additions to squeeze more value from leftover budget.',
    color: '#ec4899',
    span: 5,
    large: true,
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Everything runs in your browser. Your budget data never leaves your device.',
    color: '#f59e0b',
    span: 4,
    large: false,
  },
  {
    icon: Lock,
    title: 'Confidence Scores',
    description: 'Every vendor has an AI confidence score showing likelihood of delivering expected value.',
    color: '#f43f5e',
    span: 4,
    large: false,
  },
  {
    icon: Clock,
    title: 'Execution Tracking',
    description: 'Precise ms-level tracking shows how long each algorithm took — transparency built in.',
    color: '#6366f1',
    span: 4,
    large: false,
  },
]

export default function FeaturesGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
      {features.map((f, i) => {
        const Icon = f.icon
        return (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{
              gridColumn: `span ${f.span}`,
              padding: f.large ? '32px 28px' : '24px 22px',
              borderRadius: 16,
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.border = `1px solid ${f.color}30`
                ; (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${f.color}12`
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.border = '1px solid var(--glass-border)'
                ; (e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            {/* bg glow */}
            <div style={{
              position: 'absolute', bottom: -30, right: -30,
              width: 120, height: 120,
              background: `radial-gradient(circle, ${f.color}18, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: `${f.color}18`, border: `1px solid ${f.color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 18,
            }}>
              <Icon size={20} color={f.color} />
            </div>

            <div style={{
              fontSize: f.large ? 18 : 15,
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: 10,
            }}>
              {f.title}
            </div>
            <p style={{
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
            }}>
              {f.description}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}
