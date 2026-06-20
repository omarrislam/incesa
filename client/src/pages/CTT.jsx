import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Microscope, BookOpen, GraduationCap, Link as LinkIcon,
  ArrowRight, CheckCircle2, MessageCircle, Search, FileText, FlaskConical, Share2,
  Globe, Zap, Factory,
} from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import MotionButton from '../components/ui/MotionButton'

const SVC_ICON_MAP = { Microscope, BookOpen, GraduationCap, Link: LinkIcon }

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

/* ── Journey steps data ─────────────────────────────────────── */
const STEPS_EN = [
  {
    num: '01',
    icon: MessageCircle,
    title: 'First Contact',
    body: 'Reach out by email or phone. We respond within 24 hours and schedule a free discovery call to understand your challenge and goals.',
  },
  {
    num: '02',
    icon: Search,
    title: 'Research Matching',
    body: 'Our coordinators identify the best-fit researchers and labs from our 6 centers and 21 specialized labs for your exact need.',
  },
  {
    num: '03',
    icon: FileText,
    title: 'Project Design',
    body: 'Together we scope the research: deliverables, milestones, timeline, budget, and funding strategy — including EU Horizon grants if applicable.',
  },
  {
    num: '04',
    icon: FlaskConical,
    title: 'Research Execution',
    body: 'Our labs get to work. You receive regular milestone reports, direct researcher access, and full transparency throughout.',
  },
  {
    num: '05',
    icon: Share2,
    title: 'Results & Transfer',
    body: 'Documented results, IP protection guidance, and commercialization support are delivered. Long-term collaboration can continue.',
  },
]

const STEPS_RO = [
  {
    num: '01',
    icon: MessageCircle,
    title: 'Primul Contact',
    body: 'Contactați-ne prin email sau telefon. Răspundem în 24 de ore și programăm o consultație gratuită pentru a înțelege provocarea dvs.',
  },
  {
    num: '02',
    icon: Search,
    title: 'Evaluarea Necesității',
    body: 'Coordonatorii noștri identifică cercetătorii și laboratoarele potrivite din 6 centre și 21 de laboratoare specializate.',
  },
  {
    num: '03',
    icon: FileText,
    title: 'Proiectarea Cercetării',
    body: 'Împreună definim scopul, livrabilele, jaloanele, bugetul și strategia de finanțare — inclusiv granturi EU Horizon dacă este cazul.',
  },
  {
    num: '04',
    icon: FlaskConical,
    title: 'Execuția Cercetării',
    body: 'Laboratoarele noastre lucrează la proiect. Primiți rapoarte de progres, acces direct la cercetători și transparență deplină.',
  },
  {
    num: '05',
    icon: Share2,
    title: 'Rezultate și Transfer',
    body: 'Livrăm rezultate documentate, ghidare pentru protecția proprietății intelectuale și sprijin complet pentru comercializare.',
  },
]

/* ── Animated step node ─────────────────────────────────────── */
function StepNode({ step, index, isLast, accentFrom, accentTo }) {
  const Icon = step.icon
  return (
    <motion.div
      className="flex flex-col items-center text-center px-2"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
    >
      {/* Circle */}
      <motion.div
        className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-900 shadow-xl flex flex-col items-center justify-center mb-5 relative"
        style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 + 0.1 }}
        whileHover={{ scale: 1.08, boxShadow: `0 0 24px ${accentTo}88` }}
      >
        <span className="font-heading font-black text-white text-xs leading-none mb-0.5 opacity-70">
          {step.num}
        </span>
        <Icon className="w-5 h-5 text-white" />
      </motion.div>

      <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-2 text-base leading-snug">
        {step.title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
        {step.body}
      </p>
    </motion.div>
  )
}

/* ── Mobile step (vertical) ─────────────────────────────────── */
function MobileStep({ step, index, isLast, accentFrom, accentTo }) {
  const Icon = step.icon
  return (
    <motion.div
      className="flex gap-5 items-start"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-14 h-14 rounded-full border-4 border-white dark:border-gray-900 shadow-lg flex flex-col items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
        >
          <span className="font-heading font-black text-white text-[10px] leading-none mb-0.5 opacity-70">
            {step.num}
          </span>
          <Icon className="w-4 h-4 text-white" />
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1 my-2"
            style={{ background: `linear-gradient(to bottom, ${accentFrom}, ${accentTo})`, minHeight: 32 }}
          />
        )}
      </div>
      <div className="pt-1 pb-8">
        <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-1.5 text-base">{step.title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.body}</p>
      </div>
    </motion.div>
  )
}

