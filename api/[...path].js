const ADMIN_PW    = process.env.ADMIN_PASSWORD || 'incesa2026'
const VALID_ROOMS = ['room-315', 'room-214', 'room-203']
const VALID_HOURS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']

// In-memory store — demo only, resets on cold start
let store = [
  { id:'INC-X7K2MN', roomId:'room-315', roomNumber:'315', date:'2026-06-24', slot:{from:'08:00',to:'10:00',label:'08:00 – 10:00'}, firstName:'Alexandru', lastName:'Ionescu',      email:'a.ionescu@ucv.ro',          status:'active',    createdAt:'2026-06-18T08:30:00.000Z' },
  { id:'INC-P4R9SL', roomId:'room-315', roomNumber:'315', date:'2026-06-24', slot:{from:'14:00',to:'16:00',label:'14:00 – 16:00'}, firstName:'Maria',      lastName:'Constantin',  email:'m.constantin@ucv.ro',        status:'active',    createdAt:'2026-06-19T11:00:00.000Z' },
  { id:'INC-D5W8JQ', roomId:'room-315', roomNumber:'315', date:'2026-06-25', slot:{from:'12:00',to:'14:00',label:'12:00 – 14:00'}, firstName:'Gheorghe',   lastName:'Dănilă',      email:'g.danila@incesa.ro',         status:'active',    createdAt:'2026-06-22T14:15:00.000Z' },
  { id:'INC-L9A4WE', roomId:'room-315', roomNumber:'315', date:'2026-06-30', slot:{from:'08:00',to:'14:00',label:'08:00 – 14:00'}, firstName:'Bogdan',     lastName:'Niculescu',   email:'b.niculescu@ucv.ro',         status:'active',    createdAt:'2026-06-22T10:00:00.000Z' },
  { id:'INC-M1B7ZS', roomId:'room-315', roomNumber:'315', date:'2026-07-01', slot:{from:'14:00',to:'18:00',label:'14:00 – 18:00'}, firstName:'Ioana',      lastName:'Dragomir',    email:'i.dragomir@incesa.ro',       status:'active',    createdAt:'2026-06-23T09:10:00.000Z' },
  { id:'INC-R5F1LV', roomId:'room-315', roomNumber:'315', date:'2026-07-03', slot:{from:'08:00',to:'10:00',label:'08:00 – 10:00'}, firstName:'Claudiu',    lastName:'Vasilescu',   email:'c.vasilescu@incesa.ro',      status:'cancelled', createdAt:'2026-06-23T14:20:00.000Z' },
  { id:'INC-B2V6HT', roomId:'room-214', roomNumber:'214', date:'2026-06-24', slot:{from:'12:00',to:'16:00',label:'12:00 – 16:00'}, firstName:'Elena',      lastName:'Radu',        email:'e.radu@ucv.ro',             status:'active',    createdAt:'2026-06-17T10:45:00.000Z' },
  { id:'INC-C9M3YF', roomId:'room-214', roomNumber:'214', date:'2026-06-25', slot:{from:'08:00',to:'12:00',label:'08:00 – 12:00'}, firstName:'Andrei',     lastName:'Popa',        email:'andrei.popa@ucv.ro',         status:'active',    createdAt:'2026-06-19T09:20:00.000Z' },
  { id:'INC-T7N5QR', roomId:'room-214', roomNumber:'214', date:'2026-06-27', slot:{from:'10:00',to:'14:00',label:'10:00 – 14:00'}, firstName:'Cristina',   lastName:'Marin',       email:'c.marin@incesa.ro',          status:'active',    createdAt:'2026-06-21T16:30:00.000Z' },
  { id:'INC-N2C8PT', roomId:'room-214', roomNumber:'214', date:'2026-07-02', slot:{from:'08:00',to:'18:00',label:'08:00 – 18:00'}, firstName:'Florin',     lastName:'Matei',       email:'f.matei@ucv.ro',            status:'active',    createdAt:'2026-06-23T11:30:00.000Z' },
  { id:'INC-U7H3NX', roomId:'room-214', roomNumber:'214', date:'2026-07-08', slot:{from:'08:00',to:'12:00',label:'08:00 – 12:00'}, firstName:'Victor',     lastName:'Alexandrescu',email:'v.alexandrescu@ucv.ro',      status:'cancelled', createdAt:'2026-06-20T15:00:00.000Z' },
  { id:'INC-F3K8VC', roomId:'room-203', roomNumber:'203', date:'2026-06-24', slot:{from:'16:00',to:'18:00',label:'16:00 – 18:00'}, firstName:'Mihai',      lastName:'Florescu',    email:'m.florescu@ucv.ro',          status:'active',    createdAt:'2026-06-18T13:00:00.000Z' },
  { id:'INC-G6H2XA', roomId:'room-203', roomNumber:'203', date:'2026-06-25', slot:{from:'08:00',to:'10:00',label:'08:00 – 10:00'}, firstName:'Roxana',     lastName:'Stanciu',     email:'r.stanciu@ucv.ro',           status:'active',    createdAt:'2026-06-20T07:45:00.000Z' },
  { id:'INC-O3D9QU', roomId:'room-203', roomNumber:'203', date:'2026-06-30', slot:{from:'12:00',to:'16:00',label:'12:00 – 16:00'}, firstName:'Diana',      lastName:'Stoica',      email:'d.stoica@ucv.ro',            status:'active',    createdAt:'2026-06-23T13:45:00.000Z' },
  { id:'INC-S6G2MW', roomId:'room-203', roomNumber:'203', date:'2026-07-01', slot:{from:'08:00',to:'12:00',label:'08:00 – 12:00'}, firstName:'Larisa',     lastName:'Cojocaru',    email:'l.cojocaru@ucv.ro',          status:'cancelled', createdAt:'2026-06-21T08:00:00.000Z' },
]

