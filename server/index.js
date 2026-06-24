import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'
import Database from 'better-sqlite3'
import { rateLimit } from 'express-rate-limit'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app      = express()
const PORT     = process.env.PORT || 3000
const ADMIN_PW = process.env.ADMIN_PASSWORD || 'incesa2026'

// ── Database ─────────────────────────────────────────────────────
const db = new Database(path.join(__dirname, 'reservations.db'))
db.pragma('journal_mode = WAL') // safe for concurrent reads

db.exec(`
  CREATE TABLE IF NOT EXISTS reservations (
    id         TEXT PRIMARY KEY,
    roomId     TEXT NOT NULL,
    roomNumber TEXT NOT NULL,
    date       TEXT NOT NULL,
    slotFrom   TEXT NOT NULL,
    slotTo     TEXT NOT NULL,
    slotLabel  TEXT NOT NULL,
    firstName  TEXT NOT NULL,
    lastName   TEXT NOT NULL,
    email      TEXT NOT NULL,
    status     TEXT NOT NULL DEFAULT 'active',
    createdAt  TEXT NOT NULL
  )
`)

// Seed demo data on first run (delete reservations.db to reset)
const { c } = db.prepare('SELECT COUNT(*) as c FROM reservations').get()
if (c === 0) {
  const ins = db.prepare(
    'INSERT INTO reservations VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
  )
  const seed = [
    ['INC-X7K2MN','room-315','315','2026-06-24','08:00','10:00','08:00 – 10:00','Alexandru','Ionescu',   'a.ionescu@ucv.ro',       'active',   '2026-06-18T08:30:00.000Z'],
    ['INC-P4R9SL','room-315','315','2026-06-24','14:00','16:00','14:00 – 16:00','Maria',    'Constantin','m.constantin@ucv.ro',    'active',   '2026-06-19T11:00:00.000Z'],
    ['INC-D5W8JQ','room-315','315','2026-06-25','12:00','14:00','12:00 – 14:00','Gheorghe', 'Dănilă',   'g.danila@incesa.ro',     'active',   '2026-06-22T14:15:00.000Z'],
    ['INC-L9A4WE','room-315','315','2026-06-30','08:00','14:00','08:00 – 14:00','Bogdan',   'Niculescu', 'b.niculescu@ucv.ro',     'active',   '2026-06-22T10:00:00.000Z'],
    ['INC-M1B7ZS','room-315','315','2026-07-01','14:00','18:00','14:00 – 18:00','Ioana',    'Dragomir',  'i.dragomir@incesa.ro',   'active',   '2026-06-23T09:10:00.000Z'],
    ['INC-R5F1LV','room-315','315','2026-07-03','08:00','10:00','08:00 – 10:00','Claudiu',  'Vasilescu', 'c.vasilescu@incesa.ro',  'cancelled','2026-06-23T14:20:00.000Z'],
    ['INC-B2V6HT','room-214','214','2026-06-24','12:00','16:00','12:00 – 16:00','Elena',    'Radu',      'e.radu@ucv.ro',          'active',   '2026-06-17T10:45:00.000Z'],
    ['INC-C9M3YF','room-214','214','2026-06-25','08:00','12:00','08:00 – 12:00','Andrei',   'Popa',      'andrei.popa@ucv.ro',     'active',   '2026-06-19T09:20:00.000Z'],
    ['INC-T7N5QR','room-214','214','2026-06-27','10:00','14:00','10:00 – 14:00','Cristina', 'Marin',     'c.marin@incesa.ro',      'active',   '2026-06-21T16:30:00.000Z'],
    ['INC-N2C8PT','room-214','214','2026-07-02','08:00','18:00','08:00 – 18:00','Florin',   'Matei',     'f.matei@ucv.ro',         'active',   '2026-06-23T11:30:00.000Z'],
    ['INC-U7H3NX','room-214','214','2026-07-08','08:00','12:00','08:00 – 12:00','Victor',   'Alexandrescu','v.alexandrescu@ucv.ro','cancelled','2026-06-20T15:00:00.000Z'],
    ['INC-F3K8VC','room-203','203','2026-06-24','16:00','18:00','16:00 – 18:00','Mihai',    'Florescu',  'm.florescu@ucv.ro',      'active',   '2026-06-18T13:00:00.000Z'],
    ['INC-G6H2XA','room-203','203','2026-06-25','08:00','10:00','08:00 – 10:00','Roxana',   'Stanciu',   'r.stanciu@ucv.ro',       'active',   '2026-06-20T07:45:00.000Z'],
    ['INC-O3D9QU','room-203','203','2026-06-30','12:00','16:00','12:00 – 16:00','Diana',    'Stoica',    'd.stoica@ucv.ro',        'active',   '2026-06-23T13:45:00.000Z'],
    ['INC-S6G2MW','room-203','203','2026-07-01','08:00','12:00','08:00 – 12:00','Larisa',   'Cojocaru',  'l.cojocaru@ucv.ro',      'cancelled','2026-06-21T08:00:00.000Z'],
  ]
  seed.forEach(row => ins.run(...row))
  console.log('Seeded 15 demo reservations.')
}

// ── Helpers ──────────────────────────────────────────────────────
function rowToRes(row) {
  return {
    id: row.id, roomId: row.roomId, roomNumber: row.roomNumber,
    date: row.date,
    slot: { from: row.slotFrom, to: row.slotTo, label: row.slotLabel },
    firstName: row.firstName, lastName: row.lastName, email: row.email,
    status: row.status, createdAt: row.createdAt,
  }
}

