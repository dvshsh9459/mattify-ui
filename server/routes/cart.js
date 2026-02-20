const express = require('express')
const router = express.Router()
const ds = require('../utils/dataStore')

const saveCart = () => ds.saveJSON('cart.json', ds.cart)

router.get('/', (req, res) => res.json(ds.cart))

router.post('/add', (req, res) => {
  const { product } = req.body
  if (!product) return res.status(400).json({ error: 'Product required' })
  const existing = ds.cart.items.find(i => i.id === product.id)
  if (existing) existing.quantity = (existing.quantity || 1) + 1
  else ds.cart.items.push({ ...product, quantity: 1 })
  ds.cart.total = ds.cart.items.reduce((s,i) => s + (i.price * (i.quantity||1)), 0)
  saveCart()
  res.json(ds.cart)
})

router.post('/remove', (req, res) => {
  const { productId } = req.body
  ds.cart.items = ds.cart.items.filter(i => i.id !== productId)
  ds.cart.total = ds.cart.items.reduce((s,i) => s + (i.price * (i.quantity||1)), 0)
  saveCart()
  res.json(ds.cart)
})

router.post('/update', (req, res) => {
  const { productId, quantity } = req.body
  const item = ds.cart.items.find(i => i.id === productId)
  if (item) {
    item.quantity = quantity
    if (quantity <= 0) ds.cart.items = ds.cart.items.filter(i => i.id !== productId)
  }
  ds.cart.total = ds.cart.items.reduce((s,i) => s + (i.price * (i.quantity||1)), 0)
  saveCart()
  res.json(ds.cart)
})

router.post('/clear', (req, res) => {
  ds.cart = { items: [], total: 0 }
  saveCart()
  res.json(ds.cart)
})

module.exports = router