function requireAdmin(req, res) {
  const token = (req.headers.authorization || '').split(' ')[1]
  if (!token || token !== ADMIN_PW) {
    res.status(401).json({ error: 'Unauthorized' })
    return false
  }
  return true
}

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const path = Array.isArray(req.query.path) ? req.query.path : req.query.path ? [req.query.path] : []
  const [seg0, seg1, seg2, seg3] = path // seg0='reservations'

  // GET /api/reservations/slots/:roomId/:date
  if (req.method === 'GET' && seg1 === 'slots') {
    const roomId = seg2, date = seg3
    if (!VALID_ROOMS.includes(roomId)) return res.status(400).json({ error: 'Invalid room.' })
    const booked = store
      .filter(r => r.roomId === roomId && r.date === date && r.status === 'active')
      .map(r => ({ slotFrom: r.slot.from, slotTo: r.slot.to }))
    return res.json(booked)
  }

  // GET /api/reservations — admin list
  if (req.method === 'GET' && !seg1) {
    if (!requireAdmin(req, res)) return
    return res.json([...store].sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
  }

  // POST /api/reservations — create
  if (req.method === 'POST' && !seg1) {
    const { id, roomId, roomNumber, date, slot, firstName, lastName, email } = req.body || {}
    if (!id || !VALID_ROOMS.includes(roomId) || !date || !slot?.from || !slot?.to
      || !firstName?.trim() || !lastName?.trim() || !email?.trim()) {
      return res.status(400).json({ error: 'Missing or invalid fields.' })
    }
    if (!VALID_HOURS.includes(slot.from) || !VALID_HOURS.includes(slot.to) || slot.from >= slot.to) {
      return res.status(400).json({ error: 'Invalid time slot.' })
    }
    const conflict = store.find(r =>
      r.roomId === roomId && r.date === date && r.status === 'active' &&
      r.slot.from < slot.to && r.slot.to > slot.from
    )
    if (conflict) return res.status(409).json({ error: 'This slot was just taken — please choose another.' })
    store.push({
      id, roomId, roomNumber, date, slot,
      firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(),
      status: 'active', createdAt: new Date().toISOString(),
    })
    return res.status(201).json({ id })
  }

  // PATCH /api/reservations/:id — admin edit/status change
  if (req.method === 'PATCH' && seg1) {
    if (!requireAdmin(req, res)) return
    const existing = store.find(r => r.id === seg1)
    if (!existing) return res.status(404).json({ error: 'Not found.' })

    const { roomId, roomNumber, date, slot, firstName, lastName, email, status } = req.body || {}
    const newStatus = status    ?? existing.status
    const newRoomId = roomId    ?? existing.roomId
    const newDate   = date      ?? existing.date
    const newSlot   = slot      ?? existing.slot

    if (newStatus === 'active') {
      const conflict = store.find(r =>
        r.id !== seg1 && r.roomId === newRoomId && r.date === newDate && r.status === 'active' &&
        r.slot.from < newSlot.to && r.slot.to > newSlot.from
      )
      if (conflict) return res.status(409).json({ error: 'This time slot conflicts with an existing active reservation.' })
    }

    Object.assign(existing, {
      roomId:     newRoomId,
      roomNumber: roomNumber  ?? existing.roomNumber,
      date:       newDate,
      slot:       newSlot,
      firstName:  firstName   ?? existing.firstName,
      lastName:   lastName    ?? existing.lastName,
      email:      email       ?? existing.email,
      status:     newStatus,
    })
    return res.json({ ok: true })
  }

  // DELETE /api/reservations/:id — admin delete
  if (req.method === 'DELETE' && seg1) {
    if (!requireAdmin(req, res)) return
    const idx = store.findIndex(r => r.id === seg1)
    if (idx === -1) return res.status(404).json({ error: 'Not found.' })
    store.splice(idx, 1)
    return res.json({ ok: true })
  }

  res.status(405).json({ error: 'Method not allowed.' })
}
