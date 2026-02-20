# Mattify Development Guide

This guide covers setup, workflow, common changes, and troubleshooting for Mattify.

## Prerequisites

- Node.js 14+
- npm
- Git (optional)
- VS Code (recommended)

## Local Setup

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

3. Start backend:
```bash
cd server
npm start
```

4. Start frontend (new terminal):
```bash
npm run dev
```

URLs:
- Frontend: `http://localhost:5173`
- API: `http://localhost:5000/api`

## Project Layout

```text
src/
  App.jsx
  data.js
  styles.css
  components/
server/
  index.js
  routes/
  utils/dataStore.js
  data/*.json
```

## Daily Workflow

1. Run backend and frontend in separate terminals.
2. Make changes in components/routes/data.
3. Validate behavior in browser + DevTools Network tab.
4. Commit focused changes.

## Common Frontend Changes

## Update UI Components

- Edit files in `src/components`
- Main orchestration is in `src/App.jsx`
- Global styles live in `src/styles.css`

## Change API URL

Update `API_BASE` in `src/App.jsx`.

## Add New Category Button Support

1. Update `server/data/categories.json`
2. If needed, update icon mapping in `src/components/Header.jsx`

## Common Backend Changes

## Add/Update Endpoint

1. Create/edit route in `server/routes`
2. Mount route in `server/index.js` if new
3. Return JSON consistently
4. If data mutates, persist via `ds.saveJSON(...)`

## Update Demo Data

- Edit JSON under `server/data`
- Restart backend to reload startup datasets where needed

## Add New Image Mapping

- Edit `imageMap` in `server/utils/dataStore.js`
- Use via `GET /api/images/:filename`

## API Testing Quick Commands

```bash
curl http://localhost:5000/api/products
curl "http://localhost:5000/api/products?category=Mattresses"
curl "http://localhost:5000/api/search?q=sheet"
```

Cart add example:
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"product":{"id":1,"name":"Test","price":1000}}'
```

## Quality Checklist

Before finalizing a change:
- API endpoints respond without errors
- product filtering/search still works
- cart add/remove/update works
- login modal flow still works
- no console errors in browser
- no server startup/runtime errors

## Troubleshooting

## Frontend cannot connect to API

- Ensure backend is running on port 5000
- Check `API_BASE` in `src/App.jsx`

## Port already in use

PowerShell example:
```powershell
$env:PORT=5001
npm start
```

Then update `API_BASE` accordingly.

## Images not loading

- Check internet access (image redirects are Unsplash URLs)
- Verify mapping key exists in `server/utils/dataStore.js`

## Data not updating as expected

- Ensure route writes call `ds.saveJSON(...)`
- Confirm you are editing files under `server/data`
- Restart backend after structural JSON edits

## API returns unexpected errors

- Check server terminal logs
- Validate request body fields and types
- Compare with `API_GUIDE.md`

## Suggested Extensions/Tools

- ESLint
- Prettier
- REST Client / Thunder Client
- React DevTools

## Related Docs

- `README.md`
- `API_GUIDE.md`
- `ARCHITECTURE.md`
- `QUICKSTART.md`

## Last Updated

February 20, 2026
