import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, Monitor, Video, Tv, Check, RefreshCw,
  ChevronLeft, ChevronRight, Calendar, Clock,
  AlertCircle, CheckCircle2, Building2,
} from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'

/* ── Room definitions ──────────────────────────────────────── */
const ROOMS = [
  {
    id: 'room-315',
    number: '315',
    seats: 55,
    floor: '3rd Floor',
    color: '#3e92cc',
    Icon: Video,
    features: ['Video Wall', 'CISCO Conference System', 'Embedded Audio & Video'],
    description: 'Large conference hall ideal for international meetings, major presentations, and large-scale events.',
  },
  {
    id: 'room-214',
    number: '214',
    seats: 40,
    floor: '2nd Floor',
    color: '#1e3a5f',
    Icon: Monitor,
    features: ['Audio & Video', 'Video Wall'],
    description: 'Mid-size meeting room suited for workshops, team presentations, and collaborative sessions.',
  },
  {
    id: 'room-203',
    number: '203',
    seats: 20,
    floor: '2nd Floor',
    color: '#2d7fc0',
    Icon: Tv,
    features: ['Video Projection', 'Smart Board'],
    description: 'Compact seminar room with interactive Smart Board, perfect for training and focused discussions.',
  },
]

/* ── Time slots (1-hour granularity) ───────────────────────── */
const TIME_SLOTS = [
  { id: 's1',  from: '08:00', to: '09:00', label: '08:00 – 09:00' },
  { id: 's2',  from: '09:00', to: '10:00', label: '09:00 – 10:00' },
  { id: 's3',  from: '10:00', to: '11:00', label: '10:00 – 11:00' },
  { id: 's4',  from: '11:00', to: '12:00', label: '11:00 – 12:00' },
  { id: 's5',  from: '12:00', to: '13:00', label: '12:00 – 13:00' },
  { id: 's6',  from: '13:00', to: '14:00', label: '13:00 – 14:00' },
  { id: 's7',  from: '14:00', to: '15:00', label: '14:00 – 15:00' },
  { id: 's8',  from: '15:00', to: '16:00', label: '15:00 – 16:00' },
  { id: 's9',  from: '16:00', to: '17:00', label: '16:00 – 17:00' },
  { id: 's10', from: '17:00', to: '18:00', label: '17:00 – 18:00' },
]


