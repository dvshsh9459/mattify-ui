const express = require('express')
const router = express.Router()
const ds = require('../utils/dataStore')

router.get('/', (req, res) => {
  const { q } = req.query
  if (!q) return res.json([])
  const results = ds.products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()))
  res.json(results)
})

module.exports = router
