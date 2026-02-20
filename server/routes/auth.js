const express = require('express')
const router = express.Router()

// Simple in-memory store for demo OTPs and users
const otps = {} // mobile -> { code, expires }
const users = {} // mobile -> { id, mobile }

// POST /api/auth/send-code { mobile }
// Sends (generates) a 4-digit code and stores it in memory for demo
router.post('/send-code', (req, res) => {
  const { mobile } = req.body
  if (!mobile) return res.status(400).json({ error: 'Mobile required' })
  const code = Math.floor(1000 + Math.random() * 9000).toString()
  const expires = Date.now() + (5 * 60 * 1000) // 5 minutes
  otps[mobile] = { code, expires }
  console.log(`Demo OTP for ${mobile}: ${code}`)
  return res.json({ success: true, message: 'Code sent (demo)', mobile })
})

// POST /api/auth/verify { mobile, code }
// Verifies the code and returns a demo token and user object
router.post('/verify', (req, res) => {
  const { mobile, code } = req.body
  if (!mobile || !code) return res.status(400).json({ error: 'Mobile and code required' })
  const record = otps[mobile]
  if (!record) return res.status(400).json({ error: 'No code requested for this mobile' })
  if (Date.now() > record.expires) return res.status(400).json({ error: 'Code expired' })
  if (record.code !== code) return res.status(400).json({ error: 'Invalid code' })

  // create or fetch user
  if (!users[mobile]) users[mobile] = { id: Object.keys(users).length + 1, mobile }
  const user = users[mobile]

  // simple demo token (not real JWT)
  const token = Buffer.from(`${user.id}:${user.mobile}:${Date.now()}`).toString('base64')

  // clear otp
  delete otps[mobile]

  res.json({ success: true, token, user })
})

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  // Demo: there's no real session store; client can just remove token
  return res.json({ success: true })
})

// GET /api/auth/me
router.get('/me', (req, res) => {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth
  if (!token) return res.status(401).json({ error: 'Not authenticated' })
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8')
    const parts = decoded.split(':')
    const userId = parts[0]
    const mobile = parts[1]
    const user = users[mobile]
    if (!user) return res.status(401).json({ error: 'Invalid token' })
    return res.json({ user })
  } catch (e) {
    return res.status(400).json({ error: 'Invalid token format' })
  }
})

module.exports = router