/* ── Helpers ───────────────────────────────────────────────── */
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
function isWeekend(date) {
  const d = date.getDay()
  return d === 0 || d === 6
}
function isPast(date) {
  const t = new Date(); t.setHours(0, 0, 0, 0)
  return date < t
}
function fmtDate(date) {
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`
}

/* ── Hero floating particles ───────────────────────────────── */
const HERO_PARTICLES = [
  { id: 0,  left: '7%',  size: 2,   dur: 7,  delay: 0   },
  { id: 1,  left: '16%', size: 3,   dur: 9,  delay: 1.2 },
  { id: 2,  left: '26%', size: 1.5, dur: 6,  delay: 2.8 },
  { id: 3,  left: '36%', size: 2.5, dur: 8,  delay: 0.6 },
  { id: 4,  left: '48%', size: 2,   dur: 10, delay: 3.5 },
  { id: 5,  left: '58%', size: 3,   dur: 7,  delay: 1.8 },
  { id: 6,  left: '67%', size: 1.5, dur: 9,  delay: 4.2 },
  { id: 7,  left: '77%', size: 2,   dur: 6,  delay: 2.0 },
  { id: 8,  left: '88%', size: 2.5, dur: 8,  delay: 0.3 },
  { id: 9,  left: '13%', size: 1.5, dur: 11, delay: 5.0 },
  { id: 10, left: '44%', size: 2,   dur: 7,  delay: 4.8 },
  { id: 11, left: '73%', size: 3,   dur: 9,  delay: 1.5 },
]

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {HERO_PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-incesa-accent"
          style={{ left: p.left, bottom: '5%', width: p.size, height: p.size }}
          animate={{ y: [0, -110, -260, -420], opacity: [0, 0.55, 0.35, 0], x: [0, 10, -7, 14] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

/* ── Canvas CAPTCHA ────────────────────────────────────────── */
function drawOnCanvas(canvas, text) {
  const ctx = canvas.getContext('2d')
  const W = canvas.width, H = canvas.height
  ctx.clearRect(0, 0, W, H)

  const grad = ctx.createLinearGradient(0, 0, W, H)
  grad.addColorStop(0, '#eef2ff')
  grad.addColorStop(1, '#dde8f6')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  for (let i = 0; i < 6; i++) {
    ctx.beginPath()
    ctx.strokeStyle = `rgba(62,146,204,${0.08 + Math.random() * 0.18})`
    ctx.lineWidth = 1 + Math.random() * 1.2
    ctx.moveTo(Math.random() * W, Math.random() * H)
    ctx.bezierCurveTo(
      Math.random() * W, Math.random() * H,
      Math.random() * W, Math.random() * H,
      Math.random() * W, Math.random() * H,
    )
    ctx.stroke()
  }
  for (let i = 0; i < 60; i++) {
    ctx.fillStyle = `rgba(10,36,99,${0.03 + Math.random() * 0.07})`
    ctx.beginPath()
    ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 1.6, 0, Math.PI * 2)
    ctx.fill()
  }

  const cw = W / (text.length + 1)
  const palette = ['#0a2463', '#3e92cc', '#1e3a5f', '#2d7fc0', '#0d3380', '#4dacdc']
  for (let i = 0; i < text.length; i++) {
    ctx.save()
    ctx.translate(cw * (i + 0.85) + (Math.random() - 0.5) * 5, H / 2 + (Math.random() - 0.5) * 9)
    ctx.rotate((Math.random() - 0.5) * 0.42)
    ctx.fillStyle = palette[i % palette.length]
    ctx.font = `700 ${24 + Math.random() * 9}px "Space Grotesk", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text[i], 0, 0)
    ctx.restore()
  }
}

