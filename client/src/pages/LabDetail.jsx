import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, User, CheckCircle2, ArrowRight, FlaskConical, FolderOpen, Award, Users, Wrench, Sparkles } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import MotionButton from '../components/ui/MotionButton'
import { RESEARCH_CENTERS } from '../data/labs'

function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function LabDetail() {
  const { centerSlug, labSlug } = useParams()
  const { i18n } = useTranslation()
  const isRo = i18n.language === 'ro'

  const center = RESEARCH_CENTERS.find(c => c.slug === centerSlug)
  if (!center) return <Navigate to="/research" replace />

  const lab = center.labs.find(l => l.slug === labSlug)
  if (!lab) return <Navigate to={`/research/${centerSlug}`} replace />

  const labData = isRo ? lab.ro : lab.en
  const centerName = isRo ? center.ro.name : center.en.name

  return (
    <PageWrapper>
      <Helmet>
        <title>{labData.name} — INCESA</title>
        <meta name="description" content={lab.mission} />
      </Helmet>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: `linear-gradient(135deg, #060e2e 0%, ${center.accentHex}22 100%)` }}
      >
        <div className="absolute inset-0 grid-dots-dark opacity-40" aria-hidden="true" />
        {/* Accent glow */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20"
          style={{ background: center.accentHex }}
          aria-hidden="true"
        />

        <div className="relative z-10 container-padded">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs text-white/50 mb-8"
          >
            <Link to="/research" className="hover:text-white/80 transition-colors">Research</Link>
            <span>/</span>
            <Link to={`/research/${center.slug}`} className="hover:text-white/80 transition-colors">{centerName}</Link>
            <span>/</span>
            <span className="text-white/70">{isRo ? 'Laborator' : 'Laboratory'}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.15em] mb-5 border"
              style={{ color: center.accentHex, borderColor: `${center.accentHex}40`, background: `${center.accentHex}15` }}
            >
              <FlaskConical className="inline w-3 h-3 mr-1.5" />
              {isRo ? 'Laborator' : 'Laboratory'}
            </span>
          </motion.div>

          <motion.h1
            className="font-heading font-bold text-white mb-5 max-w-3xl"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {labData.name}
          </motion.h1>

          <motion.p
            className="text-white/65 max-w-2xl leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            {lab.mission}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
          >
            <Link
              to={`/research/${center.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {centerName}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────────────── */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">

              {/* About the Lab */}
              <FadeUp>
                <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-4">
                  {isRo ? 'Despre Laborator' : 'About the Laboratory'}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[1.05rem]">
                  {labData.description}
                </p>
              </FadeUp>

              {/* Research Areas */}
              {labData.researchAreas && labData.researchAreas.length > 0 && (
                <FadeUp delay={0.07}>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-6">
                      {isRo ? 'Direcții de Cercetare' : 'Research Directions'}
                    </h2>
                    <ul className="space-y-3">
                      {labData.researchAreas.map((area, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.06 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                            style={{ color: center.accentHex }}
                          />
                          <span className="text-slate-700 dark:text-slate-300">{area}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              )}

              {/* Projects */}
              {lab.projects && lab.projects.length > 0 && (
                <FadeUp delay={0.1}>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-6 flex items-center gap-2.5">
                      <FolderOpen className="w-6 h-6" style={{ color: center.accentHex }} />
                      {isRo ? 'Proiecte' : 'Projects'}
                    </h2>
                    <div className="space-y-4">
                      {lab.projects.map((proj, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.06 }}
                          className="rounded-xl p-5 border border-slate-100 dark:border-gray-800 bg-slate-50 dark:bg-gray-900"
                        >
                          {proj.role && (
                            <span
                              className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full mb-2 border"
                              style={{ color: center.accentHex, borderColor: `${center.accentHex}40`, background: `${center.accentHex}12` }}
                            >
                              {proj.role}
                            </span>
                          )}
                          <p className="text-slate-800 dark:text-slate-200 font-medium leading-snug text-sm mb-2">
                            {proj.title}
                          </p>
                          {proj.code && (
                            <p className="text-xs text-slate-400 dark:text-slate-500">{proj.code}</p>
                          )}
                          {proj.beneficiary && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              <span className="font-semibold">{isRo ? 'Beneficiar' : 'Beneficiary'}:</span> {proj.beneficiary}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              )}

              {/* Patents */}
              {lab.patents && lab.patents.length > 0 && (
                <FadeUp delay={0.12}>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-6 flex items-center gap-2.5">
                      <Award className="w-6 h-6" style={{ color: center.accentHex }} />
                      {isRo ? 'Brevete' : 'Patents'}
                    </h2>
                    <div className="space-y-4">
                      {lab.patents.map((patent, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.07 }}
                          className="rounded-xl p-5 border border-slate-100 dark:border-gray-800 bg-slate-50 dark:bg-gray-900"
                        >
                          <p className="text-slate-800 dark:text-slate-200 font-medium leading-snug text-sm mb-2">
                            {patent.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-semibold">{isRo ? 'Autori' : 'Authors'}:</span> {patent.authors}
                          </p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{patent.number}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              )}

              {/* Facilities */}
              {lab.facilities && lab.facilities.length > 0 && (
                <FadeUp delay={0.13}>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-6 flex items-center gap-2.5">
                      <Wrench className="w-6 h-6" style={{ color: center.accentHex }} />
                      {isRo ? 'Facilități și Echipamente' : 'Research Facilities & Tools'}
                    </h2>
                    <ul className="space-y-3">
                      {lab.facilities.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: i * 0.04 }}
                          className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                            style={{ background: center.accentHex }}
                          />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              )}

              {/* Future Projects */}
              {lab.futureProjects && lab.futureProjects.length > 0 && (
                <FadeUp delay={0.14}>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-6 flex items-center gap-2.5">
                      <Sparkles className="w-6 h-6" style={{ color: center.accentHex }} />
                      {isRo ? 'Proiecte Viitoare' : 'Future Projects'}
                    </h2>
                    <ul className="space-y-3">
                      {lab.futureProjects.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: i * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2
                            className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-60"
                            style={{ color: center.accentHex }}
                          />
                          <span className="text-slate-700 dark:text-slate-300 text-sm">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              )}

              {/* Parent center link */}
              <FadeUp delay={0.15}>
                <div
                  className="rounded-2xl p-6 border"
                  style={{ background: `${center.accentHex}08`, borderColor: `${center.accentHex}25` }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: center.accentHex }}>
                    {isRo ? 'Parte din' : 'Part of'}
                  </p>
                  <h3 className="font-heading font-bold text-incesa-blue dark:text-white text-lg mb-3">
                    {centerName}
                  </h3>
                  <MotionButton to={`/research/${center.slug}`} variant="outline" size="sm">
                    {isRo ? 'Vezi centrul de cercetare' : 'View research center'} <ArrowRight className="w-3.5 h-3.5" />
                  </MotionButton>
                </div>
              </FadeUp>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* Lab Head */}
              {lab.head && (
                <FadeUp delay={0.12}>
                  <div className="rounded-2xl bg-incesa-light dark:bg-gray-900 border border-slate-100 dark:border-gray-800 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-incesa-accent mb-4">
                      {isRo ? 'Coordonator' : 'Laboratory Head'}
                    </p>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${center.accentHex}20` }}
                      >
                        <User className="w-5 h-5" style={{ color: center.accentHex }} />
                      </div>
                      <div>
                        <p className="font-semibold text-incesa-blue dark:text-white text-sm leading-snug">{lab.head}</p>
                        {lab.email && (
                          <a
                            href={`mailto:${lab.email}`}
                            className="flex items-center gap-1.5 text-xs text-incesa-accent mt-1.5 hover:underline"
                          >
                            <Mail className="w-3 h-3" />
                            {lab.email}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              )}

              {/* Contact */}
              <FadeUp delay={0.16}>
                <div className="rounded-2xl bg-incesa-light dark:bg-gray-900 border border-slate-100 dark:border-gray-800 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-incesa-accent mb-4">
                    {isRo ? 'Contact' : 'Contact'}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {isRo
                      ? 'Interesați de colaborare sau servicii de cercetare?'
                      : 'Interested in collaboration or research services?'}
                  </p>
                  <MotionButton href={`mailto:${lab.email || 'office@incesa.ro'}`} variant="outline" size="sm">
                    <Mail className="w-3.5 h-3.5" />
                    {isRo ? 'Contactează-ne' : 'Get in Touch'}
                  </MotionButton>
                </div>
              </FadeUp>

              {/* Partners */}
              {lab.partners && lab.partners.length > 0 && (
                <FadeUp delay={0.19}>
                  <div className="rounded-2xl bg-incesa-light dark:bg-gray-900 border border-slate-100 dark:border-gray-800 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-incesa-accent mb-4 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {isRo ? 'Parteneri' : 'Partners'}
                    </p>
                    <ul className="space-y-2">
                      {lab.partners.map((partner, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                            style={{ background: center.accentHex }}
                          />
                          {partner}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              )}

              {/* Other labs in this center */}
              <FadeUp delay={0.2}>
                <div className="rounded-2xl bg-incesa-light dark:bg-gray-900 border border-slate-100 dark:border-gray-800 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-incesa-accent mb-4">
                    {isRo ? 'Alte Laboratoare' : 'Other Labs'}
                  </p>
                  <ul className="space-y-2">
                    {center.labs.filter(l => l.slug !== labSlug).slice(0, 4).map(otherLab => {
                      const otherName = isRo ? otherLab.ro.name : otherLab.en.name
                      return (
                        <li key={otherLab.slug}>
                          <Link
                            to={`/research/${center.slug}/labs/${otherLab.slug}`}
                            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-incesa-accent dark:hover:text-incesa-accent transition-colors group"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                              style={{ background: center.accentHex }}
                            />
                            <span className="line-clamp-2 leading-snug">{otherName}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
