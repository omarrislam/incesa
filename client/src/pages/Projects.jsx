import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, FolderOpen, ChevronDown, ChevronUp } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import { PROJECTS, COMING_SOON_COUNT } from '../data/projects'
import { RESEARCH_CENTERS } from '../data/labs'

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

// Collect all labs across all centers
function buildLabIndex() {
  const map = {}
  // From projects.js (use the lab display names stored there)
  PROJECTS.forEach(p => {
    if (p.lab?.slug) {
      map[p.lab.slug] = { slug: p.lab.slug, en: p.lab.en, ro: p.lab.ro, centerSlug: p.lab.centerSlug }
    }
  })
  // All labs from every center — fills in labs that have no project cards yet
  RESEARCH_CENTERS.forEach(center => {
    center.labs.forEach(lab => {
      if (!map[lab.slug]) {
        map[lab.slug] = { slug: lab.slug, en: lab.en.name, ro: lab.ro.name, centerSlug: center.slug }
      }
    })
  })
  return map
}

// Build flat list of lab contracts from labs.js
function buildLabContracts() {
  const result = []
  RESEARCH_CENTERS.forEach(center => {
    center.labs.forEach(lab => {
      if (lab.projects?.length) {
        lab.projects.forEach(proj => {
          result.push({ ...proj, labSlug: lab.slug, labEn: lab.en.name, labRo: lab.ro.name, centerSlug: center.slug, accentHex: center.accentHex })
        })
      }
    })
  })
  return result
}

const SHORT_NAMES = {
  'innovative-electromechanical-systems': { en: 'Electromechanical', ro: 'Electromecanic' },
  'mechatronics-robotics': { en: 'Mechatronics', ro: 'Mecatronică' },
  'smart-grids': { en: 'Smart Grids', ro: 'Rețele Inteligente' },
  'materials-testing': { en: 'Materials Testing', ro: 'Testare Materiale' },
  'microtechnologies': { en: 'Microtechnologies', ro: 'Microtehnologii' },
  'mechanical-engineering-lab': { en: 'Mechanical Eng.', ro: 'Ing. Mecanică' },
  'biochemical-processes': { en: 'Biochemical', ro: 'Biochimice' },
  'bioengineering': { en: 'Bioengineering', ro: 'Bioingineerie' },
  'biotechnology': { en: 'Biotechnology', ro: 'Biotehnologie' },
  'biomechanics': { en: 'Biomechanics', ro: 'Biomecanică' },
  'innovasport-craiova': { en: 'InnovaSport', ro: 'InnovaSport' },
  'formal-intelligence': { en: 'Formal Intelligence', ro: 'Intel. Formală' },
  'computer-engineering': { en: 'Computer Eng.', ro: 'Ing. Calculatoare' },
  'applied-mathematics': { en: 'Applied Math', ro: 'Mat. Aplicată' },
  'social-data': { en: 'Social Data', ro: 'Date Sociale' },
  'economics-administrative': { en: 'Economics', ro: 'Economie' },
  'ctt-incesa': { en: 'CTT INCESA', ro: 'CTT INCESA' },
  'coti': { en: 'COTI', ro: 'COTI' },
  'crsece': { en: 'CRSECE', ro: 'CRSECE' },
  'ctci': { en: 'CTCI', ro: 'CTCI' },
  'psc': { en: 'PSC', ro: 'PSC' },
}

const LAB_INDEX = buildLabIndex()
const ALL_CONTRACTS = buildLabContracts()

