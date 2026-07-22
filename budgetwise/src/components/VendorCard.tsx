import { motion } from 'framer-motion'
import type { Vendor } from '../types'
import { CATEGORY_COLORS } from '../data/vendors'
import { formatCurrency } from '../utils/optimizer'
import { MapPin, Star, Check, Edit2, Trash2, Power } from 'lucide-react'

interface VendorCardProps {
  vendor: Vendor
  selected?: boolean
  rejected?: boolean
  onClick?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onToggle?: () => void
  compact?: boolean
  index?: number
}

export default function VendorCard({
  vendor,
  selected = false,
  rejected = false,
  onClick,
  onEdit,
  onDelete,
  onToggle,
  compact = false,
  index = 0,
}: VendorCardProps) {
  const catColor = CATEGORY_COLORS[vendor.category] || 'var(--accent)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
      whileHover={!rejected ? { y: -3, scale: 1.01 } : {}}
      whileTap={!rejected ? { scale: 0.98 } : {}}
      style={{
        padding: compact ? '14px 16px' : '20px',
        borderRadius: 'var(--radius-lg)',
        border: selected
          ? `1px solid ${catColor}55`
          : '1px solid var(--glass-border)',
        background: selected
          ? `${catColor}0d`
          : 'var(--glass-bg)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        opacity: rejected || !vendor.available ? 0.6 : 1,
        transition: 'all var(--transition-base)',
        boxShadow: selected ? `0 0 25px ${catColor}22` : 'none',
      }}
    >
      {/* Category color bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 3,
        height: '100%',
        background: catColor,
        borderRadius: '4px 0 0 4px',
        opacity: selected ? 1 : 0.4,
        transition: 'opacity var(--transition-base)',
      }} />

      {/* Selected checkmark */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: catColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={12} color="white" strokeWidth={3} />
        </motion.div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, paddingLeft: 8 }}>
        <div style={{
          width: compact ? 36 : 44,
          height: compact ? 36 : 44,
          borderRadius: 12,
          background: `${catColor}20`,
          border: `1px solid ${catColor}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: compact ? 18 : 22,
          flexShrink: 0,
        }}>
          {vendor.image}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: compact ? 13 : 14,
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {vendor.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
            {vendor.category}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginTop: 14,
        paddingLeft: 8,
        flexWrap: 'wrap',
      }}>
        {/* Cost */}
        <div>
          <div style={{ fontSize: compact ? 16 : 18, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {formatCurrency(vendor.cost)}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Cost
          </div>
        </div>

        <div style={{ width: 1, height: 28, background: 'var(--border)' }} />

        {/* Rating */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: 'var(--text-primary)' }}>
              {vendor.rating}
            </span>
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Rating
          </div>
        </div>

        <div style={{ width: 1, height: 28, background: 'var(--border)' }} />

        {/* Distance */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <MapPin size={11} color="var(--text-tertiary)" />
            <span style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: 'var(--text-primary)' }}>
              {vendor.distance}km
            </span>
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Distance
          </div>
        </div>
      </div>

      {!compact && (
        <>
          {/* Confidence + value */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 14,
            paddingLeft: 8,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  AI Confidence
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, color: catColor }}>
                  {vendor.confidence}%
                </span>
              </div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${vendor.confidence}%` }}
                  transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: index * 0.05 + 0.3 }}
                  style={{ height: '100%', background: catColor, borderRadius: 2 }}
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 6, marginTop: 12, paddingLeft: 8, flexWrap: 'wrap' }}>
            {vendor.tags.slice(0, 3).map(tag => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>

          {/* Availability & Actions Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 16,
            paddingTop: 12,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingLeft: 8,
          }}>
            {/* Toggle Availability Switch */}
            {onToggle && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onToggle(); }}
                style={{
                  background: vendor.available ? 'rgba(16,185,129,0.15)' : 'rgba(244,63,94,0.15)',
                  border: vendor.available ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(244,63,94,0.3)',
                  color: vendor.available ? '#34d399' : '#fb7185',
                  padding: '4px 10px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  transition: 'all 0.2s',
                }}
              >
                <Power size={11} />
                {vendor.available ? 'Selected' : 'Unselected'}
              </button>
            )}

            <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
              {onEdit && (
                <button
                  type="button"
                  title="Edit Vendor"
                  onClick={(e) => { e.stopPropagation(); onEdit(); }}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-secondary)',
                    padding: '6px 8px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  <Edit2 size={13} />
                </button>
              )}

              {onDelete && (
                <button
                  type="button"
                  title="Delete Vendor"
                  onClick={(e) => { e.stopPropagation(); onDelete(); }}
                  style={{
                    background: 'rgba(244,63,94,0.1)',
                    border: '1px solid rgba(244,63,94,0.2)',
                    color: '#fb7185',
                    padding: '6px 8px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}

