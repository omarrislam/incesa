import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import { NEWS, NEWS_CATEGORIES } from '../data/news'

const CATEGORY_META = {
  research:     { label: { en: 'Research', ro: 'Cercetare' },     color: '#3e92cc', bg: 'rgba(62,146,204,0.12)' },
  events:       { label: { en: 'Events', ro: 'Evenimente' },      color: '#7c3aed', bg: 'rgba(124,58,237,0.12)' },
  partnerships: { label: { en: 'Partnerships', ro: 'Parteneriate' }, color: '#059669', bg: 'rgba(5,150,105,0.12)' },
}

function CategoryBadge({ category, isRo }) {
  const meta = CATEGORY_META[category]
  if (!meta) return null
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em]"
      style={{ color: meta.color, background: meta.bg }}
    >
      {isRo ? meta.label.ro : meta.label.en}
    </span>
  )
}

function formatDate(dateStr, isRo) {
  return new Date(dateStr).toLocaleDateString(isRo ? 'ro-RO' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function FeaturedArticle({ item, isRo }) {
  const data = isRo ? item.ro : item.en
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl overflow-hidden border border-slate-100 dark:border-gray-800 hover:border-incesa-accent/30 transition-colors"
      style={{ minHeight: 320 }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {item.image ? (
          <img src={item.image} alt={data.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-incesa-blue via-[#0a2463] to-[#060e2e]">
            <div className="absolute inset-0 grid-dots-dark opacity-30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-10" style={{ minHeight: 320 }}>
        <div className="flex items-center gap-3 mb-4">
          <CategoryBadge category={item.category} isRo={isRo} />
          <span className="flex items-center gap-1.5 text-white/50 text-xs">
            <Calendar className="w-3 h-3" />
            {formatDate(item.date, isRo)}
          </span>
        </div>
        <h2
          className="font-heading font-bold text-white leading-tight mb-4 group-hover:text-incesa-accent-light transition-colors"
          style={{ fontSize: 'clamp(1.35rem, 3vw, 2rem)' }}
        >
          {data.title}
        </h2>
        <p className="text-white/65 text-sm leading-relaxed max-w-2xl line-clamp-2">
          {data.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-1.5 text-incesa-accent-light text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          {isRo ? 'Citește mai mult' : 'Read more'} <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.article>
  )
}

function SecondaryCard({ item, isRo, index }) {
  const data = isRo ? item.ro : item.en
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      className="group rounded-xl overflow-hidden border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-incesa-accent/30 hover:shadow-lg hover:shadow-incesa-accent/8 transition-all"
    >
      {/* Thumbnail */}
      <div className="h-36 overflow-hidden relative">
        {item.image ? (
          <img src={item.image} alt={data.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-incesa-blue to-[#0a2463] relative">
            <div className="absolute inset-0 grid-dots-dark opacity-25" />
            <span className="absolute bottom-3 right-4 font-heading font-black text-5xl text-white/10 select-none">
              {data.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-2.5 left-3">
          <CategoryBadge category={item.category} isRo={isRo} />
        </div>
      </div>

      <div className="p-4">
        <p className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 mb-2">
          <Calendar className="w-3 h-3" />
          {formatDate(item.date, isRo)}
        </p>
        <h3 className="font-heading font-bold text-incesa-blue dark:text-white text-sm leading-snug line-clamp-3 group-hover:text-incesa-accent dark:group-hover:text-incesa-accent-light transition-colors">
          {data.title}
        </h3>
      </div>
    </motion.article>
  )
}

function ListRow({ item, isRo, index }) {
  const data = isRo ? item.ro : item.en
  const meta = CATEGORY_META[item.category]
  return (
    <motion.article
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="group flex items-start gap-4 py-4 border-b border-slate-100 dark:border-gray-800 last:border-0 hover:bg-incesa-light dark:hover:bg-gray-900 -mx-4 px-4 rounded-lg transition-colors"
    >
      {/* Date column */}
      <div className="flex-shrink-0 w-14 text-center pt-0.5">
        <p className="font-heading font-bold text-incesa-blue dark:text-white text-lg leading-none">
          {new Date(item.date).getDate()}
        </p>
        <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">
          {new Date(item.date).toLocaleDateString(isRo ? 'ro-RO' : 'en-GB', { month: 'short' })}
        </p>
      </div>

      {/* Divider */}
      <div className="flex-shrink-0 w-px self-stretch mt-1 mb-1" style={{ background: meta?.color || '#3e92cc', opacity: 0.4 }} />

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <CategoryBadge category={item.category} isRo={isRo} />
        </div>
        <h4 className="font-heading font-semibold text-incesa-blue dark:text-white text-sm leading-snug line-clamp-2 group-hover:text-incesa-accent dark:group-hover:text-incesa-accent-light transition-colors">
          {data.title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1 hidden sm:block">
          {data.excerpt}
        </p>
      </div>

      <ArrowRight className="flex-shrink-0 w-4 h-4 text-incesa-accent opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
    </motion.article>
  )
}

export default function News() {
  const { i18n } = useTranslation()
  const isRo = i18n.language === 'ro'
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all' ? NEWS : NEWS.filter(n => n.category === activeCategory)

  const categoryLabels = {
    all: isRo ? 'Toate' : 'All',
    research: isRo ? 'Cercetare' : 'Research',
    events: isRo ? 'Evenimente' : 'Events',
    partnerships: isRo ? 'Parteneriate' : 'Partnerships',
  }

  const featured   = filtered[0] ?? null
  const secondary  = filtered.slice(1, 4)
  const listItems  = filtered.slice(4)

  return (
    <PageWrapper>
      <Helmet>
        <title>{isRo ? 'Știri & Anunțuri — INCESA' : 'News & Announcements — INCESA'}</title>
        <meta name="description" content="Latest news, research achievements, and announcements from INCESA Research Hub." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────── */}
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
            {isRo ? 'Ultimele Noutăți' : 'Latest Updates'}
          </motion.span>
          <motion.h1
            className="font-heading font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isRo ? 'Știri & Anunțuri' : 'News & Announcements'}
          </motion.h1>
          <motion.p
            className="mt-4 text-white/65 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            {isRo
              ? 'Fii la curent cu cele mai recente realizări, evenimente și anunțuri din cadrul INCESA.'
              : 'Stay up to date with the latest research achievements, events, and announcements from INCESA.'}
          </motion.p>
        </div>
      </section>

      {/* ── EDITORIAL LAYOUT ─────────────────────── */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {NEWS_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-incesa-blue text-white shadow-md'
                    : 'bg-incesa-light dark:bg-gray-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-gray-700'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.length === 0 ? (
                <p className="py-20 text-center text-slate-400 dark:text-slate-500">
                  {isRo ? 'Niciun articol în această categorie.' : 'No articles in this category.'}
                </p>
              ) : (
                <div className="space-y-10">

                  {/* Featured article */}
                  {featured && <FeaturedArticle item={featured} isRo={isRo} />}

                  {/* Secondary cards */}
                  {secondary.length > 0 && (
                    <div className={`grid gap-5 ${secondary.length === 1 ? 'grid-cols-1 max-w-sm' : secondary.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
                      {secondary.map((item, i) => (
                        <SecondaryCard key={item.id} item={item} isRo={isRo} index={i} />
                      ))}
                    </div>
                  )}

                  {/* List digest */}
                  {listItems.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                        {isRo ? 'Arhivă' : 'Archive'}
                      </p>
                      <div className="rounded-xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4">
                        {listItems.map((item, i) => (
                          <ListRow key={item.id} item={item} isRo={isRo} index={i} />
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>
    </PageWrapper>
  )
}
