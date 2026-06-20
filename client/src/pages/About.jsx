import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  CheckCircle2, FlaskConical, Users, Globe, Award,
  Building2, GraduationCap, Layers,
} from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'

const ICON_MAP = { FlaskConical, Users, Globe, Award }

function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

const RDI_ITEMS = [
  {
    code: 'a',
    en: 'Research and development and innovation programs with national or international funding',
    ro: 'Programe de cercetare-dezvoltare-inovare cu finanțare națională sau internațională',
  },
  {
    code: 'b',
    en: 'Contracts and collaborations with economic agents, organizations, public administration',
    ro: 'Contracte și colaborări cu agenți economici, organizații, administrație publică etc.',
  },
  {
    code: 'c',
    en: 'Other funded scientific research activities with legal entities or individuals',
    ro: 'Alte activități de cercetare științifică finanțate cu persoane juridice sau fizice',
  },
]

const RELATED_ITEMS = [
  { code: 'a', en: 'Technical assistance, consultancy, expertise, scientific and technological services to individuals and/or legal entities', ro: 'Asistență tehnică, consultanță, expertiză, servicii științifice, tehnice și tehnologice persoanelor fizice și/sau juridice' },
  { code: 'b', en: 'Development of R&D programs and strategies and participation in the elaboration of the R&D strategy', ro: 'Elaborarea programelor și strategiilor de cercetare-dezvoltare și participarea la elaborarea strategiei în domeniu' },
  { code: 'c', en: 'Forecasting studies, feasibility studies, analyzes and documentation', ro: 'Studii de prognoză, note de fundamentare, specificații, teme de proiectare, studii de fezabilitate, analize și documentații' },
  { code: 'd', en: 'Internal and international technical and scientific cooperation activities', ro: 'Activități de cooperare tehnică și științifică internă și internațională' },
  { code: 'e', en: 'Standardization, measurement, testing and quality certification of products', ro: 'Activități privind standardizarea, metrologia, testarea și certificarea calității produselor destinate omologării și (micro)producției' },
  { code: 'f', en: 'Technology transfer, intellectual property consulting, legal and heritage activities', ro: 'Transfer tehnologic, consultanță în proprietate intelectuală și alte activități juridice, achiziții și patrimoniu' },
  { code: 'g', en: 'Quality assessment of scientific research and technological development results', ro: 'Activități de evaluare a calității și/sau a rezultatelor cercetării științifice și ale dezvoltării tehnologice' },
  { code: 'h', en: 'IT, communications, databases, big data, artificial intelligence, cybersecurity, IoT', ro: 'Informatică, comunicații, baze de date, big data, inteligență artificială, securitate cibernetică, IoT etc.' },
  { code: 'i', en: 'Microproduction activities and metrological services', ro: 'Activități de microproducție și servicii, inclusiv metrologice' },
  { code: 'j', en: 'Development of quality procedures, norms and control for technical and economic activities', ro: 'Elaborarea de proceduri, norme de calitate și control pentru desfășurarea activităților tehnice și economice' },
  { code: 'k', en: 'Development and application of quality assessment and management programs', ro: 'Elaborarea și aplicarea programelor de evaluare și management al calității' },
  { code: 'l', en: 'Congresses, symposia, mobility organization, information exchange and dissemination', ro: 'Organizarea de congrese și simpozioane, organizarea mobilității, schimburi de informații, documentare și diseminare' },
  { code: 'm', en: 'Editorial activities: studies, reports, specialty books, training materials', ro: 'Activități editoriale: redactarea și tipărirea de studii, rapoarte, rezumate, cărți de specialitate, materiale de formare' },
  { code: 'n', en: 'Communication, translation and interpreting activities', ro: 'Activități de comunicare, traducere și interpretare' },
  { code: 'o', en: 'Services for the socio-economic and cultural environment', ro: 'Servicii legate de relația cu mediul socio-economic și cultural' },
  { code: 'p', en: 'Training, specialization and professional development activities', ro: 'Activități de formare, specializare și perfecționare profesională' },
  { code: 'q', en: 'Participation in the elaboration of the regional development strategy', ro: 'Participarea la elaborarea strategiei de dezvoltare regională' },
]

