import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Microscope, Users, Globe, GraduationCap, MapPin, ExternalLink, BellRing } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import { JOBS, DOMAIN_COLORS } from '../data/jobs'

const ICON_MAP = { Microscope, Users, Globe, GraduationCap }

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

export default function Jobs() {
  const { t, i18n } = useTranslation()
  const isRo = i18n.language === 'ro'
  const whyItems = t('jobs.whyItems', { returnObjects: true })

  return (
    <PageWrapper>
      <Helmet>
        <title>Careers at INCESA — Join Our Research Team</title>
        <meta name="description" content="Join INCESA's team of 100+ researchers. Open positions in applied science, engineering, biotechnology, and computer science." />
      </Helmet>

      {/* Hero */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060e2e 0%, #0a2463 100%)' }}
      >
        <div className="absolute inset-0 grid-dots-dark opacity-50" aria-hidden="true" />
        <div className="relative z-10 container-padded text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-incesa-accent/20 border border-incesa-accent/30 text-incesa-accent-light text-xs font-semibold uppercase tracking-[0.15em] mb-5">
            {t('jobs.badge')}
          </span>
          <h1 className="font-heading font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em' }}>
            {t('jobs.title')}
          </h1>
          <p className="mt-4 text-white/65 max-w-xl mx-auto">{t('jobs.subtitle')}</p>
        </div>
      </section>

      {/* Why INCESA */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {t('jobs.badge')}
              </span>
              <h2 className="font-heading text-3xl font-bold text-incesa-blue dark:text-white">
                {t('jobs.whyTitle')}
              </h2>
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.isArray(whyItems) && whyItems.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Microscope
              return (
                <FadeUp key={item.title} delay={i * 0.07}>
                  <div className="p-6 rounded-2xl bg-incesa-light dark:bg-gray-900 border border-slate-100 dark:border-gray-800 text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-2xl bg-incesa-accent/10 dark:bg-incesa-accent/20 flex items-center justify-center mb-4 mx-auto">
                      <Icon className="w-5 h-5 text-incesa-accent" />
                    </div>
                    <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="section-py bg-incesa-light dark:bg-gray-900">
        <div className="container-padded">
          <FadeUp>
            <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-8">
              {t('jobs.openPositions')}
            </h2>
          </FadeUp>
          {JOBS.length > 0 ? (
            <div className="space-y-4">
              {JOBS.map((job, i) => {
                const data = isRo ? job.ro : job.en
                const type = isRo ? job.type.ro : job.type.en
                const domainClass = DOMAIN_COLORS[job.domain] ?? ''
                return (
                  <FadeUp key={job.id} delay={i * 0.05}>
                    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 hover:border-incesa-accent/30 hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${domainClass}`}>
                              {type}
                            </span>
                          </div>
                          <h3 className="font-heading font-bold text-incesa-blue dark:text-white text-lg mb-2">
                            {data.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-3">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                            {data.location}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{data.desc}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <a
                            href="mailto:contact@incesa.ro"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-incesa-blue text-white text-sm font-semibold hover:bg-incesa-blue-mid transition-colors"
                          >
                            {t('jobs.apply')} <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                )
              })}
            </div>
          ) : (
            <FadeUp>
              <div className="rounded-2xl border border-dashed border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-16 px-8 text-center max-w-xl mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-incesa-accent/10 flex items-center justify-center mx-auto mb-5">
                  <BellRing className="w-6 h-6 text-incesa-accent" />
                </div>
                <h3 className="font-heading font-bold text-incesa-blue dark:text-white text-lg mb-2">
                  {isRo ? 'Nicio poziție deschisă momentan' : 'No open positions right now'}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {isRo
                    ? 'Nu avem posturi vacante în acest moment, dar ne extindem echipa în mod regulat. Trimite-ne un CV și te vom contacta când apare o oportunitate potrivită.'
                    : 'We don\'t have any vacancies at the moment, but we regularly grow our team. Send us your CV and we\'ll reach out when a suitable opportunity arises.'}
                </p>
                <a
                  href="mailto:contact@incesa.ro"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-incesa-blue text-white text-sm font-semibold hover:bg-incesa-blue-mid transition-colors"
                >
                  {isRo ? 'Trimite CV-ul tău' : 'Send your CV'} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </FadeUp>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
