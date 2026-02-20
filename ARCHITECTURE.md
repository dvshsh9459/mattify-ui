# Mattify Architecture

This document describes the current architecture of Mattify.

## High-Level Architecture

Mattify is a two-part app:

1. Frontend SPA (React + Vite)
- Runs on `http://localhost:5173`
- Main entry: `src/main.jsx`
- Main orchestration: `src/App.jsx`

2. Backend API (Express)
- Runs on `http://localhost:5000`
- Main server: `server/index.js`
- Route modules in `server/routes`

3. Persistence
- JSON files in `server/data`
- Accessed through `server/utils/dataStore.js`

## Runtime Flow

1. Browser loads React app.
2. `App.jsx` requests products and banners from API.
3. Express routes read in-memory datasets loaded from JSON.
4. Cart/review changes are written back to JSON files.
5. React updates UI state from API responses.

## Frontend Architecture

## Component Tree

```text
App
  Header
  Banner
  ProductCard (list/grid)
  ProductModal
  LoginModal
  CartModal
  Footer
```

## Core Responsibilities

- `src/App.jsx`
  - App-level state (`cart`, `user`, `selectedCategory`, `searchQuery`, `productsState`, `bannersState`)
  - API calls
  - fallback to local data (`src/data.js`) if API is unavailable
  - modal open/close control

- `src/components/Header.jsx`
  - brand (`Mattify`), category strip, search input
  - login/cart actions

- `src/components/Banner.jsx`
  - promo slider UI

- `src/components/ProductCard.jsx`
  - product tile rendering and actions

- `src/components/ProductModal.jsx`
  - detail view for a selected product

- `src/components/LoginModal.jsx`
  - demo OTP login interaction

- `src/components/CartModal.jsx`
  - cart item display + remove actions

- `src/components/Footer.jsx`
  - footer section

## State and Side Effects

`App.jsx` uses:
- `useState` for UI/data state
- `useEffect` for:
  - loading products on category/search changes
  - loading banners on mount
  - auto-rotating banners every 4s
  - scrolling filters into view when a category is selected

## Backend Architecture

## Server Composition

`server/index.js` config:
- `cors()` middleware
- `express.json()` middleware
- Route mounting under `/api`

Mounted routers:
- `/api/banners`
- `/api/products`
- `/api/categories`
- `/api/search`
- `/api/cart`
- `/api/reviews`
- `/api/filters`
- `/api/images`
- `/api/auth`

## Route Modules

- `routes/products.js`
  - filter/sort product list
  - get product by id with joined reviews

- `routes/cart.js`
  - add/remove/update/clear cart
  - recompute totals
  - persist `cart.json`

- `routes/reviews.js`
  - list reviews by product
  - create review with generated id/date
  - persist `reviews.json`

- `routes/auth.js`
  - demo OTP flow in memory
  - simple token creation/validation

- `routes/images.js`
  - redirects logical image names to URLs from `imageMap`

- `routes/banners.js`, `routes/categories.js`, `routes/search.js`, `routes/filters.js`
  - simple read endpoints

## Data Layer

`server/utils/dataStore.js`:
- Loads `banners`, `products`, `categories`, `cart`, `reviews` from disk at startup
- Exposes getters/setters for in-memory datasets
- Exposes `saveJSON(file, data)` for persistence
- Stores `imageMap` for `/api/images/:filename`

Data files:
- `server/data/products.json`
- `server/data/banners.json`
- `server/data/categories.json`
- `server/data/reviews.json`
- `server/data/cart.json`

## API Design Notes

- Style: REST-like JSON API
- Read operations: mostly `GET`
- Mutations: `POST`
- Error responses use `{ "error": "..." }`

## Fallback and Resilience

Frontend behavior when API is unavailable:
- Product and banner fetch failures fall back to local arrays from `src/data.js`
- Cart mutation failure falls back to local cart state updates

This allows the UI to remain usable in partial offline/demo mode.

## Security and Production Notes

Current implementation is demo-grade:
- auth store is in-memory and resets on server restart
- token is base64 demo token, not JWT
- broad CORS policy
- JSON file persistence has no concurrency controls

For production:
- move to DB + real auth/session strategy
- add validation and sanitization on all write endpoints
- add rate limiting, logging, and monitoring

## Performance Characteristics

Current strengths:
- simple architecture and low overhead
- Vite dev server for fast frontend iteration

Current limitations:
- in-memory arrays + full scans for filtering/search
- JSON file writes on cart/review mutations
- no pagination/caching

## Deployment Shape

Development:
- Frontend: `localhost:5173`
- API: `localhost:5000`
- Storage: local JSON files

Production recommendation:
- static frontend hosting + API service
- replace JSON data with managed database
- external object storage/CDN for images

## Last Updated

February 20, 2026
