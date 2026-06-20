import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin } from 'lucide-react'

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

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-incesa-hero dark:bg-gray-950 text-white">
      {/* Gradient accent top bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-incesa-accent/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center">
                <span className="font-heading font-black text-white text-sm">I</span>
              </div>
              <span className="font-heading font-bold text-white text-lg">INCESA</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{t('footer.tagline')}</p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4 text-white/80" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4 text-white/80" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2.5">
              {[
                { label: t('nav.home'), href: '/' },
                { label: t('nav.about'), href: '/about' },
                { label: t('nav.partners'), href: '/partners' },
                { label: t('nav.ctt'), href: '/ctt' },
                { label: t('nav.careers'), href: '/jobs' },
                { label: t('nav.contact'), href: '/contact' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">{t('footer.research')}</h3>
            <ul className="space-y-2.5">
              {[
                { label: t('nav.researchOverview'), href: '/research' },
                { label: t('nav.researchLabs'), href: '/research/labs' },
                { label: t('nav.researchProjects'), href: '/research/projects' },
                { label: 'SIMIRA', href: '/simira', badge: true },
              ].map(({ label, href, badge }) => (
                <li key={href}>
                  <Link to={href} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                    {label}
                    {badge && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">{t('nav.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-incesa-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm leading-relaxed">{t('contact.addressValue')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-incesa-accent flex-shrink-0" />
                <a href="tel:+40251598070" className="text-white/60 hover:text-white text-sm transition-colors">
                  +40 251 598 070
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-incesa-accent flex-shrink-0" />
                <a href="mailto:contact@incesa.ro" className="text-white/60 hover:text-white text-sm transition-colors">
                  {t('contact.emailValue')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            &copy; {year} INCESA. {t('footer.rights')}
          </p>
          <Link to="/cookie-policy" className="text-white/40 hover:text-white/70 text-xs transition-colors">
            {t('footer.cookiePolicy')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
