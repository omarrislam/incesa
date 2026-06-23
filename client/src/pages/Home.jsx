import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Cog, FlaskConical, Cpu, Users, Building2, ChevronDown } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import MotionButton from '../components/ui/MotionButton'
import { RESEARCH_CENTERS } from '../data/labs'
import { MARQUEE_PARTNERS } from '../data/partners'

const ICON_MAP = { Zap, Cog, FlaskConical, Cpu, Users, Building2 }

const STATS = [
  { value: 21, suffix: '+', labelKey: 'stats.labs' },
  { value: 100, suffix: '+', labelKey: 'stats.researchers' },
  { value: 6, suffix: '', labelKey: 'stats.centers' },
  { value: 2015, suffix: '', labelKey: 'stats.founded' },
]

/* ── Particle / neural-network canvas ─────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    let w = 0
    let h = 0

    function resize() {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
    }

    function init() {
      resize()
      const count = Math.min(Math.floor((w * h) / 14000), 80)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        r: Math.random() * 1.5 + 0.8,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(126,200,227,${(1 - dist / 140) * 0.28})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(62,146,204,0.65)'
        ctx.fill()

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      })

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()

    const ro = new ResizeObserver(init)
    ro.observe(canvas.parentElement)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}

/* ── Animated number counter ───────────────────────────────── */
function CountUp({ target, suffix }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const num = parseInt(target, 10)
          const dur = 1800
          const step = num / (dur / 16)
          let cur = 0
          const timer = setInterval(() => {
            cur = Math.min(cur + step, num)
            setVal(Math.round(cur))
            if (cur >= num) clearInterval(timer)
          }, 16)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

/* ── FadeUp helper ─────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Stagger container ─────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Home() {
  const { t, i18n } = useTranslation()
  const isRo = i18n.language === 'ro'

  return (
    <PageWrapper>
      <Helmet>
        <title>INCESA — Applied Research Hub</title>
        <meta name="description" content="Romania's largest applied research organization — 21 laboratories across 6 research centers bridging academia and industry." />
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060e2e 0%, #0a2463 60%, #1e3a5f 100%)' }}
      >
        {/* INCESA Research Hub background with ken burns */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center hero-kenburns"
            style={{
              backgroundImage: 'url(/images/incesa-hub.webp)',
              opacity: 0.28,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Dark overlay gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(6,14,46,0.82) 0%, rgba(10,36,99,0.78) 60%, rgba(30,58,95,0.8) 100%)' }}
          aria-hidden="true"
        />

        {/* Neural network particle canvas */}
        <ParticleCanvas />

        {/* Ambient glows */}
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-incesa-accent/8 rounded-full blur-[90px]" aria-hidden="true" />
        <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-incesa-blue-mid/20 rounded-full blur-[90px]" aria-hidden="true" />

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-incesa-accent/20 border border-incesa-accent/30 text-incesa-accent-light text-xs font-semibold uppercase tracking-[0.15em] mb-7">
              {t('hero.badge')}
            </span>
          </motion.div>

          <motion.h1
            className="font-heading font-bold text-white text-balance"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 1.08, letterSpacing: '-0.025em' }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {t('hero.headline1')}{' '}
            <span className="text-incesa-accent">{t('hero.headline2')}</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-white/70 max-w-2xl mx-auto text-balance"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', lineHeight: 1.7 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* INCESA tagline */}
          <motion.p
            className="mt-3 text-incesa-accent-light/60 text-sm italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
          >
            &ldquo;The PAST and the PRESENT define us, but the FUTURE will connect us&rdquo;
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            <MotionButton to="/research" size="lg">
              {t('hero.cta1')} <ArrowRight className="w-4 h-4" />
            </MotionButton>
            <MotionButton to="/contact" variant="ghost" size="lg">
              {t('hero.cta2')}
            </MotionButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          whileHover={{ opacity: 0.9 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          aria-label="Scroll down"
        >
          <div className="w-5 h-8 rounded-full border border-white/50 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <ChevronDown className="w-3 h-3 text-white/50" />
        </motion.button>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────── */}
      <section className="bg-incesa-blue dark:bg-incesa-blue-dark py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, suffix, labelKey }, i) => (
            <FadeUp key={labelKey} delay={i * 0.07}>
              <div className="text-center">
                <div className="font-heading font-black text-white text-3xl sm:text-4xl">
                  <CountUp target={value} suffix={suffix} />
                </div>
                <div className="text-incesa-accent-light/80 text-sm mt-1 font-medium">{t(labelKey)}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── PARTNER MARQUEE ───────────────────────────────────── */}
      <section className="bg-white dark:bg-gray-950 border-y border-slate-100 dark:border-gray-800 py-5 overflow-hidden">
        <FadeUp>
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 mb-4">
            {isRo ? 'Colaborăm cu liderii industriei, academiei și guvernului' : 'Partnering with leaders across industry, academia & government'}
          </p>
        </FadeUp>
        <div className="overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, white, transparent)' }} aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none dark:hidden" style={{ background: 'linear-gradient(to left, white, transparent)' }} aria-hidden="true" />
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none hidden dark:block" style={{ background: 'linear-gradient(to right, rgb(3,7,18), transparent)' }} aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none hidden dark:block" style={{ background: 'linear-gradient(to left, rgb(3,7,18), transparent)' }} aria-hidden="true" />

          <div className="marquee-track flex items-center gap-5 w-max">
            {[...MARQUEE_PARTNERS, ...MARQUEE_PARTNERS].map((name, i) => (
              <span
                key={i}
                className="flex-shrink-0 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 px-4 py-2 rounded-full border border-slate-200 dark:border-gray-700 bg-incesa-light dark:bg-gray-900 whitespace-nowrap hover:border-incesa-accent/50 hover:text-incesa-blue dark:hover:text-incesa-accent transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ────────────────────────────────────────── */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {t('home.whoWeAre')}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-incesa-blue dark:text-white mb-6 leading-tight">
                {t('home.whoHeadline')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {t('home.whoText1')}
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                {t('home.whoText2')}
              </p>
              <MotionButton to="/about" variant="outline">
                {t('home.whoLink')} <ArrowRight className="w-4 h-4" />
              </MotionButton>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a2463, #1e3a5f)' }}>
                <div className="absolute inset-0 grid-dots-dark" aria-hidden="true" />
                {/* Subtle circuit image overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-10 rounded-3xl"
                  style={{ backgroundImage: 'url(/images/circuit-bg.webp)' }}
                  aria-hidden="true"
                />
                <div className="relative z-10 p-8 h-80 flex flex-col justify-between">
                  <p className="text-incesa-accent-light/60 text-xs font-bold uppercase tracking-[0.2em]">INCESA</p>
                  <p className="text-white font-heading text-xl font-bold leading-snug">
                    {t('home.statsCard')}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {STATS.map(({ value, suffix, labelKey }) => (
                      <div key={labelKey} className="bg-white/10 rounded-2xl p-4">
                        <div className="font-heading text-2xl font-black text-white">
                          <CountUp target={value} suffix={suffix} />
                        </div>
                        <div className="text-incesa-accent-light/70 text-xs mt-0.5">{t(labelKey)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── RESEARCH AREAS ────────────────────────────────────── */}
      <section className="section-py bg-incesa-light dark:bg-gray-900">
        <div className="container-padded">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {t('home.areasLabel')}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-incesa-blue dark:text-white mb-4">
                {t('home.areasHeadline')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                {t('home.areasText')}
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
              const short = desc.split('.')[0] + '.'
              return (
                <motion.div key={center.id} variants={staggerItem}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(62,146,204,0.18)' }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="group block p-6 h-full rounded-2xl bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 hover:border-incesa-accent/40 transition-all duration-300 cursor-pointer"
                  >
                    <Link to={`/research/${center.slug}`} className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-incesa-accent/10 dark:bg-incesa-accent/20 flex items-center justify-center group-hover:bg-incesa-accent/20 transition-colors">
                          <IconComp className="w-5 h-5 text-incesa-accent" />
                        </div>
                        <span className="text-xs font-bold text-slate-300 dark:text-slate-600">
                          {isRo ? center.ro.abbr : center.en.abbr}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-incesa-blue dark:text-white mb-2 leading-snug">
                        {name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed flex-1">
                        {short}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-incesa-accent group-hover:gap-2.5 transition-all">
                        {t('home.exploreCenter')} <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>

          <FadeUp delay={0.1}>
            <div className="text-center mt-10">
              <MotionButton to="/research">
                {isRo ? 'Explorează toate centrele' : 'Explore all centers'} <ArrowRight className="w-4 h-4" />
              </MotionButton>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PARTNERS OVERVIEW ─────────────────────────────────── */}
      <section className="section-py bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-dots-light dark:grid-dots-dark opacity-40" aria-hidden="true" />
        <div className="relative container-padded">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-incesa-accent mb-4">
                {t('home.partnersLabel')}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-incesa-blue dark:text-white mb-4">
                {t('home.partnersHeadline')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                {t('home.partnersText')}
              </p>
            </div>
          </FadeUp>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              { count: 10, suffix: '+', label: isRo ? 'Parteneri Academici' : 'Academic Partners' },
              { count: 35, suffix: '+', label: isRo ? 'Parteneri Industriali' : 'Industry Partners' },
              { count: 11, suffix: '+', label: isRo ? 'Instituții Guvernamentale' : 'Gov. Bodies' },
              { count: 5, suffix: '+', label: isRo ? 'Institute C&D' : 'R&D Institutes' },
            ].map(({ count, suffix, label }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="rounded-2xl bg-incesa-light dark:bg-gray-800 p-5 text-center hover:shadow-md transition-shadow"
              >
                <div className="font-heading font-black text-2xl text-incesa-blue dark:text-white">
                  <CountUp target={count} suffix={suffix} />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>

          <FadeUp delay={0.1}>
            <div className="text-center">
              <MotionButton to="/partners">
                {t('home.learnMore')} <ArrowRight className="w-4 h-4" />
              </MotionButton>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── UNIVERSITY BUILDING PHOTO ─────────────────────────── */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src="/images/craiova-university.webp"
          alt="University of Craiova"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(6,14,46,0.85) 0%, rgba(6,14,46,0.3) 60%, rgba(6,14,46,0.1) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative h-full flex items-center container-padded">
          <FadeUp>
            <h3 className="font-heading font-bold text-white text-2xl sm:text-3xl max-w-md leading-tight">
              {isRo ? 'Universitatea din Craiova' : 'University of Craiova'}
            </h3>
            <p className="text-white/60 text-sm mt-1">Craiova, România</p>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'linear-gradient(135deg, #060e2e, #0a2463)' }}>
        <div className="container-padded">
          <div className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center">
            <div className="absolute inset-0 grid-dots-dark" aria-hidden="true" />
            {/* Particle canvas inside CTA too */}
            <div className="absolute inset-0 opacity-40" aria-hidden="true">
              <ParticleCanvas />
            </div>
            <div className="relative z-10">
              <FadeUp>
                <h2
                  className="font-heading font-bold text-white text-balance"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
                >
                  {t('home.ctaTitle')}
                </h2>
                <p className="mt-4 text-white/70 max-w-xl mx-auto">{t('home.ctaText')}</p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <MotionButton to="/research" size="lg">
                    {t('home.ctaResearch')} <ArrowRight className="w-4 h-4" />
                  </MotionButton>
                  <MotionButton to="/partners" variant="ghost" size="lg">
                    {t('home.ctaPartner')}
                  </MotionButton>
                  <MotionButton to="/news" variant="ghost" size="lg">
                    {t('home.ctaNews')}
                  </MotionButton>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
