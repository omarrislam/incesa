import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ArrowLeft, ChevronRight, Mail, User, CheckCircle2, ExternalLink } from 'lucide-react'
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

// Real contracts from incesa.ro for socio-economic center
const SOCIO_CONTRACTS = [
  { no: 1,  partner: 'ENGIE Romania SA',                              ref: 'Protocol no. 214 / 13 Jan 2020',      period: '2020–2022' },
  { no: 2,  partner: 'Oltenia Energy Distribution',                   ref: 'Agreement no. 60.1.DJ.314 / 28 Jan 2020', period: '2020–2022' },
  { no: 3,  partner: 'Ford Romania SA',                               ref: 'Contract no. 1252 / 28 Feb 2020',     period: '2020–2021' },
  { no: 4,  partner: 'Vimetco Extrusion SRL',                         ref: 'Contract no. 4058 / 10 Mar 2020',     period: '2020–2023' },
  { no: 5,  partner: 'Clariant Products RO SRL',                      ref: 'Contract no. 4061 / 4 Sep 2020',      period: '2020–2022' },
  { no: 6,  partner: 'Ford Romania SA',                               ref: 'Contract no. 997 / 1 Mar 2021',       period: '2021–2022' },
  { no: 7,  partner: 'Auto Technological High School Craiova',        ref: 'Contract no. 1179 / 11 Mar 2021',     period: '2021–2022' },
  { no: 8,  partner: 'Magna Exteriors (Craiova) SRL',                 ref: 'Contract no. 1488 / 25 Mar 2021',     period: '2021–2023' },
  { no: 9,  partner: 'ETI European Food Industries SA',               ref: 'Contract no. 770 / 8 Apr 2021',       period: '2021–2023' },
  { no: 10, partner: 'Sintec Media SRL',                              ref: 'Contract no. 1380 / 28 Oct 2021',     period: '2021–2022' },
  { no: 11, partner: 'Cummins Generator Technologies SA',             ref: 'Contract no. 863 / 24 Sep 2021',      period: '2021–2023' },
  { no: 12, partner: 'Ford Romania SA',                               ref: 'Contract no. 7997 / 16 Dec 2021',     period: '2021–2022' },
  { no: 13, partner: 'Special Technological High School "Beethoven"', ref: 'Contract no. 2138 / 6 May 2022',      period: '2022–2024' },
  { no: 14, partner: 'Casa Noastra SRL',                              ref: 'Contract no. DJ68195 / 27 Sep 2022',  period: '2022–2024' },
  { no: 15, partner: 'Technological High School "George Bibescu"',    ref: 'Partnership no. 4387 / 20 Oct 2022',  period: '2022–2024' },
  { no: 16, partner: 'Oltenia Energy Distribution',                   ref: 'Agreement no. 60.1DJ 225300 / 7 Dec 2022', period: '2023–2025' },
  { no: 17, partner: 'Gestamp Beycelik Romania SRL',                  ref: 'Contract no. 5054 / 7 Nov 2022',      period: '2022–2024' },
  { no: 18, partner: 'Ford Otosan Romania SRL',                       ref: 'Contract UCV 701 / 13 Feb 2023',      period: '2023–2024' },
  { no: 19, partner: 'Faurecia Romania SRL',                          ref: 'Contract no. 2429 / 6 Feb 2023',      period: '2023–2025' },
  { no: 20, partner: 'Auchan Romania SA',                             ref: 'Agreement no. 1323 / 17 Mar 2023',    period: '2023–2025' },
  { no: 21, partner: 'Romanian Television Society',                   ref: 'Agreement no. 20 / 16 Mar 2023',      period: '2023' },
  { no: 22, partner: 'Vimetco Extrusion SRL',                         ref: 'Contract no. 5750 / 2 Oct 2023',      period: '2023–2026' },
  { no: 23, partner: 'Ford Otosan Romania SRL',                       ref: 'Contract Ford A0/28 / 12 Feb 2024',   period: '2024–2025' },
  { no: 24, partner: 'Romanian Television Society',                   ref: 'Agreement no. 81E / 2 Sep 2024',      period: '2024–2025' },
  { no: 25, partner: 'Cummins Generator Technologies SA',             ref: 'Contract no. 6123 / 9 Oct 2024',      period: '2024–2034' },
  { no: 26, partner: 'Team Montage SRL',                              ref: 'Contract no. 7149 / 12 Dec 2024',     period: '2024–2025' },
  { no: 27, partner: 'Theoretical High School "Ionita Asan", Caracal', ref: 'Protocol no. LTIA 234 / 28 Jan 2025', period: '2025–2028' },
  { no: 28, partner: 'Ford Otosan Romania SRL',                       ref: 'Contract Ford B2/113 / 24 Feb 2025',  period: '2025–2026' },
  { no: 29, partner: 'Craiova International Airport',                 ref: 'Agreement no. UCV 1242 / 21 May 2025', period: '2025–2027' },
]

