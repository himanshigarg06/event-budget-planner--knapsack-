import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Plus } from 'lucide-react'
import type { Vendor, VendorCategory } from '../types'

interface VendorModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (vendorData: Omit<Vendor, 'id'>) => void
  initialData?: Vendor | null
}

const CATEGORIES: VendorCategory[] = [
  'Catering',
  'Photography',
  'Decoration',
  'Entertainment',
  'Technology',
  'Logistics',
  'Hospitality',
]

const EMOJI_OPTIONS = ['🍽️', '📸', '🌸', '🎧', '💡', '🛡️', '🎪', '📺', '🎵', '🌺', '✉️', '🎁', '🎬', '🔊', '🎯', '🚐', '🥂', '⚡']

export default function VendorModal({ isOpen, onClose, onSave, initialData }: VendorModalProps) {
  const [formData, setFormData] = useState<Omit<Vendor, 'id'>>({
    name: '',
    category: 'Catering',
    cost: 15000,
    value: 50,
    rating: 4.5,
    distance: 5.0,
    available: true,
    image: '🍽️',
    description: '',
    confidence: 85,
    tags: [],
  })

  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        cost: initialData.cost,
        value: initialData.value,
        rating: initialData.rating,
        distance: initialData.distance,
        available: initialData.available,
        image: initialData.image || '🍽️',
        description: initialData.description || '',
        confidence: initialData.confidence || 85,
        tags: initialData.tags || [],
      })
    } else {
      setFormData({
        name: '',
        category: 'Catering',
        cost: 15000,
        value: 50,
        rating: 4.5,
        distance: 5.0,
        available: true,
        image: '🍽️',
        description: '',
        confidence: 85,
        tags: ['Verified', 'Popular'],
      })
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return
    onSave(formData)
    onClose()
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }))
  }

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        padding: 20,
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{
            background: 'var(--bg-card, #0f172a)',
            border: '1px solid var(--glass-border, rgba(255,255,255,0.1))',
            borderRadius: 16,
            padding: 28,
            width: '100%',
            maxWidth: 580,
            maxHeight: '90vh',
            overflowY: 'auto',
            color: 'var(--text-primary, #f8fafc)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                {initialData ? 'Edit Vendor Details' : 'Add New Vendor'}
              </h2>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: '4px 0 0' }}>
                {initialData ? 'Update pricing, value score, and catalog settings' : 'Create a new vendor to add to your optimization pool'}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-tertiary)',
                cursor: 'pointer',
                padding: 6,
                borderRadius: 8,
              }}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Vendor Name & Emoji */}
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 12 }}>
              <div>
                <label className="field-label" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Icon
                </label>
                <select
                  value={formData.image}
                  onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="input-field"
                  style={{ fontSize: 18, textAlign: 'center', height: 42 }}
                >
                  {EMOJI_OPTIONS.map(emoji => (
                    <option key={emoji} value={emoji}>{emoji}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="field-label" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Vendor Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Banquet Catering"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  style={{ width: '100%', height: 42 }}
                />
              </div>
            </div>

            {/* Category & Cost */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label className="field-label" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as VendorCategory }))}
                  className="input-field"
                  style={{ width: '100%', height: 42 }}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="field-label" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Cost (₹) *
                </label>
                <input
                  type="number"
                  required
                  min={500}
                  step={500}
                  value={formData.cost}
                  onChange={e => setFormData(prev => ({ ...prev, cost: Number(e.target.value) }))}
                  className="input-field"
                  style={{ width: '100%', height: 42 }}
                />
              </div>
            </div>

            {/* Value Score (Quality) & Rating */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label className="field-label" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Value Score (1–100)
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={formData.value}
                  onChange={e => setFormData(prev => ({ ...prev, value: Number(e.target.value) }))}
                  className="input-field"
                  style={{ width: '100%', height: 42 }}
                />
              </div>

              <div>
                <label className="field-label" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Rating (1.0–5.0)
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  step={0.1}
                  value={formData.rating}
                  onChange={e => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                  className="input-field"
                  style={{ width: '100%', height: 42 }}
                />
              </div>
            </div>

            {/* Distance & Availability */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'center' }}>
              <div>
                <label className="field-label" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Distance (km)
                </label>
                <input
                  type="number"
                  min={0.1}
                  step={0.1}
                  value={formData.distance}
                  onChange={e => setFormData(prev => ({ ...prev, distance: Number(e.target.value) }))}
                  className="input-field"
                  style={{ width: '100%', height: 42 }}
                />
              </div>

              <div style={{ paddingTop: 18 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13 }}>
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={e => setFormData(prev => ({ ...prev, available: e.target.checked }))}
                    style={{ width: 18, height: 18, accentColor: '#6366f1' }}
                  />
                  <span>Mark as Available for Optimization</span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="field-label" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Description
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary of services provided..."
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="input-field"
                style={{ width: '100%', padding: '10px 12px', resize: 'vertical' }}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="field-label" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Feature Tags
              </label>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input
                  type="text"
                  placeholder="e.g. 5-Star, Live Station"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                  className="input-field"
                  style={{ flex: 1, height: 38 }}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: 12 }}
                >
                  <Plus size={14} /> Add Tag
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(99,102,241,0.15)',
                      border: '1px solid rgba(99,102,241,0.3)',
                      color: '#a5b4fc',
                      fontSize: 11,
                      padding: '3px 8px',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    {tag}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeTag(tag)} />
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                style={{ padding: '10px 18px', fontSize: 13 }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '10px 22px', fontSize: 13, gap: 6 }}
              >
                <Save size={15} />
                {initialData ? 'Save Changes' : 'Create Vendor'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
