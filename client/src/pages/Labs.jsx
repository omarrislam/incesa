import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Cog, FlaskConical, Cpu, Users, Building2, ChevronDown, User, Mail, Quote } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import { RESEARCH_CENTERS } from '../data/labs'

const ICON_MAP = { Zap, Cog, FlaskConical, Cpu, Users, Building2 }

function FadeUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function CenterAccordion({ center, isRo, t, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  const IconComp = ICON_MAP[center.icon] ?? FlaskConical
  const name = isRo ? center.ro.name : center.en.name

  return (
    <div className="rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
      <button
        className="w-full flex items-center gap-4 p-6 text-left cursor-pointer hover:bg-incesa-light dark:hover:bg-gray-800 transition-colors"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <div className="w-11 h-11 rounded-xl bg-incesa-accent/10 dark:bg-incesa-accent/20 flex items-center justify-center flex-shrink-0">
          <IconComp className="w-5 h-5 text-incesa-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-incesa-blue dark:text-white">{name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {center.labs.length} {t('research.labsIn').toLowerCase()}
          </p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-400 flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 dark:border-gray-800">
              <ul className="divide-y divide-slate-50 dark:divide-gray-800/60">
                {center.labs.map((lab, i) => (
                  <motion.li
                    key={lab.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut', delay: i * 0.04 }}
                    className="px-6 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                        style={{ background: center.accentHex }}
                      >
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-incesa-blue dark:text-white leading-snug">
                          {isRo ? lab.ro : lab.en}
                        </p>

                        {lab.mission && (
                          <div className="mt-2 flex items-start gap-1.5">
                            <Quote className="w-3 h-3 flex-shrink-0 mt-0.5 opacity-40 text-slate-400" />
                            <p className="text-xs text-slate-400 dark:text-slate-500 italic leading-relaxed">
                              {lab.mission}
                            </p>
                          </div>
                        )}

                        {lab.head && (
                          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                              <User className="w-3 h-3 flex-shrink-0" />
                              {lab.head}
                            </span>
                            <a
                              href={`mailto:${lab.email}`}
                              className="inline-flex items-center gap-1.5 text-xs hover:underline"
                              style={{ color: center.accentHex }}
                            >
                              <Mail className="w-3 h-3 flex-shrink-0" />
                              {lab.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Labs() {
  const { t, i18n } = useTranslation()
  const isRo = i18n.language === 'ro'

  const totalLabs = RESEARCH_CENTERS.reduce((acc, c) => acc + c.labs.length, 0)

  return (
    <PageWrapper>
      <Helmet>
        <title>Laboratories — INCESA</title>
        <meta name="description" content={`Browse all ${totalLabs} specialized INCESA laboratories across 6 research centers.`} />
      </Helmet>

      {/* Hero */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060e2e 0%, #0a2463 100%)' }}
      >
        <div className="absolute inset-0 grid-dots-dark opacity-50" aria-hidden="true" />
        <div className="relative z-10 container-padded text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-incesa-accent/20 border border-incesa-accent/30 text-incesa-accent-light text-xs font-semibold uppercase tracking-[0.15em] mb-5">
            {t('research.badge')}
          </span>
          <h1 className="font-heading font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em' }}>
            {t('research.labsTitle')}
          </h1>
          <p className="mt-4 text-white/65 max-w-xl mx-auto">{t('research.labsSubtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="text-center">
              <div className="font-heading font-black text-white text-3xl">{totalLabs}</div>
              <div className="text-incesa-accent-light/70 text-sm">{t('stats.labs')}</div>
            </div>
            <div className="text-center">
              <div className="font-heading font-black text-white text-3xl">6</div>
              <div className="text-incesa-accent-light/70 text-sm">{t('stats.centers')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Labs list */}
      <section className="section-py bg-incesa-light dark:bg-gray-950">
        <div className="container-padded max-w-4xl">
          <div className="space-y-4">
            {RESEARCH_CENTERS.map((center, i) => (
              <FadeUp key={center.id} delay={i * 0.05}>
                <CenterAccordion
                  center={center}
                  isRo={isRo}
                  t={t}
                  defaultOpen={i === 0}
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