function Captcha({ onVerified }) {
  const canvasRef = useRef(null)
  const codeRef = useRef('')
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle')

  function genAndDraw(resetStatus) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    const c = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    codeRef.current = c
    setInput('')
    if (resetStatus) setStatus('idle')
    requestAnimationFrame(() => {
      if (canvasRef.current) drawOnCanvas(canvasRef.current, c)
    })
  }

  function refresh() {
    genAndDraw(true)
    onVerified(false)
  }

  useEffect(() => { genAndDraw(true) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const verify = () => {
    if (input.toUpperCase() === codeRef.current) {
      setStatus('verified')
      onVerified(true)
    } else {
      setStatus('error')        // keep error visible
      onVerified(false)
      genAndDraw(false)         // new canvas code, but don't reset status to idle
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
        Security Verification <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center gap-3">
        <canvas
          ref={canvasRef}
          width={230}
          height={62}
          className="rounded-xl border border-slate-200 dark:border-gray-700 flex-shrink-0 select-none"
          aria-label="CAPTCHA image — type the characters you see into the field below"
        />
        <button
          type="button"
          onClick={refresh}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-incesa-accent/50 hover:bg-incesa-light dark:hover:bg-gray-800 transition-all cursor-pointer flex-shrink-0"
          title="Generate new code"
        >
          <RefreshCw className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        </button>
      </div>
      <div className="flex gap-2 items-stretch">
        <input
          type="text"
          value={input}
          onChange={e => {
            setInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))
            if (status === 'error') setStatus('idle')
          }}
          onKeyDown={e => e.key === 'Enter' && verify()}
          placeholder="Type the 6 characters above"
          maxLength={6}
          disabled={status === 'verified'}
          className={`flex-1 px-4 py-2.5 text-sm rounded-xl border font-mono tracking-[0.22em] uppercase bg-white dark:bg-gray-900 text-incesa-blue dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 placeholder:tracking-normal focus:outline-none focus:ring-2 transition-colors ${
            status === 'verified'
              ? 'border-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10 focus:ring-emerald-200'
              : status === 'error'
                ? 'border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
                : 'border-slate-200 dark:border-gray-700 focus:ring-incesa-accent/30 focus:border-incesa-accent'
          }`}
        />
        {status !== 'verified' && (
          <button
            type="button"
            onClick={verify}
            disabled={input.length < 6}
            className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-incesa-accent text-white hover:bg-incesa-blue disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
          >
            Verify
          </button>
        )}
      </div>
      <AnimatePresence mode="wait">
        {status === 'verified' && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400"
          >
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            Verified successfully
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            key="err"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-red-500"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Incorrect — a new code has been generated
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Mini Calendar ─────────────────────────────────────────── */
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function MiniCalendar({ selectedDate, onSelect }) {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const [view, setView] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const yr = view.getFullYear(), mo = view.getMonth()
  const daysInMonth = new Date(yr, mo + 1, 0).getDate()
  const firstDayOffset = (new Date(yr, mo, 1).getDay() + 6) % 7

  // eslint-disable-next-line no-unused-vars
  function isFullyBooked(_day) { return false }

  const todayKey = toDateKey(today)
  const selKey = selectedDate ? toDateKey(selectedDate) : null

  const cells = [
    ...Array(firstDayOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 w-full max-w-[280px] flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setView(new Date(yr, mo - 1, 1))}
          disabled={yr === today.getFullYear() && mo <= today.getMonth()}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-incesa-light dark:hover:bg-gray-800 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-incesa-blue dark:text-slate-300" />
        </button>
        <span className="text-sm font-bold font-heading text-incesa-blue dark:text-white">
          {MONTH_NAMES[mo]} {yr}
        </span>
        <button
          onClick={() => setView(new Date(yr, mo + 1, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-incesa-light dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 text-incesa-blue dark:text-slate-300" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map(d => (
          <div
            key={d}
            className={`text-center text-[10px] font-bold uppercase tracking-wide py-1 ${
              d === 'Sat' || d === 'Sun' ? 'text-slate-300 dark:text-slate-700' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />
          const date = new Date(yr, mo, day)
          const key = toDateKey(date)
          const weekend = isWeekend(date)
          const past = isPast(date)
          const full = !weekend && !past && isFullyBooked(day)
          const disabled = weekend || past || full
          const selected = selKey === key
          const todayMark = todayKey === key

          return (
            <button
              key={key}
              onClick={() => !disabled && onSelect(date)}
              disabled={disabled}
              title={full ? 'Fully booked' : weekend ? 'Weekend — closed' : past ? 'Past date' : undefined}
              className={`relative h-8 w-full flex items-center justify-center text-xs rounded-lg font-medium transition-all ${
                disabled
                  ? 'text-slate-200 dark:text-slate-800 cursor-not-allowed'
                  : selected
                    ? 'bg-incesa-accent text-white font-bold shadow shadow-incesa-accent/30'
                    : todayMark
                      ? 'border-2 border-incesa-accent text-incesa-accent hover:bg-incesa-light dark:hover:bg-gray-800'
                      : 'text-incesa-blue dark:text-slate-300 hover:bg-incesa-light dark:hover:bg-gray-800 cursor-pointer'
              }`}
            >
              {day}
              {full && !selected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400" />
              )}
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 pt-3 border-t border-slate-100 dark:border-gray-800">
        <span className="flex items-center gap-1 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-incesa-accent" /> Selected
        </span>
        <span className="flex items-center gap-1 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-full border-2 border-incesa-accent" /> Today
        </span>
        <span className="flex items-center gap-1 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-red-400" /> Fully booked
        </span>
      </div>
    </div>
  )
}

/* ── Step indicator ────────────────────────────────────────── */
function StepDot({ n, done, active }) {
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
        done
          ? 'bg-incesa-accent text-white'
          : active
            ? 'bg-incesa-blue text-white ring-4 ring-incesa-accent/20'
            : 'bg-slate-100 dark:bg-gray-800 text-slate-400 dark:text-slate-600'
      }`}
    >
      {done ? <Check className="w-4 h-4" /> : n}
    </div>
  )
}

function StepLine({ done }) {
  return (
    <div className={`h-[2px] flex-1 mx-2 max-w-[80px] rounded-full transition-colors duration-500 ${done ? 'bg-incesa-accent' : 'bg-slate-100 dark:bg-gray-800'}`} />
  )
}

/* ── Input field helper ────────────────────────────────────── */
function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {error}
        </p>
      )}
    </div>
  )
}

function inputCls(hasError) {
  return `w-full px-4 py-3 text-sm rounded-xl border bg-white dark:bg-gray-900 text-incesa-blue dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-colors ${
    hasError
      ? 'border-red-400 focus:ring-red-200 dark:focus:ring-red-900/30'
      : 'border-slate-200 dark:border-gray-700 focus:ring-incesa-accent/30 focus:border-incesa-accent'
  }`
}

/* ── Main page ─────────────────────────────────────────────── */
export default function Rooms() {
  const [room, setRoom] = useState(null)
  const [date, setDate] = useState(null)
  const [slotFrom, setSlotFrom] = useState(null)
  const [slotTo, setSlotTo] = useState(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [errors, setErrors] = useState({})
  const [captchaOk, setCaptchaOk] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [refId] = useState(() => `INC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)
  const [bookedRanges, setBookedRanges] = useState([]) // [{slotFrom, slotTo}] from API

  const step2Ref = useRef(null)
  const successRef = useRef(null)

  const dateKey = date ? toDateKey(date) : null

  // Fetch real booked ranges from DB whenever room + date both set
  useEffect(() => {
    if (!room || !dateKey) { setBookedRanges([]); return }
    fetch(`/api/reservations/slots/${room.id}/${dateKey}`)
      .then(r => r.ok ? r.json() : [])
      .then(data => setBookedRanges(data))
      .catch(() => setBookedRanges([]))
  }, [room, dateKey])

  function isSlotReserved(s) {
    return bookedRanges.some(b => b.slotFrom < s.to && b.slotTo > s.from)
  }

  function isSlotPast(s) {
    if (!date) return false
    const today = new Date(); today.setHours(0, 0, 0, 0)
    if (toDateKey(date) !== toDateKey(today)) return false
    const now = new Date()
    const [h, m] = s.from.split(':').map(Number)
    const start = new Date(); start.setHours(h, m, 0, 0)
    return start <= now
  }

  const availableSlots = TIME_SLOTS.filter(s => !isSlotReserved(s) && !isSlotPast(s))

  // Derived slot object — single slot or merged range
  const slot = slotFrom ? {
    from: slotFrom.from,
    to: (slotTo || slotFrom).to,
    label: slotTo ? `${slotFrom.from} – ${slotTo.to}` : slotFrom.label,
  } : null

  const slotDuration = slot
    ? `${parseInt(slot.to) - parseInt(slot.from)}h`
    : null

  const fromTimeIdx = slotFrom ? TIME_SLOTS.findIndex(s => s.id === slotFrom.id) : -1
  const toTimeIdx   = slotTo   ? TIME_SLOTS.findIndex(s => s.id === slotTo.id)   : fromTimeIdx

  function isInRange(s) {
    if (fromTimeIdx < 0) return false
    const idx = TIME_SLOTS.findIndex(x => x.id === s.id)
    return idx >= fromTimeIdx && idx <= toTimeIdx
  }

  function handleSlotClick(s) {
    setErrors(er => ({ ...er, slot: '' }))
    if (!slotFrom || slotFrom.id === s.id) {
      setSlotFrom(slotFrom?.id === s.id ? null : s)
      setSlotTo(null)
      return
    }
    const baseIdx  = TIME_SLOTS.findIndex(x => x.id === slotFrom.id)
    const clickIdx = TIME_SLOTS.findIndex(x => x.id === s.id)
    if (clickIdx <= baseIdx) { setSlotFrom(s); setSlotTo(null); return }
    // All TIME_SLOTS in range must be available (no gaps)
    const allOk = TIME_SLOTS.slice(baseIdx, clickIdx + 1).every(x => availableSlots.some(a => a.id === x.id))
    if (!allOk) { setSlotFrom(s); setSlotTo(null); return }
    setSlotTo(s)
  }

  function pickRoom(r) { setRoom(r); setDate(null); setSlotFrom(null); setSlotTo(null) }
  function pickDate(d) { setDate(d); setSlotFrom(null); setSlotTo(null) }

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim()) e.lastName = 'Last name is required'
    if (!form.email.trim()) e.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address'
    if (!captchaOk) e.captcha = 'Please solve the security verification'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: refId,
          roomId: room.id,
          roomNumber: room.number,
          date: dateKey,
          slot,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
        }),
      })
      if (res.status === 409) {
        const { error } = await res.json()
        setErrors({ slot: error })
        // Refresh slots so the newly-taken slot shows as reserved
        const fresh = await fetch(`/api/reservations/slots/${room.id}/${dateKey}`)
        if (fresh.ok) setBookedRanges(await fresh.json())
        setSlotFrom(null); setSlotTo(null)
        return
      }
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}))
        setErrors({ submit: error || 'Could not submit — please try again.' })
        return
      }
      setSubmitted(true)
      setTimeout(() => successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    } catch {
      setErrors({ submit: 'Network error — please check your connection.' })
    } finally {
      setSubmitting(false)
    }
  }

  function reset() {
    setRoom(null); setDate(null); setSlotFrom(null); setSlotTo(null)
    setForm({ firstName: '', lastName: '', email: '' })
    setErrors({}); setCaptchaOk(false); setSubmitted(false)
  }

  const step1Done = !!room
  const step2Done = !!date && !!slotFrom
  const step2Active = step1Done
  const step3Active = step1Done && step2Done

  // Scroll to step 2 whenever the room changes
  useEffect(() => {
    if (!room) return
    const t = setTimeout(() => step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 220)
    return () => clearTimeout(t)
  }, [room])

  return (
    <PageWrapper>
      <Helmet>
        <title>Reserve a Room — INCESA</title>
        <meta name="description" content="Book one of INCESA's three fully equipped conference rooms for meetings, presentations, and events." />
      </Helmet>

      {/* Hero */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #020a1e 0%, #051230 35%, #0a2463 70%, #0d2e72 100%)' }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 grid-dots-dark opacity-25" aria-hidden="true" />

        {/* Animated glow orbs */}
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.32, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-32 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #3e92cc 0%, transparent 65%)' }}
        />
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.1, 1], opacity: [0.14, 0.22, 0.14] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute -bottom-32 -left-28 w-[460px] h-[460px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7ec8e3 0%, transparent 65%)' }}
        />
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #3e92cc 0%, transparent 65%)' }}
        />

        {/* Decorative concentric rings */}
        <div
          aria-hidden="true"
          className="absolute -bottom-40 right-10 w-[340px] h-[340px] rounded-full border border-incesa-accent/10 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 right-24 w-[200px] h-[200px] rounded-full border border-incesa-accent/8 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-12 left-10 w-[160px] h-[160px] rounded-full border border-white/5 pointer-events-none"
        />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Horizontal accent at bottom */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(62,146,204,0.4) 40%, rgba(62,146,204,0.4) 60%, transparent)' }}
        />

        <div className="relative z-10 container-padded text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-incesa-accent/20 border border-incesa-accent/30 text-incesa-accent-light text-xs font-semibold uppercase tracking-[0.15em] mb-5">
            Room Reservations
          </span>
          <h1
            className="font-heading font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.025em' }}
          >
            Reserve a Conference Room
          </h1>
          <p className="mt-4 text-white/65 max-w-2xl mx-auto text-base sm:text-lg">
            Book one of our three fully equipped rooms for your next meeting, presentation, or collaborative session — Monday to Friday, 08:00 – 18:00.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/50 text-sm">
            {ROOMS.map(r => (
              <div key={r.id} className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-incesa-accent" />
                <span>Room <span className="text-white font-semibold">{r.number}</span> · {r.seats} seats</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-padded">
          {!submitted ? (
            <div className="max-w-4xl mx-auto">

              {/* Step indicator */}
              <div className="flex items-center justify-center mb-12">
                <div className="flex items-center">
                  <StepDot n={1} done={step1Done} active={!step1Done} />
                  <div className="mx-2 hidden sm:block">
                    <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">Choose Room</span>
                  </div>
                </div>
                <StepLine done={step1Done} />
                <div className="flex items-center">
                  <StepDot n={2} done={step2Done} active={step2Active && !step2Done} />
                  <div className="mx-2 hidden sm:block">
                    <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">Date & Time</span>
                  </div>
                </div>
                <StepLine done={step2Done} />
                <div className="flex items-center">
                  <StepDot n={3} done={false} active={step3Active} />
                  <div className="ml-2 hidden sm:block">
                    <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">Your Details</span>
                  </div>
                </div>
              </div>

              {/* ── STEP 1: Room selection ── */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step1Done ? 'bg-incesa-accent text-white' : 'bg-incesa-blue text-white'}`}>
                    {step1Done ? <Check className="w-3.5 h-3.5" /> : '1'}
                  </div>
                  <h2 className="font-heading text-xl font-bold text-incesa-blue dark:text-white">Choose a Room</h2>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {ROOMS.map(r => {
                    const { Icon } = r
                    const active = room?.id === r.id
                    return (
                      <motion.button
                        key={r.id}
                        onClick={() => pickRoom(r)}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.975 }}
                        className={`text-left p-5 rounded-2xl border-2 transition-all cursor-pointer w-full focus:outline-none focus:ring-2 focus:ring-incesa-accent/40 ${
                          active
                            ? 'border-incesa-accent bg-incesa-light dark:bg-gray-900 shadow-lg shadow-incesa-accent/10'
                            : 'border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-slate-300 dark:hover:border-gray-600 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${r.color}20` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: r.color }} />
                          </div>
                          <AnimatePresence>
                            {active && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="w-6 h-6 rounded-full bg-incesa-accent flex items-center justify-center flex-shrink-0"
                              >
                                <Check className="w-3.5 h-3.5 text-white" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-heading text-3xl font-bold text-incesa-blue dark:text-white">{r.number}</span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">{r.floor}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-3">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{r.seats} seats</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{r.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {r.features.map(f => (
                            <span
                              key={f}
                              className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold"
                              style={{ background: `${r.color}15`, color: r.color }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* ── STEP 2: Date & Time ── */}
              <AnimatePresence>
                {room && (
                  <motion.div
                    key="step2"
                    ref={step2Ref}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step2Done ? 'bg-incesa-accent text-white' : 'bg-incesa-blue text-white'}`}>
                        {step2Done ? <Check className="w-3.5 h-3.5" /> : '2'}
                      </div>
                      <h2 className="font-heading text-xl font-bold text-incesa-blue dark:text-white">Select Date & Time</h2>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                      {/* Calendar */}
                      <MiniCalendar selectedDate={date} onSelect={pickDate} />

                      {/* Time slots */}
                      <div className="flex-1 w-full">
                        {date ? (
                          <>
                            <p className="text-sm font-semibold text-incesa-blue dark:text-white mb-0.5">
                              Available time slots
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mb-5 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {fmtDate(date)} — Room {room.number}
                            </p>
                            <div className="space-y-2">
                              {TIME_SLOTS.map(s => {
                                const isAvailable = availableSlots.some(a => a.id === s.id)
                                const isPastSlot = isSlotPast(s)
                                const inRange = isInRange(s)
                                const isStart = slotFrom?.id === s.id
                                const isEnd = slotTo?.id === s.id
                                return (
                                  <motion.button
                                    key={s.id}
                                    onClick={() => isAvailable && handleSlotClick(s)}
                                    disabled={!isAvailable}
                                    whileTap={isAvailable ? { scale: 0.985 } : undefined}
                                    className={`w-full flex items-center justify-between px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-incesa-accent/30 ${
                                      !isAvailable
                                        ? 'border-slate-100 dark:border-gray-800 bg-slate-50/60 dark:bg-gray-900/30 opacity-50 cursor-not-allowed'
                                        : inRange
                                          ? 'border-incesa-accent bg-incesa-light dark:bg-gray-900 shadow-md shadow-incesa-accent/10 cursor-pointer'
                                          : 'border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-incesa-accent/40 hover:bg-incesa-light dark:hover:bg-gray-800 cursor-pointer'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Clock className={`w-4 h-4 flex-shrink-0 ${!isAvailable ? 'text-slate-200 dark:text-slate-700' : inRange ? 'text-incesa-accent' : 'text-slate-300 dark:text-slate-600'}`} />
                                      <span className={!isAvailable ? 'text-slate-300 dark:text-slate-600' : inRange ? 'text-incesa-blue dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-300'}>
                                        {s.label}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      {!isAvailable ? (
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                          isPastSlot
                                            ? 'text-slate-300 dark:text-slate-600 bg-slate-100 dark:bg-gray-800'
                                            : 'text-rose-400 bg-rose-50 dark:bg-rose-900/20'
                                        }`}>
                                          {isPastSlot ? 'Past' : 'Reserved'}
                                        </span>
                                      ) : inRange ? (
                                        <>
                                          {isStart && <span className="text-[10px] font-bold text-incesa-accent bg-incesa-accent/10 px-2 py-0.5 rounded-md">FROM</span>}
                                          {isEnd && <span className="text-[10px] font-bold text-incesa-accent bg-incesa-accent/10 px-2 py-0.5 rounded-md">TO</span>}
                                          {!isStart && !isEnd && <div className="w-2 h-2 rounded-full bg-incesa-accent/60" />}
                                          {isStart && !slotTo && (
                                            <div className="w-5 h-5 rounded-full bg-incesa-accent flex items-center justify-center ml-1">
                                              <Check className="w-3 h-3 text-white" />
                                            </div>
                                          )}
                                        </>
                                      ) : (
                                        <span className="text-[11px] font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-0.5 rounded-full">
                                          Available
                                        </span>
                                      )}
                                    </div>
                                  </motion.button>
                                )
                              })}
                            </div>
                            {slotFrom && !slotTo && availableSlots.length > 1 && (
                              <p className="mt-3 text-xs text-incesa-accent/80 dark:text-incesa-accent/70 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                Tap another slot to extend your booking, or proceed as is
                              </p>
                            )}
                            {slot && (
                              <div className="mt-3 flex items-center gap-2.5">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-incesa-accent text-white text-xs font-bold">
                                  <Clock className="w-3 h-3" />
                                  {slotDuration} total
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{slot.from} – {slot.to}</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full min-h-[180px] rounded-2xl border-2 border-dashed border-slate-100 dark:border-gray-800">
                            <Calendar className="w-8 h-8 text-slate-200 dark:text-slate-700 mb-3" />
                            <p className="text-sm text-slate-300 dark:text-slate-700">Pick a date to see available time slots</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {errors.slot && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errors.slot}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── STEP 3: Contact form ── */}
              <AnimatePresence>
                {step3Active && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-incesa-blue text-white">3</div>
                      <h2 className="font-heading text-xl font-bold text-incesa-blue dark:text-white">Your Details</h2>
                    </div>

                    {/* Booking summary banner */}
                    <div className="mb-8 p-4 rounded-2xl bg-incesa-light dark:bg-gray-900 border border-incesa-accent/20">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-incesa-accent mb-3">Reservation Summary</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2.5 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-incesa-accent/15 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-incesa-accent" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500">Room</p>
                            <p className="font-bold text-incesa-blue dark:text-white text-sm">Room {room.number}</p>
                          </div>
                        </div>
                        <div className="w-px h-10 bg-slate-200 dark:bg-gray-700 hidden sm:block" />
                        <div className="flex items-center gap-2.5 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-incesa-accent/15 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-incesa-accent" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500">Date</p>
                            <p className="font-bold text-incesa-blue dark:text-white text-sm">{fmtDate(date)}</p>
                          </div>
                        </div>
                        <div className="w-px h-10 bg-slate-200 dark:bg-gray-700 hidden sm:block" />
                        <div className="flex items-center gap-2.5 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-incesa-accent/15 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-incesa-accent" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500">Time Slot</p>
                            <p className="font-bold text-incesa-blue dark:text-white text-sm">{slot.label}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Field label="First Name" error={errors.firstName}>
                          <input
                            type="text"
                            value={form.firstName}
                            onChange={e => { setForm(f => ({ ...f, firstName: e.target.value })); setErrors(er => ({ ...er, firstName: '' })) }}
                            placeholder="e.g. Ion"
                            className={inputCls(!!errors.firstName)}
                          />
                        </Field>
                        <Field label="Last Name" error={errors.lastName}>
                          <input
                            type="text"
                            value={form.lastName}
                            onChange={e => { setForm(f => ({ ...f, lastName: e.target.value })); setErrors(er => ({ ...er, lastName: '' })) }}
                            placeholder="e.g. Popescu"
                            className={inputCls(!!errors.lastName)}
                          />
                        </Field>
                      </div>

                      <Field label="Email Address" error={errors.email}>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })) }}
                          placeholder="e.g. contact@ucv.ro"
                          className={inputCls(!!errors.email)}
                        />
                      </Field>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">
                          Reserved Slot
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={`Room ${room.number} — ${fmtDate(date)}, ${slot.label}`}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-100 dark:border-gray-800 bg-incesa-light dark:bg-gray-900/50 text-slate-500 dark:text-slate-400 cursor-default"
                        />
                      </div>

                      <div className="p-5 rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                        <Captcha
                          key={`${room.id}-${dateKey}-${slotFrom?.id}-${slotTo?.id}`}
                          onVerified={v => { setCaptchaOk(v); if (v) setErrors(er => ({ ...er, captcha: '' })) }}
                        />
                        {errors.captcha && (
                          <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.captcha}
                          </p>
                        )}
                      </div>

                      {errors.submit && (
                        <p className="text-sm text-red-500 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errors.submit}
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: submitting ? 1 : 1.01 }}
                        whileTap={{ scale: submitting ? 1 : 0.98 }}
                        className="w-full py-4 rounded-xl bg-incesa-accent text-white font-bold text-base hover:bg-incesa-blue transition-colors shadow-lg shadow-incesa-accent/25 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? 'Submitting…' : 'Submit Reservation'}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* ── Success state ── */
            <motion.div
              ref={successRef}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg mx-auto text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 14 }}
                className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </motion.div>
              <h2 className="font-heading text-2xl font-bold text-incesa-blue dark:text-white mb-3">
                Reservation Submitted!
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-2">
                Your request to reserve{' '}
                <strong className="text-incesa-blue dark:text-white">Room {room?.number}</strong> on{' '}
                <strong className="text-incesa-blue dark:text-white">{date && fmtDate(date)}</strong>,{' '}
                <strong className="text-incesa-blue dark:text-white">{slot?.label}</strong>{' '}
                has been received.
              </p>
              <div className="p-4 rounded-2xl bg-incesa-light dark:bg-gray-900 border border-incesa-accent/20 mb-8">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wide font-bold">Reference Number</p>
                <p className="font-mono font-bold text-xl text-incesa-blue dark:text-white">{refId}</p>
              </div>
              <button
                onClick={reset}
                className="px-6 py-3 rounded-xl bg-incesa-accent text-white font-semibold text-sm hover:bg-incesa-blue transition-colors cursor-pointer"
              >
                Make Another Reservation
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
