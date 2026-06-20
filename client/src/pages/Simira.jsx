import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight, FlaskConical, Network, Cpu, Users, Calendar, MapPin, Layers, FileText, Download, Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/layout/PageWrapper'
import MotionButton from '../components/ui/MotionButton'

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

const RESEARCH_AREAS = [
  {
    icon: FlaskConical,
    color: '#10b981',
    en: { title: 'Biotechnology', desc: 'Advanced biochemical process modelling and innovative biotechnological techniques for agricultural and environmental applications.' },
    ro: { title: 'Biotehnologie', desc: 'Modelare avansată a proceselor biochimice și tehnici biotehnologice inovatoare pentru aplicații agricole și de mediu.' },
  },
  {
    icon: Network,
    color: '#3e92cc',
    en: { title: 'Smart Systems', desc: 'Intelligent sensors, data acquisition, and network-based monitoring systems for real-time environmental and process control.' },
    ro: { title: 'Sisteme Inteligente', desc: 'Senzori inteligenți, achiziție de date și sisteme de monitorizare în rețea pentru control ambiental și de proces în timp real.' },
  },
  {
    icon: Cpu,
    color: '#8b5cf6',
    en: { title: 'AI & Data Science', desc: 'Machine learning models and big data analytics applied to research outputs, quality control, and predictive modelling.' },
    ro: { title: 'IA și Știința Datelor', desc: 'Modele de machine learning și analiză big data aplicate rezultatelor cercetării, controlului calității și modelării predictive.' },
  },
  {
    icon: Users,
    color: '#f97316',
    en: { title: 'Interdisciplinary Collaboration', desc: 'Bringing together specialists from multiple INCESA centers alongside regional and international academic partners.' },
    ro: { title: 'Colaborare Interdisciplinară', desc: 'Reunind specialiști din mai multe centre INCESA alături de parteneri academici regionali și internaționali.' },
  },
]

const TIMELINE = [
  { phase: '01', en: { label: 'Project Launch', desc: 'Consortium established, objectives defined, and institutional agreements signed.' }, ro: { label: 'Lansarea Proiectului', desc: 'Consorțiu constituit, obiective definite și acorduri instituționale semnate.' } },
  { phase: '02', en: { label: 'Research & Development', desc: 'Active laboratory work, data collection, and interdisciplinary collaboration across INCESA centers.' }, ro: { label: 'Cercetare și Dezvoltare', desc: 'Activitate de laborator activă, colectare de date și colaborare interdisciplinară între centrele INCESA.' } },
  { phase: '03', en: { label: 'Validation & Testing', desc: 'Results validated against international benchmarks, peer review, and partner verification.' }, ro: { label: 'Validare și Testare', desc: 'Rezultate validate față de repere internaționale, revizuire inter pares și verificare de parteneri.' } },
  { phase: '04', en: { label: 'Dissemination', desc: 'Publications, conference presentations, and technology transfer to industry partners.' }, ro: { label: 'Diseminare', desc: 'Publicații, prezentări la conferințe și transfer tehnologic către partenerii industriali.' } },
]

