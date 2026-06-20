import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { BookOpen, Building2, Landmark, FlaskConical, ArrowRight, Clock } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import MotionButton from '../components/ui/MotionButton'

function CountUp({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const num = parseInt(target, 10)
        const step = num / (1600 / 16)
        let cur = 0
        const timer = setInterval(() => {
          cur = Math.min(cur + step, num)
          setVal(Math.round(cur))
          if (cur >= num) clearInterval(timer)
        }, 16)
      }
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])
  return <span ref={ref}>{val}{suffix}</span>
}
import {
  PARTNER_TYPES,
  CORPORATE_PARTNERS,
  ACADEMIC_PARTNERS,
  RD_PARTNERS,
  GOVERNMENT_PARTNERS,
} from '../data/partners'
import { PROJECTS, COMING_SOON_COUNT } from '../data/projects'

const ICON_MAP = { BookOpen, Building2, Landmark, FlaskConical }

function FadeUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}
const staggerItem = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

function PartnerGrid({ names, limit }) {
  const show = limit ? names.slice(0, limit) : names
  return (
    <motion.ul
      className="flex flex-wrap gap-2"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {show.map(name => (
        <motion.li
          key={name}
          variants={staggerItem}
          className="px-3 py-1.5 rounded-full bg-incesa-light dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-incesa-accent/40 hover:text-incesa-blue dark:hover:text-white transition-colors"
        >
          {name}
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default function Partners() {
  const { t, i18n } = useTranslation()
  const isRo = i18n.language === 'ro'

  return (
    <PageWrapper>
      <Helmet>
        <title>Partners & Projects — INCESA</title>
        <meta name="description" content="INCESA research partners — academic institutions, industry companies, government bodies, and R&D institutes." />
      </Helmet>

      {/* Hero */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060e2e 0%, #0a2463 100%)' }}
      >
        <div className="absolute inset-0 grid-dots-dark opacity-50" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-12"
          style={{ backgroundImage: 'url(https://www.incesa.ro/wp-content/uploads/2025/02/technologie-carte-circuit-imprime-binaire-arriere-plan-concept-bleu-cyber-securite_42077-58.jpg)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 container-padded text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-incesa-accent/20 border border-incesa-accent/30 text-incesa-accent-light text-xs font-semibold uppercase tracking-[0.15em] mb-5"
          >
            {t('partners.badge')}
          </motion.span>
          <motion.h1
            className="font-heading font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('partners.title')}
          </motion.h1>
          <motion.p
            className="mt-4 text-white/65 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            {t('partners.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Partner type summary cards */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {t('partners.typesLabel')}
              </span>
              <h2 className="font-heading text-3xl font-bold text-incesa-blue dark:text-white">
                {t('partners.title')}
              </h2>
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PARTNER_TYPES.map((pt, i) => {
              const Icon = ICON_MAP[pt.icon] ?? Building2
              const data = isRo ? pt.ro : pt.en
              return (
                <FadeUp key={pt.id} delay={i * 0.07}>
                  <div className="p-6 rounded-2xl border border-slate-100 dark:border-gray-800 hover:border-incesa-accent/30 hover:shadow-lg hover:shadow-incesa-accent/5 transition-all bg-white dark:bg-gray-900 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-incesa-accent/10 dark:bg-incesa-accent/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-incesa-accent" />
                      </div>
                      <span className="font-heading text-2xl font-black text-incesa-blue dark:text-white">
                        <CountUp target={pt.count} suffix="+" />
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-2">{data.label}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{data.desc}</p>
                  </div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* Industry partners */}
      <section className="section-py bg-incesa-light dark:bg-gray-900">
        <div className="container-padded">
          <FadeUp>
            <div className="mb-8">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-3">
                {isRo ? 'Parteneri Industriali' : 'Industry Partners'}
              </span>
              <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-2">
                {isRo ? `${CORPORATE_PARTNERS.length}+ Companii Partenere` : `${CORPORATE_PARTNERS.length}+ Partner Companies`}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isRo
                  ? 'De la producători auto globali la companii tech și institute financiare'
                  : 'From global automotive manufacturers to tech companies and financial institutions'}
              </p>
            </div>
          </FadeUp>
          <PartnerGrid names={CORPORATE_PARTNERS} />
        </div>
      </section>

      {/* Academic partners */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <div className="mb-8">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-3">
                {isRo ? 'Parteneri Academici' : 'Academic Partners'}
              </span>
              <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-2">
                {isRo ? 'Universități și Institute' : 'Universities & Institutes'}
              </h2>
            </div>
          </FadeUp>
          <PartnerGrid names={ACADEMIC_PARTNERS} />

          <FadeUp delay={0.15}>
            <div className="mt-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-5">
                {isRo ? 'Institute C&D' : 'R&D Institutes'}
              </span>
              <PartnerGrid names={RD_PARTNERS} />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Government partners */}
      <section className="section-py bg-incesa-light dark:bg-gray-900">
        <div className="container-padded">
          <FadeUp>
            <div className="mb-8">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-3">
                {isRo ? 'Parteneri Guvernamentali' : 'Government Partners'}
              </span>
              <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-2">
                {isRo ? 'Autorități Locale și Județene' : 'Local & County Authorities'}
              </h2>
            </div>
          </FadeUp>
          <PartnerGrid names={GOVERNMENT_PARTNERS} />
        </div>
      </section>

      {/* Projects preview */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-2">
                  {isRo ? 'Cercetare Activă' : 'Active Research'}
                </span>
                <h2 className="font-heading text-3xl font-bold text-incesa-blue dark:text-white">
                  {t('research.projectsTitle')}
                </h2>
              </div>
              <Link
                to="/research/projects"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-incesa-accent hover:gap-2.5 transition-all"
              >
                {isRo ? 'Vezi toate' : 'View all'} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((project, i) => {
              const title = isRo ? project.ro.title : project.en.title
              const domain = isRo ? project.domain.ro : project.domain.en
              const card = (
                <FadeUp key={project.id} delay={i * 0.05}>
                  <div className="group p-6 rounded-2xl bg-white dark:bg-gray-900 border border-incesa-accent/20 hover:border-incesa-accent/50 hover:shadow-lg hover:shadow-incesa-accent/10 transition-all h-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-incesa-accent to-incesa-accent-light" />
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {t('status.ongoing')}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-incesa-accent/10 text-incesa-accent dark:text-incesa-accent-light">
                        {domain}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-3 leading-snug group-hover:text-incesa-accent transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{project.funding}</p>
                  </div>
                </FadeUp>
              )
              return project.link
                ? <Link to={project.link} key={project.id}>{card}</Link>
                : card
            })}
            {Array.from({ length: Math.min(COMING_SOON_COUNT, 5) }).map((_, i) => (
              <FadeUp key={`cs-${i}`} delay={(PROJECTS.length + i) * 0.05}>
                <div className="skeleton-shimmer p-6 rounded-2xl border border-dashed border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/60 h-full flex flex-col min-h-[140px]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-5 w-20 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
                    <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
                  </div>
                  <div className="space-y-2 flex-1 mb-4">
                    <div className="h-4 w-full rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
                    <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-20 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-300 dark:text-gray-600">
                      <Clock className="w-3 h-3" /> Coming Soon
                    </span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Become a partner CTA */}
      <section className="section-py" style={{ background: 'linear-gradient(135deg, #060e2e, #0a2463)' }}>
        <div className="container-padded">
          <div className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center">
            <div className="absolute inset-0 grid-dots-dark" aria-hidden="true" />
            <div className="relative z-10">
              <FadeUp>
                <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl mb-4">
                  {t('partners.ctaTitle')}
                </h2>
                <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
                  {t('partners.ctaText')}
                </p>
                <MotionButton to="/contact" size="lg">
                  {t('partners.ctaButton')} <ArrowRight className="w-4 h-4" />
                </MotionButton>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
