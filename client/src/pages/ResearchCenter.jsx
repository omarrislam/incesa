import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Zap, Cog, FlaskConical, Cpu, Users, Building2, Mail, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import { RESEARCH_CENTERS } from '../data/labs'

const ICON_MAP = { Zap, Cog, FlaskConical, Cpu, Users, Building2 }

function FadeUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export default function ResearchCenter() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const isRo = i18n.language === 'ro'

  const center = RESEARCH_CENTERS.find(c => c.slug === slug)
  if (!center) return <Navigate to="/research" replace />

  const Icon = ICON_MAP[center.icon] ?? FlaskConical
  const name = isRo ? center.ro.name : center.en.name
  const description = isRo ? center.ro.description : center.en.description
  const abbr = isRo ? center.ro.abbr : center.en.abbr

  const currentIndex = RESEARCH_CENTERS.findIndex(c => c.slug === slug)
  const prev = RESEARCH_CENTERS[currentIndex - 1]
  const next = RESEARCH_CENTERS[currentIndex + 1]

  return (
    <PageWrapper>
      <Helmet>
        <title>{name} — INCESA Research Center</title>
        <meta name="description" content={description} />
      </Helmet>

      {/* Hero — unique per center */}
      <section
        className="relative pt-36 pb-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060e2e 0%, #0a2463 100%)' }}
      >
        <div className="absolute inset-0 grid-dots-dark opacity-40" aria-hidden="true" />

        {/* Circuit board background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(/images/circuit-bg.webp)' }}
          aria-hidden="true"
        />

        {/* Center-specific colored glow — unique per center */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: '30%', left: '60%', width: 480, height: 480,
            background: `radial-gradient(circle, ${center.glowHex} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute pointer-events-none"
          style={{
            bottom: '10%', left: '10%', width: 280, height: 280,
            background: `radial-gradient(circle, ${center.glowHex} 0%, transparent 70%)`,
            filter: 'blur(50px)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          aria-hidden="true"
        />

        <div className="relative z-10 container-padded">
          <Link
            to="/research"
            className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm font-medium mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {isRo ? 'Toate Centrele' : 'All Centers'}
          </Link>

          <div className="flex items-start gap-6">
            {/* Center icon with unique accent color */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 w-18 h-18 rounded-2xl border border-white/15 flex items-center justify-center"
              style={{
                width: 72, height: 72,
                background: `linear-gradient(135deg, ${center.accentHex}22, ${center.accentHex}44)`,
                boxShadow: `0 0 24px ${center.accentHex}44`,
              }}
            >
              <Icon className="w-9 h-9" style={{ color: center.accentHex }} />
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-xs font-bold uppercase tracking-[0.22em] mb-2"
                style={{ color: center.accentHex }}
              >
                {abbr} · INCESA {isRo ? 'Centru de Cercetare' : 'Research Center'}
              </motion.p>
              <motion.h1
                className="font-heading font-bold text-white text-balance"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
              >
                {name}
              </motion.h1>

              {/* Domain tags — unique per center */}
              <motion.div
                className="flex flex-wrap gap-2 mt-5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {center.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.35 + i * 0.06 }}
                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      color: center.accentHex,
                      borderColor: `${center.accentHex}50`,
                      background: `${center.accentHex}18`,
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              <FadeUp>
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-3">
                    {isRo ? 'Despre Centru' : 'About the Center'}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    {description}
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.08}>
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-5">
                    {center.slug === 'support-centers'
                      ? (isRo ? `Centre Suport (${center.labs.length})` : `Support Centers (${center.labs.length})`)
                      : (isRo ? `Laboratoare (${center.labs.length})` : `Laboratories (${center.labs.length})`)
                    }
                  </span>
                  <ul className="space-y-3">
                    {center.labs.map((lab, i) => {
                      const labName = isRo ? lab.ro.name : lab.en.name
                      const labHref = `/research/${center.slug}/labs/${lab.slug}`
                      const inner = (
                        <>
                          <span
                            className="flex-shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black"
                            style={{ background: `${center.accentHex}20`, color: center.accentHex }}
                          >
                            {i + 1}
                          </span>
                          <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed group-hover:text-incesa-blue dark:group-hover:text-white transition-colors flex-1">
                            {labName}
                          </span>
                          <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: center.accentHex }} />
                        </>
                      )
                      return (
                        <motion.li
                          key={lab.id}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                        >
                          <Link to={labHref} className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 dark:border-gray-800 bg-incesa-light dark:bg-gray-900 hover:border-incesa-accent/30 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all group">
                            {inner}
                          </Link>
                        </motion.li>
                      )
                    })}
                  </ul>
                </div>
              </FadeUp>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <FadeUp delay={0.1}>
                {/* Director card */}
                <div className="rounded-2xl bg-incesa-light dark:bg-gray-900 border border-slate-100 dark:border-gray-800 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-incesa-accent mb-3">
                    {isRo ? 'Director Centru' : 'Center Head'}
                  </p>
                  {center.head ? (
                    <>
                      <p className="font-heading font-bold text-incesa-blue dark:text-white mb-3">{center.head}</p>
                      {center.email && (
                        <a
                          href={`mailto:${center.email}`}
                          className="inline-flex items-center gap-2 text-sm text-incesa-accent hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                          {center.email}
                        </a>
                      )}
                    </>
                  ) : (
                    <a
                      href={`mailto:${center.email}`}
                      className="inline-flex items-center gap-2 text-sm text-incesa-accent hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      {center.email}
                    </a>
                  )}
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                {/* Stats */}
                <div className="rounded-2xl bg-gradient-to-br from-incesa-blue to-incesa-blue-mid p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 grid-dots-dark" aria-hidden="true" />
                  <div className="relative z-10">
                    <div className="font-heading font-black text-4xl text-incesa-accent">{center.labs.length}</div>
                    <div className="text-white/70 text-sm mt-1">{isRo ? 'Laboratoare Specializate' : 'Specialized Laboratories'}</div>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-incesa-accent-light hover:text-white transition-colors"
                      >
                        {isRo ? 'Colaborați cu noi' : 'Collaborate with us'} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                {/* Other centers */}
                <div className="rounded-2xl border border-slate-100 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-incesa-accent mb-3 px-2">
                    {isRo ? 'Alte Centre' : 'Other Centers'}
                  </p>
                  <div className="space-y-1">
                    {RESEARCH_CENTERS.filter(c => c.slug !== slug).map(c => {
                      const CIcon = ICON_MAP[c.icon] ?? FlaskConical
                      return (
                        <Link
                          key={c.slug}
                          to={`/research/${c.slug}`}
                          className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-incesa-blue dark:hover:text-white hover:bg-incesa-light dark:hover:bg-gray-800 transition-colors group"
                        >
                          <CIcon className="w-3.5 h-3.5 text-incesa-accent flex-shrink-0" />
                          <span className="leading-snug">{isRo ? c.ro.name : c.en.name}</span>
                          <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Prev / Next center navigation */}
          <div className="mt-16 flex flex-col sm:flex-row gap-4">
            {prev ? (
              <Link
                to={`/research/${prev.slug}`}
                className="flex-1 flex items-center gap-3 p-5 rounded-2xl border border-slate-100 dark:border-gray-800 hover:border-incesa-accent/30 hover:shadow-md transition-all group"
              >
                <ArrowLeft className="w-5 h-5 text-incesa-accent flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 mb-0.5">{isRo ? 'Anterior' : 'Previous'}</p>
                  <p className="font-heading font-bold text-incesa-blue dark:text-white text-sm truncate">
                    {isRo ? prev.ro.name : prev.en.name}
                  </p>
                </div>
              </Link>
            ) : <div className="flex-1" />}
            {next && (
              <Link
                to={`/research/${next.slug}`}
                className="flex-1 flex items-center gap-3 p-5 rounded-2xl border border-slate-100 dark:border-gray-800 hover:border-incesa-accent/30 hover:shadow-md transition-all group text-right sm:flex-row-reverse"
              >
                <ArrowRight className="w-5 h-5 text-incesa-accent flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 mb-0.5">{isRo ? 'Următor' : 'Next'}</p>
                  <p className="font-heading font-bold text-incesa-blue dark:text-white text-sm truncate">
                    {isRo ? next.ro.name : next.en.name}
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