export default function Simira() {
  const { i18n } = useTranslation()
  const isRo = i18n.language === 'ro'
  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true, amount: 0.3 })

  return (
    <PageWrapper>
      <Helmet>
        <title>SIMIRA Research Project — INCESA</title>
        <meta name="description" content="SIMIRA is an active interdisciplinary research project at INCESA, bringing together multiple centers and international partners." />
      </Helmet>

      {/* Hero */}
      <section
        className="relative pt-36 pb-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060e2e 0%, #0d1f3c 50%, #060e2e 100%)' }}
      >
        <div className="absolute inset-0 grid-dots-dark opacity-40" aria-hidden="true" />

        {/* Animated glow orbs */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: 500, height: 500, top: '-100px', left: '-100px', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: 400, height: 400, bottom: '-80px', right: '-80px', background: 'radial-gradient(circle, rgba(62,146,204,0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          aria-hidden="true"
        />

        <div className="relative z-10 container-padded">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs text-white/40 mb-8"
          >
            <Link to="/research" className="hover:text-white/70 transition-colors">
              {isRo ? 'Cercetare' : 'Research'}
            </Link>
            <span>/</span>
            <Link to="/research/projects" className="hover:text-white/70 transition-colors">
              {isRo ? 'Proiecte' : 'Projects'}
            </Link>
            <span>/</span>
            <span className="text-white/60">SIMIRA</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-[0.15em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {isRo ? 'Proiect Activ' : 'Active Project'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-incesa-accent/15 border border-incesa-accent/25 text-incesa-accent-light text-xs font-semibold uppercase tracking-[0.15em]">
                  {isRo ? 'Cercetare Aplicată' : 'Applied Research'}
                </span>
              </motion.div>

              <motion.h1
                className="font-heading font-black text-white leading-none mb-6"
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.04em' }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                SIMIRA
              </motion.h1>

              <motion.p
                className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
              >
                {isRo
                  ? 'Un proiect de cercetare interdisciplinar desfășurat la INCESA, reunind expertiză din multiple centre pentru a aborda provocări complexe prin știință aplicată și inovare colaborativă.'
                  : 'An interdisciplinary research project at INCESA, uniting expertise from multiple centers to address complex challenges through applied science and collaborative innovation.'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-wrap gap-4"
              >
                <MotionButton to="/contact" variant="primary">
                  {isRo ? 'Contactează Echipa' : 'Contact the Team'} <ArrowRight className="w-4 h-4" />
                </MotionButton>
                <MotionButton to="/research/projects" variant="ghost">
                  {isRo ? 'Toate Proiectele' : 'All Projects'}
                </MotionButton>
              </motion.div>
            </div>

            {/* Meta card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="p-8">
                <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                  {isRo ? 'Detalii Proiect' : 'Project Details'}
                </p>
                <div className="space-y-5">
                  {[
                    { icon: Calendar, label: isRo ? 'Status' : 'Status', value: isRo ? 'În desfășurare' : 'Ongoing' },
                    { icon: MapPin, label: isRo ? 'Locație' : 'Location', value: 'INCESA, University of Craiova' },
                    { icon: Layers, label: isRo ? 'Domenii' : 'Domains', value: isRo ? 'Biotehnologie · IA · Sisteme Inteligente' : 'Biotechnology · AI · Smart Systems' },
                    { icon: Users, label: isRo ? 'Tip' : 'Type', value: isRo ? 'Proiect Interdisciplinar' : 'Interdisciplinary Project' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-incesa-accent-light/60" />
                      </div>
                      <div>
                        <p className="text-white/30 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="text-white/80 text-sm font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          {/* Cover banner */}
          <FadeUp>
            <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/simira-cover.png"
                alt="SIMIRA Project"
                className="w-full object-cover"
              />
            </div>
          </FadeUp>

          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {isRo ? 'Arii de Cercetare' : 'Research Areas'}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-incesa-blue dark:text-white">
                {isRo ? 'Domeniile Proiectului' : 'Project Focus Areas'}
              </h2>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RESEARCH_AREAS.map((area, i) => {
              const Icon = area.icon
              const c = isRo ? area.ro : area.en
              return (
                <FadeUp key={area.en.title} delay={i * 0.08}>
                  <motion.div
                    className="p-6 rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 h-full relative overflow-hidden"
                    whileHover={{ y: -5, boxShadow: `0 20px 40px -12px ${area.color}30` }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: `linear-gradient(90deg, ${area.color}, transparent)` }}
                    />
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${area.color}18` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: area.color }} />
                    </div>
                    <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-2">{c.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{c.desc}</p>
                  </motion.div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* Project Timeline */}
      <section className="section-py bg-incesa-light dark:bg-gray-900 overflow-hidden">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {isRo ? 'Fazele Proiectului' : 'Project Phases'}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-incesa-blue dark:text-white">
                {isRo ? 'De la Idee la Impact' : 'From Idea to Impact'}
              </h2>
            </div>
          </FadeUp>

          <div className="hidden lg:block relative max-w-5xl mx-auto" ref={lineRef}>
            {/* Connector line */}
            <motion.div
              className="absolute h-0.5 z-0"
              style={{
                top: 32, left: '12%', right: '12%',
                transformOrigin: 'left',
                background: 'linear-gradient(90deg, #10b981, #3e92cc, #8b5cf6, #f97316)',
              }}
              initial={{ scaleX: 0 }}
              animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
            />
            {lineInView && (
              <div className="absolute z-20 pointer-events-none" style={{ top: 26, left: '12%', right: '12%', height: 2 }}>
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg"
                  style={{ boxShadow: '0 0 10px #3e92cc, 0 0 24px rgba(62,146,204,0.5)' }}
                  animate={{ left: ['-2%', '102%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2, delay: 1.3 }}
                />
              </div>
            )}
            <div className="relative z-10 grid grid-cols-4 gap-4">
              {TIMELINE.map((item, i) => {
                const c = isRo ? item.ro : item.en
                const colors = ['#10b981', '#3e92cc', '#8b5cf6', '#f97316']
                return (
                  <motion.div
                    key={item.phase}
                    className="flex flex-col items-center text-center px-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-900 shadow-xl flex items-center justify-center mb-5 font-heading font-black text-white text-lg"
                      style={{ background: `linear-gradient(135deg, ${colors[i]}cc, ${colors[i]})` }}
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.12 + 0.1 }}
                      whileHover={{ scale: 1.08 }}
                    >
                      {item.phase}
                    </motion.div>
                    <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-2 text-sm">{c.label}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{c.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden max-w-md mx-auto space-y-0">
            {TIMELINE.map((item, i) => {
              const c = isRo ? item.ro : item.en
              const colors = ['#10b981', '#3e92cc', '#8b5cf6', '#f97316']
              return (
                <motion.div
                  key={item.phase}
                  className="flex gap-5 items-start"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                >
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 shadow-lg flex items-center justify-center font-heading font-black text-white text-sm"
                      style={{ background: colors[i] }}
                    >
                      {item.phase}
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div className="w-0.5 flex-1 my-2 min-h-[32px]" style={{ background: `linear-gradient(to bottom, ${colors[i]}, ${colors[i + 1]})` }} />
                    )}
                  </div>
                  <div className="pt-1 pb-8">
                    <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-1.5">{c.label}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* System Modules */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {isRo ? 'Modulele Sistemului' : 'System Modules'}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-incesa-blue dark:text-white">
                {isRo ? 'Descrierea Modulelor SIMIRA' : 'SIMIRA Module Descriptions'}
              </h2>
              <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
                {isRo
                  ? 'Cele 5 module funcționează sinergic pentru a crea un ecosistem integrat de management și interacțiune bazat pe realitate augmentată.'
                  : 'The 5 modules work synergistically to create an integrated management and interaction ecosystem based on augmented reality.'}
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                letter: 'A', color: '#3e92cc', photo: '/images/simira-chat.png',
                en: {
                  title: 'CHAT — Intelligent Communication',
                  purpose: 'Secure professional communication platform eliminating traditional email disadvantages and external messaging apps.',
                  features: ['End-to-end encryption for all conversations', 'Smart read/receipt confirmations with timestamps', 'AI algorithms for spam detection and filtering', 'GDPR-compliant group management', 'Cross-module sync with TASK, DRIVE and LIVE', 'Unified interface with all system components', 'Smart archiving: search by content, date, participants', 'Real-time multilingual auto-translation'],
                },
                ro: {
                  title: 'CHAT — Comunicare Inteligentă',
                  purpose: 'Platformă de comunicare profesională securizată care elimină dezavantajele email-ului tradițional și aplicațiilor externe.',
                  features: ['Criptare end-to-end pentru toate conversațiile', 'Confirmări inteligente citire/recepție cu timestamp', 'Algoritmi AI pentru detectarea și blocarea spam-ului', 'Gestionare grupuri GDPR-compliant', 'Sincronizare inter-modulară cu Task, Drive și Live', 'Interfață unificată cu celelalte componente', 'Arhivare inteligentă după conținut, dată, participanți', 'Traducere automată multilinguală în timp real'],
                },
              },
              {
                letter: 'B', color: '#8b5cf6', photo: '/images/simira-drive.jpg',
                en: {
                  title: 'DRIVE — Intelligent Cloud Storage',
                  purpose: 'Centralized, secure, intelligent document storage system for all types of organization documents and media.',
                  features: ['Hierarchical automatic document organization', 'Granular permissions: users, groups, departments', 'Automatic redundancy and fast-recovery backup', 'Smart versioning with visual comparisons', 'AI indexing: search text, image, video content', 'Seamless multi-device access sync', 'Real-time collaborative editing with conflict resolution', 'AR integration: view documents via smart glasses'],
                },
                ro: {
                  title: 'DRIVE — Stocare Cloud Inteligentă',
                  purpose: 'Sistem de stocare centralizat, securizat și inteligent pentru toate tipurile de documente și media ale organizației.',
                  features: ['Organizare ierarhică automată a documentelor', 'Drepturi granulare pe utilizatori, grupuri, departamente', 'Redundanță și backup automat cu recovery rapid', 'Versioning inteligent cu comparații vizuale', 'Indexare AI: căutare în text, imagine, video', 'Sincronizare multi-device seamless', 'Editare simultană cu conflict resolution', 'Integrare AR: vizualizare documente prin ochelari'],
                },
              },
              {
                letter: 'C', color: '#10b981', photo: '/images/simira-task.jpg',
                en: {
                  title: 'TASK — Project Management',
                  purpose: 'AI-powered automation and optimization of project and task management processes.',
                  features: ['Predictive planning: AI estimates times & resources', 'Automatic task assignment by skills & availability', 'Real-time dashboards with live progress tracking', 'Automated workflow triggering next stages', 'Multi-level customized reporting', 'Calendar integration and sync', 'Smart notifications on multiple channels', 'Performance analytics: metrics and KPIs'],
                },
                ro: {
                  title: 'TASK — Management Proiecte',
                  purpose: 'Automatizarea și optimizarea proceselor de management al proiectelor și sarcinilor prin inteligență artificială.',
                  features: ['Planificare predictivă: AI estimează timpi și resurse', 'Asignare automată pe bază de competențe și disponibilitate', 'Dashboard-uri live cu progress tracking în timp real', 'Workflow automatizat: declanșarea etapelor următoare', 'Raportare multi-nivel personalizată', 'Integrare și sincronizare calendar', 'Notificări inteligente pe multiple canale', 'Analiză performanță: metrici și KPI-uri'],
                },
              },
              {
                letter: 'D', color: '#f97316', photo: '/images/simira-live.jpg',
                en: {
                  title: 'LIVE — AR Remote Assistance',
                  purpose: 'Real-time technical assistance via augmented reality and artificial intelligence.',
                  features: ['Session management via ticket system', 'HD video stream from smart glasses in real time', 'AR overlay: digital instructions over reality', 'AI virtual assistant with voice recognition', 'On-demand connection with certified human experts', 'Simultaneous multilingual translation', 'Real-time speech-to-text subtitles', 'AI session report generated automatically at end'],
                },
                ro: {
                  title: 'LIVE — Teleasistență AR',
                  purpose: 'Oferirea de asistență tehnică în timp real prin tehnologia de realitate augmentată și inteligență artificială.',
                  features: ['Management sesiuni prin emitere de tichet', 'Stream video HD de la ochelarii inteligenți', 'Overlay AR: instrucțiuni digitale peste realitate', 'Asistent virtual AI cu recunoaștere vocală', 'Conectare cu specialiști certificați la cerere', 'Traducere simultană multilinguală instantanee', 'Subtitrare speech-to-text în timp real', 'Raport AI elaborat automat la finalul sesiunii'],
                },
              },
              {
                letter: 'E', color: '#ec4899', photo: '/images/simira-cast.jpg',
                en: {
                  title: 'CAST 3D — Anamorphic Digital Content',
                  purpose: 'Development and broadcasting of anamorphic and 3D digital content for impactful presentations and physical materialization.',
                  features: ['Anamorphic content with optical illusion effects', '3D model generation from scripts', 'Reusable component library for fast creation', 'Advanced customization for each client', 'Multi-format export for diverse display types', 'Smart distribution on display networks', 'Physical materialization: laser engraving, 3D printing', 'Supported: LED panels, holographic fans, transparent panels'],
                },
                ro: {
                  title: 'CAST 3D — Conținut Digital Anamorfic',
                  purpose: 'Dezvoltarea și difuzarea de conținut digital anamorfic și 3D pentru prezentări impactante și materializare fizică.',
                  features: ['Conținut anamorfic cu efecte de iluzii optice', 'Generare modele 3D complexe din script-uri', 'Bibliotecă de componente reutilizabile', 'Personalizare avansată pentru fiecare client', 'Multi-format export pentru diverse tipuri de afișaje', 'Difuzare inteligentă pe rețelele de display', 'Materializare fizică: gravare laser, printare 3D', 'Suportate: panouri LED, ventilatoare holografice, panouri transparente'],
                },
              },
            ].map((mod, i) => {
              const c = isRo ? mod.ro : mod.en
              return (
                <FadeUp key={mod.letter} delay={i * 0.07}>
                  <motion.div
                    className="rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden h-full flex flex-col"
                    whileHover={{ y: -4, boxShadow: `0 20px 40px -12px ${mod.color}25` }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <div className="h-1" style={{ background: `linear-gradient(90deg, ${mod.color}, transparent)` }} />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-heading font-black text-white text-sm flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${mod.color}cc, ${mod.color})` }}
                        >
                          {mod.letter}
                        </div>
                        <h3 className="font-heading font-bold text-incesa-blue dark:text-white leading-snug text-sm">
                          {c.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                        {c.purpose}
                      </p>
                      <ul className="space-y-1.5 mt-auto">
                        {c.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: mod.color }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </FadeUp>
              )
            })}

            {/* Module integration card */}
            <FadeUp delay={0.35}>
              <motion.div
                className="rounded-2xl overflow-hidden h-full flex flex-col"
                style={{ background: 'linear-gradient(135deg, #060e2e, #0a2463)' }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.22 }}
              >
                <div className="h-1 bg-gradient-to-r from-emerald-500 via-incesa-accent to-pink-500" />
                <div className="p-6 flex flex-col flex-1 relative overflow-hidden">
                  <div className="absolute inset-0 grid-dots-dark opacity-30" aria-hidden="true" />
                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="flex gap-1.5 mb-4 flex-wrap">
                      {['A', 'B', 'C', 'D', 'E'].map((l, li) => {
                        const cols = ['#3e92cc', '#8b5cf6', '#10b981', '#f97316', '#ec4899']
                        return (
                          <span key={l} className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-black text-white text-xs"
                            style={{ background: cols[li] }}>{l}</span>
                        )
                      })}
                    </div>
                    <h3 className="font-heading font-bold text-white mb-2">
                      {isRo ? 'Integrarea Modulelor' : 'Module Integration'}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed flex-1">
                      {isRo
                        ? 'Chat facilitează comunicarea • Drive gestionează datele • Task coordonează workflow-urile • Live oferă suport în timp real • Cast 3D creează conținut vizual'
                        : 'Chat enables communication • Drive manages all data • Task coordinates workflows • Live provides real-time support • Cast 3D creates visual content'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* System Architecture & Screenshots */}
      <section className="section-py bg-incesa-light dark:bg-gray-900">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {isRo ? 'Arhitectura Sistemului' : 'System Architecture'}
              </span>
              <h2 className="font-heading text-3xl font-bold text-incesa-blue dark:text-white">
                {isRo ? 'Diagrame & Capturi de Ecran' : 'Diagrams & Screenshots'}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {isRo ? 'Clic pe imagine pentru a deschide în tab nou' : 'Click any image to open full size in a new tab'}
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                src: '/images/simira-diagram.png',
                en: { title: 'System Architecture Diagram', desc: 'Detailed technical diagram showing the full SIMIRA system architecture and module interconnections.' },
                ro: { title: 'Diagrama Arhitecturii Sistemului', desc: 'Diagramă tehnică detaliată care ilustrează arhitectura completă a sistemului SIMIRA și interconexiunile modulelor.' },
                accent: '#3e92cc',
              },
              {
                src: '/images/simira-screenshot.png',
                en: { title: 'Platform Screenshot', desc: 'Live screenshot of the SIMIRA platform interface showing active module interactions and the integrated dashboard.' },
                ro: { title: 'Captură de Ecran a Platformei', desc: 'Captură de ecran din platforma SIMIRA activă, ilustrând interacțiunile modulelor și tabloul de bord integrat.' },
                accent: '#10b981',
              },
            ].map((img, i) => {
              const c = isRo ? img.ro : img.en
              return (
                <FadeUp key={img.src} delay={i * 0.1}>
                  <a
                    href={img.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:shadow-xl hover:shadow-incesa-accent/10 transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <div className="aspect-[4/3] bg-slate-50 dark:bg-gray-900">
                        <img
                          src={img.src}
                          alt={c.title}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="inline-flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm" style={{ color: img.accent }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          {isRo ? 'Deschide în tab nou' : 'Open in new tab'}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start gap-2">
                        <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: img.accent }} />
                        <div>
                          <p className="font-heading font-bold text-incesa-blue dark:text-white text-sm mb-1">{c.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{c.desc}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* Press & Documents */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                <Newspaper className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
                {isRo ? 'Presă & Documente' : 'Press & Documents'}
              </span>
              <h2 className="font-heading text-3xl font-bold text-incesa-blue dark:text-white">
                {isRo ? 'Comunicate și Materiale' : 'Releases & Materials'}
              </h2>
            </div>
          </FadeUp>

          <div className="max-w-2xl mx-auto">
            <FadeUp delay={0.08}>
              <motion.a
                href="/documents/COMUNICATPRESA_SIMIRA.pdf"
                download="COMUNICATPRESA_SIMIRA.pdf"
                className="group flex items-center gap-5 p-6 rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-incesa-accent/40 hover:shadow-xl hover:shadow-incesa-accent/8 transition-all"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3e92cc18, #3e92cc30)' }}>
                  <FileText className="w-6 h-6 text-incesa-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-incesa-accent">
                      {isRo ? 'Comunicat de Presă' : 'Press Release'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-gray-800 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">PDF</span>
                  </div>
                  <p className="font-heading font-bold text-incesa-blue dark:text-white leading-snug">
                    COMUNICAT DE PRESĂ — Proiect SIMIRA
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {isRo ? 'Document oficial publicat de INCESA' : 'Official document published by INCESA'}
                  </p>
                </div>
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-incesa-light dark:bg-gray-800 flex items-center justify-center group-hover:bg-incesa-accent group-hover:text-white transition-colors">
                  <Download className="w-4 h-4 text-incesa-accent group-hover:text-white transition-colors" />
                </div>
              </motion.a>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
                {isRo
                  ? 'Pentru mai multe știri și actualizări despre proiectul SIMIRA, vizitați pagina oficială INCESA.'
                  : 'For more news and updates about the SIMIRA project, visit the official INCESA page.'}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py" style={{ background: 'linear-gradient(135deg, #060e2e, #0a2463)' }}>
        <div className="container-padded text-center">
          <FadeUp>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-[0.15em] mb-6">
              {isRo ? 'Proiect Activ' : 'Active Project'}
            </span>
            <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl mb-4">
              {isRo ? 'Interesat de Colaborare?' : 'Interested in Collaboration?'}
            </h2>
            <p className="text-white/65 max-w-xl mx-auto mb-8 leading-relaxed">
              {isRo
                ? 'Contactați echipa INCESA pentru a afla mai multe despre proiectul SIMIRA și oportunitățile de parteneriat.'
                : 'Contact the INCESA team to learn more about the SIMIRA project and partnership opportunities.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <MotionButton to="/contact" size="lg">
                {isRo ? 'Contactați-ne' : 'Get in Touch'} <ArrowRight className="w-4 h-4" />
              </MotionButton>
              <MotionButton to="/research/projects" variant="ghost" size="lg">
                {isRo ? 'Toate Proiectele' : 'All Projects'}
              </MotionButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </PageWrapper>
  )
}
