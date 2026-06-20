import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import PageWrapper from '../components/layout/PageWrapper'

export default function CookiePolicy() {
  const { t, i18n } = useTranslation()
  const isRo = i18n.language === 'ro'

  return (
    <PageWrapper>
      <Helmet>
        <title>Cookie Policy — INCESA</title>
        <meta name="description" content="INCESA cookie policy — how we use cookies and how you can manage your preferences." />
      </Helmet>

      {/* Hero */}
      <section
        className="relative pt-36 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060e2e 0%, #0a2463 100%)' }}
      >
        <div className="absolute inset-0 grid-dots-dark opacity-50" aria-hidden="true" />
        <div className="relative z-10 container-padded text-center">
          <h1 className="font-heading font-bold text-white"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}>
            {t('cookie.title')}
          </h1>
          <p className="mt-3 text-white/60 text-sm">{t('cookie.lastUpdated')}</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="prose prose-slate dark:prose-invert max-w-none"
          >
            {isRo ? (
              <RoContent />
            ) : (
              <EnContent />
            )}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}

function EnContent() {
  return (
    <div className="space-y-8 text-slate-600 dark:text-slate-300">
      <Section title="What Are Cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.
        </p>
      </Section>

      <Section title="How INCESA Uses Cookies">
        <p>INCESA uses only essential cookies necessary for the proper functioning of this website. We do not use tracking, advertising, or analytics cookies.</p>
        <table className="w-full text-sm mt-4 border-collapse">
          <thead>
            <tr className="bg-incesa-light dark:bg-gray-800">
              <th className="text-left p-3 font-semibold text-incesa-blue dark:text-white border border-slate-200 dark:border-gray-700">Cookie Name</th>
              <th className="text-left p-3 font-semibold text-incesa-blue dark:text-white border border-slate-200 dark:border-gray-700">Purpose</th>
              <th className="text-left p-3 font-semibold text-incesa-blue dark:text-white border border-slate-200 dark:border-gray-700">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-slate-200 dark:border-gray-700 font-mono text-xs">incesa_cookie_consent</td>
              <td className="p-3 border border-slate-200 dark:border-gray-700">Stores your cookie consent preference</td>
              <td className="p-3 border border-slate-200 dark:border-gray-700">1 year</td>
            </tr>
            <tr>
              <td className="p-3 border border-slate-200 dark:border-gray-700 font-mono text-xs">incesa-theme</td>
              <td className="p-3 border border-slate-200 dark:border-gray-700">Remembers your light/dark theme preference</td>
              <td className="p-3 border border-slate-200 dark:border-gray-700">Persistent</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section title="Your Rights (GDPR)">
        <p>
          Under the General Data Protection Regulation (GDPR), you have the right to:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>Know what cookies are being used</li>
          <li>Withdraw your consent at any time</li>
          <li>Request deletion of cookie data</li>
          <li>Lodge a complaint with your national data protection authority</li>
        </ul>
      </Section>

      <Section title="Managing Cookies">
        <p>
          You can manage cookies through your browser settings. Disabling essential cookies may affect the functionality of this website. You can also clear your consent at any time by clearing your browser&apos;s local storage.
        </p>
        <p className="mt-3">
          To clear consent: open your browser&apos;s developer tools → Application → Local Storage → delete the <code className="font-mono text-xs bg-incesa-light dark:bg-gray-800 px-1.5 py-0.5 rounded">incesa_cookie_consent</code> key.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          For any questions about our cookie policy, contact us at:{' '}
          <a href="mailto:contact@incesa.ro" className="text-incesa-accent hover:underline font-medium">
            contact@incesa.ro
          </a>
        </p>
      </Section>
    </div>
  )
}

function RoContent() {
  return (
    <div className="space-y-8 text-slate-600 dark:text-slate-300">
      <Section title="Ce Sunt Cookie-urile?">
        <p>
          Cookie-urile sunt fișiere text mici stocate pe dispozitivul dvs. atunci când vizitați un site web. Ele ajută site-urile să vă rețină preferințele și să îmbunătățească experiența de navigare.
        </p>
      </Section>

      <Section title="Cum Folosește INCESA Cookie-urile">
        <p>INCESA utilizează doar cookie-uri esențiale necesare pentru buna funcționare a acestui site web. Nu folosim cookie-uri de urmărire, publicitate sau analiză.</p>
        <table className="w-full text-sm mt-4 border-collapse">
          <thead>
            <tr className="bg-incesa-light dark:bg-gray-800">
              <th className="text-left p-3 font-semibold text-incesa-blue dark:text-white border border-slate-200 dark:border-gray-700">Nume Cookie</th>
              <th className="text-left p-3 font-semibold text-incesa-blue dark:text-white border border-slate-200 dark:border-gray-700">Scop</th>
              <th className="text-left p-3 font-semibold text-incesa-blue dark:text-white border border-slate-200 dark:border-gray-700">Durată</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-slate-200 dark:border-gray-700 font-mono text-xs">incesa_cookie_consent</td>
              <td className="p-3 border border-slate-200 dark:border-gray-700">Stochează preferința dvs. de consimțământ pentru cookie-uri</td>
              <td className="p-3 border border-slate-200 dark:border-gray-700">1 an</td>
            </tr>
            <tr>
              <td className="p-3 border border-slate-200 dark:border-gray-700 font-mono text-xs">incesa-theme</td>
              <td className="p-3 border border-slate-200 dark:border-gray-700">Reține preferința dvs. de temă luminoasă/întunecată</td>
              <td className="p-3 border border-slate-200 dark:border-gray-700">Persistent</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section title="Drepturile Dvs. (GDPR)">
        <p>Conform Regulamentului General privind Protecția Datelor (GDPR), aveți dreptul să:</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>Știți ce cookie-uri sunt utilizate</li>
          <li>Vă retrageți consimțământul în orice moment</li>
          <li>Solicitați ștergerea datelor cookie</li>
          <li>Depuneți o plângere la autoritatea națională pentru protecția datelor</li>
        </ul>
      </Section>

      <Section title="Gestionarea Cookie-urilor">
        <p>
          Puteți gestiona cookie-urile prin setările browserului dvs. Dezactivarea cookie-urilor esențiale poate afecta funcționalitatea acestui site web.
        </p>
        <p className="mt-3">
          Pentru a șterge consimțământul: deschideți instrumentele de dezvoltator ale browserului → Application → Local Storage → ștergeți cheia <code className="font-mono text-xs bg-incesa-light dark:bg-gray-800 px-1.5 py-0.5 rounded">incesa_cookie_consent</code>.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Pentru orice întrebări despre politica noastră de cookie-uri, contactați-ne la:{' '}
          <a href="mailto:contact@incesa.ro" className="text-incesa-accent hover:underline font-medium">
            contact@incesa.ro
          </a>
        </p>
      </Section>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-bold text-incesa-blue dark:text-white mb-3">{title}</h2>
      {children}
    </div>
  )
}
