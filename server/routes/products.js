const express = require('express')
const router = express.Router()
const ds = require('../utils/dataStore')

router.get('/', (req, res) => {
  const { category, search, sort } = req.query
  let filtered = ds.products
  if (category && category !== 'All') filtered = filtered.filter(p => p.category === category)
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  if (sort === 'price-asc') filtered.sort((a,b) => a.price - b.price)
  if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price)
  if (sort === 'rating') filtered.sort((a,b) => b.rating - a.rating)
  res.json(filtered)
})

router.get('/:id', (req, res) => {
  const product = ds.products.find(p => p.id === parseInt(req.params.id))
  if (!product) return res.status(404).json({ error: 'Product not found' })
  const productReviews = ds.reviews.filter(r => r.productId === product.id)
  res.json({ ...product, reviews: productReviews })
})

module.exports = router