export default function Projects() {
  const { t, i18n } = useTranslation()
  const isRo = i18n.language === 'ro'
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [selectedLab, setSelectedLab] = useState(() => searchParams.get('lab') || 'all')
  const [contractsExpanded, setContractsExpanded] = useState(false)

  useEffect(() => {
    const lab = searchParams.get('lab')
    if (lab) setSelectedLab(lab)
  }, [searchParams])

  const filteredProjects = useMemo(() => {
    if (selectedLab === 'all') return PROJECTS
    return PROJECTS.filter(p => p.lab?.slug === selectedLab)
  }, [selectedLab])

  const filteredContracts = useMemo(() => {
    if (selectedLab === 'all') return ALL_CONTRACTS
    return ALL_CONTRACTS.filter(c => c.labSlug === selectedLab)
  }, [selectedLab])

  const labOptions = useMemo(() => {
    return Object.values(LAB_INDEX).sort((a, b) =>
      (isRo ? a.ro : a.en).localeCompare(isRo ? b.ro : b.en)
    )
  }, [isRo])

  const visibleContracts = contractsExpanded ? filteredContracts : filteredContracts.slice(0, 6)

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

      {/* Lab filter */}
      <section className="bg-white dark:bg-gray-950 border-b border-slate-100 dark:border-gray-800 sticky top-[64px] z-30">
        <div className="container-padded py-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedLab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                selectedLab === 'all'
                  ? 'bg-incesa-accent text-white'
                  : 'bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-gray-700'
              }`}
            >
              {isRo ? 'Toate' : 'All'}
            </button>
            {labOptions.map(lab => (
              <button
                key={lab.slug}
                onClick={() => setSelectedLab(lab.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                  selectedLab === lab.slug
                    ? 'bg-incesa-accent text-white'
                    : 'bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-gray-700'
                }`}
              >
                {isRo ? (SHORT_NAMES[lab.slug]?.ro ?? lab.ro) : (SHORT_NAMES[lab.slug]?.en ?? lab.en)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Research Projects grid */}
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
                  ? `${filteredProjects.length} proiect${selectedLab !== 'all' ? ' filtrat' : ''}`
                  : `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''}${selectedLab !== 'all' ? ' filtered' : ''}`}
              </span>
            </div>
          </FadeUp>

          {filteredProjects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project, i) => {
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
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'ongoing'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                            : project.status === 'completed'
                            ? 'bg-slate-100 text-slate-600 dark:bg-gray-800 dark:text-slate-400'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                        }`}>
                          {project.status === 'ongoing' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                          {t(`status.${project.status}`)}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-incesa-accent/10 text-incesa-accent dark:text-incesa-accent-light">
                          {domain}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-3 leading-snug flex-1 group-hover:text-incesa-accent transition-colors">
                        {title}
                      </h3>
                      {project.lab && (
                        <Link
                          to={project.lab.centerSlug ? `/research/${project.lab.centerSlug}/labs/${project.lab.slug}` : '#'}
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-slate-400 hover:text-incesa-accent hover:bg-incesa-accent/10 transition-colors mb-3"
                        >
                          <span className="w-1 h-1 rounded-full bg-incesa-accent" />
                          {isRo ? project.lab.ro : project.lab.en}
                        </Link>
                      )}
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
                return (
                  <div
                    key={project.id}
                    onClick={project.link ? () => navigate(project.link) : undefined}
                    style={project.link ? { cursor: 'pointer' } : undefined}
                  >
                    {inner}
                  </div>
                )
              })}
              {selectedLab === 'all' && Array.from({ length: COMING_SOON_COUNT }).map((_, i) => (
                <SkeletonCard key={`cs-${i}`} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 dark:text-slate-500 text-sm">
              {isRo ? 'Niciun proiect găsit pentru filtrul selectat.' : 'No projects found for the selected filter.'}
            </div>
          )}
        </div>
      </section>

      {/* Research Contracts & Grants */}
      {filteredContracts.length > 0 && (
        <section className="section-py bg-slate-50 dark:bg-gray-900/50">
          <div className="container-padded">
            <FadeUp>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-2">
                    {isRo ? 'Contracte & Granturi' : 'Contracts & Grants'}
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white flex items-center gap-2.5">
                    <FolderOpen className="w-6 h-6 text-incesa-accent" />
                    {isRo ? 'Proiecte de Cercetare & Contracte' : 'Research Contracts & Grants'}
                  </h2>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  {filteredContracts.length} {isRo ? 'înregistrări' : 'entries'}
                </span>
              </div>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleContracts.map((contract, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  className="rounded-2xl p-5 bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    {contract.role && (
                      <span
                        className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border"
                        style={{ color: contract.accentHex, borderColor: `${contract.accentHex}40`, background: `${contract.accentHex}12` }}
                      >
                        {contract.role}
                      </span>
                    )}
                    <Link
                      to={`/research/${contract.centerSlug}/labs/${contract.labSlug}`}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-slate-400 hover:text-incesa-accent hover:bg-incesa-accent/10 transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full" style={{ background: contract.accentHex }} />
                      {isRo ? contract.labRo : contract.labEn}
                    </Link>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-snug text-sm flex-1">
                    {contract.title}
                  </p>
                  {contract.code && (
                    <p className="text-xs text-slate-400 dark:text-slate-500">{contract.code}</p>
                  )}
                  {contract.beneficiary && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold">{isRo ? 'Beneficiar' : 'Beneficiary'}:</span> {contract.beneficiary}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredContracts.length > 6 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setContractsExpanded(v => !v)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 text-sm font-medium text-slate-600 dark:text-slate-400 hover:border-incesa-accent hover:text-incesa-accent transition-colors"
                >
                  {contractsExpanded
                    ? (isRo ? 'Arată mai puțin' : 'Show less')
                    : (isRo ? `Arată toate (${filteredContracts.length})` : `Show all (${filteredContracts.length})`)}
                  {contractsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="py-8 bg-white dark:bg-gray-950">
        <div className="container-padded">
          <FadeUp>
            <p className="text-center text-sm text-slate-400 dark:text-slate-500">
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
