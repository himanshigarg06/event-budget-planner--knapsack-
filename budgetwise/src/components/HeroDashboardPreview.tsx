import { motion } from 'framer-motion'
import { TrendingUp, Zap } from 'lucide-react'
import { formatCurrency } from '../utils/optimizer'

// Fake live dashboard numbers
const budgetItems = [
  { label: 'Catering', amount: 34000, pct: 42, color: '#6366f1' },
  { label: 'Entertainment', amount: 23000, pct: 28, color: '#8b5cf6' },
  { label: 'Photography', amount: 18000, pct: 22, color: '#ec4899' },
  { label: 'Technology', amount: 6000, pct: 8, color: '#0ea5e9' },
]

const floatingCards = [
  { title: 'Optimization Score', value: '94%', sub: 'vs 68% manual', icon: '⚡', color: '#6366f1', x: -260, y: 40 },
  { title: 'Budget Saved', value: '₹18K', sub: 'this event', icon: '💰', color: '#10b981', x: 220, y: 20 },
  { title: 'Vendors Selected', value: '6 / 15', sub: 'optimal mix', icon: '✓', color: '#f59e0b', x: -240, y: 260 },
  { title: 'Exec Time', value: '2.3ms', sub: 'DP algorithm', icon: '⚡', color: '#ec4899', x: 200, y: 280 },
]

export default function HeroDashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{ position: 'relative', marginTop: 80, width: '100%', maxWidth: 880, margin: '80px auto 0' }}
    >
      {/* Floating cards */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={card.title}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
          style={{
            position: 'absolute',
            left: `calc(50% + ${card.x}px)`,
            top: card.y,
            zIndex: 10,
            transform: 'translateX(-50%)',
          }}
        >
          <div style={{
            background: 'rgba(12,12,24,0.9)',
            border: `1px solid ${card.color}33`,
            borderRadius: 14,
            padding: '12px 16px',
            backdropFilter: 'blur(20px)',
            boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${card.color}22`,
            whiteSpace: 'nowrap',
            minWidth: 140,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 16 }}>{card.icon}</span>
              <span style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                {card.title}
              </span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: card.color, letterSpacing: '-0.03em', lineHeight: 1 }}>
              {card.value}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2 }}>{card.sub}</div>
          </div>
        </motion.div>
      ))}

      {/* Main dashboard card */}
      <div style={{
        background: 'rgba(8,8,16,0.85)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 24,
        overflow: 'hidden',
        backdropFilter: 'blur(40px)',
        boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
        margin: '0 60px',
      }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '14px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
        }}>
          {['#f43f5e', '#f59e0b', '#10b981'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
          <div style={{
            flex: 1, height: 22, borderRadius: 6, marginLeft: 12,
            background: 'rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', paddingLeft: 10,
          }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              budgetwise.app/planner — Wedding · ₹1,20,000
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="pulse-dot" />
            <span style={{ fontSize: 10, color: '#10b981', fontWeight: 600 }}>LIVE</span>
          </div>
        </div>

        {/* Content area */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: 360 }}>
          {/* Budget allocation */}
          <div style={{ padding: '24px 28px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>
                  Budget Allocation
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                  ₹81,000
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>of ₹1,20,000 allocated</div>
              </div>
              <div style={{
                padding: '6px 12px', borderRadius: 8,
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.25)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <TrendingUp size={12} color="#10b981" />
                <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>+18% efficiency</span>
              </div>
            </div>

            {/* Budget bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {budgetItems.map((item, i) => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color }} />
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{item.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{item.pct}%</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 1.2, delay: 0.8 + i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                      style={{ height: '100%', background: item.color, borderRadius: 3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              Selected Vendors
            </div>
            {[
              { name: 'Royal Catering Co.', cat: 'Catering', icon: '🍽️', color: '#6366f1' },
              { name: 'Harmony Live Band', cat: 'Entertainment', icon: '🎵', color: '#8b5cf6' },
              { name: 'Lumière Photography', cat: 'Photography', icon: '📸', color: '#ec4899' },
            ].map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.15 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 10,
                  background: `${v.color}12`,
                  border: `1px solid ${v.color}25`,
                }}
              >
                <span style={{ fontSize: 18 }}>{v.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{v.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{v.cat}</div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ delay: 1.5 + i * 0.2, duration: 0.4 }}
                  style={{
                    marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%',
                    background: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <span style={{ color: 'white', fontSize: 9, fontWeight: 800 }}>✓</span>
                </motion.div>
              </motion.div>
            ))}

            {/* Algo badge */}
            <div style={{
              marginTop: 'auto', padding: '12px 14px', borderRadius: 10,
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Zap size={14} color="#6366f1" />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#a5b4fc' }}>Knapsack DP</div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>Global optimum found in 2.3ms</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow below card */}
      <div style={{
        position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: 100,
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.2), transparent 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }} />
    </motion.div>
  )
}
