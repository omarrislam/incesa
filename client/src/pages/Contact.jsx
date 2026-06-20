import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </svg>
  )
}

function YoutubeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  )
}
import PageWrapper from '../components/layout/PageWrapper'

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

const CONTACT_ITEMS = [
  {
    Icon: MapPin,
    labelKey: 'contact.address',
    valueKey: 'contact.addressValue',
    href: 'https://maps.google.com/?q=University+of+Craiova',
    isLink: true,
  },
  {
    Icon: Phone,
    labelKey: 'contact.phone',
    value: '+40 251 598 070',
    href: 'tel:+40251598070',
    isLink: true,
  },
  {
    Icon: Mail,
    labelKey: 'contact.email',
    valueKey: 'contact.emailValue',
    href: 'mailto:contact@incesa.ro',
    isLink: true,
  },
  {
    Icon: Clock,
    labelKey: 'contact.officeHours',
    valueKey: 'contact.officeHoursValue',
    isLink: false,
  },
]

export default function Contact() {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <Helmet>
        <title>Contact INCESA — Get in Touch</title>
        <meta name="description" content="Contact INCESA for research collaboration, partnership opportunities, or general inquiries. Based in Craiova, Romania." />
      </Helmet>

      {/* Hero */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060e2e 0%, #0a2463 100%)' }}
      >
        <div className="absolute inset-0 grid-dots-dark opacity-50" aria-hidden="true" />
        <div className="relative z-10 container-padded text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-incesa-accent/20 border border-incesa-accent/30 text-incesa-accent-light text-xs font-semibold uppercase tracking-[0.15em] mb-5">
            {t('contact.badge')}
          </span>
          <h1 className="font-heading font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em' }}>
            {t('contact.title')}
          </h1>
          <p className="mt-4 text-white/65 max-w-xl mx-auto">{t('contact.subtitle')}</p>
        </div>
      </section>

      {/* Contact details */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact cards */}
            <div>
              <FadeUp>
                <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-8">
                  {t('contact.title')}
                </h2>
              </FadeUp>
              <div className="space-y-4">
                {CONTACT_ITEMS.map(({ Icon, labelKey, valueKey, value, href, isLink }, i) => {
                  const displayValue = value ?? t(valueKey)
                  return (
                    <FadeUp key={labelKey} delay={i * 0.07}>
                      <div className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 dark:border-gray-800 bg-incesa-light dark:bg-gray-900 hover:border-incesa-accent/30 transition-colors group">
                        <div className="w-10 h-10 rounded-xl bg-incesa-accent/10 dark:bg-incesa-accent/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-incesa-accent" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1">
                            {t(labelKey)}
                          </p>
                          {isLink ? (
                            <a
                              href={href}
                              target={href?.startsWith('http') ? '_blank' : undefined}
                              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-incesa-blue dark:text-slate-200 font-medium hover:text-incesa-accent dark:hover:text-incesa-accent transition-colors text-sm sm:text-base"
                            >
                              {displayValue}
                            </a>
                          ) : (
                            <p className="text-incesa-blue dark:text-slate-200 font-medium text-sm sm:text-base">
                              {displayValue}
                            </p>
                          )}
                        </div>
                      </div>
                    </FadeUp>
                  )
                })}
              </div>

              {/* Social */}
              <FadeUp delay={0.3}>
                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-4">
                    {t('contact.socialLabel')}
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-incesa-light dark:bg-gray-800 border border-slate-200 dark:border-gray-700 flex items-center justify-center hover:border-incesa-accent/50 hover:bg-incesa-accent/10 transition-all"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-5 h-5 text-incesa-blue dark:text-slate-300" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-incesa-light dark:bg-gray-800 border border-slate-200 dark:border-gray-700 flex items-center justify-center hover:border-incesa-accent/50 hover:bg-incesa-accent/10 transition-all"
                      aria-label="YouTube"
                    >
                      <YoutubeIcon className="w-5 h-5 text-incesa-blue dark:text-slate-300" />
                    </a>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Map embed */}
            <FadeUp delay={0.15}>
              <div>
                <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-6">
                  {t('contact.mapLabel')}
                </h2>
                <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-gray-800 shadow-lg" style={{ height: 400 }}>
                  <iframe
                    title="INCESA location map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.1!2d23.7957!3d44.3247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47cef40e5b4df3cb%3A0xc62c11bf09d1a7fe!2sUniversitatea+din+Craiova!5e0!3m2!1sen!2sro!4v1"
                  />
                </div>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  {t('contact.addressValue')}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