const CENTERS = {
  communication: {
    accent: '#3e92cc',
    en: {
      title: 'Center for Translation, Communication and Interpretation',
      abbr: 'CTCI',
      head: 'Prof. Titela Vîlceanu, PhD',
      tagline: 'Professional translation, communication and interpretation services supporting INCESA\'s international activities.',
      mission: null,
      sections: [
        {
          heading: 'About the Center',
          body: 'The Center for Translation, Communication and Interpretation (CTCI) provides professional linguistic services that enable INCESA to operate effectively across international borders. The center supports all research centers within INCESA by offering high-quality translation of scientific documents, simultaneous interpretation for conferences and negotiations, and multilingual communication support for European and national research projects.',
        },
        {
          heading: 'Core Activities',
          items: [
            'Scientific and technical document translation (Romanian ↔ English, French, and other EU languages)',
            'Simultaneous and consecutive interpretation for conferences, meetings and symposia',
            'Proofreading and editing of academic manuscripts for international publication',
            'Multilingual communication support for EU-funded research projects',
            'Terminology management and specialized scientific glossaries',
            'Communication strategy development for INCESA projects and partnerships',
          ],
        },
      ],
      photos: [],
    },
    ro: {
      title: 'Centrul de Traducere, Comunicare și Interpretare',
      abbr: 'CTCI',
      head: 'Prof. Titela Vîlceanu, PhD',
      tagline: 'Servicii profesionale de traducere, comunicare și interpretare care susțin activitățile internaționale ale INCESA.',
      mission: null,
      sections: [
        {
          heading: 'Despre Centru',
          body: 'Centrul de Traducere, Comunicare și Interpretare (CTCI) oferă servicii lingvistice profesionale care permit INCESA să funcționeze eficient peste granițele internaționale. Centrul sprijină toate centrele de cercetare din INCESA prin traducerea de înaltă calitate a documentelor științifice, interpretariat simultan la conferințe și negocieri, și suport de comunicare multilingvă pentru proiectele de cercetare europene și naționale.',
        },
        {
          heading: 'Activități Principale',
          items: [
            'Traducere de documente științifice și tehnice (română ↔ engleză, franceză și alte limbi UE)',
            'Interpretariat simultan și consecutiv pentru conferințe, reuniuni și simpozioane',
            'Corectura și editarea manuscriselor academice pentru publicare internațională',
            'Suport de comunicare multilingvă pentru proiecte de cercetare finanțate UE',
            'Managementul terminologiei și glosare științifice specializate',
            'Elaborarea strategiei de comunicare pentru proiectele și parteneriatele INCESA',
          ],
        },
      ],
      photos: [],
    },
  },

  'socio-economic': {
    accent: '#10b981',
    en: {
      title: 'Center of Relations with the Socio-Economic and Cultural Environment',
      abbr: 'DR-MESC',
      head: 'Prof. Eng. Daniela Rosca, PhD',
      tagline: 'Monitoring and developing INCESA\'s collaborative framework with industry, public administration and the cultural sector.',
      sections: [
        {
          heading: 'Mission',
          body: 'The Center of Relations with the Socio-Economic and Cultural Environment (DR-MESC) has as its main mission the monitoring of collaboration activities with the socio-economic and cultural environment at the University level, in collaboration with the faculties.',
        },
        {
          heading: 'Core Activities',
          items: [
            'Promotes research programs that meet market requirements for retooling, restructuring and modernization',
            'Identifies demands of economic agents for staff training, technical assistance, legal advice and related services',
            'Identifies foreign economic agents interested in collaborating with the university',
            'Monitors the correlation of graduates\' skills with the demands of the labor market',
            'Promotes job offers and facilitates student-employer connections',
            'Identifies collaborations at local, regional and national levels',
            'Establishes cooperation links with similar departments in the country and abroad',
          ],
        },
      ],
      photos: [],
      contracts: true,
    },
    ro: {
      title: 'Centrul de Relații cu Mediul Socio-Economic și Cultural',
      abbr: 'DR-MESC',
      head: 'Prof. Dr. Ing. Daniela Rosca',
      tagline: 'Monitorizarea și dezvoltarea cadrului de colaborare al INCESA cu industria, administrația publică și sectorul cultural.',
      sections: [
        {
          heading: 'Misiune',
          body: 'Centrul de Relații cu Mediul Socio-Economic și Cultural (DR-MESC) are ca principală misiune monitorizarea activităților de colaborare cu mediul socio-economic și cultural la nivelul Universității, în colaborare cu facultățile.',
        },
        {
          heading: 'Activități Principale',
          items: [
            'Promovează programe de cercetare care satisfac cerințele pieței pentru restructurare și modernizare',
            'Identifică cerințele agenților economici pentru formare de personal, asistență tehnică, consiliere juridică',
            'Identifică agenți economici străini interesați de colaborarea cu universitatea',
            'Monitorizează corelarea competențelor absolvenților cu cerințele pieței muncii',
            'Promovează ofertele de locuri de muncă și facilitează conexiunile studenți-angajatori',
            'Identifică colaborări la nivel local, regional și național',
            'Stabilește legături de cooperare cu departamente similare din țară și străinătate',
          ],
        },
      ],
      photos: [],
      contracts: true,
    },
  },

  consulting: {
    accent: '#8b5cf6',
    en: {
      title: 'Project Services Center: Consulting, Assistance and Management',
      abbr: 'PSC',
      head: null,
      tagline: 'Increasing INCESA\'s capacity to participate in European research competitions and supporting applicants through the full project lifecycle.',
      sections: [
        {
          heading: 'Fundamental Role',
          body: 'The fundamental role of the center is to increase the capacity to participate in European competitions for international research and development projects of all entities requesting support.',
        },
        {
          heading: 'Core Services',
          items: [
            'Assistance to applicants preparing applications for Horizon Europe, Horizon 2020 and similar EU-funded competitions',
            'Support in developing project proposals for national and international R&D competitions',
            'Training and presentation modules (courses) on European C-D funding programs',
            'Networking facilitation and partner identification at national and international level',
            'Organization of workshops held with beneficiary teams and guests from EU funding agencies',
            'At least 35 workshops organized by the project team with beneficiaries and international partners',
            'Consulting on project management, reporting and compliance throughout the project lifecycle',
          ],
        },
      ],
      photos: [],
    },
    ro: {
      title: 'Centrul de Servicii pentru Proiecte: Consultanță, Asistență și Management',
      abbr: 'PSC',
      head: null,
      tagline: 'Creșterea capacității INCESA de a participa la competiții europene de cercetare și sprijinul solicitanților pe tot parcursul ciclului de viață al proiectului.',
      sections: [
        {
          heading: 'Rolul Fundamental',
          body: 'Rolul fundamental al centrului este de a crește capacitatea de participare la competițiile europene pentru proiecte internaționale de cercetare și dezvoltare ale tuturor entităților care solicită sprijin.',
        },
        {
          heading: 'Servicii Principale',
          items: [
            'Asistență acordată solicitanților care pregătesc aplicații pentru Horizon Europe, Horizon 2020 și competiții similare finanțate de UE',
            'Sprijin în elaborarea propunerilor de proiecte pentru competiții naționale și internaționale CDI',
            'Module de formare și prezentare (cursuri) privind programele europene de finanțare C-D',
            'Facilitarea creării de rețele și identificarea de parteneri la nivel național și internațional',
            'Organizarea de ateliere cu echipele beneficiarilor și invitați din agențiile de finanțare UE',
            'Minimum 35 de ateliere organizate de echipa de proiect cu beneficiarii și partenerii internaționali',
            'Consultanță privind managementul, raportarea și conformitatea proiectelor pe tot parcursul ciclului de viață',
          ],
        },
      ],
      photos: [],
    },
  },

  training: {
    accent: '#f97316',
    en: {
      title: 'Center for Organizational Training and Instruction',
      abbr: 'COTI',
      head: 'Ec. Camelia Maria Olari, PhD',
      tagline: 'Developing workforce skills for companies in SV Oltenia and facilitating student integration into the labor market.',
      sections: [
        {
          heading: 'Purpose',
          body: 'The University of Craiova, through this center, becomes a hub for training and skill development for employees of companies in the SV Oltenia region, in a personalized manner adapted to each organization\'s needs.',
        },
        {
          heading: 'Core Objectives',
          items: [
            'Training and development of skills for employees of companies in SV Oltenia, in a personalized manner',
            'Labor supply center through the training and development of students',
            'Creation of permanent communication channels with employers and industry partners',
            'Personalized training modules for students facilitating their integration into the labor market',
            'Professional development programs aligned with regional and national economic priorities',
            'Collaboration with companies to design curricula and training pathways relevant to the job market',
          ],
        },
      ],
      photos: [
        { src: '/images/sc-training-1.png', label: 'Training Materials' },
        { src: '/images/sc-training-2.png', label: 'Program Overview' },
        { src: '/images/sc-training-3.png', label: 'Certification' },
        { src: '/images/sc-training-4.png', label: 'Curriculum' },
        { src: '/images/sc-training-5.png', label: 'Documentation' },
      ],
    },
    ro: {
      title: 'Centrul de Formare și Instruire Organizațională',
      abbr: 'COTI',
      head: 'Ec. Camelia Maria Olari, PhD',
      tagline: 'Dezvoltarea competențelor forței de muncă pentru companiile din SV Oltenia și facilitarea integrării studenților pe piața muncii.',
      sections: [
        {
          heading: 'Scop',
          body: 'Universitatea din Craiova, prin intermediul acestui centru, devine un hub de formare și dezvoltare a competențelor pentru angajații companiilor din regiunea SV Oltenia, într-o manieră personalizată adaptată nevoilor fiecărei organizații.',
        },
        {
          heading: 'Obiective Principale',
          items: [
            'Formare și dezvoltare a competențelor angajaților companiilor din SV Oltenia, în mod personalizat',
            'Centru de ofertare a forței de muncă prin formarea și dezvoltarea studenților',
            'Crearea de canale permanente de comunicare cu angajatorii și partenerii industriali',
            'Module de formare personalizate pentru studenți care să faciliteze integrarea lor pe piața muncii',
            'Programe de dezvoltare profesională aliniate cu prioritățile economice regionale și naționale',
            'Colaborare cu companii pentru proiectarea curriculei și a traseelor de formare relevante pentru piața muncii',
          ],
        },
      ],
      photos: [
        { src: '/images/sc-training-1.png', label: 'Materiale de Formare' },
        { src: '/images/sc-training-2.png', label: 'Prezentare Program' },
        { src: '/images/sc-training-3.png', label: 'Certificare' },
        { src: '/images/sc-training-4.png', label: 'Curriculum' },
        { src: '/images/sc-training-5.png', label: 'Documentație' },
      ],
    },
  },
}

