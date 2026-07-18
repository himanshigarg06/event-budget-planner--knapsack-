import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Star, Award } from 'lucide-react'
import AnimatedCounter from '../components/AnimatedCounter'
import HeroDashboardPreview from '../components/HeroDashboardPreview'
import AlgorithmShowcase from '../components/AlgorithmShowcase'
import FeaturesGrid from '../components/FeaturesGrid'
import PricingSection from '../components/PricingSection'
import FooterSection from '../components/FooterSection'

const fadeUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

const stats = [
  { label: 'Events Planned', value: 12400, suffix: '+' },
  { label: 'Avg Savings', value: 23, suffix: '%', prefix: '' },
  { label: 'Vendors Listed', value: 850, suffix: '+' },
  { label: 'Satisfaction', value: 4.9, suffix: '/5', decimals: 1 },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Wedding Planner',
    company: 'Celestial Events',
    avatar: '👩',
    rating: 5,
    quote: "BudgetWise saved us ₹1.2L on a destination wedding. The knapsack algorithm found the perfect vendor mix we'd never have thought of.",
  },
  {
    name: 'Rahul Mehta',
    role: 'Corporate Events Head',
    company: 'TechCorp India',
    avatar: '👨',
    rating: 5,
    quote: "We've run 40+ corporate events using BudgetWise. The optimization score is eerily accurate and our CFO loves the analytics.",
  },
  {
    name: 'Ananya Singh',
    role: 'Freelance Event Manager',
    company: 'Self-Employed',
    avatar: '👩‍💼',
    rating: 5,
    quote: "The hybrid algorithm mode is genius. It consistently outperforms both greedy and DP individually. This tool is my unfair advantage.",
  },
]

const faqs = [
  {
    q: 'How does the knapsack algorithm optimize my budget?',
    a: 'We model your budget as a 0/1 knapsack problem. Each vendor has a cost and a value score. Our DP algorithm finds the mathematically optimal combination that maximizes total value within your budget — guaranteed optimal, not just good.',
  },
  {
    q: 'What is the difference between Knapsack, Greedy, and Hybrid modes?',
    a: 'Knapsack (DP) guarantees the global optimum but takes slightly longer. Greedy selects vendors by value/cost ratio — faster but may miss the true optimal. Hybrid runs both and picks the winner, giving you best of both worlds.',
  },
  {
    q: 'Can I add my own vendors?',
    a: 'Yes. In the Planner workspace you can add custom vendors with their cost and priority scores. The algorithm will include them in optimization automatically.',
  },
  {
    q: 'Is my event data stored?',
    a: 'All computation happens client-side in your browser using JavaScript. No event data is sent to any server. Your budget details stay completely private.',
  },
  {
    q: 'How accurate are the AI confidence scores?',
    a: 'Confidence scores are computed from historical event data, vendor ratings, and category performance benchmarks. They represent the likelihood that a vendor delivers expected value at the quoted price.',
  },
]

export default function Landing() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="noise-overlay" />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 100, paddingBottom: 60, position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', marginBottom: 32 }}
          >
            <span className="badge badge-accent">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
              Powered by Dynamic Programming & Greedy Algorithms
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="gradient-text">Budget smarter.</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>Plan perfect.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: 20, color: 'var(--text-secondary)', marginTop: 24, maxWidth: 560, margin: '24px auto 0', lineHeight: 1.6 }}
          >
            The only event budget tool that uses algorithmic optimization to
            guarantee you get maximum value from every rupee.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}
          >
            <Link to="/planner">
              <motion.button
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: 15 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Optimizing Free
                <ArrowRight size={16} />
              </motion.button>
            </Link>
            <a href="#algorithm">
              <motion.button
                className="btn-secondary"
                style={{ padding: '14px 28px', fontSize: 15 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                See how it works
              </motion.button>
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 48 }}
          >
            <div style={{ display: 'flex', gap: -8 }}>
              {['👩', '👨', '👩‍💼', '👨‍💼', '👩‍🎤'].map((a, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: `hsl(${i * 40 + 200}, 60%, 25%)`,
                  border: '2px solid var(--bg-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, marginLeft: i === 0 ? 0 : -10,
                }}>
                  {a}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Loved by 12,400+ event planners
              </span>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <HeroDashboardPreview />
      </section>

      {/* ─── Stats ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '40px 0 80px', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="stat-card"
                style={{ textAlign: 'center', padding: '28px 20px' }}
              >
                <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.decimals} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 6, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Algorithm Showcase ─────────────────────────────────────────── */}
      <section id="algorithm" style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="badge badge-accent" style={{ marginBottom: 20 }}>Algorithm Engine</span>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Not guesswork.<br />
              <span className="gradient-text">Pure mathematics.</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Two battle-tested algorithms work together to find the vendor combination that maximizes value within your constraints.
            </p>
          </motion.div>
          <AlgorithmShowcase />
        </div>
      </section>

      {/* ─── Features ───────────────────────────────────────────────────── */}
      <section id="features" style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="badge badge-emerald" style={{ marginBottom: 20 }}>Everything you need</span>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Built for serious<br />
              <span className="gradient-text">event professionals.</span>
            </h2>
          </motion.div>
          <FeaturesGrid />
        </div>
      </section>

      {/* ─── Testimonials ───────────────────────────────────────────────── */}
      <section style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Trusted by planners<br />
              <span className="gradient-text">across India.</span>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="glass-panel"
                style={{ padding: '28px 24px' }}
              >
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'var(--accent-soft)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{t.role} · {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ────────────────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="badge badge-amber" style={{ marginBottom: 20 }}>Pricing</span>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Simple, transparent<br />
              <span className="gradient-text">pricing.</span>
            </h2>
          </motion.div>
          <PricingSection />
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Frequently asked<br />
              <span className="gradient-text">questions.</span>
            </h2>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <motion.div
            {...fadeUp}
            className="glass-panel"
            style={{
              textAlign: 'center',
              padding: '80px 40px',
              background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%), var(--glass-bg)',
              border: '1px solid var(--accent-border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
              width: 300, height: 300,
              background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }} />
            <Award size={40} color="var(--accent)" style={{ marginBottom: 24 }} />
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Your next event.<br />
              <span className="gradient-text">Perfectly optimized.</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 440, margin: '0 auto 40px' }}>
              Join 12,400+ planners who plan smarter with BudgetWise.
              It's free to start.
            </p>
            <Link to="/planner">
              <motion.button
                className="btn-primary"
                style={{ padding: '16px 36px', fontSize: 16 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Planning Now
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      {...fadeUp}
      transition={{ delay: index * 0.05 }}
      className="glass-panel"
      style={{ padding: '20px 24px', cursor: 'pointer', userSelect: 'none' }}
      onClick={() => setOpen(!open)}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{question}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight size={16} color="var(--text-tertiary)" style={{ transform: 'rotate(90deg)' }} />
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0, marginTop: open ? 12 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{answer}</p>
      </motion.div>
    </motion.div>
  )
}


