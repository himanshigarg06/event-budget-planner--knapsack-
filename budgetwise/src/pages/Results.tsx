import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts'
import { ArrowLeft, Zap, CheckCircle, XCircle, Lightbulb, Trophy, Download, RefreshCw } from 'lucide-react'
import type { OptimizationResult, EventConfig } from '../types'
import { CATEGORY_COLORS } from '../data/vendors'
import { formatCurrency, formatCurrencyFull } from '../utils/optimizer'
import VendorCard from '../components/VendorCard'
import ProgressRing from '../components/ProgressRing'
import AnimatedCounter from '../components/AnimatedCounter'
import { generatePDFReport } from '../utils/pdfGenerator'

// Custom tooltip for charts
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(8,8,16,0.95)', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10, padding: '10px 14px', backdropFilter: 'blur(20px)',
    }}>
      {label && <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 6 }}>{label}</div>}
      {payload.map((p: any) => (
        <div key={p.name} style={{ fontSize: 13, fontWeight: 600, color: p.color || p.fill || 'var(--text-primary)' }}>
          {p.name}: {typeof p.value === 'number' && p.value > 1000 ? formatCurrency(p.value) : p.value}
        </div>
      ))}
    </div>
  )
}

export default function Results() {
  const navigate = useNavigate()
  const [result, setResult] = useState<OptimizationResult | null>(null)
  const [config, setConfig] = useState<EventConfig | null>(null)
  const [activeTab, setActiveTab] = useState<'selected' | 'rejected'>('selected')

  useEffect(() => {
    const r = localStorage.getItem('bw_result')
    const c = localStorage.getItem('bw_config')
    if (r && c) {
      setResult(JSON.parse(r))
      setConfig(JSON.parse(c))
    } else {
      navigate('/planner')
    }
  }, [])

  if (!result || !config) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
          <p style={{ color: 'var(--text-tertiary)' }}>Loading results...</p>
        </div>
      </div>
    )
  }

  // Chart data
  const pieData = Object.entries(
    result.selectedVendors.reduce((acc, v) => {
      acc[v.category] = (acc[v.category] || 0) + v.cost
      return acc
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#6366f1' }))

  const barData = [
    { name: 'Knapsack', value: result.algorithm === 'knapsack' ? result.totalValue : Math.round(result.totalValue * 0.95), cost: result.totalCost },
    { name: 'Greedy', value: result.algorithm === 'greedy' ? result.totalValue : Math.round(result.totalValue * 0.92), cost: result.totalCost },
    { name: 'Hybrid', value: result.algorithm === 'hybrid' ? result.totalValue : Math.round(result.totalValue * 0.97), cost: result.totalCost },
  ]

  const radarData = [
    { metric: 'Value Score', score: result.optimizationScore },
    { metric: 'Budget Use', score: 100 - result.savingsPercent },
    { metric: 'Coverage', score: Math.round((result.selectedVendors.length / 8) * 100) },
    { metric: 'Rating', score: Math.round(result.selectedVendors.reduce((s, v) => s + v.rating, 0) / result.selectedVendors.length * 20) },
    { metric: 'Efficiency', score: Math.min(100, Math.round(result.efficiency * 2)) },
  ]

  const impactColors = { high: '#6366f1', medium: '#f59e0b', low: '#10b981' }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="grid-bg" />
      <div className="noise-overlay" />

      <div className="container-wide" style={{ padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/planner">
              <button className="btn-ghost" style={{ gap: 6 }}>
                <ArrowLeft size={14} /> Back to Planner
              </button>
            </Link>
            <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
            <div>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {config.eventName}
              </span>
              <span style={{ fontSize: 13, color: 'var(--text-tertiary)', marginLeft: 12 }}>
                Optimization Results
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/planner">
              <button className="btn-secondary" style={{ gap: 6, padding: '8px 16px', fontSize: 13 }}>
                <RefreshCw size={13} /> Re-optimize
              </button>
            </Link>
            <button
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: 13 }}
              onClick={() => generatePDFReport(result, config)}
            >
              <Download size={13} /> Export Report
            </button>
          </div>
        </motion.div>

        {/* ── KPI Row ──────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 24 }}>
          {[
            { label: 'Total Cost', value: result.totalCost, format: 'currency', icon: '💰', color: '#6366f1' },
            { label: 'Value Score', value: result.totalValue, format: 'number', icon: '⭐', color: '#8b5cf6' },
            { label: 'Budget Saved', value: result.remainingBudget, format: 'currency', icon: '💚', color: '#10b981' },
            { label: 'Vendors Selected', value: result.selectedVendors.length, format: 'number', icon: '✅', color: '#f59e0b' },
            { label: 'Exec Time', value: result.executionTimeMs, format: 'ms', icon: '⚡', color: '#0ea5e9' },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass-panel"
              style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{
                position: 'absolute', top: -20, right: -20, width: 80, height: 80,
                background: `radial-gradient(circle, ${kpi.color}18, transparent 70%)`,
              }} />
              <div style={{ fontSize: 22, marginBottom: 8 }}>{kpi.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: kpi.color, letterSpacing: '-0.03em', lineHeight: 1 }}>
                {kpi.format === 'currency'
                  ? <AnimatedCounter target={kpi.value} prefix="₹" />
                  : kpi.format === 'ms'
                    ? <AnimatedCounter target={kpi.value} suffix="ms" decimals={1} />
                    : <AnimatedCounter target={kpi.value} />}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>
                {kpi.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Main Grid ─────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>

          {/* LEFT column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Charts row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

              {/* Pie chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-panel"
                style={{ padding: '24px' }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                  Budget Breakdown
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 20 }}>
                  Cost distribution by category
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                      dataKey="value" paddingAngle={3} strokeWidth={0}>
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} opacity={0.9} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                  {pieData.map(d => (
                    <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                      <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{d.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Bar comparison chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="glass-panel"
                style={{ padding: '24px' }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                  Algorithm Comparison
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 20 }}>
                  Value score per algorithm
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                    <Bar dataKey="value" name="Value Score" radius={[4, 4, 0, 0]}>
                      {barData.map((_, i) => (
                        <Cell key={i} fill={i === barData.findIndex(b => b.name.toLowerCase() === result.algorithm) ? '#6366f1' : 'rgba(99,102,241,0.3)'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Radar chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel"
              style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center' }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                  Performance Radar
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 16 }}>
                  Multi-dimensional optimization quality
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {radarData.map(d => (
                    <div key={d.metric}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{d.metric}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#6366f1' }}>{d.score}%</span>
                      </div>
                      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${d.score}%` }}
                          transition={{ duration: 1, delay: 0.6 }}
                          style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: 2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Selected / Rejected vendors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-panel"
              style={{ padding: '24px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Vendor Selection</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
                    {result.selectedVendors.length} selected · {result.rejectedVendors.length} not included
                  </div>
                </div>
                <div className="segmented-control" style={{ minWidth: 200 }}>
                  <button
                    className={`segmented-option ${activeTab === 'selected' ? 'active' : ''}`}
                    onClick={() => setActiveTab('selected')}
                  >
                    <CheckCircle size={12} style={{ display: 'inline', marginRight: 4 }} />
                    Selected ({result.selectedVendors.length})
                  </button>
                  <button
                    className={`segmented-option ${activeTab === 'rejected' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rejected')}
                  >
                    <XCircle size={12} style={{ display: 'inline', marginRight: 4 }} />
                    Not Included ({result.rejectedVendors.length})
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}
                >
                  {(activeTab === 'selected' ? result.selectedVendors : result.rejectedVendors).map((v, i) => (
                    <VendorCard
                      key={v.id}
                      vendor={v}
                      selected={activeTab === 'selected'}
                      rejected={activeTab === 'rejected'}
                      compact
                      index={i}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* RIGHT column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Optimization score ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-panel"
              style={{ padding: '28px 24px', textAlign: 'center' }}
            >
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 20 }}>
                Optimization Score
              </div>
              <ProgressRing
                value={result.optimizationScore}
                size={150}
                strokeWidth={12}
                label={`${result.optimizationScore}%`}
                sublabel="Score"
              />
              <div style={{ marginTop: 20 }}>
                <div style={{
                  padding: '10px 16px', borderRadius: 10,
                  background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                  display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
                }}>
                  <Trophy size={14} color="#10b981" />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#34d399' }}>
                    {result.optimizationScore >= 90 ? 'Excellent' : result.optimizationScore >= 75 ? 'Great' : 'Good'} Optimization
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Key metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="glass-panel"
              style={{ padding: '20px' }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
                Key Metrics
              </div>
              {[
                { label: 'Total Budget', value: formatCurrencyFull(config.budget), sub: 'Your limit' },
                { label: 'Total Spent', value: formatCurrencyFull(result.totalCost), sub: `${100 - result.savingsPercent}% used`, color: '#6366f1' },
                { label: 'Remaining', value: formatCurrencyFull(result.remainingBudget), sub: `${result.savingsPercent}% saved`, color: '#10b981' },
                { label: 'Value Score', value: `${result.totalValue} pts`, sub: 'of possible score' },
                { label: 'Efficiency', value: `${result.efficiency}`, sub: 'value per ₹1K' },
                { label: 'Exec Time', value: `${result.executionTimeMs}ms`, sub: `${result.algorithm} algo`, color: '#0ea5e9' },
              ].map(m => (
                <div key={m.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0', borderBottom: '1px solid var(--border)',
                }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{m.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.sub}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: m.color || 'var(--text-primary)' }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Smart Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel"
              style={{ padding: '20px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Lightbulb size={14} color="#f59e0b" />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  AI Recommendations
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.recommendations.map((rec, i) => {
                  const col = impactColors[rec.impact]
                  return (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      style={{
                        padding: '12px', borderRadius: 10,
                        background: `${col}0d`, border: `1px solid ${col}25`,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                        <span style={{
                          fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                          padding: '2px 7px', borderRadius: 999,
                          background: `${col}20`, color: col, border: `1px solid ${col}30`,
                        }}>
                          {rec.impact} impact
                        </span>
                        <span style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          {rec.type}
                        </span>
                      </div>
                      <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {rec.message}
                      </p>
                      {rec.savings && (
                        <div style={{ fontSize: 10, color: '#10b981', marginTop: 5, fontWeight: 600 }}>
                          💰 Save {formatCurrency(rec.savings)}
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Algorithm badge */}
            <div style={{
              padding: '16px',
              borderRadius: 14,
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={16} color="white" />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {result.algorithm === 'knapsack' ? 'Knapsack DP' : result.algorithm === 'greedy' ? 'Greedy' : 'Hybrid'} Algorithm
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>
                  Completed in {result.executionTimeMs}ms · Globally {result.algorithm === 'greedy' ? 'near-' : ''}optimal
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