function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token || token !== ADMIN_PW) return res.status(401).json({ error: 'Unauthorized' })
  next()
}

const VALID_ROOMS = ['room-315', 'room-214', 'room-203']
const VALID_HOURS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']

// ── Rate limiters ─────────────────────────────────────────────────
const bookingLimiter = rateLimit({
  windowMs: 60_000, max: 5,
  standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many submissions — please wait a minute.' },
})

const adminLimiter = rateLimit({
  windowMs: 60_000, max: 20,
  standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many requests.' },
})

// ── Middleware ────────────────────────────────────────────────────
app.use(helmet())
app.use(express.json())

// ── API routes ────────────────────────────────────────────────────

// GET all reservations — admin only
app.get('/api/reservations', adminLimiter, requireAdmin, (_req, res) => {
  const rows = db.prepare('SELECT * FROM reservations ORDER BY createdAt DESC').all()
  res.json(rows.map(rowToRes))
})

// GET booked time ranges for a room on a date — public (used by /rooms)
app.get('/api/reservations/slots/:roomId/:date', (req, res) => {
  const { roomId, date } = req.params
  if (!VALID_ROOMS.includes(roomId)) return res.status(400).json({ error: 'Invalid room.' })
  const rows = db.prepare(
    "SELECT slotFrom, slotTo FROM reservations WHERE roomId=? AND date=? AND status='active'"
  ).all(roomId, date)
  res.json(rows.map(r => ({ slotFrom: r.slotFrom, slotTo: r.slotTo })))
})

// POST new reservation — public, rate limited
app.post('/api/reservations', bookingLimiter, (req, res) => {
  const { id, roomId, roomNumber, date, slot, firstName, lastName, email } = req.body

  if (!id || !VALID_ROOMS.includes(roomId) || !date || !slot?.from || !slot?.to
    || !firstName?.trim() || !lastName?.trim() || !email?.trim()) {
    return res.status(400).json({ error: 'Missing or invalid fields.' })
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ error: 'Invalid date.' })
  if (!VALID_HOURS.includes(slot.from) || !VALID_HOURS.includes(slot.to) || slot.from >= slot.to) {
    return res.status(400).json({ error: 'Invalid time slot.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email.' })

  // Check for overlapping active bookings (same room + date)
  const conflict = db.prepare(
    "SELECT id FROM reservations WHERE roomId=? AND date=? AND status='active' AND slotFrom<? AND slotTo>?"
  ).get(roomId, date, slot.to, slot.from)

  if (conflict) return res.status(409).json({ error: 'This slot was just taken — please choose another.' })

  db.prepare('INSERT INTO reservations VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').run(
    id, roomId, roomNumber, date,
    slot.from, slot.to, slot.label ?? `${slot.from} – ${slot.to}`,
    firstName.trim(), lastName.trim(), email.trim(),
    'active', new Date().toISOString()
  )

  res.status(201).json({ id })
})

// PATCH reservation — admin only (status change or full edit)
app.patch('/api/reservations/:id', adminLimiter, requireAdmin, (req, res) => {
  const { id } = req.params
  const existing = db.prepare('SELECT * FROM reservations WHERE id=?').get(id)
  if (!existing) return res.status(404).json({ error: 'Not found.' })

  const { roomId, roomNumber, date, slot, firstName, lastName, email, status } = req.body

  // Compute the resulting values to check for conflicts
  const newStatus   = status     ?? existing.status
  const newRoomId   = roomId     ?? existing.roomId
  const newDate     = date       ?? existing.date
  const newSlotFrom = slot?.from ?? existing.slotFrom
  const newSlotTo   = slot?.to   ?? existing.slotTo

  if (newStatus === 'active') {
    const conflict = db.prepare(
      "SELECT id FROM reservations WHERE id != ? AND roomId=? AND date=? AND status='active' AND slotFrom<? AND slotTo>?"
    ).get(id, newRoomId, newDate, newSlotTo, newSlotFrom)
    if (conflict) return res.status(409).json({ error: 'This time slot conflicts with an existing active reservation.' })
  }

  db.prepare(`
    UPDATE reservations SET
      roomId=?, roomNumber=?, date=?,
      slotFrom=?, slotTo=?, slotLabel=?,
      firstName=?, lastName=?, email=?, status=?
    WHERE id=?
  `).run(
    roomId     ?? existing.roomId,
    roomNumber ?? existing.roomNumber,
    date       ?? existing.date,
    slot?.from ?? existing.slotFrom,
    slot?.to   ?? existing.slotTo,
    slot?.label ?? existing.slotLabel,
    firstName  ?? existing.firstName,
    lastName   ?? existing.lastName,
    email      ?? existing.email,
    status     ?? existing.status,
    id
  )

  res.json({ ok: true })
})

// DELETE reservation — admin only
app.delete('/api/reservations/:id', adminLimiter, requireAdmin, (req, res) => {
  const result = db.prepare('DELETE FROM reservations WHERE id=?').run(req.params.id)
  if (result.changes === 0) return res.status(404).json({ error: 'Not found.' })
  res.json({ ok: true })
})

// ── Static + SPA fallback (MUST come after API routes) ───────────
app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.listen(PORT, () => console.log(`INCESA server → http://localhost:${PORT}`))
