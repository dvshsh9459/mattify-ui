# Quick Start Guide

## Setup & Run

### Terminal 1 - API Server
```powershell
cd "d:\frontend\HTMl Projects\sleepwell-react\server"
npm install
npm start
```
✓ Server runs on http://localhost:5000

### Terminal 2 - Dev App
```powershell
cd "d:\frontend\HTMl Projects\sleepwell-react"
npm install
npm run dev
```
✓ App runs on http://localhost:5173

---

## What's Included

### Complete API with Demo Data
- ✓ **Products API** - filter by category, search, sort
- ✓ **Cart API** - add, remove, update items
- ✓ **Reviews API** - read and write product reviews
- ✓ **Banners API** - carousel data
- ✓ **Search API** - global product search
- ✓ **Images API** - serve product/banner images

### All Features Work with Demo Data
- Click categories → filters products from API
- Type in search → fetches matching results
- Add to cart → saves to server
- Read product reviews → fetches from API
- Browse banners → auto-rotates

### Data Files (All in `server/data/`)
- `products.json` - 8 demo products with details
- `banners.json` - 4 banner slides
- `reviews.json` - 4 sample reviews
- `categories.json` - product categories
- `cart.json` - persistent cart storage

---

## API Base URL
```
http://localhost:5000/api
```

### Example API Calls
```bash
# Get all products
curl http://localhost:5000/api/products

# Filter by category
curl "http://localhost:5000/api/products?category=Mattresses"

# Search products
curl "http://localhost:5000/api/search?q=mattress"

# Get product by ID
curl http://localhost:5000/api/products/1

# Get product reviews
curl http://localhost:5000/api/reviews/1

# Get cart
curl http://localhost:5000/api/cart
```

---

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with API integration |
| `server/index.js` | Express API server (load from JSON) |
| `server/data/*.json` | Demo data files |
| `src/components/` | React components |
| `API_GUIDE.md` | Full API documentation |

---

## Features Tested

✅ Browse all products
✅ Filter by category (click category pills)
✅ Search products (type in search bar)
✅ View Bestsellers section
✅ Horizontal scroll "Deal of the Day"
✅ Add products to cart
✅ Cart counter in header
✅ Banner carousel auto-rotates
✅ Responsive design

---

## Troubleshooting

**App won't load?**
- Make sure both `npm install` commands were run (client + server)

**Can't add to cart?**
- Server must be running on port 5000
- Check browser console for errors

**Images not loading?**
- API redirects to Unsplash, needs internet connection
- Or modify `imageMap` in `server/index.js` to use local images

**Want to modify demo data?**
- Edit `server/data/products.json`, `banners.json`, etc.
- Server auto-loads changes on restart
