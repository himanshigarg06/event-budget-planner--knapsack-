import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap, Users, MapPin, Calendar, Loader2, Sparkles, Target, Plus, RotateCcw, Search } from 'lucide-react'
import type { EventConfig, EventType, OptimizationMode, Priority, Vendor, VendorCategory } from '../types'
import { formatCurrency, optimize as clientOptimize } from '../utils/optimizer'
import {
  getStoredVendors,
  addVendor as storeAddVendor,
  updateVendor as storeUpdateVendor,
  deleteVendor as storeDeleteVendor,
  toggleVendorAvailability as storeToggleVendor,
  resetVendorsToDefault as storeResetVendors,
} from '../utils/vendorStore'
import VendorCard from '../components/VendorCard'
import VendorModal from '../components/VendorModal'
import ProgressRing from '../components/ProgressRing'

const EVENT_TYPES: EventType[] = ['Wedding', 'Corporate', 'Birthday', 'Conference', 'Festival', 'Graduation']
const eventEmoji: Record<EventType, string> = {
  Wedding: '💍', Corporate: '💼', Birthday: '🎂', Conference: '🎤', Festival: '🎉', Graduation: '🎓',
}

const CATEGORIES: (VendorCategory | 'All')[] = [
  'All',
  'Catering',
  'Photography',
  'Decoration',
  'Entertainment',
  'Technology',
  'Logistics',
  'Hospitality',
]