const SUPPORT_CENTERS = [
  { en: 'Technology Transfer Center — CTT INCESA', ro: 'Centrul de Transfer Tehnologic — CTT INCESA', href: '/ctt', accent: '#3e92cc' },
  { en: 'Communication, Translation & Interpreting Center', ro: 'Centrul de Comunicare, Traducere și Interpretare', href: '/support/communication', accent: '#3e92cc' },
  { en: 'Center for Relations with the Socio-Economic and Cultural Environment', ro: 'Centrul pentru Relații cu Mediul Socio-Economic și Cultural', href: '/support/socio-economic', accent: '#10b981' },
  { en: 'Service Center: Consulting, Assistance & Project Management', ro: 'Centrul de Servicii: Consultanță, Asistență și Management Proiecte', href: '/support/consulting', accent: '#8b5cf6' },
  { en: 'Training & Organizational Development Center', ro: 'Centrul de Formare și Perfecționare Organizațională', href: '/support/training', accent: '#f97316' },
]

export default function About() {
  const { t, i18n } = useTranslation()
  const isRo = i18n.language === 'ro'
  const pillars = t('about.pillars', { returnObjects: true })
  const values = t('about.values', { returnObjects: true })
  const historyItems = t('about.historyItems', { returnObjects: true })

  return (
    <PageWrapper>
      <Helmet>
        <title>About INCESA — Mission, Values & History</title>
        <meta name="description" content="Learn about INCESA's mission, values, team, and decade-long history of applied research innovation in Romania." />
      </Helmet>

      {/* Hero */}
      <section
        className="relative pt-36 pb-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060e2e 0%, #0a2463 100%)' }}
      >
        <div className="absolute inset-0 grid-dots-dark opacity-50" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(https://www.incesa.ro/wp-content/uploads/2025/02/technologie-carte-circuit-imprime-binaire-arriere-plan-concept-bleu-cyber-securite_42077-58.jpg)' }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(62,146,204,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <div className="relative z-10 container-padded text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-incesa-accent/20 border border-incesa-accent/30 text-incesa-accent-light text-xs font-semibold uppercase tracking-[0.15em] mb-5"
          >
            {t('about.badge')}
          </motion.span>
          <motion.h1
            className="font-heading font-bold text-white text-balance"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('about.sectionTitle')}
          </motion.h1>
        </div>
      </section>

      {/* 1 — Mission & Stats */}
      <section id="mission" className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeUp>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                  {t('about.missionLabel')}
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-incesa-blue dark:text-white mb-6">
                  {t('about.missionHeadline')}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{t('about.mission')}</p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">{t('about.body')}</p>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-incesa-accent mb-5">
                  {t('about.pillarsLabel')}
                </p>
              </FadeUp>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Array.isArray(pillars) && pillars.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                    className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-incesa-accent flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <FadeUp delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a2463, #1e3a5f)' }}>
                <div className="absolute inset-0 grid-dots-dark" aria-hidden="true" />
                <div className="relative z-10 p-8 h-80 flex flex-col justify-between">
                  <div>
                    <p className="text-incesa-accent-light/60 text-xs font-bold uppercase tracking-[0.2em] mb-2">{t('about.badge')}</p>
                    <p className="text-white font-heading text-xl font-bold leading-snug">{t('home.statsCard')}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { val: '2015', lbl: t('stats.founded') },
                      { val: '21+', lbl: t('stats.labs') },
                      { val: '6', lbl: t('stats.centers') },
                      { val: '100+', lbl: t('stats.researchers') },
                    ].map(({ val, lbl }) => (
                      <div key={lbl} className="bg-white/10 rounded-2xl p-4">
                        <div className="font-heading text-2xl font-black text-white">{val}</div>
                        <div className="text-incesa-accent-light/70 text-xs mt-0.5">{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2 — Photo gallery (2 real INCESA photos) */}
      <section className="section-py bg-incesa-light dark:bg-gray-900">
        <div className="container-padded">
          <FadeUp>
            <div className="mb-8">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-3">
                {isRo ? 'La Fața Locului' : 'On the Ground'}
              </span>
              <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white">
                {isRo ? 'INCESA în Imagini' : 'INCESA in Images'}
              </h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { src: '/images/incesa-facility-1.jpg', caption: isRo ? 'Campus INCESA' : 'INCESA Campus' },
              { src: '/images/incesa-facility-2.jpg', caption: isRo ? 'Infrastructura de Cercetare' : 'Research Infrastructure' },
            ].map((photo, i) => (
              <motion.div
                key={photo.src}
                className="relative rounded-2xl overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-incesa-blue/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-sm font-semibold">{photo.caption}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Scope of Activity (full statute list) */}
      <section id="activities" className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {isRo ? 'Obiectul de Activitate' : 'Scope of Activity'}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-incesa-blue dark:text-white">
                {isRo ? 'Ce Face INCESA' : 'What INCESA Does'}
              </h2>
              <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
                {isRo
                  ? 'INCESA organizează și desfășoară următoarele activități, conform statutului de înființare.'
                  : 'INCESA organizes and carries out the following activities, as defined in its founding statute.'}
              </p>
            </div>
          </FadeUp>

          {/* RDI Activities */}
          <FadeUp>
            <div className="mb-5 rounded-2xl border border-incesa-accent/25 bg-incesa-accent/5 dark:bg-incesa-accent/8 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-incesa-accent flex items-center justify-center font-heading font-black text-white text-sm flex-shrink-0">1</div>
                <div>
                  <h3 className="font-heading font-bold text-incesa-blue dark:text-white text-lg">
                    {isRo ? 'Activități CDI' : 'RDI Activities'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isRo ? 'Cercetare, Dezvoltare și Inovare' : 'Research, Development and Innovation'}
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {RDI_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.code}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-incesa-accent text-white text-xs font-bold flex-shrink-0 mt-0.5">
                      {item.code.toUpperCase()}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isRo ? item.ro : item.en}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Related Activities */}
          <FadeUp delay={0.08}>
            <div className="rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-slate-500 flex items-center justify-center font-heading font-black text-white text-sm flex-shrink-0">2</div>
                <div>
                  <h3 className="font-heading font-bold text-incesa-blue dark:text-white text-lg">
                    {isRo ? 'Activități Conexe CDI' : 'Activities Related to RDI'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isRo ? '17 tipuri de activități complementare' : '17 types of complementary activities'}
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {RELATED_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.code}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="flex items-start gap-2.5"
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-slate-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      {item.code.toUpperCase()}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {isRo ? item.ro : item.en}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 4 — Organizational Structure */}
      <section id="structure" className="section-py" style={{ background: 'linear-gradient(135deg, #060e2e, #0a2463)' }}>
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent-light mb-4">
                {isRo ? 'Structura Organizatorică' : 'Organizational Structure'}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                {isRo ? 'Cum Este Organizat INCESA' : 'How INCESA Is Organized'}
              </h2>
            </div>
          </FadeUp>

          {/* Structure hierarchy */}
          <div className="grid lg:grid-cols-3 gap-5 mb-8">
            {[
              {
                icon: Layers,
                color: '#3e92cc',
                en: { title: 'Laboratories', sub: 'Elementary RDI units', desc: '21 specialized CDI laboratories established according to the dynamics of INCESA activities. Multiple homogeneous labs form a Research Center.' },
                ro: { title: 'Laboratoare', sub: 'Unități CDI elementare', desc: '21 de laboratoare CDI specializate, create conform dinamicii activităților INCESA. Mai multe laboratoare omogene formează un Centru de Cercetare.' },
              },
              {
                icon: FlaskConical,
                color: '#10b981',
                en: { title: 'Research Centers', sub: '6 RDI centers', desc: 'Six research domains: Electrical Engineering, Mechanical Engineering, Biotechnology, Computer Science, Social Sciences, and Support Centers.' },
                ro: { title: 'Centre de Cercetare', sub: '6 centre CDI', desc: 'Șase domenii de cercetare: Inginerie Electrică, Inginerie Mecanică, Biotehnologie, Informatică, Științe Sociale și Centre Suport.' },
              },
              {
                icon: Users,
                color: '#8b5cf6',
                en: { title: 'Management', sub: 'Executive leadership', desc: 'General Manager, Scientific Manager and Economic Manager lead INCESA. Center Heads manage subordinate centers. All are coordinated through the Board of Directors.' },
                ro: { title: 'Management', sub: 'Conducere executivă', desc: 'Director General, Director Științific și Director Economic conduc INCESA. Directorii de centre gestionează centrele subordonate. Toți sunt coordonați prin Consiliul de Administrație.' },
              },
            ].map((item, i) => {
              const Icon = item.icon
              const c = isRo ? item.ro : item.en
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}25` }}>
                    <Icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="font-heading font-bold text-white mb-1">{c.title}</h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: item.color }}>{c.sub}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{c.desc}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Support Centers */}
          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-5 h-5 text-incesa-accent-light" />
                <h3 className="font-heading font-bold text-white">
                  {isRo ? 'Centre Suport INCESA' : 'INCESA Support Centers'}
                </h3>
              </div>
              <p className="text-white/55 text-sm mb-6 max-w-2xl">
                {isRo
                  ? 'Pe lângă centrele CDI, INCESA include și următoarele centre suport care asigură infrastructura operațională și instituțională:'
                  : 'In addition to RDI centers, INCESA also includes the following support centers that provide operational and institutional infrastructure:'}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SUPPORT_CENTERS.map((center, i) => (
                  <motion.div
                    key={center.en}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <a
                      href={center.href}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/12 hover:border-white/20 transition-all group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: center.accent }} />
                      <span className="text-sm text-white/80 group-hover:text-white transition-colors leading-relaxed font-medium flex-1">
                        {isRo ? center.ro : center.en}
                      </span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0 duration-200" style={{ color: center.accent }}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 5 — Values */}
      <section className="section-py bg-incesa-light dark:bg-gray-900">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">{t('about.valuesLabel')}</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-incesa-blue dark:text-white">{t('about.valuesHeadline')}</h2>
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.isArray(values) && values.map(({ icon, title, desc }, i) => {
              const Icon = ICON_MAP[icon] ?? FlaskConical
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(62,146,204,0.18)' }}
                  className="p-6 rounded-2xl border border-slate-100 dark:border-gray-800 hover:border-incesa-accent/30 bg-white dark:bg-gray-900 transition-colors cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-incesa-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-incesa-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6 — History */}
      <section id="history" className="section-py" style={{ background: 'linear-gradient(135deg, #060e2e, #0a2463)' }}>
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent-light mb-4">{t('about.historyLabel')}</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">{t('about.historyHeadline')}</h2>
            </div>
          </FadeUp>
          <div className="hidden sm:block relative mb-8">
            <motion.div
              className="h-0.5 bg-gradient-to-r from-incesa-accent/20 via-incesa-accent to-incesa-accent/20"
              style={{ transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
              aria-hidden="true"
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(historyItems) && historyItems.map(({ year, text }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="relative"
              >
                <motion.div
                  className="w-3 h-3 rounded-full bg-incesa-accent mb-4 hidden sm:block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 + 0.3, type: 'spring', stiffness: 300 }}
                  aria-hidden="true"
                />
                <div className="sm:hidden pl-6 border-l border-white/20">
                  <div className="font-heading text-2xl font-black text-incesa-accent mb-2">{year}</div>
                  <p className="text-white/70 text-sm leading-relaxed">{text}</p>
                </div>
                <div className="hidden sm:block">
                  <div className="font-heading text-2xl font-black text-incesa-accent mb-2">{year}</div>
                  <p className="text-white/70 text-sm leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Vision */}
      <section className="section-py bg-incesa-light dark:bg-gray-900 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 font-heading font-black select-none pointer-events-none leading-none"
          style={{ fontSize: '14rem', color: 'rgba(10,36,99,0.05)', top: '-2rem' }}
          aria-hidden="true"
        >
          &ldquo;
        </div>
        <div className="container-padded max-w-3xl text-center relative z-10">
          <FadeUp>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">{t('about.visionLabel')}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-incesa-blue dark:text-white mb-6">{t('about.visionHeadline')}</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{t('about.vision')}</p>
            <div className="flex items-center justify-center gap-3 mt-8" aria-hidden="true">
              <motion.div className="h-px bg-incesa-accent/30" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} />
              <div className="w-1.5 h-1.5 rounded-full bg-incesa-accent" />
              <motion.div className="h-px bg-incesa-accent/30" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} />
            </div>
          </FadeUp>
        </div>
      </section>
    </PageWrapper>
  )
}
