import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import BackToTop from './components/ui/BackToTop'
import CookieBanner from './components/ui/CookieBanner'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Research = lazy(() => import('./pages/Research'))
const ResearchCenter = lazy(() => import('./pages/ResearchCenter'))
const LabDetail = lazy(() => import('./pages/LabDetail'))
const Labs = lazy(() => import('./pages/Labs'))
const Projects = lazy(() => import('./pages/Projects'))
const Partners = lazy(() => import('./pages/Partners'))
const CTT = lazy(() => import('./pages/CTT'))
const News = lazy(() => import('./pages/News'))
const Contact = lazy(() => import('./pages/Contact'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
const Simira = lazy(() => import('./pages/Simira'))
const SupportCenter = lazy(() => import('./pages/SupportCenter'))
const NotFound = lazy(() => import('./pages/NotFound'))

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/labs" element={<Labs />} />
          <Route path="/research/projects" element={<Projects />} />
          <Route path="/research/:centerSlug/labs/:labSlug" element={<LabDetail />} />
          <Route path="/research/:slug" element={<ResearchCenter />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/ctt" element={<CTT />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/simira" element={<Simira />} />
          <Route path="/support/:slug" element={<SupportCenter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
          <BackToTop />
          <CookieBanner />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
