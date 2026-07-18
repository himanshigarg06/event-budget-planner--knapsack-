import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Zap, LayoutDashboard, Settings, ChevronRight } from 'lucide-react'

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#algorithm' },
  { label: 'Pricing', href: '/#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'calc(100% - 48px)',
        maxWidth: 1100,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          borderRadius: 'var(--radius-full)',
          background: scrolled
            ? 'rgba(8, 8, 16, 0.85)'
            : 'rgba(8, 8, 16, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          transition: 'all var(--transition-base)',
          boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 15px rgba(99,102,241,0.4)',
          }}>
            <Zap size={16} color="white" fill="white" />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            BudgetWise
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {isLanding && navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                padding: '6px 14px',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                borderRadius: 'var(--radius-full)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.color = 'var(--text-primary)'
                  ; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.color = 'var(--text-secondary)'
                  ; (e.target as HTMLElement).style.background = 'transparent'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {location.pathname !== '/' && (
            <Link
              to="/"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)',
                textDecoration: 'none', padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              <LayoutDashboard size={14} />
              Home
            </Link>
          )}
          {location.pathname !== '/planner' && (
            <Link to="/planner">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: 13, borderRadius: 'var(--radius-full)' }}
              >
                Start Planning
                <ChevronRight size={14} />
              </motion.button>
            </Link>
          )}
          {location.pathname === '/planner' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
              <Settings size={14} />
              Event Planner
            </span>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
