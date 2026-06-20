import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import { PROJECTS, COMING_SOON_COUNT } from '../data/projects'

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

function SkeletonCard({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (index + 1) * 0.06 }}
    >
      <div className="skeleton-shimmer p-6 rounded-2xl border border-dashed border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/60 h-full flex flex-col min-h-[160px]">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-5 w-20 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
        </div>
        <div className="space-y-2 flex-1 mb-5">
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-4 w-3/5 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-gray-700">
          <div className="h-3 w-24 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-300 dark:text-gray-600">
            <Clock className="w-3 h-3" />
            Coming Soon
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t, i18n } = useTranslation()
  const isRo = i18n.language === 'ro'

  return (
    <PageWrapper>
      <Helmet>
        <title>Research Projects — INCESA</title>
        <meta name="description" content="Active and upcoming INCESA research projects across all scientific domains." />
      </Helmet>

      {/* Hero */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060e2e 0%, #0a2463 100%)' }}
      >
        <div className="absolute inset-0 grid-dots-dark opacity-50" aria-hidden="true" />
        <div className="relative z-10 container-padded text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-incesa-accent/20 border border-incesa-accent/30 text-incesa-accent-light text-xs font-semibold uppercase tracking-[0.15em] mb-5"
          >
            {t('research.badge')}
          </motion.span>
          <motion.h1
            className="font-heading font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('research.projectsTitle')}
          </motion.h1>
          <motion.p
            className="mt-4 text-white/65 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            {isRo
              ? 'Proiectele noastre de cercetare activ — mai multe urmează în curând.'
              : 'Our active research projects — more coming soon as our portfolio expands.'}
          </motion.p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-2">
                  {isRo ? 'Proiecte Active' : 'Active Projects'}
                </span>
                <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white">
                  {isRo ? 'Cercetare în Desfășurare' : 'Research in Progress'}
                </h2>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                {isRo
                  ? `${PROJECTS.length} proiect · ${COMING_SOON_COUNT} în curând`
                  : `${PROJECTS.length} project · ${COMING_SOON_COUNT} coming soon`}
              </span>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((project, i) => {
              const title = isRo ? project.ro.title : project.en.title
              const domain = isRo ? project.domain.ro : project.domain.en
              const inner = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                  whileHover={project.link ? { y: -4 } : {}}
                  key={project.id}
                >
                  <div className={`group p-6 rounded-2xl border bg-white dark:bg-gray-900 h-full flex flex-col relative overflow-hidden transition-all ${project.link ? 'border-incesa-accent/20 hover:border-incesa-accent/50 hover:shadow-xl hover:shadow-incesa-accent/10 cursor-pointer' : 'border-slate-100 dark:border-gray-800'}`}>
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
                    <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-3 leading-snug flex-1 group-hover:text-incesa-accent transition-colors">
                      {title}
                    </h3>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-gray-800 mt-auto">
                      <p className="text-xs text-slate-400 dark:text-slate-500">{project.funding}</p>
                      {project.link && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-incesa-accent group-hover:gap-2 transition-all">
                          {isRo ? 'Detalii' : 'Details'} <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )

              return project.link
                ? <Link to={project.link} key={project.id}>{inner}</Link>
                : <div key={project.id}>{inner}</div>
            })}

            {Array.from({ length: COMING_SOON_COUNT }).map((_, i) => (
              <SkeletonCard key={`cs-${i}`} index={i} />
            ))}
          </div>

          <FadeUp delay={0.3}>
            <p className="text-center text-sm text-slate-400 dark:text-slate-500 mt-10">
              {isRo
                ? 'Portofoliul nostru de proiecte se extinde continuu. Reveniți în curând sau contactați-ne pentru colaborări.'
                : 'Our project portfolio is continuously expanding. Check back soon or contact us to discuss collaboration.'}
            </p>
          </FadeUp>
        </div>
      </section>
    </PageWrapper>
  )
}
