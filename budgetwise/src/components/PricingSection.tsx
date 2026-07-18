import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'For individuals planning personal events.',
    color: '#6366f1',
    cta: 'Get Started',
    popular: false,
    features: [
      '3 events per month',
      'Knapsack & Greedy algorithms',
      '15 vendor database',
      'Basic analytics',
      'Export to PDF',
    ],
  },
  {
    name: 'Pro',
    price: '₹999',
    period: 'per month',
    description: 'For professional event planners and agencies.',
    color: '#6366f1',
    cta: 'Start Free Trial',
    popular: true,
    features: [
      'Unlimited events',
      'Hybrid algorithm mode',
      'Custom vendor database',
      'Advanced analytics & charts',
      'AI recommendations',
      'Team collaboration',
      'Priority support',
      'API access',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large agencies managing 100+ events.',
    color: '#10b981',
    cta: 'Contact Sales',
    popular: false,
    features: [
      'Everything in Pro',
      'White-label solution',
      'Custom algorithm tuning',
      'Dedicated infrastructure',
      'SLA guarantee',
      'Enterprise SSO',
    ],
  },
]

export default function PricingSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
      {plans.map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ y: -6 }}
          style={{
            padding: '32px 28px',
            borderRadius: 20,
            background: plan.popular
              ? 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))'
              : 'var(--glass-bg)',
            border: plan.popular
              ? '1px solid rgba(99,102,241,0.4)'
              : '1px solid var(--glass-border)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: plan.popular ? '0 0 50px rgba(99,102,241,0.12)' : 'none',
          }}
        >
          {plan.popular && (
            <div style={{
              position: 'absolute', top: 20, right: 20,
              padding: '4px 12px', borderRadius: 999,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              fontSize: 10, fontWeight: 700, color: 'white',
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              Most Popular
            </div>
          )}

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>
              {plan.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 40, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
                {plan.price}
              </span>
              <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>/{plan.period}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
              {plan.description}
            </p>
          </div>

          <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {plan.features.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                  background: plan.popular ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Check size={10} color={plan.popular ? '#a5b4fc' : 'var(--text-tertiary)'} strokeWidth={3} />
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{f}</span>
              </div>
            ))}
          </div>

          <Link to="/planner" style={{ display: 'block' }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%', padding: '13px 20px',
                borderRadius: 'var(--radius-full)',
                border: plan.popular ? 'none' : '1px solid var(--glass-border)',
                background: plan.popular
                  ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                  : 'transparent',
                color: plan.popular ? 'white' : 'var(--text-primary)',
                fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: plan.popular ? '0 0 25px rgba(99,102,241,0.3)' : 'none',
              }}
            >
              {plan.cta}
              <ArrowRight size={14} />
            </motion.button>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
