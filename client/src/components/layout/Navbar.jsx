import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Menu, X, Sun, Moon, ChevronDown, Zap, Cog, FlaskConical, Cpu, Users, Building2, FlaskConical as LabIcon } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { RESEARCH_CENTERS } from '../../data/labs'

const CENTER_ICONS = { Zap, Cog, FlaskConical, Cpu, Users, Building2 }

function isActive(href, location) {
  if (href === '/') return location.pathname === '/'
  return location.pathname.startsWith(href.split('#')[0])
}

/* ── Two-panel mega dropdown ─────────────────────────────── */
function MegaDropdown({ onClose }) {
  const { t, i18n } = useTranslation()
  const isRo = i18n.language === 'ro'
  const [hoveredCenter, setHoveredCenter] = useState(RESEARCH_CENTERS[0])

  const labs = hoveredCenter?.labs ?? []
  const centerAccent = hoveredCenter?.accentHex ?? '#3e92cc'

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-[1100] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-gray-800 overflow-hidden"
      style={{ minWidth: '660px' }}
    >
      <div className="flex">
        {/* Left panel: centers */}
        <div className="w-56 border-r border-slate-100 dark:border-gray-800 py-3 flex-shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-incesa-accent px-4 mb-2">
            {t('nav.research')}
          </p>
          {RESEARCH_CENTERS.map(center => {
            const Icon = CENTER_ICONS[center.icon] ?? FlaskConical
            const name = isRo ? center.ro.name : center.en.name
            const abbr = isRo ? center.ro.abbr : center.en.abbr
            const isHovered = hoveredCenter?.slug === center.slug
            return (
              <div
                key={center.slug}
                onMouseEnter={() => setHoveredCenter(center)}
                className={`flex items-center gap-2.5 px-3 py-2.5 mx-1 rounded-xl cursor-pointer transition-colors group ${
                  isHovered
                    ? 'bg-incesa-light dark:bg-gray-800'
                    : 'hover:bg-incesa-light dark:hover:bg-gray-800'
                }`}
              >
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ background: isHovered ? `${center.accentHex}25` : undefined }}
                >
                  <Icon
                    className="w-3.5 h-3.5 transition-colors"
                    style={{ color: isHovered ? center.accentHex : undefined }}
                  />
                </span>
                <div className="min-w-0">
                  <p className={`text-xs font-semibold leading-snug truncate transition-colors ${isHovered ? 'text-incesa-blue dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                    {abbr}
                  </p>
                </div>
                <ChevronDown className="w-3 h-3 -rotate-90 text-slate-300 dark:text-slate-600 ml-auto flex-shrink-0" />
              </div>
            )
          })}
        </div>

        {/* Right panel: labs for hovered center */}
        <div className="flex-1 py-3 px-4 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredCenter?.slug}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {/* Center header */}
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-0.5" style={{ color: centerAccent }}>
                    {isRo ? hoveredCenter?.ro?.abbr : hoveredCenter?.en?.abbr}
                  </p>
                  <Link
                    to={`/research/${hoveredCenter?.slug}`}
                    onClick={onClose}
                    className="text-sm font-bold text-incesa-blue dark:text-white hover:text-incesa-accent dark:hover:text-incesa-accent transition-colors leading-snug"
                  >
                    {isRo ? hoveredCenter?.ro?.name : hoveredCenter?.en?.name}
                  </Link>
                </div>
                <Link
                  to={`/research/${hoveredCenter?.slug}`}
                  onClick={onClose}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors hover:bg-incesa-light dark:hover:bg-gray-800"
                  style={{ color: centerAccent, borderColor: `${centerAccent}35` }}
                >
                  {isRo ? 'Centrul →' : 'Center →'}
                </Link>
              </div>

              {/* Labs list */}
              <div className="space-y-0.5">
                {labs.map(lab => {
                  const labName = isRo ? lab.ro.name : lab.en.name
                  return (
                    <Link
                      key={lab.slug}
                      to={`/research/${hoveredCenter?.slug}/labs/${lab.slug}`}
                      onClick={onClose}
                      className="flex items-start gap-2.5 px-2.5 py-2 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:bg-incesa-light dark:hover:bg-gray-800 hover:text-incesa-blue dark:hover:text-white transition-colors group"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ background: centerAccent }}
                      />
                      <span className="leading-snug line-clamp-2">{labName}</span>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-100 dark:border-gray-800 px-3 py-2 flex gap-1">
        <Link
          to="/research"
          onClick={onClose}
          className="flex-1 text-center px-2 py-1.5 rounded-xl text-xs font-semibold text-incesa-accent hover:bg-incesa-light dark:hover:bg-gray-800 transition-colors"
        >
          {isRo ? 'Prezentare Generală' : 'Overview'}
        </Link>
        <Link
          to="/research/labs"
          onClick={onClose}
          className="flex-1 text-center px-2 py-1.5 rounded-xl text-xs font-semibold text-incesa-accent hover:bg-incesa-light dark:hover:bg-gray-800 transition-colors"
        >
          {isRo ? 'Toate Laboratoarele' : 'All Labs'}
        </Link>
        <Link
          to="/research/projects"
          onClick={onClose}
          className="flex-1 text-center px-2 py-1.5 rounded-xl text-xs font-semibold text-incesa-accent hover:bg-incesa-light dark:hover:bg-gray-800 transition-colors"
        >
          {isRo ? 'Proiecte' : 'Projects'}
        </Link>
        <Link
          to="/simira"
          onClick={onClose}
          className="flex-1 text-center px-2 py-1.5 rounded-xl text-xs font-bold text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors inline-flex items-center justify-center gap-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          SIMIRA
        </Link>
      </div>
    </motion.div>
  )
}

const NAV_ITEMS = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.research', href: '/research', mega: true },
  { key: 'nav.ctt', href: '/ctt' },
  { key: 'nav.partners', href: '/partners' },
  { key: 'nav.news', href: '/news' },
  { key: 'nav.contact', href: '/contact' },
]

function NavItem({ item, location }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = isActive(item.href, location)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  if (!item.mega) {
    return (
      <Link
        to={item.href}
        className={`relative inline-flex items-center font-medium text-sm transition-colors duration-200 ${
          active ? 'text-incesa-accent' : 'text-white/85 hover:text-white'
        }`}
      >
        {t(item.key)}
        {active && (
          <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-incesa-accent rounded-full" />
        )}
      </Link>
    )
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`relative inline-flex items-center gap-1 font-medium text-sm transition-colors duration-200 cursor-pointer ${
          active ? 'text-incesa-accent' : 'text-white/85 hover:text-white'
        }`}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        {t(item.key)}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.span>
        {active && (
          <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-incesa-accent rounded-full" />
        )}
      </button>
      <AnimatePresence>
        {open && <MegaDropdown onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileResearchOpen, setMobileResearchOpen] = useState(false)
  const [mobileCenterOpen, setMobileCenterOpen] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()

  const rawHeight = useTransform(scrollY, [0, 150], [72, 56])
  const navHeight = useSpring(rawHeight, { stiffness: 260, damping: 32 })
  const progressOpacity = useTransform(scrollY, [0, 80], [0, 1])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'ro' : 'en')
  const isRo = i18n.language === 'ro'

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[1000] transition-[background-color,backdrop-filter,box-shadow] duration-500 ${
          scrolled
            ? 'bg-incesa-blue/96 backdrop-blur-md shadow-xl shadow-incesa-blue-dark/40'
            : 'bg-gradient-to-b from-black/40 to-transparent'
        }`}
      >
        <motion.nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
          style={{ height: navHeight }}
          aria-label="Main navigation"
        >
          {/* INCESA Logo */}
          <Link to="/" className="flex-shrink-0 group flex items-center gap-2.5">
            <img src="/images/incesa-logo-web.svg" alt="INCESA" style={{ height: '36px', width: 'auto' }} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_ITEMS.map(item => (
              <NavItem key={item.key} item={item} location={location} />
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer px-2 py-1"
            >
              {t('nav.langLabel')}
            </button>
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={toggleLang} className="text-white/80 hover:text-white text-sm font-medium cursor-pointer px-2 py-1">
              {t('nav.langLabel')}
            </button>
            <button onClick={toggleTheme} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white cursor-pointer">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="w-9 h-9 flex items-center justify-center text-white cursor-pointer"
              aria-label={t('nav.openMenu')}
            >
              <Menu size={22} />
            </button>
          </div>
        </motion.nav>

        {/* Scroll progress */}
        <motion.div
          className="absolute bottom-0 inset-x-0 h-[2px] bg-incesa-accent origin-left"
          style={{ scaleX: scrollYProgress, opacity: progressOpacity }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[1050] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="fixed inset-y-0 right-0 w-full max-w-sm z-[1100] flex flex-col bg-incesa-blue shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <img src="/images/incesa-logo-web.svg" alt="INCESA" style={{ height: '28px', width: 'auto' }} />
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white cursor-pointer" aria-label={t('nav.closeMenu')}>
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {NAV_ITEMS.map(item => {
                  if (!item.mega) {
                    return (
                      <Link
                        key={item.key}
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center px-3 py-3 rounded-xl font-medium text-base transition-colors ${
                          isActive(item.href, location)
                            ? 'bg-white/15 text-white'
                            : 'text-white/85 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {t(item.key)}
                      </Link>
                    )
                  }
                  return (
                    <div key={item.key}>
                      <button
                        className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-white/85 hover:text-white hover:bg-white/10 font-medium text-base transition-colors cursor-pointer"
                        onClick={() => setMobileResearchOpen(o => !o)}
                      >
                        {t(item.key)}
                        <motion.span animate={{ rotate: mobileResearchOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileResearchOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden ml-3 pl-3 border-l border-white/20 space-y-0.5 mt-1"
                          >
                            {RESEARCH_CENTERS.map(center => {
                              const Icon = CENTER_ICONS[center.icon] ?? FlaskConical
                              const name = isRo ? center.ro.name : center.en.name
                              const isCenterOpen = mobileCenterOpen === center.slug
                              return (
                                <div key={center.slug}>
                                  <div className="flex items-center">
                                    <Link
                                      to={`/research/${center.slug}`}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex-1 flex items-center gap-2.5 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                      <Icon className="w-3.5 h-3.5 text-incesa-accent-light flex-shrink-0" />
                                      {name}
                                    </Link>
                                    {center.labs.length > 0 && (
                                      <button
                                        onClick={() => setMobileCenterOpen(isCenterOpen ? null : center.slug)}
                                        className="p-2 text-white/40 hover:text-white/70 cursor-pointer"
                                      >
                                        <motion.span animate={{ rotate: isCenterOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                          <ChevronDown className="w-3.5 h-3.5" />
                                        </motion.span>
                                      </button>
                                    )}
                                  </div>
                                  <AnimatePresence initial={false}>
                                    {isCenterOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden ml-4 pl-3 border-l border-white/10 space-y-0.5"
                                      >
                                        {center.labs.map(lab => {
                                          const labName = isRo ? lab.ro.name : lab.en.name
                                          return (
                                            <Link
                                              key={lab.slug}
                                              to={`/research/${center.slug}/labs/${lab.slug}`}
                                              onClick={() => setMobileOpen(false)}
                                              className="flex items-start gap-2 px-3 py-2 text-xs text-white/55 hover:text-white/85 hover:bg-white/8 rounded-lg transition-colors"
                                            >
                                              <span className="w-1 h-1 rounded-full bg-white/40 mt-1.5 flex-shrink-0" />
                                              <span className="leading-snug">{labName}</span>
                                            </Link>
                                          )
                                        })}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              )
                            })}
                            <Link
                              to="/research/labs"
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <FlaskConical className="w-3.5 h-3.5 text-incesa-accent-light flex-shrink-0" />
                              {isRo ? 'Toate Laboratoarele' : 'All Laboratories'}
                            </Link>
                            <Link
                              to="/research/projects"
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <FlaskConical className="w-3.5 h-3.5 text-incesa-accent-light flex-shrink-0" />
                              {isRo ? 'Proiecte' : 'Projects'}
                            </Link>
                            <Link
                              to="/simira"
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              </span>
                              SIMIRA
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
