const express = require('express')
const router = express.Router()
const ds = require('../utils/dataStore')

router.get('/:productId', (req, res) => {
  const productReviews = ds.reviews.filter(r => r.productId === parseInt(req.params.productId))
  res.json(productReviews)
})

router.post('/', (req, res) => {
  const { productId, userName, rating, title, comment } = req.body
  if (!productId || !userName || !rating) return res.status(400).json({ error: 'Missing fields' })
  const newReview = {
    id: Math.max(...ds.reviews.map(r => r.id), 0) + 1,
    productId,
    userName,
    rating,
    title,
    comment,
    date: new Date().toISOString().split('T')[0]
  }
  ds.reviews.push(newReview)
  ds.saveJSON('reviews.json', ds.reviews)
  res.status(201).json(newReview)
})

module.exports = router
