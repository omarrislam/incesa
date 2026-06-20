import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Zap, Cog, FlaskConical, Cpu, Users, Building2, ArrowRight, ChevronRight } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import MotionButton from '../components/ui/MotionButton'
import { RESEARCH_CENTERS } from '../data/labs'

const ICON_MAP = { Zap, Cog, FlaskConical, Cpu, Users, Building2 }

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
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Research() {
  const { t, i18n } = useTranslation()
  const isRo = i18n.language === 'ro'

  return (
    <PageWrapper>
      <Helmet>
        <title>Research Centers — INCESA</title>
        <meta name="description" content="Six research centers and 21 specialized laboratories at INCESA driving innovation across applied science domains." />
      </Helmet>

      {/* Hero */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060e2e 0%, #0a2463 100%)' }}
      >
        <div className="absolute inset-0 grid-dots-dark opacity-50" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
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
            {t('research.badge')}
          </motion.span>
          <motion.h1
            className="font-heading font-bold text-white text-balance"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('research.title')}
          </motion.h1>
          <motion.p
            className="mt-4 text-white/65 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            {t('research.subtitle')}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <MotionButton to="/research/labs" variant="ghost">
              {t('nav.researchLabs')}
            </MotionButton>
            <MotionButton to="/research/projects">
              {t('nav.researchProjects')}
            </MotionButton>
          </motion.div>
        </div>
      </section>

      {/* Center cards — clickable */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <div className="mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-3">
                {isRo ? 'Centrele Noastre' : 'Our Centers'}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-incesa-blue dark:text-white">
                {t('research.centersTitle')}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
                {isRo
                  ? 'Faceți clic pe un centru pentru a explora laboratoarele, directorul și activitățile de cercetare.'
                  : 'Click any center to explore its laboratories, director, and research activities.'}
              </p>
            </div>
          </FadeUp>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {RESEARCH_CENTERS.map((center) => {
              const IconComp = ICON_MAP[center.icon] ?? FlaskConical
              const name = isRo ? center.ro.name : center.en.name
              const desc = isRo ? center.ro.description : center.en.description
              const abbr = isRo ? center.ro.abbr : center.en.abbr

              return (
                <motion.div key={center.id} variants={staggerItem}>
                  <Link to={`/research/${center.slug}`}>
                    <motion.div
                      className="group h-full rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:border-incesa-accent/40 hover:shadow-xl hover:shadow-incesa-accent/10 transition-all duration-300 cursor-pointer"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      {/* Card top bar — unique accent per center */}
                      <div
                        className="h-1 transition-all duration-300 group-hover:h-1.5"
                        style={{ background: `linear-gradient(90deg, ${center.accentHex}, ${center.accentHex}55)` }}
                      />

                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                            style={{ background: `${center.accentHex}18` }}
                          >
                            <IconComp className="w-6 h-6" style={{ color: center.accentHex }} />
                          </div>
                          <span className="text-xs font-bold text-slate-300 dark:text-slate-600 bg-incesa-light dark:bg-gray-800 px-2.5 py-1 rounded-full">
                            {abbr}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-2 leading-snug group-hover:text-incesa-accent transition-colors">
                          {name}
                        </h3>

                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 flex-1 line-clamp-3">
                          {desc}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-gray-800">
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            {center.labs.length} {isRo ? 'laboratoare' : 'laboratories'}
                          </span>
                          <span
                            className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
                            style={{ color: center.accentHex }}
                          >
                            {isRo ? 'Detalii' : 'Details'}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Labs CTA */}
      <section className="section-py bg-incesa-light dark:bg-gray-900">
        <div className="container-padded">
          <FadeUp>
            <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0a2463, #1e3a5f)' }}>
              <div className="absolute inset-0 grid-dots-dark" aria-hidden="true" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-10 sm:p-14">
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent-light/60 mb-3">
                    {isRo ? 'Toate Laboratoarele' : 'All Laboratories'}
                  </span>
                  <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl mb-2">
                    {isRo ? '21 Laboratoare Specializate' : '21 Specialized Laboratories'}
                  </h2>
                  <p className="text-white/55 text-sm max-w-md">
                    {isRo
                      ? 'Explorați toate laboratoarele cu directori, misiuni și detalii de contact — organizate pe centre de cercetare.'
                      : 'Explore all labs with directors, missions, and contact details — organized by research center.'}
                  </p>
                </div>
                <Link
                  to="/research/labs"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-incesa-blue font-semibold text-sm hover:bg-incesa-accent-light hover:text-incesa-blue transition-colors"
                >
                  {isRo ? 'Toate Laboratoarele' : 'Browse All Labs'} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </PageWrapper>
  )
}
