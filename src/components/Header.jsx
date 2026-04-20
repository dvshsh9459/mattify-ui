import React, { useEffect, useRef, useState } from 'react'
import { Search, User, ShoppingCart, Mattress, Sheet, Pillow, Comforter, Gift } from './Icons'

const categoryIcons = {
  'All': null,
  'Mattresses': Mattress,
  'Bed Sheets': Sheet,
  'Pillows': Pillow,
  'Comforters': Comforter,
  'Accessories': Gift
}

export default function Header({ searchQuery, setSearchQuery, cartCount, categories, selectedCategory, onSelectCategory, onOpenLogin, onOpenProfile, onLogout, onOpenCart, onLogoClick, onCloseProfile, onCloseCart, user }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileRef = useRef(null)
  const requestedOrder = ['All', 'Mattresses', 'Bed Sheets', 'Pillows', 'Comforters', 'Accessories']
  const visibleCategories = requestedOrder.filter((category) => categories.includes(category))
  const profileCompletion = typeof user?.profileCompletion === 'number' ? user.profileCompletion : null
  const canUseUserPhoto = Boolean(user && (profileCompletion === null || profileCompletion >= 100))
  const userPhoto =
    (user?.photoUrl || user?.avatar || user?.image || user?.profilePhoto || user?.photo) &&
    canUseUserPhoto
      ? (user?.photoUrl || user?.avatar || user?.image || user?.profilePhoto || user?.photo)
      : '/images/avatar-default.svg'
  const userEmail = typeof user?.email === 'string' ? user.email.trim() : ''
  const userHeadline = user?.headline || user?.title || user?.role || user?.designation || user?.bio || 'Mattify member'
  const closeProfileMenu = () => setIsProfileMenuOpen(false)

  useEffect(() => {
    if (!isProfileMenuOpen) return

    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [isProfileMenuOpen])

  useEffect(() => {
    if (!user) setIsProfileMenuOpen(false)
  }, [user])

  return (
    <header className="sticky-top app-header">
      <nav className="navbar navbar-light px-3 py-1 app-navbar">
        <div className="container-fluid app-navbar-grid">
          <div className="app-navbar-left">
            <button
              type="button"
              className="navbar-brand mb-0 fw-bold app-logo border-0 bg-transparent p-0"
              onClick={() => {
                closeProfileMenu()
                onLogoClick && onLogoClick()
              }}
            >
              <img src="/images/logo.jpeg" alt="Mattify" className="app-logo-img" />
            </button>
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
                      onClick={() => {
                        closeProfileMenu()
                        onCloseCart && onCloseCart()
                        onCloseProfile && onCloseProfile()
                        onSelectCategory && onSelectCategory(category)
                      }}
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

            <div className="app-header-actions">
              <div className="input-group app-search-wrap">
                <span className="input-group-text bg-light border-0"><Search /></span>
                <input
                  value={searchQuery}
                  onChange={(e) => {
                    closeProfileMenu()
                    onCloseCart && onCloseCart()
                    onCloseProfile && onCloseProfile()
                    setSearchQuery(e.target.value)
                  }}
                  type="text"
                  placeholder="Search..."
                  className="form-control bg-light border-0 app-search-input"
                  onFocus={() => {
                    closeProfileMenu()
                    onCloseCart && onCloseCart()
                    onCloseProfile && onCloseProfile()
                  }}
                />
              </div>
            </div>
          </div>

          <div className="app-navbar-right">
            <button title="Cart" className="btn btn-link text-decoration-none text-dark d-flex align-items-center gap-2 position-relative app-action-btn" onClick={() => { closeProfileMenu(); onCloseProfile && onCloseProfile(); onOpenCart && onOpenCart() }}>
              <ShoppingCart />
              <span className="d-none d-sm-inline">Cart</span>
              {cartCount > 0 && (
                <span className="position-absolute badge bg-danger app-cart-badge">{cartCount}</span>
              )}
            </button>

            <div className="app-auth-actions">
              {user ? (
                <div className="app-profile" ref={profileRef} data-menu-open={isProfileMenuOpen}>
                  <button
                    type="button"
                    onClick={() => {
                      onCloseCart && onCloseCart()
                      setIsProfileMenuOpen((prev) => !prev)
                    }}
                    className="btn btn-link text-decoration-none text-dark d-flex align-items-center app-action-btn app-profile-trigger"
                    aria-haspopup="true"
                    aria-expanded={isProfileMenuOpen}
                    aria-label="Open profile"
                  >
                    <img src={userPhoto} alt={user.name || 'User avatar'} className="app-profile-avatar" />
                  </button>
                  <div className="app-profile-menu" role="menu">
                    <div className="app-profile-menu-top">
                      <img src={userPhoto} alt={user.name || 'User avatar'} className="app-profile-menu-avatar" />
                      <div className="app-profile-menu-meta">
                        <div className="app-profile-menu-name">{user.name || 'User'}</div>
                        <div className="app-profile-menu-headline">{userEmail || userHeadline}</div>
                      </div>
                    </div>
                    <div className="app-profile-menu-actions">
                      <button
                        type="button"
                        className="app-profile-menu-btn"
                        onClick={() => {
                          closeProfileMenu()
                          onOpenProfile && onOpenProfile()
                        }}
                      >
                        View profile
                      </button>
                      <button
                        type="button"
                        className="app-profile-menu-btn"
                        onClick={() => {
                          closeProfileMenu()
                          onCloseProfile && onCloseProfile()
                          onLogout && onLogout()
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button onClick={() => { closeProfileMenu(); onCloseProfile && onCloseProfile(); onOpenLogin && onOpenLogin() }} className="btn btn-link text-decoration-none text-dark d-flex align-items-center gap-2 app-action-btn">
                  <User />
                  <span className="d-none d-sm-inline">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