export default function Planner() {
  const navigate = useNavigate()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [config, setConfig] = useState<EventConfig>({
    eventName: '',
    eventType: 'Wedding',
    budget: 100000,
    guests: 100,
    venue: '',
    date: '',
    priority: 'balanced',
    optimizationMode: 'knapsack',
  })
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<VendorCategory | 'All'>('All')

  useEffect(() => {
    setVendors(getStoredVendors())
  }, [])

  const totalAvailable = vendors.filter(v => v.available).length
  const budgetPercent = Math.min((config.budget / 200000) * 100, 100)

  async function handleOptimize() {
    if (!config.eventName.trim()) return

    setLoading(true)

    try {
      // Calculate locally using dynamic vendor state
      const result = clientOptimize(vendors, config)

      // Fallback/sync to Flask backend if available
      try {
        const response = await fetch("http://127.0.0.1:5000/api/optimize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ budget: config.budget }),
        })
        if (response.ok) {
          const apiResult = await response.json()
          if (apiResult) {
            // merge backend optimization metrics
            result.executionTimeMs = apiResult.executionTimeMs || result.executionTimeMs
          }
        }
      } catch (err) {
        // use client optimization result smoothly
      }

      localStorage.setItem("bw_result", JSON.stringify(result))
      localStorage.setItem("bw_config", JSON.stringify(config))

      navigate("/results")
    } catch (err) {
      console.error(err)
      alert("Unable to process optimization.")
    } finally {
      setLoading(false)
    }
  }

  const update = (key: keyof EventConfig, val: unknown) =>
    setConfig(prev => ({ ...prev, [key]: val }))

  const handleAddVendor = () => {
    setEditingVendor(null)
    setIsModalOpen(true)
  }

  const handleEditVendor = (vendor: Vendor) => {
    setEditingVendor(vendor)
    setIsModalOpen(true)
  }

  const handleSaveVendor = (vendorData: Omit<Vendor, 'id'>) => {
    if (editingVendor) {
      setVendors(storeUpdateVendor(vendors, editingVendor.id, vendorData))
    } else {
      setVendors(storeAddVendor(vendors, vendorData))
    }
  }

  const handleDeleteVendor = (id: string) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      setVendors(storeDeleteVendor(vendors, id))
    }
  }

  const handleToggleVendor = (id: string) => {
    setVendors(storeToggleVendor(vendors, id))
  }

  const handleResetCatalog = () => {
    if (confirm('Reset vendor catalog to original defaults?')) {
      setVendors(storeResetVendors())
    }
  }

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, position: 'relative', background: 'var(--bg-primary)' }}>
      <div className="grid-bg" />
      <div className="orb orb-1" style={{ opacity: 0.5 }} />
      <div className="noise-overlay" />

      <div className="container-wide" style={{ padding: '24px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                Event Planner & Vendor Management
              </span>
              <span className="badge badge-accent" style={{ marginLeft: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
                Workspace
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
              Configure your event, manage vendors (add, edit, select/unselect), and run optimization.
            </p>
          </div>
          <motion.button
            onClick={handleOptimize}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            className="btn-primary"
            style={{ padding: '13px 28px', fontSize: 14, opacity: loading ? 0.8 : 1 }}
          >
            {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Zap size={16} />}
            {loading ? 'Optimizing...' : 'Run Optimization'}
          </motion.button>
        </motion.div>

        {/* 3-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 300px', gap: 20, alignItems: 'start' }}>

          {/* ── LEFT: Config Panel ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {/* Event Details */}
            <div className="glass-panel" style={{ padding: '20px' }}>
              <SectionHeader label="Event Details" icon="📋" />

              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label className="field-label">Event Name</label>
                  <input
                    id="event-name"
                    className="input-field"
                    placeholder="e.g. Sharma Wedding"
                    value={config.eventName}
                    onChange={e => update('eventName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="field-label">Event Type</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {EVENT_TYPES.map(t => (
                      <button
                        key={t}
                        onClick={() => update('eventType', t)}
                        style={{
                          padding: '8px 10px',
                          borderRadius: 10,
                          border: config.eventType === t
                            ? '1px solid var(--accent-border)'
                            : '1px solid var(--glass-border)',
                          background: config.eventType === t
                            ? 'var(--accent-soft)'
                            : 'transparent',
                          color: config.eventType === t ? '#a5b4fc' : 'var(--text-secondary)',
                          fontSize: 12,
                          fontWeight: 500,
                          fontFamily: 'var(--font-sans)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        <span>{eventEmoji[t]}</span> {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="field-label">Budget (₹)</label>
                  <div style={{ marginBottom: 10 }}>
                    <input
                      id="budget-input"
                      type="number"
                      className="input-field"
                      value={config.budget}
                      onChange={e => update('budget', Math.max(0, Number(e.target.value)))}
                      step={5000}
                    />
                  </div>
                  <input
                    type="range"
                    min={10000} max={500000} step={5000}
                    value={config.budget}
                    onChange={e => update('budget', Number(e.target.value))}
                    style={{ accentColor: 'var(--accent)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>₹10K</span>
                    <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600 }}>
                      {formatCurrency(config.budget)}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>₹5L</span>
                  </div>
                </div>

                <div>
                  <label className="field-label">
                    <Users size={11} style={{ display: 'inline', marginRight: 4 }} />
                    Guest Count
                  </label>
                  <input
                    id="guests-input"
                    type="number"
                    className="input-field"
                    value={config.guests}
                    onChange={e => update('guests', Math.max(1, Number(e.target.value)))}
                    min={1}
                  />
                </div>

                <div>
                  <label className="field-label">
                    <MapPin size={11} style={{ display: 'inline', marginRight: 4 }} />
                    Venue
                  </label>
                  <input
                    id="venue-input"
                    className="input-field"
                    placeholder="e.g. The Taj, Mumbai"
                    value={config.venue}
                    onChange={e => update('venue', e.target.value)}
                  />
                </div>

                <div>
                  <label className="field-label">
                    <Calendar size={11} style={{ display: 'inline', marginRight: 4 }} />
                    Event Date
                  </label>
                  <input
                    id="date-input"
                    type="date"
                    className="input-field"
                    value={config.date}
                    onChange={e => update('date', e.target.value)}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>
            </div>

            {/* Optimization Settings */}
            <div className="glass-panel" style={{ padding: '20px' }}>
              <SectionHeader label="Optimization" icon="⚡" />

              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label className="field-label">Algorithm Mode</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {([
                      { id: 'knapsack', label: 'Dynamic Programming', sub: 'Optimal • Slower', color: '#6366f1' },
                      { id: 'greedy', label: 'Greedy Algorithm', sub: 'Fast • Near-optimal', color: '#10b981' },
                      { id: 'hybrid', label: 'Hybrid Mode', sub: 'Best of both', color: '#f59e0b' },
                    ] as { id: OptimizationMode; label: string; sub: string; color: string }[]).map(m => (
                      <button
                        key={m.id}
                        id={`mode-${m.id}`}
                        onClick={() => update('optimizationMode', m.id)}
                        style={{
                          padding: '10px 14px', borderRadius: 12, cursor: 'pointer',
                          border: config.optimizationMode === m.id
                            ? `1px solid ${m.color}50` : '1px solid var(--glass-border)',
                          background: config.optimizationMode === m.id
                            ? `${m.color}12` : 'transparent',
                          display: 'flex', alignItems: 'center', gap: 10,
                          fontFamily: 'var(--font-sans)',
                          transition: 'all var(--transition-fast)',
                          textAlign: 'left',
                        }}
                      >
                        <div style={{
                          width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                          background: config.optimizationMode === m.id ? m.color : 'var(--text-muted)',
                          boxShadow: config.optimizationMode === m.id ? `0 0 6px ${m.color}` : 'none',
                        }} />
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: config.optimizationMode === m.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                            {m.label}
                          </div>
                          <div style={{ fontSize: 10, color: config.optimizationMode === m.id ? m.color : 'var(--text-muted)' }}>
                            {m.sub}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="field-label">Priority</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {([
                      { id: 'balanced', label: 'Balanced', sub: 'Value + Cost ratio' },
                      { id: 'value', label: 'Max Value', sub: 'Best vendors only' },
                      { id: 'cost', label: 'Min Cost', sub: 'Budget-conscious' },
                    ] as { id: Priority; label: string; sub: string }[]).map(p => (
                      <button
                        key={p.id}
                        id={`priority-${p.id}`}
                        onClick={() => update('priority', p.id)}
                        style={{
                          padding: '8px 12px', borderRadius: 10, cursor: 'pointer',
                          border: config.priority === p.id ? '1px solid var(--accent-border)' : '1px solid var(--glass-border)',
                          background: config.priority === p.id ? 'var(--accent-soft)' : 'transparent',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          fontFamily: 'var(--font-sans)',
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        <span style={{ fontSize: 12, fontWeight: 600, color: config.priority === p.id ? '#a5b4fc' : 'var(--text-secondary)' }}>
                          {p.label}
                        </span>
                        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{p.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── CENTER: Vendor Catalog & Management ───────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Vendor Management Header & Toolbar */}
            <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                <div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
                    Vendor Management Catalog
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)', marginLeft: 10 }}>
                    {totalAvailable} selected for optimization · {vendors.length - totalAvailable} unselected
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={handleAddVendor}
                    className="btn-primary"
                    style={{ padding: '8px 14px', fontSize: 12, gap: 5 }}
                  >
                    <Plus size={14} /> Add Vendor
                  </button>
                  <button
                    onClick={handleResetCatalog}
                    className="btn-secondary"
                    style={{ padding: '8px 12px', fontSize: 12, gap: 5 }}
                    title="Reset to default vendor catalog"
                  >
                    <RotateCcw size={13} /> Reset
                  </button>
                </div>
              </div>

              {/* Filters & Search Bar */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                  <Search size={14} color="var(--text-tertiary)" style={{ position: 'absolute', left: 12, top: 12 }} />
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: 34, height: 38, fontSize: 12, width: '100%' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 4 }}>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 20,
                        border: selectedCategory === cat ? '1px solid #6366f1' : '1px solid var(--glass-border)',
                        background: selectedCategory === cat ? 'rgba(99,102,241,0.2)' : 'transparent',
                        color: selectedCategory === cat ? '#a5b4fc' : 'var(--text-secondary)',
                        fontSize: 11,
                        fontWeight: 500,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vendor Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {filteredVendors.map((vendor, i) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  index={i}
                  onToggle={() => handleToggleVendor(vendor.id)}
                  onEdit={() => handleEditVendor(vendor)}
                  onDelete={() => handleDeleteVendor(vendor.id)}
                />
              ))}
            </div>

            {filteredVendors.length === 0 && (
              <div className="glass-panel" style={{ padding: 40, textAlign: 'center', color: 'var(--text-tertiary)' }}>
                <p>No vendors found matching "{searchQuery}".</p>
                <button onClick={handleAddVendor} className="btn-secondary" style={{ marginTop: 10, fontSize: 12 }}>
                  + Add New Vendor
                </button>
              </div>
            )}
          </motion.div>

          {/* Modal */}
          <VendorModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveVendor}
            initialData={editingVendor}
          />

          {/* ── RIGHT: Live Summary ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 90 }}
          >
            {/* Budget ring */}
            <div className="glass-panel" style={{ padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 20 }}>
                Budget Overview
              </div>
              <ProgressRing
                value={budgetPercent}
                size={130}
                strokeWidth={10}
                label={formatCurrency(config.budget)}
                sublabel="Total Budget"
              />
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <BudgetRow label="Vendor Pool" value={`${totalAvailable} of ${vendors.length}`} />
                <BudgetRow label="Min Required" value={formatCurrency(5000)} />
                <BudgetRow label="Max Possible" value={formatCurrency(vendors.reduce((s, v) => s + v.cost, 0))} />
              </div>
            </div>

            {/* Event summary */}
            <div className="glass-panel" style={{ padding: '20px' }}>
              <SectionHeader label="Event Summary" icon="📊" />
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <SummaryRow icon={eventEmoji[config.eventType]} label="Type" value={config.eventType} />
                <SummaryRow icon="👥" label="Guests" value={`${config.guests} people`} />
                <SummaryRow icon="📍" label="Venue" value={config.venue || '—'} />
                <SummaryRow icon="📅" label="Date" value={config.date || '—'} />
                <SummaryRow icon="🧠" label="Algorithm" value={config.optimizationMode === 'knapsack' ? 'Knapsack DP' : config.optimizationMode === 'greedy' ? 'Greedy' : 'Hybrid'} />
              </div>
            </div>

            {/* Tip */}
            <div style={{
              padding: '16px',
              borderRadius: 14,
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              display: 'flex', gap: 12,
            }}>
              <Sparkles size={16} color="#a5b4fc" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {config.optimizationMode === 'knapsack'
                  ? 'Knapsack DP guarantees the globally optimal vendor selection. Best for maximizing total value.'
                  : config.optimizationMode === 'greedy'
                    ? 'Greedy selects by value/cost ratio. Very fast and typically within 5% of optimal.'
                    : 'Hybrid runs both algorithms and picks the better result automatically.'}
              </p>
            </div>

            {/* Optimize CTA */}
            <motion.button
              onClick={handleOptimize}
              disabled={loading || !config.eventName.trim()}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="btn-primary"
              style={{
                width: '100%', padding: '14px 20px', fontSize: 14,
                justifyContent: 'center',
                opacity: !config.eventName.trim() ? 0.6 : 1,
                cursor: !config.eventName.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {loading
                ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Optimizing...</>
                : <><Target size={16} /> Optimize Now</>}
            </motion.button>
            {!config.eventName.trim() && (
              <p style={{ fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'center', marginTop: -8 }}>
                Enter an event name to continue
              </p>
            )}
          </motion.div>

        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

function SectionHeader({ label, icon }: { label: string; icon: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </span>
    </div>
  )
}

function BudgetRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{value}</span>
    </div>
  )
}

function SummaryRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 14, width: 20, textAlign: 'center' }}>{icon}</span>
      <span style={{ fontSize: 11, color: 'var(--text-tertiary)', flex: 1 }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', maxWidth: 120, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {value}
      </span>
    </div>
  )
}
