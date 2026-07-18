import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', position: 'relative',
    }}>
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="noise-overlay" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            fontSize: 120, fontWeight: 900, lineHeight: 1,
            letterSpacing: '-0.06em',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 24,
          }}>
            404
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, letterSpacing: '-0.03em' }}>
            Page not found
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 360, margin: '0 auto 40px' }}>
            This page doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
                style={{ padding: '12px 24px' }}
              >
                <Home size={15} /> Go Home
              </motion.button>
            </Link>
            <Link to="/planner">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary"
                style={{ padding: '12px 24px' }}
              >
                Start Planning <ArrowRight size={14} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