export default function CTT() {
  const { t, i18n } = useTranslation()
  const isRo = i18n.language === 'ro'
  const services = t('ctt.services', { returnObjects: true })
  const steps = isRo ? STEPS_RO : STEPS_EN

  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true, amount: 0.3 })

  const accentFrom = '#0a2463'
  const accentVia = '#3e92cc'
  const accentTo = '#7ec8e3'

  return (
    <PageWrapper>
      <Helmet>
        <title>CTT INCESA — Technology Transfer Center</title>
        <meta name="description" content="CTT INCESA bridges applied research and industry through technology transfer, consulting, training, and strategic partnerships." />
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
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-incesa-accent/20 border border-incesa-accent/30 text-incesa-accent-light text-xs font-semibold uppercase tracking-[0.15em] mb-5"
          >
            {t('ctt.badge')}
          </motion.span>
          <motion.h1
            className="font-heading font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('ctt.title')}
          </motion.h1>
          <motion.p
            className="mt-4 text-white/65 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            {t('ctt.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Team */}
      <section className="section-py bg-incesa-light dark:bg-gray-900">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {isRo ? 'Echipa CTT' : 'The Team'}
              </span>
              <h2 className="font-heading text-3xl font-bold text-incesa-blue dark:text-white">
                {isRo ? 'Specialiștii Noștri' : 'Our Specialists'}
              </h2>
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Buzatu Gabriel-Cosmin', role: 'Center Director', roleRo: 'Director Centru', accent: '#3e92cc', isDirector: true },
              { name: 'Gîngu Oana', role: 'Innovation Activity', roleRo: 'Activitate Inovare', accent: '#10b981' },
              { name: 'Olteanu Edmond Gabriel', role: 'Intellectual Property Activity', roleRo: 'Activitate Proprietate Intelectuală', accent: '#8b5cf6' },
              { name: 'Rușinaru Denisa', role: 'Cooperation & Communication', roleRo: 'Cooperare și Comunicare', accent: '#f59e0b' },
              { name: 'Bîzdoacă Nicu George', role: 'Research-Development-Innovation Activity', roleRo: 'Activitate Cercetare-Dezvoltare-Inovare', accent: '#f97316' },
              { name: 'Băndoi Anca', role: 'Quality Management Activity', roleRo: 'Activitate Management Calitate', accent: '#64748b' },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className={`relative p-6 rounded-2xl bg-white dark:bg-gray-900 border transition-all ${member.isDirector ? 'border-incesa-accent/30 shadow-md shadow-incesa-accent/10' : 'border-slate-100 dark:border-gray-800 hover:border-slate-200 dark:hover:border-gray-700'}`}
              >
                {member.isDirector && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-incesa-accent/10 text-incesa-accent text-[10px] font-bold uppercase tracking-wider">
                    {isRo ? 'Director' : 'Director'}
                  </span>
                )}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 font-heading font-black text-white text-lg"
                  style={{ background: `linear-gradient(135deg, ${member.accent}cc, ${member.accent})` }}
                >
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-heading font-bold text-incesa-blue dark:text-white leading-snug mb-1.5">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {isRo ? member.roleRo : member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose, Mission & Objectives */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {isRo ? 'Cadrul Instituțional' : 'Institutional Framework'}
              </span>
              <h2 className="font-heading text-3xl font-bold text-incesa-blue dark:text-white">
                {isRo ? 'Scop, Misiune & Obiective' : 'Purpose, Mission & Objectives'}
              </h2>
            </div>
          </FadeUp>

          {/* Purpose + Mission side by side */}
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {[
              {
                label: isRo ? 'Scopul CTT INCESA' : 'The Purpose of CTT INCESA',
                color: '#3e92cc',
                text: isRo
                  ? 'Oferirea de asistență și consultanță pentru creșterea competitivității centrului, prin implementarea de proiecte integrate de formare inovatoare — antreprenoriat, informare tehnologică și inovare — vizând modernizarea și creșterea semnificativă a nivelului de performanță și calitate a produselor, tehnologiilor sau serviciilor aplicate în unitățile specifice, în deplină concordanță cu cerințele pieței.'
                  : 'To provide assistance and consultancy to increase the competitiveness of the center, through the implementation of integrated projects of innovative training — entrepreneurship, technological information and innovation — aimed at modernizing and significantly increasing the level of performance and quality of the products, technologies or services applied in specific units, in full agreement with market requirements.',
              },
              {
                label: isRo ? 'Misiunea CTT INCESA' : 'The Mission of CTT INCESA',
                color: '#10b981',
                text: isRo
                  ? 'Dezvoltarea și valorificarea proprietății intelectuale în regiune, pentru a sprijini implementarea și transferul ideilor și tehnologiilor inovatoare de la și către agenții economici, precum și pentru a contribui la creșterea competitivității întreprinderilor din sectoarele: industrie, economie, administrații publice.'
                  : 'The development and valorization of intellectual property in the region, to support the implementation and transfer of innovative ideas and technologies from and to economic agents, as well as to help increase the competitiveness of enterprises in the sectors: industry, economy, public administrations.',
              },
            ].map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.08}>
                <motion.div
                  className="relative p-7 rounded-2xl bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 h-full overflow-hidden"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: item.color }} />
                  <div className="pl-2">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: item.color }}>
                      {item.label}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          {/* Objectives grid */}
          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-slate-100 dark:border-gray-800 bg-incesa-light dark:bg-gray-900 p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-incesa-accent mb-6">
                {isRo ? 'Obiectivele CTT INCESA' : 'The Objectives of CTT INCESA'}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {(isRo ? [
                  'Creșterea potențialului de comunicare și exploatare a proprietății intelectuale în UCV și diseminarea informațiilor din știință și tehnologie.',
                  'Dezvoltarea parteneriatului economic și informațional.',
                  'Creșterea gradului de documentare tehnologică.',
                  'Creșterea potențialului de absorbție tehnologică a agenților economici.',
                  'Formarea/perfecționarea resurselor umane inovatoare.',
                  'Creșterea numărului de IMM-uri care aplică tehnologii noi.',
                  'Introducerea managementului total al calității în domeniul inovării.',
                  'Dezvoltarea rețelelor informaționale inovatoare.',
                  'Introducerea principiilor antreprenoriatului, inovării și transferului tehnologic în educație.',
                  'Creșterea nivelului de informare publică în domeniile științei, tehnologiei și exploatării proprietății intelectuale.',
                ] : [
                  'Increasing the potential for communication and exploitation of intellectual property in UCV and dissemination of information from science and technology.',
                  'Development of economic and informational partnership.',
                  'Increasing the degree of technological documentation.',
                  'Increasing the technological absorption potential of economic agents.',
                  'Training and improvement of innovative human resources.',
                  'Increasing the number of SMEs that apply new technologies.',
                  'Introduction of total quality management in the field of innovation.',
                  'Development of innovative informational networks.',
                  'Introducing the principles of entrepreneurship, innovation and technological transfer in education.',
                  'Increasing the level of public information in the fields of science, technology and the exploitation of intellectual property.',
                ]).map((obj, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-colors"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.04 }}
                  >
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #0a2463, #3e92cc)' }}
                    >
                      {String.fromCharCode(97 + i)}
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{obj}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Official document visual */}
      <section className="py-8 bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-gray-800 shadow-md">
              <img
                src="/images/ctt-doc-1.png"
                alt={isRo ? 'Document oficial CTT INCESA' : 'CTT INCESA Official Document'}
                className="w-full object-contain bg-white"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Services */}
      <section className="section-py bg-incesa-light dark:bg-gray-900">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {isRo ? 'Servicii CTT INCESA' : 'CTT INCESA Services'}
              </span>
              <h2 className="font-heading text-3xl font-bold text-incesa-blue dark:text-white">
                {isRo ? 'Servicii Oferite de CTT INCESA' : 'Services Offered by CTT INCESA'}
              </h2>
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { code: 'a', en: 'Technology Transfer', enDesc: 'Introducing R&D results into the economic circuit through technology transfer.', ro: 'Transfer Tehnologic', roDesc: 'Introducerea rezultatelor activității de C&D în circuitul economic prin transfer tehnologic.' },
              { code: 'b', en: 'Technological Audit', enDesc: 'Assessment and audit of existing technologies and innovation capacity of organizations.', ro: 'Audit Tehnologic', roDesc: 'Evaluarea și auditul tehnologiilor existente și a capacității de inovare a organizațiilor.' },
              { code: 'c', en: 'Intellectual Property', enDesc: 'Assistance and consultancy for protection and exploitation of intellectual property rights.', ro: 'Proprietate Intelectuală', roDesc: 'Asistență și consultanță pentru protecția și exploatarea drepturilor de proprietate intelectuală.' },
              { code: 'd', en: 'Innovation Consultancy', enDesc: 'Assistance and consultancy for innovation and technology transfer processes.', ro: 'Consultanță Inovare', roDesc: 'Asistență și consultanță pentru inovare și procese de transfer tehnologic.' },
              { code: 'e', en: 'Innovation Management', enDesc: 'Assistance for the implementation of innovation management systems in organizations.', ro: 'Management Inovare', roDesc: 'Asistență pentru implementarea sistemului de management al inovării în organizații.' },
              { code: 'f', en: 'Fiscal Facilities R&D', enDesc: 'Consultancy for accessing and obtaining fiscal facilities in the field of R&D&I.', ro: 'Facilități Fiscale CDI', roDesc: 'Consultanță pentru accesarea și obținerea facilităților fiscale în domeniul cercetării, dezvoltării și inovării.' },
              { code: 'g', en: 'RDI Results Evaluation', enDesc: 'Consultancy for evaluation of R&D&I results for accounting registration and value establishment.', ro: 'Evaluare Rezultate CDI', roDesc: 'Consultanță pentru evaluarea rezultatelor CDI în vederea înregistrării contabile și stabilirii valorii.' },
              { code: 'h', en: 'Digitalization Assistance', enDesc: 'Support for digital transformation and implementation of digital tools and platforms.', ro: 'Asistență Digitalizare', roDesc: 'Sprijin pentru transformarea digitală și implementarea de instrumente și platforme digitale.' },
            ].map((svc, i) => (
              <FadeUp key={svc.code} delay={i * 0.07}>
                <motion.div
                  className="p-6 rounded-2xl bg-white dark:bg-gray-950 border border-slate-100 dark:border-gray-800 hover:border-incesa-accent/30 hover:shadow-lg hover:shadow-incesa-accent/5 transition-all h-full relative"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <span className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-incesa-accent/10 flex items-center justify-center font-heading font-black text-incesa-accent text-xs">
                    {svc.code.toUpperCase()}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-incesa-blue/10 dark:bg-incesa-accent/20 flex items-center justify-center mb-4">
                    <Microscope className="w-5 h-5 text-incesa-blue dark:text-incesa-accent-light" />
                  </div>
                  <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-2 pr-6">
                    {isRo ? svc.ro : svc.en}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {isRo ? svc.roDesc : svc.enDesc}
                  </p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Accredited Fields */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {isRo ? 'Domenii Acreditate' : 'Accredited Fields'}
              </span>
              <h2 className="font-heading text-3xl font-bold text-incesa-blue dark:text-white">
                {isRo ? 'Domeniile Noastre de Activitate' : 'Our Fields of Activity'}
              </h2>
              <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">
                {isRo
                  ? 'CTT INCESA este acreditat să desfășoare activități de transfer tehnologic în trei domenii strategice.'
                  : 'CTT INCESA is accredited to carry out technology transfer activities across three strategic domains.'}
              </p>
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Globe,
                en: 'Digital Economy & Space Technologies',
                ro: 'Economie Digitală și Tehnologii Spațiale',
                desc_en: 'Driving digital transformation through AI, cybersecurity, IoT, databases, and space-oriented computing solutions.',
                desc_ro: 'Transformare digitală prin IA, securitate cibernetică, IoT, baze de date și soluții de calcul orientate spre spațiu.',
                color: '#3e92cc',
                glow: 'rgba(62,146,204,0.15)',
              },
              {
                icon: Zap,
                en: 'Energy & Mobility',
                ro: 'Energie și Mobilitate',
                desc_en: 'Innovating clean energy systems, smart grids, electromobility, and sustainable transportation technologies.',
                desc_ro: 'Inovare în sisteme de energie curată, rețele inteligente, electromobilitate și tehnologii de transport sustenabil.',
                color: '#f59e0b',
                glow: 'rgba(245,158,11,0.15)',
              },
              {
                icon: Factory,
                en: 'Advanced Manufacturing',
                ro: 'Producție Avansată',
                desc_en: 'Empowering industry with microtechnologies, materials science, precision engineering, and smart manufacturing processes.',
                desc_ro: 'Capacitarea industriei cu microtehnologii, știința materialelor, inginerie de precizie și procese de producție inteligente.',
                color: '#10b981',
                glow: 'rgba(16,185,129,0.15)',
              },
            ].map((field, i) => {
              const Icon = field.icon
              return (
                <FadeUp key={field.en} delay={i * 0.1}>
                  <motion.div
                    className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-950 border border-slate-100 dark:border-gray-800 p-7 h-full flex flex-col"
                    whileHover={{ y: -5, boxShadow: `0 20px 40px -12px ${field.glow}` }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    {/* Accent top bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: `linear-gradient(90deg, ${field.color}, transparent)` }}
                    />
                    {/* Glow blob */}
                    <div
                      className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${field.glow} 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }}
                      aria-hidden="true"
                    />
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                      style={{ background: `${field.color}18` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: field.color }} />
                    </div>
                    <h3 className="font-heading font-bold text-incesa-blue dark:text-white text-lg mb-3 leading-snug">
                      {isRo ? field.ro : field.en}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
                      {isRo ? field.desc_ro : field.desc_en}
                    </p>
                    <div
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: field.color }}
                    >
                      <span className="w-4 h-px" style={{ background: field.color }} />
                      {isRo ? 'Acreditat' : 'Accredited Field'}
                    </div>
                  </motion.div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* Beneficiaries */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {isRo ? 'Cine Poate Apela la CTT' : 'Who Can Use CTT'}
              </span>
              <h2 className="font-heading text-3xl font-bold text-incesa-blue dark:text-white">
                {isRo ? 'Beneficiarii Serviciilor CTT INCESA' : 'CTT INCESA Service Beneficiaries'}
              </h2>
            </div>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { code: 'a', en: 'Central & local public administration authorities', ro: 'Autorități ale administrației publice centrale și locale' },
              { code: 'b', en: 'Universities and faculties', ro: 'Universități și facultăți' },
              { code: 'c', en: 'Economic agents in the field of technology', ro: 'Agenți economici din domeniul tehnologiei' },
              { code: 'd', en: 'PNCDI programs', ro: 'Programe PNCDI' },
              { code: 'e', en: 'Ministry of Education and Research & state administration bodies', ro: 'Ministerul Educației și Cercetării, alte organisme ale administrației de stat' },
              { code: 'f', en: 'Inventors, university teachers, researchers and young graduates', ro: 'Inventatori, cadre didactice universitare, cercetători și tineri absolvenți de studii superioare' },
              { code: 'g', en: 'Other similar entities', ro: 'Alte entități similare' },
            ].map((b, i) => (
              <motion.div
                key={b.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                className="flex items-start gap-3 p-5 rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-incesa-accent/25 hover:shadow-md hover:shadow-incesa-accent/5 transition-all"
              >
                <span className="w-7 h-7 rounded-lg bg-incesa-accent/10 flex items-center justify-center font-heading font-black text-incesa-accent text-xs flex-shrink-0 mt-0.5">
                  {b.code.toUpperCase()}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isRo ? b.ro : b.en}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FROM FIRST CONTACT TO APPLIED RESULTS ──────────────── */}
      <section className="section-py bg-incesa-light dark:bg-gray-900 overflow-hidden">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-4">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {isRo ? 'Procesul Nostru' : 'Our Process'}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-incesa-blue dark:text-white mb-3">
                {isRo
                  ? 'De la Primul Contact la Rezultate Aplicate'
                  : 'From First Contact to Applied Results'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base">
                {isRo
                  ? 'Iată exact ce se întâmplă când colaborați cu CTT INCESA…'
                  : "Here’s exactly what happens when you work with CTT INCESA…"}
              </p>
            </div>
          </FadeUp>

          {/* ── DESKTOP: horizontal timeline ─────────────────────── */}
          <div className="hidden lg:block mt-16" ref={lineRef}>
            <div className="relative">
              {/* Animated connector line */}
              <motion.div
                aria-hidden="true"
                className="absolute h-0.5 z-0"
                style={{
                  top: 39,
                  left: '10%',
                  right: '10%',
                  transformOrigin: 'left',
                  background: `linear-gradient(90deg, ${accentFrom}, ${accentVia}, ${accentTo})`,
                }}
                initial={{ scaleX: 0 }}
                animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
              />

              {/* Traveling dot along the line */}
              {lineInView && (
                <div
                  aria-hidden="true"
                  className="absolute z-20 pointer-events-none hidden lg:block"
                  style={{ top: 33, left: '10%', right: '10%', height: '2px' }}
                >
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full"
                    style={{
                      background: accentTo,
                      boxShadow: `0 0 8px ${accentTo}, 0 0 20px ${accentVia}80, 0 0 40px ${accentVia}40`,
                    }}
                    animate={{ left: ['-2%', '102%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.4, delay: 1.4 }}
                  />
                </div>
              )}

              {/* 5-column step grid */}
              <div className="relative z-10 grid grid-cols-5 gap-4">
                {steps.map((step, i) => (
                  <StepNode
                    key={step.num}
                    step={step}
                    index={i}
                    isLast={i === steps.length - 1}
                    accentFrom={accentFrom}
                    accentTo={accentVia}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── MOBILE: vertical stack ───────────────────────────── */}
          <div className="lg:hidden mt-12 max-w-md mx-auto">
            {steps.map((step, i) => (
              <MobileStep
                key={step.num}
                step={step}
                index={i}
                isLast={i === steps.length - 1}
                accentFrom={accentFrom}
                accentTo={accentVia}
              />
            ))}
          </div>

          <FadeUp delay={0.1}>
            <div className="text-center mt-12">
              <MotionButton to="/contact" size="lg">
                {isRo ? 'Inițiați o Colaborare' : 'Start a Collaboration'} <ArrowRight className="w-4 h-4" />
              </MotionButton>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* What you get */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {isRo ? 'Ce Obțineți' : 'What You Get'}
              </span>
              <h2 className="font-heading text-3xl font-bold text-incesa-blue dark:text-white mb-6">
                {isRo ? 'Acces la Toată Expertiza INCESA' : 'Access to All of INCESA\'s Expertise'}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                {isRo
                  ? 'CTT INCESA conectează organizația dvs. cu infrastructura completă de cercetare — 21 de laboratoare, 6 domenii, și 100+ oameni de știință dedicați proiectului dvs.'
                  : 'CTT INCESA connects your organization with the full research infrastructure — 21 labs, 6 domains, and 100+ scientists dedicated to your project.'}
              </p>
              <ul className="space-y-3">
                {[
                  { en: 'Technology transfer expertise', ro: 'Expertiză în transfer tehnologic' },
                  { en: 'Access to 21 specialized labs', ro: 'Acces la 21 laboratoare specializate' },
                  { en: '100+ researchers across 6 domains', ro: '100+ cercetători în 6 domenii' },
                  { en: 'EU and national funding support', ro: 'Sprijin pentru finanțare EU și națională' },
                  { en: 'IP protection and management', ro: 'Protecție și gestionare a proprietății intelectuale' },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-incesa-accent flex-shrink-0" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{isRo ? item.ro : item.en}</span>
                  </motion.li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden group">
                <img
                  src="/images/ctt-lab.jpg"
                  alt="CTT INCESA Laboratory"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Stats overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-incesa-blue/90 via-incesa-blue/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-incesa-accent-light/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">CTT INCESA</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { val: '21', lbl: isRo ? 'Labo.' : 'Labs' },
                      { val: '6', lbl: isRo ? 'Centre' : 'Centers' },
                      { val: '100+', lbl: isRo ? 'Cerc.' : 'Research.' },
                      { val: '2015', lbl: isRo ? 'Fondată' : 'Founded' },
                    ].map(({ val, lbl }) => (
                      <div key={lbl} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                        <div className="font-heading font-black text-white text-xl">{val}</div>
                        <div className="text-white/50 text-[10px] mt-0.5">{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py" style={{ background: 'linear-gradient(135deg, #060e2e, #0a2463)' }}>
        <div className="container-padded text-center">
          <FadeUp>
            <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl mb-4">{t('ctt.ctaTitle')}</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">{t('ctt.ctaText')}</p>
            <MotionButton to="/contact" size="lg">
              {t('ctt.ctaButton')} <ArrowRight className="w-4 h-4" />
            </MotionButton>
          </FadeUp>
        </div>
      </section>
    </PageWrapper>
  )
}
