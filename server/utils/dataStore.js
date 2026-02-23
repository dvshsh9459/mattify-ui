const fs = require('fs')
const path = require('path')

const dataDir = path.join(__dirname, '..', 'data')

const loadJSON = (file) => JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'))
const saveJSON = (file, data) => fs.writeFileSync(path.join(dataDir, file), JSON.stringify(data, null, 2), 'utf8')

// Load initial datasets
let banners = loadJSON('banners.json')
let products = loadJSON('products.json')
let categories = loadJSON('categories.json')
let cart = loadJSON('cart.json')
let reviews = loadJSON('reviews.json')

const imageMap = {
  'banner-1.jpg': '/images/banner-placeholder.svg',
  'banner-2.jpg': '/images/banner-placeholder.svg',
  'banner-3.jpg': '/images/banner-placeholder.svg',
  'banner-4.jpg': '/images/banner-placeholder.svg',
  'product-1.jpg': '/images/product-placeholder.svg',
  'product-2.jpg': '/images/product-placeholder.svg',
  'product-3.jpg': '/images/product-placeholder.svg',
  'product-4.jpg': '/images/product-placeholder.svg',
  'product-5.jpg': '/images/product-placeholder.svg',
  'product-6.jpg': '/images/product-placeholder.svg',
  'product-7.jpg': '/images/product-placeholder.svg',
  'product-8.jpg': '/images/product-placeholder.svg'
}

module.exports = {
  loadJSON,
  saveJSON,
  get banners() { return banners },
  set banners(v) { banners = v },
  get products() { return products },
  set products(v) { products = v },
  get categories() { return categories },
  set categories(v) { categories = v },
  get cart() { return cart },
  set cart(v) { cart = v },
  get reviews() { return reviews },
  set reviews(v) { reviews = v },
  imageMap
}
