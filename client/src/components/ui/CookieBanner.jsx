import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const STORAGE_KEY = 'incesa_cookie_consent'

export default function CookieBanner() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) setVisible(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 inset-x-0 z-[2000] p-4 sm:p-6"
          style={{ willChange: 'opacity' }}
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-gray-700 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-incesa-light dark:bg-incesa-blue-mid/40 flex items-center justify-center">
              <Cookie className="w-5 h-5 text-incesa-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {t('cookie.banner')}{' '}
                <Link
                  to="/cookie-policy"
                  className="font-semibold text-incesa-accent hover:underline"
                  onClick={() => setVisible(false)}
                >
                  {t('cookie.learnMore')}
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                {t('cookie.decline')}
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2 text-sm font-semibold text-white bg-incesa-blue hover:bg-incesa-blue-mid rounded-xl transition-colors cursor-pointer"
              >
                {t('cookie.accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
