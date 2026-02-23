const express = require('express')
const router = express.Router()
const ds = require('../utils/dataStore')

router.get('/:filename', (req, res) => {
  const filename = req.params.filename
  const existsInMap = Boolean(ds.imageMap[filename])
  if (!existsInMap) return res.status(404).json({ error: 'Image not found' })

  const isBanner = filename.startsWith('banner-')
  const title = isBanner ? 'Mattify Banner' : 'Mattify Product'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#264653"/>
      <stop offset="100%" stop-color="#2a9d8f"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="700" fill="url(#bg)"/>
  <circle cx="1040" cy="120" r="180" fill="rgba(255,255,255,0.12)"/>
  <circle cx="120" cy="640" r="220" fill="rgba(255,255,255,0.10)"/>
  <text x="80" y="300" fill="#ffffff" font-family="Arial, sans-serif" font-size="72" font-weight="700">Mattify</text>
  <text x="80" y="380" fill="#ffffff" font-family="Arial, sans-serif" font-size="42" opacity="0.92">${title}</text>
</svg>`

  res.setHeader('Content-Type', 'image/svg+xml')
  return res.status(200).send(svg)
})

module.exports = router
