# Mattify API Guide

This document describes the backend API used by Mattify.

- Base URL: `http://localhost:5000/api`
- Content type: `application/json`
- Data store: JSON files under `server/data`

## Run API Server

```bash
cd server
npm install
npm start
```

## Health Check

### `GET /`
Returns basic API status.

Example response:
```json
{
  "status": "Sleepwell demo API running",
  "version": "1.0"
}
```

## Endpoints

### Banners

#### `GET /banners`
Returns all banner slides.

### Categories

#### `GET /categories`
Returns all product categories.

### Products

#### `GET /products`
Returns products with optional query filters.

Query params:
- `category` (string)
- `search` (string)
- `sort` (`price-asc` | `price-desc` | `rating`)

Examples:
- `/products`
- `/products?category=Mattresses`
- `/products?search=pillow`
- `/products?category=Bed%20Sheets&sort=price-asc`

#### `GET /products/:id`
Returns one product with attached reviews.

Success example:
```json
{
  "id": 1,
  "name": "Orthopedic Mattress",
  "category": "Mattresses",
  "price": 24999,
  "reviews": [
    {
      "id": 1,
      "productId": 1,
      "userName": "Aman",
      "rating": 5,
      "title": "Great",
      "comment": "Very comfortable",
      "date": "2026-02-17"
    }
  ]
}
```

Not found example:
```json
{
  "error": "Product not found"
}
```

### Search

#### `GET /search?q=...`
Searches products by product name or category.

If `q` is missing, returns an empty array.

### Cart

#### `GET /cart`
Returns current cart.

Response shape:
```json
{
  "items": [],
  "total": 0
}
```

#### `POST /cart/add`
Adds a product to cart or increments quantity.

Body:
```json
{
  "product": {
    "id": 1,
    "name": "Orthopedic Mattress",
    "price": 24999
  }
}
```

Validation error:
```json
{
  "error": "Product required"
}
```

#### `POST /cart/remove`
Removes a product from cart.

Body:
```json
{
  "productId": 1
}
```

#### `POST /cart/update`
Updates quantity for a product. If quantity is `<= 0`, item is removed.

Body:
```json
{
  "productId": 1,
  "quantity": 2
}
```

#### `POST /cart/clear`
Clears all cart items.

### Reviews

#### `GET /reviews/:productId`
Returns reviews for a given product.

#### `POST /reviews`
Creates a new review.

Body:
```json
{
  "productId": 1,
  "userName": "Aman",
  "rating": 5,
  "title": "Worth it",
  "comment": "Comfort improved my sleep"
}
```

Required fields:
- `productId`
- `userName`
- `rating`

Validation error:
```json
{
  "error": "Missing fields"
}
```

Success returns `201` with created review object.

### Filters

#### `GET /filters`
Returns static filter options:
- `priceRanges`
- `ratings`
- `discounts`

### Images

#### `GET /images/:filename`
Redirects to mapped image URL (Unsplash) using `imageMap` in `server/utils/dataStore.js`.

If not found:
```json
{
  "error": "Image not found"
}
```

### Auth (Demo OTP)

These endpoints are demo-only and keep OTP/user data in memory.

#### `POST /auth/send-code`
Generates 4-digit OTP for a mobile number.

Body:
```json
{
  "mobile": "9999999999"
}
```

Error:
```json
{
  "error": "Mobile required"
}
```

#### `POST /auth/verify`
Verifies OTP and returns demo token + user.

Body:
```json
{
  "mobile": "9999999999",
  "code": "1234"
}
```

Possible errors:
- `Mobile and code required`
- `No code requested for this mobile`
- `Code expired`
- `Invalid code`

#### `POST /auth/logout`
Demo logout endpoint.

#### `GET /auth/me`
Reads token from `Authorization: Bearer <token>` and returns user.

Possible errors:
- `Not authenticated`
- `Invalid token`
- `Invalid token format`

## Error Format

Typical error response:
```json
{
  "error": "message"
}
```

## Notes

- Cart and reviews are persisted to JSON files.
- OTP and auth users are in-memory only (reset when server restarts).
- CORS is enabled globally via `app.use(cors())`.
