const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    priceRanges: ['Under ₹1,000', '₹1,000 - ₹5,000', '₹5,000 - ₹20,000', 'Above ₹20,000'],
    ratings: ['4★ & above', '3★ & above', '2★ & above'],
    discounts: ['50% or more', '40% or more', '30% or more', '20% or more']
  })
})

module.exports = router
