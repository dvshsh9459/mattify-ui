const express = require('express')
const router = express.Router()
const ds = require('../utils/dataStore')

router.get('/:filename', (req, res) => {
  const url = ds.imageMap[req.params.filename]
  if (url) return res.redirect(url)
  res.status(404).json({ error: 'Image not found' })
})

module.exports = router
