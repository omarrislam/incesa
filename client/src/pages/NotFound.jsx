import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageWrapper from '../components/layout/PageWrapper'

export default function NotFound() {
  const { i18n } = useTranslation()
  const isRo = i18n.language === 'ro'

  return (
    <PageWrapper>
      <section
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #060e2e 0%, #0a2463 100%)' }}
      >
        <div className="text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-heading font-black text-incesa-accent text-[8rem] leading-none">404</p>
            <h1 className="font-heading font-bold text-white text-3xl mt-4 mb-4">
              {isRo ? 'Pagina nu a fost găsită' : 'Page Not Found'}
            </h1>
            <p className="text-white/60 mb-10 max-w-sm mx-auto">
              {isRo
                ? 'Pagina pe care o căutați nu există sau a fost mutată.'
                : 'The page you are looking for does not exist or has been moved.'}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-incesa-accent text-white font-semibold hover:bg-incesa-accent-light hover:text-incesa-blue transition-all"
            >
              {isRo ? 'Înapoi Acasă' : 'Back to Home'}
            </Link>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