const NAV_CENTERS = [
  { slug: 'ctt', href: '/ctt', en: 'CTT INCESA — Technology Transfer', ro: 'CTT INCESA — Transfer Tehnologic', accent: '#3e92cc' },
  { slug: 'communication', href: '/support/communication', en: 'Translation, Communication & Interpretation', ro: 'Traducere, Comunicare și Interpretare', accent: '#3e92cc' },
  { slug: 'socio-economic', href: '/support/socio-economic', en: 'Socio-Economic & Cultural Relations', ro: 'Relații Socio-Economice și Culturale', accent: '#10b981' },
  { slug: 'consulting', href: '/support/consulting', en: 'Project Services: Consulting & Management', ro: 'Servicii Proiecte: Consultanță și Management', accent: '#8b5cf6' },
  { slug: 'training', href: '/support/training', en: 'Organizational Training & Instruction', ro: 'Formare și Instruire Organizațională', accent: '#f97316' },
]

export default function SupportCenter() {
  const { slug } = useParams()
  const { i18n } = useTranslation()
  const isRo = i18n.language === 'ro'

  const centerData = CENTERS[slug]
  if (!centerData) return <Navigate to="/research/support-centers" replace />

  const c = isRo ? centerData.ro : centerData.en
  const { accent } = centerData

  return (
    <PageWrapper>
      <Helmet>
        <title>{c.title} — INCESA</title>
        <meta name="description" content={c.tagline} />
      </Helmet>

      {/* Hero */}
      <section
        className="relative pt-36 pb-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060e2e 0%, #0a2463 60%, #060e2e 100%)' }}
      >
        <div className="absolute inset-0 grid-dots-dark opacity-40" aria-hidden="true" />
        <motion.div
          className="absolute pointer-events-none"
          style={{ width: 500, height: 500, top: '-100px', right: '-80px', background: `radial-gradient(circle, ${accent}14 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        <div className="relative z-10 container-padded">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center gap-2 text-xs text-white/40 mb-8"
          >
            <Link to="/research/support-centers" className="hover:text-white/70 transition-colors">
              {isRo ? 'Centre Suport' : 'Support Centers'}
            </Link>
            <span>/</span>
            <span className="text-white/60">{c.abbr}</span>
          </motion.div>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-[0.15em] mb-5"
              style={{ background: `${accent}18`, borderColor: `${accent}35`, color: accent }}
            >
              {isRo ? 'Centru Suport INCESA' : 'INCESA Support Center'}
            </motion.div>

            <motion.h1
              className="font-heading font-black text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              {c.title}
            </motion.h1>

            <motion.p
              className="text-white/60 text-lg leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {c.tagline}
            </motion.p>

            {c.head && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.22 }}
                className="inline-flex items-center gap-3 mt-7 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5"
              >
                <User className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-0.5">
                    {isRo ? 'Director Centru' : 'Head of Center'}
                  </p>
                  <p className="text-sm font-semibold text-white">{c.head}</p>
                </div>
                <a href="mailto:office@incesa.ro" className="ml-2 text-white/40 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {c.sections.map((sec, si) => (
                <FadeUp key={sec.heading} delay={si * 0.08}>
                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: accent }}>
                      {sec.heading}
                    </span>
                    {sec.body && (
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base border-l-4 pl-5 mb-4" style={{ borderColor: accent }}>
                        {sec.body}
                      </p>
                    )}
                    {sec.items && (
                      <ul className="space-y-2.5">
                        {sec.items.map((item, ii) => (
                          <motion.li
                            key={ii}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.38, delay: ii * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accent }} />
                            <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>
                </FadeUp>
              ))}

              {/* Training center photos — open in new tab */}
              {c.photos && c.photos.length > 0 && (
                <FadeUp delay={0.1}>
                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-5" style={{ color: accent }}>
                      {isRo ? 'Documente & Materiale' : 'Documents & Materials'}
                    </span>
                    <p className="text-xs text-slate-400 mb-4">
                      {isRo ? 'Clic pentru a deschide în tab nou' : 'Click to open full size in a new tab'}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {c.photos.map((photo, pi) => (
                        <motion.a
                          key={pi}
                          href={photo.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: pi * 0.06 }}
                          whileHover={{ scale: 1.03 }}
                          className="group block rounded-xl overflow-hidden border border-slate-100 dark:border-gray-800 hover:border-slate-300 dark:hover:border-gray-600 hover:shadow-md transition-all relative"
                        >
                          <div className="aspect-[4/3] bg-slate-50 dark:bg-gray-900">
                            <img src={photo.src} alt={photo.label} className="w-full h-full object-contain" loading="lazy" />
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ExternalLink className="w-5 h-5 text-white drop-shadow-lg" />
                          </div>
                          <p className="text-[11px] text-slate-500 text-center py-2 px-1 truncate">{photo.label}</p>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Quick info card */}
              <FadeUp delay={0.1}>
                <div className="rounded-2xl bg-incesa-light dark:bg-gray-900 border border-slate-100 dark:border-gray-800 p-6">
                  <div className="h-1 -mx-6 -mt-6 mb-5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                  <p className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: accent }}>
                    {isRo ? 'Informații Centru' : 'Center Info'}
                  </p>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-slate-400 text-xs mb-0.5">{isRo ? 'Abreviere' : 'Abbreviation'}</p>
                      <p className="font-bold text-incesa-blue dark:text-white">{c.abbr}</p>
                    </div>
                    {c.head && (
                      <div>
                        <p className="text-slate-400 text-xs mb-0.5">{isRo ? 'Director' : 'Head'}</p>
                        <p className="font-semibold text-incesa-blue dark:text-white leading-snug">{c.head}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-slate-400 text-xs mb-0.5">{isRo ? 'Email' : 'Email'}</p>
                      <a href="mailto:office@incesa.ro" className="text-incesa-accent hover:underline text-xs">office@incesa.ro</a>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-0.5">{isRo ? 'Parte din' : 'Part of'}</p>
                      <Link to="/research/support-centers" className="text-incesa-accent hover:underline text-xs">
                        INCESA {isRo ? 'Centre Suport' : 'Support Centers'}
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Other support centers navigation */}
              <FadeUp delay={0.15}>
                <div className="rounded-2xl bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-incesa-accent mb-4">
                    {isRo ? 'Alte Centre Suport' : 'Other Support Centers'}
                  </p>
                  <ul className="space-y-1.5">
                    {NAV_CENTERS.filter(nc => nc.slug !== slug).map((nc) => (
                      <li key={nc.slug}>
                        <Link
                          to={nc.href}
                          className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 hover:text-incesa-blue dark:hover:text-white p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 transition-all group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: nc.accent }} />
                          <span className="flex-1 leading-snug">{isRo ? nc.ro : nc.en}</span>
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Contracts table — socio-economic only */}
      {(isRo ? centerData.ro.contracts : centerData.en.contracts) && (
        <section className="section-py bg-incesa-light dark:bg-gray-900">
          <div className="container-padded">
            <FadeUp>
              <div className="mb-8">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: accent }}>
                  {isRo ? 'Contracte și Acorduri Cadru' : 'Framework Contracts & Agreements'}
                </span>
                <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white">
                  {isRo ? `Colaborări Instituționale (${SOCIO_CONTRACTS.length})` : `Institutional Collaborations (${SOCIO_CONTRACTS.length})`}
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {isRo
                    ? 'Contracte de colaborare, cercetare, consultanță și prestări servicii încheiate cu agenți economici, instituții publice și organizații culturale.'
                    : 'Collaboration, research, consultancy and service provision contracts with economic agents, public institutions and cultural organizations.'}
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-gray-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-incesa-blue text-white">
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider w-10">#</th>
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider">
                        {isRo ? 'Partener' : 'Partner'}
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                        {isRo ? 'Referință' : 'Reference'}
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">
                        {isRo ? 'Perioadă' : 'Period'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SOCIO_CONTRACTS.map((row, i) => (
                      <motion.tr
                        key={row.no}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.3) }}
                        className={`border-b border-slate-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 transition-colors ${i % 2 === 0 ? 'bg-white dark:bg-gray-950' : 'bg-slate-50/50 dark:bg-gray-900/50'}`}
                      >
                        <td className="px-4 py-3 text-slate-400 dark:text-slate-500 text-xs font-mono">{row.no}</td>
                        <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">{row.partner}</td>
                        <td className="px-4 py-3 text-slate-400 dark:text-slate-500 text-xs hidden md:table-cell">{row.ref}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-xs font-semibold whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full text-white text-[10px]" style={{ background: accent }}>
                            {row.period}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded max-w-2xl text-center">
          <FadeUp>
            <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-3">
              {isRo ? `Colaborați cu ${c.abbr}` : `Work with ${c.abbr}`}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-7 text-sm leading-relaxed">
              {isRo
                ? 'Contactați-ne pentru a discuta cum centrul nostru vă poate sprijini activitățile și obiectivele.'
                : 'Get in touch to discuss how our center can support your activities and objectives.'}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <MotionButton to="/contact" variant="primary">
                {isRo ? 'Contactează-ne' : 'Contact Us'} <ArrowRight className="w-4 h-4" />
              </MotionButton>
              <Link
                to="/research/support-centers"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-incesa-blue text-sm font-medium transition-colors py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {isRo ? 'Toate Centrele Suport' : 'All Support Centers'}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </PageWrapper>
  )
}
