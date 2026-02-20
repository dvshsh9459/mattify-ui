import React from 'react'
import { Search, User, ShoppingCart, Mattress, Sheet, Pillow, Comforter, Gift } from './Icons'

const categoryIcons = {
  'All': null,
  'Mattresses': Mattress,
  'Bed Sheets': Sheet,
  'Pillows': Pillow,
  'Comforters': Comforter,
  'Accessories': Gift
}

export default function Header({ searchQuery, setSearchQuery, cartCount, categories, selectedCategory, setSelectedCategory, onOpenLogin, onOpenCart }) {
  const requestedOrder = ['All', 'Mattresses', 'Bed Sheets', 'Pillows', 'Comforters', 'Accessories']
  const visibleCategories = requestedOrder.filter((category) => categories.includes(category))

  return (
    <header className="sticky-top app-header">
      <nav className="navbar navbar-light px-3 py-1 app-navbar">
        <div className="container-fluid app-navbar-grid">
          <div className="app-navbar-left">
            <h1 className="navbar-brand mb-0 fw-bold app-logo">Mattify</h1>
          </div>

          <div className="app-navbar-center">
            <div className="category-strip">
              <div className="category-row">
                {visibleCategories.map((category) => {
                  const Icon = typeof categoryIcons[category] === 'function' ? categoryIcons[category] : null
                  const isSelected = selectedCategory === category

                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="category-button"
                      data-selected={isSelected}
                      title={category}
                    >
                      <div className="category-icon-box">
                        {Icon ? (
                          <Icon />
                        ) : (
                          <div style={{width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem'}}>
                            🏠
                          </div>
                        )}
                      </div>
                      <span className="category-label">{category}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="app-navbar-right">
            <div className="input-group app-search-wrap">
              <span className="input-group-text bg-light border-0"><Search /></span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search..."
                className="form-control bg-light border-0 app-search-input"
              />
            </div>

            <button onClick={onOpenLogin} className="btn btn-link text-decoration-none text-dark d-flex align-items-center gap-2 app-action-btn">
              <User />
              <span className="d-none d-sm-inline">Login</span>
            </button>

            <button title="Cart" className="btn btn-link text-decoration-none text-dark d-flex align-items-center gap-2 position-relative app-action-btn" onClick={() => onOpenCart && onOpenCart()}>
              <ShoppingCart />
              <span className="d-none d-sm-inline">Cart</span>
              {cartCount > 0 && (
                <span className="position-absolute badge bg-danger app-cart-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
