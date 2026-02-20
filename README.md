# Mattify

Mattify is a full-stack demo e-commerce app for bedding products, built with React + Vite on the frontend and Express on the backend.

## Overview

Mattify includes:
- Product catalog with categories and search
- Auto-rotating promotional banners
- Product detail modal
- Cart APIs with JSON persistence
- Review APIs
- Demo mobile OTP login flow
- Local frontend fallback data when API is unavailable

## Tech Stack

- Frontend: React 18, Vite 5
- Styling: Bootstrap 5.3 + custom CSS
- Backend: Express 4, CORS
- Data: JSON files in `server/data`

## Project Structure

```text
Mattify/
  src/
    App.jsx
    main.jsx
    data.js
    styles.css
    components/
  server/
    index.js
    routes/
    data/
    utils/
  README.md
  QUICKSTART.md
  API_GUIDE.md
  ARCHITECTURE.md
  DEVELOPMENT.md
```

## Prerequisites

- Node.js 14+
- npm

## Run Locally

1. Start backend API:
```bash
cd server
npm install
npm start
```
Backend runs on `http://localhost:5000`.

2. Start frontend:
```bash
cd ..
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

## NPM Scripts

Root (`package.json`):
- `npm run dev` - Start Vite dev server
- `npm run build` - Build production frontend
- `npm run preview` - Preview production build

Server (`server/package.json`):
- `npm start` - Start Express API server

## API Base URL

`http://localhost:5000/api`

## API Endpoints

### Banners
- `GET /banners`

### Products
- `GET /products` (supports `category`, `search`, `sort`)
- `GET /products/:id`

### Categories
- `GET /categories`

### Search
- `GET /search?q=...`

### Cart
- `GET /cart`
- `POST /cart/add`
- `POST /cart/remove`
- `POST /cart/update`
- `POST /cart/clear`

### Reviews
- `GET /reviews/:productId`
- `POST /reviews`

### Filters
- `GET /filters`

### Images
- `GET /images/:filename` (redirects to mapped image URL)

### Auth (Demo OTP)
- `POST /auth/send-code`
- `POST /auth/verify`
- `POST /auth/logout`
- `GET /auth/me`

## Demo Data

Files in `server/data`:
- `products.json` (8 products)
- `banners.json` (4 banners)
- `categories.json` (6 categories)
- `reviews.json` (4 reviews)
- `cart.json` (persistent cart state)

You can edit these files directly and restart the server.

## Frontend Behavior

- Header shows brand, category strip, search, login, and cart actions
- Home view (`All` category) shows banners, deal cards, and bestseller cards
- Category view shows filter sidebar and product grid
- Cart and login open in modals
- Product details open in a modal
- If API calls fail, app falls back to local data from `src/data.js`

## Configuration

- Backend port: set `PORT` before running server
- Frontend API endpoint: change `API_BASE` in `src/App.jsx`
- Image mapping: update `imageMap` in `server/utils/dataStore.js`

## Build

```bash
npm run build
```

Output is generated in `dist/`.

## Troubleshooting

- Frontend cannot reach API: ensure server is running on port `5000`
- Port conflict: run server on another port (`PORT=5001 npm start`) and update `API_BASE` in `src/App.jsx`
- Broken images: check internet connectivity or update `imageMap`

## Additional Docs

- `QUICKSTART.md`
- `API_GUIDE.md`
- `ARCHITECTURE.md`
- `DEVELOPMENT.md`
