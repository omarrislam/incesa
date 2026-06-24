import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, XCircle, Trash2, Search, LogOut,
  Building2, Calendar, Clock, Mail, Shield,
  Download, AlertCircle, RotateCcw, Eye, EyeOff,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Pencil, X, LayoutGrid, CalendarDays, Plus, Home,
} from 'lucide-react'

const SESSION_KEY = 'incesa_admin_auth' // stores the password for the session

const ROOM_META = {
  'room-315': { number: '315', color: '#3e92cc', floor: '3rd Floor', seats: 55 },
  'room-214': { number: '214', color: '#10b981', floor: '2nd Floor', seats: 40 },
  'room-203': { number: '203', color: '#f59e0b', floor: '2nd Floor', seats: 20 },
}

const ALL_HOURS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']
const DAY_LABELS = ['Mon','Tue','Wed','Thu','Fri']

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function fmtDate(ymd) {
  const [y, m, d] = ymd.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}
function fmtSubmitted(iso) {
  const d = new Date(iso)
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}
function todayStr()    { return new Date().toISOString().split('T')[0] }
function toYMD(date)   {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
}
function getMonday(date) {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
  d.setHours(0, 0, 0, 0)
  return d
}


/* ── Password gate ──────────────────────────────────────────── */
function PasswordGate({ onAuth }) {
  const [pw, setPw]       = useState('')
  const [show, setShow]   = useState(false)
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  async function attempt() {
    // Verify against the real server — a 200 means the password is correct
    try {
      const res = await fetch('/api/reservations', {
        headers: { Authorization: `Bearer ${pw}` },
      })
      if (res.ok) { onAuth(pw) }
      else { setError(true); setShake(true); setTimeout(() => setShake(false), 420) }
    } catch {
      setError(true); setShake(true); setTimeout(() => setShake(false), 420)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #020a1e 0%, #051230 40%, #0a2463 100%)' }}
    >
      <motion.div
        animate={shake ? { x: [-10, 10, -7, 7, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 pt-8 pb-6 text-center border-b border-slate-100 dark:border-gray-800 space-y-3">
            <img src="/images/incesa-logo-web.svg" alt="INCESA" style={{ height: '38px', width: 'auto' }} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">INCESA</p>
              <h1 className="font-heading text-xl font-bold text-incesa-blue dark:text-white mt-0.5">Administration Panel</h1>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-gray-800 px-3 py-1.5 rounded-full">
              <Shield className="w-3 h-3" /> Restricted access
            </div>
          </div>
          <div className="px-8 py-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">Admin Password</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={pw}
                  onChange={e => { setPw(e.target.value); setError(false) }}
                  onKeyDown={e => e.key === 'Enter' && attempt()}
                  placeholder="Enter password"
                  autoFocus
                  className={`w-full px-4 py-3 text-sm rounded-xl border bg-white dark:bg-gray-900 text-incesa-blue dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 pr-10 transition-colors ${
                    error ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 dark:border-gray-700 focus:ring-incesa-accent/30 focus:border-incesa-accent'
                  }`}
                />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400 transition-colors cursor-pointer"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p key="err"
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3 flex-shrink-0" /> Incorrect password
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <button onClick={attempt}
              className="w-full py-3 rounded-xl bg-incesa-accent text-white font-bold text-sm hover:bg-incesa-blue transition-colors shadow-lg shadow-incesa-accent/20 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Status badge ───────────────────────────────────────────── */
function StatusBadge({ status }) {
  const styles = {
    active:    { wrap: 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/20 dark:border-emerald-800', dot: 'bg-emerald-500' },
    cancelled: { wrap: 'text-slate-400 bg-slate-100 border-slate-200 dark:text-slate-500 dark:bg-gray-800 dark:border-gray-700',                 dot: 'bg-slate-400'  },
  }[status] ?? { wrap: '', dot: '' }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-[0.06em] flex-shrink-0 ${styles.wrap}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${styles.dot}`} />
      {status}
    </span>
  )
}

/* ── Stat card ──────────────────────────────────────────────── */
function StatCard({ value, label, color, Icon }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-800 p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-bold font-heading leading-none" style={{ color }}>{value}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">{label}</p>
      </div>
    </div>
  )
}

/* ── Edit modal ─────────────────────────────────────────────── */
function AddReservationModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    roomId: 'room-315', date: '', slotFrom: '', slotTo: '',
    firstName: '', lastName: '', email: '',
  })
  const [errors, setErrors]       = useState({})
  const [saveError, setSaveError] = useState('')
  const [saving, setSaving]       = useState(false)
  const [bookedRanges, setBookedRanges] = useState([])

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Fetch booked ranges whenever room or date changes
  useEffect(() => {
    if (!form.roomId || !form.date) { setBookedRanges([]); return }
    fetch(`/api/reservations/slots/${form.roomId}/${form.date}`)
      .then(r => r.ok ? r.json() : [])
      .then(setBookedRanges)
      .catch(() => setBookedRanges([]))
  }, [form.roomId, form.date])

  // A "from" hour is blocked if it falls inside any booked range
  function isFromBlocked(h) {
    return bookedRanges.some(b => h >= b.slotFrom && h < b.slotTo)
  }

  // A "to" hour is blocked if [slotFrom → h] overlaps any booked range
  function isToBlocked(h) {
    if (!form.slotFrom) return false
    return bookedRanges.some(b => form.slotFrom < b.slotTo && h > b.slotFrom)
  }

  const fromHours = ALL_HOURS.slice(0, -1) // 08:00–17:00
  const toHours   = ALL_HOURS.filter(h => h > form.slotFrom)

  function set(field, val) {
    setForm(f => {
      const next = { ...f, [field]: val }
      if (field === 'slotFrom' && next.slotTo <= val) next.slotTo = ''
      if (field === 'roomId' || field === 'date') { next.slotFrom = ''; next.slotTo = '' }
      return next
    })
    setErrors(e => ({ ...e, [field]: '' }))
    setSaveError('')
  }

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim())  e.lastName  = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.date)     e.date     = 'Required'
    if (!form.slotFrom) e.slotFrom = 'Required'
    if (!form.slotTo)   e.slotTo   = 'Required'
    return e
  }

  async function handleSave() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSaving(true)
    setSaveError('')
    const meta = ROOM_META[form.roomId]
    const id = `INC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    const result = await onSave({
      id,
      roomId: form.roomId, roomNumber: meta.number, date: form.date,
      slot: { from: form.slotFrom, to: form.slotTo, label: `${form.slotFrom} – ${form.slotTo}` },
      firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim(),
    })
    setSaving(false)
    if (!result.ok) setSaveError(result.error)
  }

  const inputCls = err =>
    `w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-gray-900 text-incesa-blue dark:text-white focus:outline-none focus:ring-2 transition-colors ${
      err ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 dark:border-gray-700 focus:ring-incesa-accent/30 focus:border-incesa-accent'
    }`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}
      />
      <motion.div key="md"
        initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }} transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-gray-800">
          <div>
            <h2 className="font-heading font-bold text-incesa-blue dark:text-white text-lg">New Reservation</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Created by admin</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">Room</label>
            <select value={form.roomId} onChange={e => set('roomId', e.target.value)} className={inputCls(false)}>
              {Object.entries(ROOM_META).map(([id, m]) => (
                <option key={id} value={id}>Room {m.number} — {m.floor} ({m.seats} seats)</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">Date</label>
            <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className={inputCls(errors.date)} />
            {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">Time</label>
            <div className="flex items-center gap-3">
              <select value={form.slotFrom} onChange={e => set('slotFrom', e.target.value)} className={`flex-1 ${inputCls(errors.slotFrom)}`}>
                <option value="">From</option>
                {fromHours.map(h => (
                  <option key={h} value={h} disabled={isFromBlocked(h)}>
                    {h}{isFromBlocked(h) ? ' (taken)' : ''}
                  </option>
                ))}
              </select>
              <span className="text-slate-300 dark:text-slate-600 text-sm flex-shrink-0">to</span>
              <select value={form.slotTo} onChange={e => set('slotTo', e.target.value)} disabled={!form.slotFrom} className={`flex-1 ${inputCls(errors.slotTo)} disabled:opacity-50 disabled:cursor-not-allowed`}>
                <option value="">To</option>
                {toHours.map(h => (
                  <option key={h} value={h} disabled={isToBlocked(h)}>
                    {h}{isToBlocked(h) ? ' (taken)' : ''}
                  </option>
                ))}
              </select>
            </div>
            {(errors.slotFrom || errors.slotTo) && <p className="mt-1 text-xs text-red-500">Select both start and end times</p>}
          </div>
          <hr className="border-slate-100 dark:border-gray-800" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">First Name</label>
              <input type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)} className={inputCls(errors.firstName)} />
              {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">Last Name</label>
              <input type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)} className={inputCls(errors.lastName)} />
              {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls(errors.email)} />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
        </div>
        <div className="px-6 pb-2">
          {saveError && (
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-semibold">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {saveError}
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 dark:border-gray-800">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-incesa-accent text-white hover:bg-incesa-blue transition-colors shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
            {saving ? 'Creating…' : 'Create Reservation'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function EditModal({ res, onSave, onClose }) {
  const [form, setForm] = useState({
    roomId: res.roomId, date: res.date,
    slotFrom: res.slot.from, slotTo: res.slot.to,
    firstName: res.firstName, lastName: res.lastName, email: res.email,
  })
  const [errors, setErrors] = useState({})
  const [saveError, setSaveError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const toHours = ALL_HOURS.filter(h => h > form.slotFrom)

  function set(field, val) {
    setForm(f => {
      const next = { ...f, [field]: val }
      if (field === 'slotFrom' && next.slotTo <= val) next.slotTo = ''
      return next
    })
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim())  e.lastName  = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.date)     e.date    = 'Required'
    if (!form.slotFrom) e.slotFrom = 'Required'
    if (!form.slotTo)   e.slotTo  = 'Required'
    return e
  }

  async function handleSave() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSaving(true)
    setSaveError('')
    const meta = ROOM_META[form.roomId]
    const result = await onSave({ roomId: form.roomId, roomNumber: meta.number, date: form.date,
      slot: { from: form.slotFrom, to: form.slotTo, label: `${form.slotFrom} – ${form.slotTo}` },
      firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim(),
    })
    setSaving(false)
    if (!result.ok) setSaveError(result.error)
  }

  const inputCls = err =>
    `w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-gray-900 text-incesa-blue dark:text-white focus:outline-none focus:ring-2 transition-colors ${
      err ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 dark:border-gray-700 focus:ring-incesa-accent/30 focus:border-incesa-accent'
    }`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}
      />
      <motion.div key="md"
        initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }} transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-gray-800">
          <div>
            <h2 className="font-heading font-bold text-incesa-blue dark:text-white text-lg">Edit Reservation</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-mono">{res.id}</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">Room</label>
            <select value={form.roomId} onChange={e => set('roomId', e.target.value)} className={inputCls(false)}>
              {Object.entries(ROOM_META).map(([id, m]) => (
                <option key={id} value={id}>Room {m.number} — {m.floor} ({m.seats} seats)</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">Date</label>
            <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className={inputCls(errors.date)} />
            {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">Time</label>
            <div className="flex items-center gap-3">
              <select value={form.slotFrom} onChange={e => set('slotFrom', e.target.value)} className={`flex-1 ${inputCls(errors.slotFrom)}`}>
                <option value="">From</option>
                {ALL_HOURS.slice(0, -1).map(h => <option key={h} value={h}>{h}</option>)}
              </select>
              <span className="text-slate-300 dark:text-slate-600 text-sm flex-shrink-0">to</span>
              <select value={form.slotTo} onChange={e => set('slotTo', e.target.value)} disabled={!form.slotFrom} className={`flex-1 ${inputCls(errors.slotTo)} disabled:opacity-50 disabled:cursor-not-allowed`}>
                <option value="">To</option>
                {toHours.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            {(errors.slotFrom || errors.slotTo) && <p className="mt-1 text-xs text-red-500">Select both start and end times</p>}
          </div>
          <hr className="border-slate-100 dark:border-gray-800" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">First Name</label>
              <input type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)} className={inputCls(errors.firstName)} />
              {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">Last Name</label>
              <input type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)} className={inputCls(errors.lastName)} />
              {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls(errors.email)} />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
        </div>
        <div className="px-6 pb-2">
          {saveError && (
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-semibold">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {saveError}
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 dark:border-gray-800">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-incesa-accent text-white hover:bg-incesa-blue transition-colors shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Reservation card ───────────────────────────────────────── */
function ReservationCard({ res, onEdit, onUpdate, onDelete }) {
  const meta = ROOM_META[res.roomId]
  const [pendingCancel, setPendingCancel] = useState(false)
  const [pendingDelete, setPendingDelete] = useState(false)
  const [restoreError, setRestoreError] = useState('')
  const duration = parseInt(res.slot.to) - parseInt(res.slot.from)

  return (
    <motion.div layout
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.22 }}
      className={`bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden hover:shadow-lg dark:hover:shadow-gray-950/50 transition-all ${
        res.status === 'cancelled' ? 'border-slate-100 dark:border-gray-800 opacity-70' : 'border-slate-100 dark:border-gray-800 hover:border-slate-200 dark:hover:border-gray-700'
      }`}
    >
      <div className="h-1 flex-shrink-0" style={{ background: res.status === 'cancelled' ? '#94a3b8' : meta.color }} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: res.status === 'cancelled' ? '#94a3b820' : `${meta.color}18` }}
            >
              <Building2 className="w-5 h-5" style={{ color: res.status === 'cancelled' ? '#94a3b8' : meta.color }} />
            </div>
            <div>
              <p className="font-heading font-bold text-incesa-blue dark:text-white leading-tight">Room {meta.number}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">{meta.floor} · {meta.seats} seats</p>
            </div>
          </div>
          <StatusBadge status={res.status} />
        </div>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-incesa-accent flex-shrink-0" />
            <span className="font-semibold">{fmtDate(res.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-incesa-accent flex-shrink-0" />
            <span>{res.slot.label}</span>
            <span className="text-xs text-slate-300 dark:text-slate-600 font-medium">({duration}h)</span>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-gray-800/50 rounded-xl px-3.5 py-3 mb-4 space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
              style={{ background: `${meta.color}20`, color: meta.color }}
            >
              {res.firstName[0]}{res.lastName[0]}
            </div>
            <span className="text-sm font-semibold text-incesa-blue dark:text-white">{res.firstName} {res.lastName}</span>
          </div>
          <div className="flex items-center gap-2 pl-9">
            <Mail className="w-3 h-3 text-slate-300 dark:text-slate-600 flex-shrink-0" />
            <a href={`mailto:${res.email}`} className="text-xs text-slate-400 dark:text-slate-500 hover:text-incesa-accent transition-colors truncate">
              {res.email}
            </a>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">{res.id}</span>
          <span className="text-[11px] text-slate-300 dark:text-slate-600">{fmtSubmitted(res.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-gray-800">
          {res.status === 'active' && (
            <>
              <button onClick={() => onEdit(res)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 text-slate-500 dark:text-slate-400 hover:border-incesa-accent/50 hover:text-incesa-accent hover:bg-incesa-light dark:hover:bg-gray-800 active:scale-95 text-xs font-semibold transition-all cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => { if (pendingCancel) { onUpdate(res.id, 'cancelled'); setPendingCancel(false) } else setPendingCancel(true) }}
                onBlur={() => setPendingCancel(false)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all cursor-pointer ${
                  pendingCancel ? 'bg-red-500 text-white' : 'border border-slate-200 dark:border-gray-700 text-slate-500 dark:text-slate-400 hover:border-red-300 dark:hover:border-red-800 hover:text-red-500 dark:hover:text-red-400'
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                {pendingCancel ? 'Confirm?' : 'Cancel'}
              </button>
            </>
          )}
          {res.status === 'cancelled' && (
            <>
              {restoreError && (
                <div className="w-full flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 text-[11px] font-semibold mb-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" /> {restoreError}
                </div>
              )}
              <button onClick={async () => {
                setRestoreError('')
                const result = await onUpdate(res.id, 'active')
                if (!result.ok) setRestoreError(result.error)
              }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-gray-800 active:scale-95 text-xs font-semibold transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restore
              </button>
              <button
                onClick={() => { if (pendingDelete) onDelete(res.id); else setPendingDelete(true) }}
                onBlur={() => setPendingDelete(false)}
                className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all cursor-pointer ${
                  pendingDelete ? 'bg-red-500 text-white' : 'border border-slate-200 dark:border-gray-700 text-slate-400 dark:text-slate-500 hover:border-red-300 dark:hover:border-red-800 hover:text-red-500'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                {pendingDelete ? 'Sure?' : ''}
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Timeline view ──────────────────────────────────────────── */
function TimelineView({ reservations, onEdit, onUpdate, onDelete }) {
  const todayYMD = toYMD(new Date())
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()))
  const [tooltip, setTooltip]     = useState(null) // { res, x, y }
  const [actionMenu, setActionMenu] = useState(null) // { res, x, y }
  const [menuError, setMenuError] = useState('')

  const days = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    return d
  })

  const ws = days[0], we = days[4]
  const weekLabel = ws.getMonth() === we.getMonth()
    ? `${ws.getDate()}–${we.getDate()} ${MONTHS_SHORT[ws.getMonth()]} ${ws.getFullYear()}`
    : `${ws.getDate()} ${MONTHS_SHORT[ws.getMonth()]} – ${we.getDate()} ${MONTHS_SHORT[we.getMonth()]} ${ws.getFullYear()}`

  function prevWeek() { setWeekStart(d => { const n = new Date(d); n.setDate(n.getDate() - 7); return n }) }
  function nextWeek() { setWeekStart(d => { const n = new Date(d); n.setDate(n.getDate() + 7); return n }) }

  useEffect(() => {
    if (!actionMenu) return
    function close(e) { if (!e.target.closest('[data-action-menu]')) { setActionMenu(null); setMenuError('') } }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [actionMenu])

  function resByRoomDay(roomId, ymd) {
    return reservations.filter(r => r.roomId === roomId && r.date === ymd)
  }

  function blockStyle(res, color) {
    const from = parseInt(res.slot.from)
    const to   = parseInt(res.slot.to)
    const left  = ((from - 8) / 10) * 100
    const width = ((to - from) / 10) * 100
    return {
      left: `${left}%`,
      width: `${width}%`,
      background: res.status === 'cancelled' ? '#94a3b8' : color,
      opacity: res.status === 'cancelled' ? 0.45 : 1,
    }
  }

  // Hour grid line positions (every 2h: 10, 12, 14, 16 → 20%, 40%, 60%, 80%)
  const GRID_LINES = [2, 4, 6, 8] // offset in hours from 08:00

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-800 overflow-hidden">

      {/* Week navigation */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-gray-800">
        <button onClick={prevWeek}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Prev
        </button>
        <div className="flex items-center gap-3">
          <span className="font-heading font-bold text-incesa-blue dark:text-white text-sm">{weekLabel}</span>
          <button onClick={() => setWeekStart(getMonday(new Date()))}
            className="px-2.5 py-1 rounded-lg text-[11px] font-bold border border-incesa-accent/30 text-incesa-accent hover:bg-incesa-accent hover:text-white transition-colors cursor-pointer"
          >
            Today
          </button>
        </div>
        <button onClick={nextWeek}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Next <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scrollable grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">

          {/* Day headers */}
          <div className="flex border-b border-slate-100 dark:border-gray-800">
            {/* Room label spacer */}
            <div className="w-16 flex-shrink-0 border-r border-slate-100 dark:border-gray-800" />
            {/* Hour scale header */}
            <div className="w-20 flex-shrink-0 border-r border-slate-100 dark:border-gray-800 flex items-end justify-center pb-2">
              <span className="text-[10px] text-slate-300 dark:text-slate-700 font-medium uppercase tracking-wide">Room</span>
            </div>
            {days.map((day, i) => {
              const ymd     = toYMD(day)
              const isToday = ymd === todayYMD
              const count   = reservations.filter(r => r.date === ymd).length
              return (
                <div key={i}
                  className={`flex-1 px-2 py-3 text-center border-r border-slate-100 dark:border-gray-800 last:border-0 ${isToday ? 'bg-incesa-accent/5 dark:bg-incesa-accent/10' : ''}`}
                >
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isToday ? 'text-incesa-accent' : 'text-slate-400 dark:text-slate-600'}`}>
                    {DAY_LABELS[i]}
                  </p>
                  <p className={`font-heading font-bold text-lg leading-tight ${isToday ? 'text-incesa-accent' : 'text-incesa-blue dark:text-white'}`}>
                    {day.getDate()}
                  </p>
                  <p className={`text-[10px] ${isToday ? 'text-incesa-accent/70' : 'text-slate-300 dark:text-slate-700'}`}>
                    {MONTHS_SHORT[day.getMonth()]}
                  </p>
                  {count > 0 && (
                    <span className="mt-1 inline-block px-1.5 py-0.5 rounded-full bg-incesa-accent/15 text-incesa-accent text-[10px] font-bold">
                      {count}
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Hour scale row */}
          <div className="flex border-b border-slate-100 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-800/20">
            <div className="w-16 flex-shrink-0 border-r border-slate-100 dark:border-gray-800" />
            <div className="w-20 flex-shrink-0 border-r border-slate-100 dark:border-gray-800" />
            <div className="flex-1 relative h-7 overflow-hidden">
              {/* Avoid 08:00 and 18:00 — they bleed outside the container with translate(-50%) */}
              {[10, 12, 14, 16].map(h => (
                <span
                  key={h}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-[10px] text-slate-300 dark:text-slate-700 font-mono select-none"
                  style={{ left: `${((h - 8) / 10) * 100}%` }}
                >
                  {h}:00
                </span>
              ))}
              <span className="absolute top-1/2 -translate-y-1/2 text-[10px] text-slate-300 dark:text-slate-700 font-mono select-none" style={{ left: '2px' }}>08:00</span>
              <span className="absolute top-1/2 -translate-y-1/2 text-[10px] text-slate-300 dark:text-slate-700 font-mono select-none" style={{ right: '2px' }}>18:00</span>
            </div>
          </div>

          {/* Room rows */}
          {Object.entries(ROOM_META).map(([roomId, meta], ri) => (
            <div key={roomId}
              className={`flex ${ri < 2 ? 'border-b border-slate-100 dark:border-gray-800' : ''}`}
            >
              {/* Room color stripe */}
              <div className="w-16 flex-shrink-0 flex items-center justify-center border-r border-slate-100 dark:border-gray-800 py-3">
                <span
                  className="text-[11px] font-bold px-2 py-1 rounded-lg writing-mode-vertical"
                  style={{ background: `${meta.color}18`, color: meta.color }}
                >
                  {meta.number}
                </span>
              </div>

              {/* Row label area (floor/seats) */}
              <div className="w-20 flex-shrink-0 flex flex-col items-end justify-center pr-2 border-r border-slate-100 dark:border-gray-800 py-3">
                <span className="text-[10px] text-slate-400 dark:text-slate-600 font-medium leading-tight text-right">{meta.floor}</span>
                <span className="text-[10px] text-slate-300 dark:text-slate-700 leading-tight">{meta.seats} seats</span>
              </div>

              {/* Day cells */}
              {days.map((day, di) => {
                const ymd     = toYMD(day)
                const isToday = ymd === todayYMD
                const dayRes  = resByRoomDay(roomId, ymd)

                return (
                  <div key={di}
                    className={`flex-1 relative border-r border-slate-100 dark:border-gray-800 last:border-0 ${isToday ? 'bg-incesa-accent/5 dark:bg-incesa-accent/10' : 'bg-white dark:bg-gray-900'}`}
                    style={{ minHeight: 56 }}
                  >
                    {/* Hour grid lines */}
                    {GRID_LINES.map(h => (
                      <div key={h}
                        className="absolute inset-y-0 w-px bg-slate-100 dark:bg-gray-800/80"
                        style={{ left: `${(h / 10) * 100}%` }}
                      />
                    ))}

                    {/* Reservation blocks */}
                    {dayRes.map(res => {
                      const from = parseInt(res.slot.from)
                      const to   = parseInt(res.slot.to)
                      const pct  = ((to - from) / 10) * 100
                      return (
                        <div
                          key={res.id}
                          className="absolute inset-y-2 rounded-lg cursor-pointer group transition-all hover:inset-y-1 hover:shadow-lg hover:brightness-110"
                          style={{ ...blockStyle(res, meta.color), zIndex: res.status === 'active' ? 2 : 1 }}
                          onMouseEnter={e => {
                            if (actionMenu) return
                            const r = e.currentTarget.getBoundingClientRect()
                            setTooltip({ res, x: r.left + r.width / 2, y: r.top })
                          }}
                          onMouseLeave={() => setTooltip(null)}
                          onClick={e => {
                            e.stopPropagation()
                            setTooltip(null)
                            const r = e.currentTarget.getBoundingClientRect()
                            setActionMenu({ res, x: r.left + r.width / 2, y: r.top })
                          }}
                        >
                          {/* Initials / label inside block */}
                          {pct >= 18 && (
                            <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold px-1 truncate select-none">
                              {pct >= 30
                                ? `${res.firstName[0]}. ${res.lastName}`
                                : `${res.firstName[0]}${res.lastName[0]}`
                              }
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 px-5 py-3 border-t border-slate-100 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-800/20">
        {Object.values(ROOM_META).map(m => (
          <span key={m.number} className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: m.color }} />
            Room {m.number}
          </span>
        ))}
        <span className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-600">
          <span className="w-3 h-3 rounded-sm bg-slate-300 dark:bg-slate-600 flex-shrink-0 opacity-50" />
          Cancelled
        </span>
        <span className="ml-auto text-[11px] text-slate-300 dark:text-slate-700 font-mono">08:00 → 18:00</span>
      </div>

      {/* Hover tooltip */}
      {tooltip && !actionMenu && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, calc(-100% - 10px))' }}
        >
          <div className="bg-gray-900 text-white rounded-xl px-3 py-2.5 shadow-2xl text-left min-w-[160px]">
            <p className="text-[11px] font-bold leading-tight">{tooltip.res.firstName} {tooltip.res.lastName}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{tooltip.res.slot.label} · {parseInt(tooltip.res.slot.to) - parseInt(tooltip.res.slot.from)}h</p>
            <p className="text-[10px] text-gray-400">Room {tooltip.res.roomNumber}</p>
            {tooltip.res.status === 'cancelled' && (
              <p className="text-[10px] text-red-400 mt-0.5 font-semibold">Cancelled</p>
            )}
          </div>
          <div className="w-0 h-0 mx-auto" style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #111827' }} />
        </div>
      )}

      {/* Click action menu */}
      {actionMenu && (
        <div
          data-action-menu
          className="fixed z-[9999]"
          style={{ left: actionMenu.x, top: actionMenu.y, transform: 'translate(-50%, calc(-100% - 10px))' }}
        >
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden min-w-[180px]">
            <div className="px-3 py-2.5 border-b border-slate-100 dark:border-gray-800">
              <p className="text-[11px] font-bold text-incesa-blue dark:text-white leading-tight">{actionMenu.res.firstName} {actionMenu.res.lastName}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{actionMenu.res.slot.label} · Room {actionMenu.res.roomNumber}</p>
            </div>
            <div className="p-1.5 space-y-0.5">
              <button
                onClick={() => { setActionMenu(null); setMenuError(''); onEdit(actionMenu.res) }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-left"
              >
                <Pencil className="w-3.5 h-3.5 text-incesa-accent flex-shrink-0" /> Edit
              </button>
              {actionMenu.res.status === 'active' ? (
                <button
                  onClick={async () => { const r = await onUpdate(actionMenu.res.id, 'cancelled'); if (r.ok) { setActionMenu(null); setMenuError('') } }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer text-left"
                >
                  <XCircle className="w-3.5 h-3.5 flex-shrink-0" /> Cancel reservation
                </button>
              ) : (
                <>
                  <button
                    onClick={async () => {
                      setMenuError('')
                      const result = await onUpdate(actionMenu.res.id, 'active')
                      if (result.ok) { setActionMenu(null) }
                      else setMenuError(result.error)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors cursor-pointer text-left"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" /> Restore reservation
                  </button>
                  <button
                    onClick={() => { onDelete(actionMenu.res.id); setActionMenu(null); setMenuError('') }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer text-left"
                  >
                    <Trash2 className="w-3.5 h-3.5 flex-shrink-0" /> Delete permanently
                  </button>
                </>
              )}
              {menuError && (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 text-[11px] font-semibold">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" /> {menuError}
                </div>
              )}
            </div>
          </div>
          <div className="w-0 h-0 mx-auto" style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #e2e8f0' }} />
        </div>
      )}
    </div>
  )
}

/* ── Main admin page ────────────────────────────────────────── */
export default function Admin() {
  const [authed, setAuthed]             = useState(() => Boolean(sessionStorage.getItem(SESSION_KEY)))
  const [reservations, setReservations] = useState([])
  const [loading, setLoading]           = useState(false)
  const [loadError, setLoadError]       = useState(false)
  const [filterRoom, setFilterRoom]     = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [search, setSearch]             = useState('')
  const [sortDir, setSortDir]           = useState('desc')
  const [viewMode, setViewMode]         = useState('cards') // 'cards' | 'timeline'
  const [editingRes, setEditingRes]     = useState(null)
  const [addingRes, setAddingRes]       = useState(false)

  function authHeader() {
    return { Authorization: `Bearer ${sessionStorage.getItem(SESSION_KEY)}` }
  }

  useEffect(() => {
    document.title = 'Admin — INCESA'
    return () => { document.title = 'INCESA' }
  }, [])

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    setLoadError(false)
    fetch('/api/reservations', { headers: authHeader() })
      .then(r => {
        if (r.status === 401) { handleLogout(); return null }
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then(data => { if (data) setReservations(data) })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false))
  }, [authed]) // eslint-disable-line react-hooks/exhaustive-deps

  async function updateStatus(id, status) {
    const prev = reservations.find(r => r.id === id)
    setReservations(r => r.map(x => x.id === id ? { ...x, status } : x))
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}))
        setReservations(r => r.map(x => x.id === id ? prev : x))
        return { ok: false, error: error || 'Could not update.' }
      }
    } catch {
      setReservations(r => r.map(x => x.id === id ? prev : x))
      return { ok: false, error: 'Network error — please try again.' }
    }
    return { ok: true }
  }

  async function saveEdit(id, changes) {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(changes),
      })
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}))
        return { ok: false, error: error || 'Could not save.' }
      }
    } catch {
      return { ok: false, error: 'Network error — please try again.' }
    }
    setReservations(prev => prev.map(r => r.id === id ? { ...r, ...changes } : r))
    setEditingRes(null)
    return { ok: true }
  }

  function deleteReservation(id) {
    setReservations(prev => prev.filter(r => r.id !== id))
    fetch(`/api/reservations/${id}`, {
      method: 'DELETE',
      headers: authHeader(),
    }).catch(() => {})
  }

  async function addReservation(data) {
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}))
        return { ok: false, error: error || 'Could not create reservation.' }
      }
      // Refresh list from server so new entry appears
      const all = await fetch('/api/reservations', { headers: authHeader() })
      if (all.ok) setReservations(await all.json())
      setAddingRes(false)
      return { ok: true }
    } catch {
      return { ok: false, error: 'Network error — please try again.' }
    }
  }

  function handleAuth(pw)  { sessionStorage.setItem(SESSION_KEY, pw); setAuthed(true) }
  function handleLogout()  { sessionStorage.removeItem(SESSION_KEY); setAuthed(false) }

  const stats = useMemo(() => {
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const in7   = new Date(today); in7.setDate(in7.getDate() + 7)
    return {
      total:     reservations.length,
      active:    reservations.filter(r => r.status === 'active').length,
      cancelled: reservations.filter(r => r.status === 'cancelled').length,
      upcoming:  reservations.filter(r => {
        if (r.status !== 'active') return false
        const d = new Date(r.date + 'T00:00:00')
        return d >= today && d <= in7
      }).length,
    }
  }, [reservations])

  const filtered = useMemo(() => {
    let list = reservations
    if (filterRoom   !== 'all') list = list.filter(r => r.roomId === filterRoom)
    if (filterStatus !== 'all') list = list.filter(r => r.status === filterStatus)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(r =>
        `${r.firstName} ${r.lastName}`.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      )
    }
    return [...list].sort((a, b) => {
      const d = new Date(a.createdAt) - new Date(b.createdAt)
      return sortDir === 'desc' ? -d : d
    })
  }, [reservations, filterRoom, filterStatus, search, sortDir])

  function exportCSV() {
    const headers = ['Reference','Room','Date','Time','Duration (h)','First Name','Last Name','Email','Status','Submitted At']
    const rows = reservations.map(r => [
      r.id, `Room ${r.roomNumber}`, r.date, r.slot.label,
      String(parseInt(r.slot.to) - parseInt(r.slot.from)),
      r.firstName, r.lastName, r.email, r.status, new Date(r.createdAt).toISOString(),
    ])
    const csv  = [headers, ...rows].map(row => row.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const a    = Object.assign(document.createElement('a'), { href: url, download: `incesa-reservations-${todayStr()}.csv` })
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!authed) return <PasswordGate onAuth={handleAuth} />

  const ROOM_TABS = [
    { id: 'all', label: 'All Rooms' },
    { id: 'room-315', label: 'Room 315' },
    { id: 'room-214', label: 'Room 214' },
    { id: 'room-203', label: 'Room 203' },
  ]
  const STATUS_TABS = [
    { id: 'all',       label: 'All',       cls: 'bg-incesa-accent text-white'  },
    { id: 'active',    label: `Active${stats.active ? ` · ${stats.active}` : ''}`,          cls: 'bg-emerald-500 text-white' },
    { id: 'cancelled', label: `Cancelled${stats.cancelled ? ` · ${stats.cancelled}` : ''}`, cls: 'bg-slate-500 text-white'   },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950">

      {addingRes && (
        <AddReservationModal
          onSave={addReservation}
          onClose={() => setAddingRes(false)}
        />
      )}

      {editingRes && (
        <EditModal
          res={editingRes}
          onSave={changes => saveEdit(editingRes.id, changes)}
          onClose={() => setEditingRes(null)}
        />
      )}

      {/* Navbar */}
      <header className="bg-white dark:bg-gray-900 border-b border-slate-100 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img src="/images/incesa-logo-web.svg" alt="INCESA" style={{ height: '30px', width: 'auto' }} />
            <span className="text-slate-400 dark:text-slate-600 hidden sm:inline text-sm">Room Administration</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => setAddingRes(true)} aria-label="Add reservation"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-white bg-incesa-accent hover:bg-incesa-blue transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Reservation</span>
            </button>
            <a href="/" aria-label="Back to website"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 dark:text-slate-500 hover:text-incesa-blue dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Website</span>
            </a>
            <button onClick={handleLogout} aria-label="Sign out"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 overflow-x-hidden">

        {/* Loading / error states */}
        {loading && (
          <div className="flex items-center gap-3 py-12 justify-center text-slate-400 dark:text-slate-600">
            <div className="w-5 h-5 rounded-full border-2 border-incesa-accent border-t-transparent animate-spin" />
            Loading reservations…
          </div>
        )}
        {loadError && (
          <div className="flex items-center gap-3 py-12 justify-center text-red-500">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            Could not load reservations — check the server is running.
          </div>
        )}

        {/* All content hidden while loading or errored */}
        {!loading && !loadError && <>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value={stats.total}     label="Total Reservations" color="#3e92cc" Icon={Building2}    />
          <StatCard value={stats.active}    label="Active"             color="#10b981" Icon={CheckCircle2}  />
          <StatCard value={stats.cancelled} label="Cancelled"          color="#94a3b8" Icon={XCircle}       />
          <StatCard value={stats.upcoming}  label="Next 7 Days"        color="#f59e0b" Icon={Clock}         />
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-800 p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {ROOM_TABS.map(tab => (
              <button key={tab.id} onClick={() => setFilterRoom(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filterRoom === tab.id ? 'bg-incesa-blue text-white shadow-sm' : 'bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <div className="h-6 w-px bg-slate-100 dark:bg-gray-800 mx-1 self-center hidden sm:block" />
            {STATUS_TABS.map(tab => (
              <button key={tab.id} onClick={() => setFilterStatus(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === tab.id ? tab.cls : 'bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search name, email or reference…"
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-incesa-blue dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-incesa-accent/30 focus:border-incesa-accent transition-colors"
              />
            </div>
            {viewMode === 'cards' && (
              <button onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
                className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-400 dark:text-slate-500 hover:text-incesa-blue dark:hover:text-white hover:border-incesa-accent/40 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap"
              >
                {sortDir === 'desc' ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{sortDir === 'desc' ? 'Newest' : 'Oldest'}</span>
              </button>
            )}
            <button onClick={exportCSV}
              className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-400 dark:text-slate-500 hover:text-incesa-blue dark:hover:text-white hover:border-incesa-accent/40 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CSV</span>
            </button>
          </div>
        </div>

        {/* View toggle + result count */}
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            {filtered.length === 0
              ? 'No reservations found'
              : `${filtered.length} reservation${filtered.length !== 1 ? 's' : ''}${filterRoom !== 'all' || filterStatus !== 'all' || search ? ' matching filters' : ''}`
            }
            {(filterRoom !== 'all' || filterStatus !== 'all' || search) && (
              <button onClick={() => { setFilterRoom('all'); setFilterStatus('all'); setSearch('') }}
                className="ml-2 text-xs text-incesa-accent hover:underline cursor-pointer"
              >
                Clear
              </button>
            )}
          </p>

          {/* Cards / Timeline toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-gray-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cards' ? 'bg-white dark:bg-gray-900 text-incesa-blue dark:text-white shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cards</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'timeline' ? 'bg-white dark:bg-gray-900 text-incesa-blue dark:text-white shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Timeline</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {viewMode === 'timeline' ? (
            <motion.div key="timeline"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <TimelineView reservations={filtered} onEdit={r => setEditingRes(r)} onUpdate={updateStatus} onDelete={deleteReservation} />
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="py-24 flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-slate-200 dark:text-slate-700" />
              </div>
              <p className="text-slate-400 dark:text-slate-600 font-medium text-sm">No reservations match your filters</p>
            </motion.div>
          ) : (
            <motion.div key="cards"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-10">
                <AnimatePresence mode="popLayout">
                  {filtered.map(res => (
                    <ReservationCard
                      key={res.id}
                      res={res}
                      onEdit={r => setEditingRes(r)}
                      onUpdate={updateStatus}
                      onDelete={deleteReservation}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        </>} {/* end !loading && !loadError */}

      </main>
    </div>
  )
}
