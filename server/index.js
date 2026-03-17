const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000
const dataDir = path.join(__dirname, 'data')

const loadJson = (fileName, fallback) => {
  try {
    const filePath = path.join(dataDir, fileName)
    if (!fs.existsSync(filePath)) return fallback
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    return fallback
  }
}

const saveJson = (fileName, data) => {
  const filePath = path.join(dataDir, fileName)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

const recomputeCartTotal = (items) => items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)

const categories = loadJson('categories.json', [])
const banners = loadJson('banners.json', [])
const products = loadJson('products.json', [])
const imageMap = loadJson('imageMap.json', {})
let cart = loadJson('cart.json', { items: [], total: 0 })
let reviews = loadJson('reviews.json', [])

const tokens = new Map()

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/', (req, res) => {
  res.json({ status: 'Mattify demo API running', version: '1.0' })
})

app.get('/api/banners', (req, res) => res.json(banners))
app.get('/api/categories', (req, res) => res.json(categories))

app.get('/api/products', (req, res) => {
  const { category, search, sort } = req.query
  let result = [...products]

  if (category && category !== 'All') {
    result = result.filter((p) => p.category === category)
  }

  if (search) {
    const q = String(search).toLowerCase()
    result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  }

  if (sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  } else if (sort === 'rating') {
    result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }

  res.json(result)
})

app.get('/api/products/:id', (req, res) => {
  const id = Number(req.params.id)
  const product = products.find((p) => p.id === id)
  if (!product) return res.status(404).json({ error: 'Product not found' })
  const productReviews = reviews.filter((r) => r.productId === id)
  res.json({ ...product, reviews: productReviews })
})

app.get('/api/search', (req, res) => {
  const q = String(req.query.q || '').trim().toLowerCase()
  if (!q) return res.json([])
  const result = products.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  res.json(result)
})

app.get('/api/cart', (req, res) => {
  res.json(cart)
})

app.post('/api/cart/add', (req, res) => {
  const { product } = req.body || {}
  if (!product || !product.id) return res.status(400).json({ error: 'Product required' })

  const existing = cart.items.find((item) => item.id === product.id)
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1
  } else {
    cart.items.push({ ...product, quantity: 1 })
  }
  cart.total = recomputeCartTotal(cart.items)
  saveJson('cart.json', cart)
  res.json(cart)
})

app.post('/api/cart/remove', (req, res) => {
  const { productId } = req.body || {}
  if (!productId) return res.status(400).json({ error: 'productId required' })
  cart.items = cart.items.filter((item) => item.id !== productId)
  cart.total = recomputeCartTotal(cart.items)
  saveJson('cart.json', cart)
  res.json(cart)
})

app.post('/api/cart/update', (req, res) => {
  const { productId, quantity } = req.body || {}
  if (!productId) return res.status(400).json({ error: 'productId required' })
  if (quantity <= 0) {
    cart.items = cart.items.filter((item) => item.id !== productId)
  } else {
    cart.items = cart.items.map((item) => (
      item.id === productId ? { ...item, quantity } : item
    ))
  }
  cart.total = recomputeCartTotal(cart.items)
  saveJson('cart.json', cart)
  res.json(cart)
})

app.post('/api/cart/clear', (req, res) => {
  cart = { items: [], total: 0 }
  saveJson('cart.json', cart)
  res.json(cart)
})

app.get('/api/reviews/:productId', (req, res) => {
  const productId = Number(req.params.productId)
  res.json(reviews.filter((r) => r.productId === productId))
})

app.post('/api/reviews', (req, res) => {
  const { productId, userName, rating, title, comment } = req.body || {}
  if (!productId || !userName || !rating) return res.status(400).json({ error: 'Missing fields' })

  const nextId = reviews.length ? Math.max(...reviews.map((r) => r.id)) + 1 : 1
  const review = {
    id: nextId,
    productId,
    userName,
    rating,
    title: title || '',
    comment: comment || '',
    date: new Date().toISOString().slice(0, 10)
  }
  reviews = [...reviews, review]
  saveJson('reviews.json', reviews)
  res.status(201).json(review)
})

app.get('/api/filters', (req, res) => {
  res.json({
    priceRanges: ['Under Rs. 1,000', 'Rs. 1,000 - Rs. 5,000', 'Rs. 5,000 - Rs. 20,000', 'Above Rs. 20,000'],
    ratings: ['4? & above', '3? & above', '2? & above'],
    discounts: ['50% or more', '40% or more', '30% or more', '20% or more']
  })
})

app.get('/api/images/:filename', (req, res) => {
  const filename = req.params.filename
  const url = imageMap[filename]
  if (!url) return res.status(404).json({ error: 'Image not found' })
  res.redirect(url)
})

const getTokenFromAuth = (req) => {
  const header = req.headers.authorization || ''
  const [type, token] = header.split(' ')
  if (type !== 'Bearer' || !token) return null
  return token
}

app.post('/api/auth/demo/login', (req, res) => {
  const { mobile, code } = req.body || {}
  if (!mobile || !code) return res.status(400).json({ error: 'Mobile and code required' })

  const token = `demo_${Math.random().toString(36).slice(2)}`
  const user = {
    id: String(mobile),
    name: `User ${String(mobile).slice(-4)}`,
    mobile: String(mobile)
  }
  tokens.set(token, user)
  res.json({ token, user })
})

app.get('/api/auth/demo/me', (req, res) => {
  const token = getTokenFromAuth(req)
  if (!token) return res.status(401).json({ error: 'Not authenticated' })
  const user = tokens.get(token)
  if (!user) return res.status(401).json({ error: 'Invalid token' })
  res.json({ user })
})

app.post('/api/auth/demo/logout', (req, res) => {
  const token = getTokenFromAuth(req)
  if (token) tokens.delete(token)
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`Mattify API running on http://localhost:${PORT}`)
})