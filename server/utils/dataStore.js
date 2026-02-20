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
  'banner-1.jpg': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=400&fit=crop',
  'banner-2.jpg': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop',
  'banner-3.jpg': 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&h=400&fit=crop',
  'banner-4.jpg': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=400&fit=crop',
  'product-1.jpg': 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&h=300&fit=crop',
  'product-2.jpg': 'https://images.unsplash.com/photo-1606811841689-23cc3532305b?w=400&h=300&fit=crop',
  'product-3.jpg': 'https://images.unsplash.com/photo-1584622614875-2f8151013f23?w=400&h=300&fit=crop',
  'product-4.jpg': 'https://images.unsplash.com/photo-1614408426913-01acc846b857?w=400&h=300&fit=crop',
  'product-5.jpg': 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=300&fit=crop',
  'product-6.jpg': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
  'product-7.jpg': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
  'product-8.jpg': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop'
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
