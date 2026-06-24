import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const STORAGE_KEY = 'incesa_cookie_consent'

export default function CookieBanner() {
  const { t } = useTranslation()
  // Synchronous check — no useEffect delay, so banner is present from first render
  // or absent from first render. Either way Chrome never sees it "appear" mid-paint.
  const [visible, setVisible] = useState(
    () => typeof window !== 'undefined' && !localStorage.getItem(STORAGE_KEY)
  )

  const dismiss = (value) => {
    localStorage.setItem(STORAGE_KEY, value)
    setVisible(false)
  }

  if (!visible) return null

  return createPortal(
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        padding: '1rem',
        contain: 'layout style',
      }}
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
            onClick={() => dismiss('declined')}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            {t('cookie.decline')}
          </button>
          <button
            onClick={() => dismiss('accepted')}
            className="px-5 py-2 text-sm font-semibold text-white bg-incesa-blue hover:bg-incesa-blue-mid rounded-xl transition-colors cursor-pointer"
          >
            {t('cookie.accept')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
