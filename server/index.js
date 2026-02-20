const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Mount routers
const bannersRouter = require('./routes/banners')
const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const searchRouter = require('./routes/search')
const cartRouter = require('./routes/cart')
const reviewsRouter = require('./routes/reviews')
const filtersRouter = require('./routes/filters')
const imagesRouter = require('./routes/images')
const authRouter = require('./routes/auth')

app.use('/api/banners', bannersRouter)
app.use('/api/products', productsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/search', searchRouter)
app.use('/api/cart', cartRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/filters', filtersRouter)
app.use('/api/images', imagesRouter)
app.use('/api/auth', authRouter)

app.get('/', (req, res) => res.json({ status: 'Sleepwell demo API running', version: '1.0' }))

app.listen(port, () => console.log(`✓ Sleepwell demo API running on http://localhost:${port}`))
