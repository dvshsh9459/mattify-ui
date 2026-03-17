import React, { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import ProductCard from './components/ProductCard'
import Footer from './components/Footer'
import ProductModal from './components/ProductModal'
import LoginModal from './components/LoginModal'
import CartModal from './components/CartModal'
import ProfileModal from './components/ProfileModal'
import { bannerSlides as localBanners, products as localProducts, categories } from './data'
import { formatDiscount } from './utils/formatProductValue'

const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:5000/api').replace(/\/$/, '')

const normalizeCloudinaryUrl = (url) => {
  if (typeof url !== 'string') return url
  if (!url.includes('res.cloudinary.com')) return url
  return url.replace('/raw/upload/', '/image/upload/')
}

const normalizeItems = (items) => (
  Array.isArray(items)
    ? items.map((item) => ({ ...item, image: normalizeCloudinaryUrl(item.image) }))
    : items
)

export default function App(){
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  const [flashMessage, setFlashMessage] = useState(null)
  const flashTimerRef = useRef(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [productsState, setProductsState] = useState(normalizeItems(localProducts))
  const [bannersState, setBannersState] = useState(normalizeItems(localBanners))
  const [showProduct, setShowProduct] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const isSearching = searchQuery.trim().length > 0
  const isCategoryView = selectedCategory !== 'All'
  const showCollectionTitle = selectedCategory === 'All'

  const filteredProducts = productsState.filter(p => (selectedCategory === 'All' || p.category === selectedCategory) && p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Fetch products when category or search changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams()
        if (selectedCategory !== 'All') params.append('category', selectedCategory)
        if (searchQuery) params.append('search', searchQuery)
        
        const res = await fetch(`${API_BASE}/products?${params}`)
        if (res.ok) setProductsState(normalizeItems(await res.json()))
      } catch (e) {
        console.log('Using local products (API unavailable)')
      }
    }
    fetchProducts()
  }, [selectedCategory, searchQuery])

  // Fetch banners on mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API_BASE}/banners`)
        if (res.ok) setBannersState(normalizeItems(await res.json()))
      } catch (e) {
        console.log('Using local banners (API unavailable)')
      }
    }
    fetchBanners()
  }, [])

  // Auto-slide banner
  useEffect(() => {
    const timer = setInterval(() => setCurrentBannerIndex((p) => (p + 1) % bannersState.length), 4000)
    return () => clearInterval(timer)
  }, [bannersState.length])

  // Restore demo auth session on load
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('demo_token')
      if (!token) return
      try {
        const res = await fetch(`${API_BASE}/auth/demo/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        if (res.ok) {
          setUser(data.user)
        } else {
          localStorage.removeItem('demo_token')
        }
      } catch (e) {
        console.log('Demo auth unavailable')
      }
    }
    loadUser()
  }, [])

  // Prevent background scroll when cart or login modal is open
  useEffect(() => {
    if (!showCart && !showLogin) return
    const prevOverflow = document.body.style.overflow
    const prevPaddingRight = document.body.style.paddingRight
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPaddingRight
    }
  }, [showCart, showLogin])

  const nextBanner = () => setCurrentBannerIndex((p) => (p + 1) % bannersState.length)
  const prevBanner = () => setCurrentBannerIndex((p) => (p - 1 + bannersState.length) % bannersState.length)

  const addToCart = async (product) => {
    try {
      const res = await fetch(`${API_BASE}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product })
      })
      if (res.ok) {
        const updatedCart = await res.json()
        setCart(updatedCart.items)
        // show a temporary header toast for 5 seconds
        setFlashMessage(`${product.name} added to cart`)
        if (flashTimerRef.current) clearTimeout(flashTimerRef.current)
        flashTimerRef.current = setTimeout(() => setFlashMessage(null), 5000)
      }
    } catch (e) {
      console.log('Cart add failed, using local cart')
      setCart(c => [...c, { ...product, quantity: 1 }])
      setFlashMessage(`${product.name} added to cart`)
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current)
      flashTimerRef.current = setTimeout(() => setFlashMessage(null), 5000)
    }
  }

  const handleViewProduct = (product) => {
    setCurrentProduct(product)
    setShowProduct(true)
  }

  const handleLoginSuccess = (user, token) => {
    setUser(user)
    localStorage.setItem('demo_token', token)
    setFlashMessage('Login successful')
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current)
    flashTimerRef.current = setTimeout(() => setFlashMessage(null), 4000)
  }
  const handleLogout = async () => {
    const token = localStorage.getItem('demo_token')
    if (token) {
      try {
        await fetch(`${API_BASE}/auth/demo/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        })
      } catch (e) {
        console.log('Logout failed')
      }
    }
    localStorage.removeItem('demo_token')
    setUser(null)
    setShowProfile(false)
  }

  const openCart = async () => {
    setShowLogin(false)
    setShowProfile(false)
    try {
      const res = await fetch(`${API_BASE}/cart`)
      if (res.ok) {
        const latestCart = await res.json()
        setCart(latestCart.items || [])
      }
    } catch (e) {
      console.log('Using local cart state (API unavailable)')
    }
    setShowCart(true)
  }
  const openLogin = () => {
    setShowCart(false)
    setShowProfile(false)
    setShowLogin(true)
  }
  const openProfile = () => {
    setShowCart(false)
    setShowLogin(false)
    setShowProfile(true)
  }
  const handleLogoClick = () => {
    setSelectedCategory('All')
    setSearchQuery('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const removeFromCart = async (productId) => {
    setCart(c => c.filter(item => item.id !== productId))

    try {
      await fetch(`${API_BASE}/cart/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      })
    } catch (e) {
      console.log('Remove failed, using local cart')
    }
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCart(c => c.filter(item => item.id !== productId))
      fetch(`${API_BASE}/cart/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      }).catch(() => {
        console.log('Remove failed, using local cart')
      })
      return
    }
    setCart(c => c.map(item => (
      item.id === productId ? { ...item, quantity } : item
    )))
    fetch(`${API_BASE}/cart/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    }).catch(() => {
      console.log('Update quantity failed, using local cart')
    })
  }

  const clearCart = () => {
    setCart([])
    fetch(`${API_BASE}/cart/clear`, { method: 'POST' }).catch(() => {
      console.log('Clear failed, using local cart')
    })
  }

  const scrollDeals = (direction) => {
    const container = document.getElementById('deals-container')
    const scrollAmount = 300
    if(container) container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cart.length}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        onOpenLogin={openLogin}
        onOpenProfile={openProfile}
        onLogout={handleLogout}
        onOpenCart={openCart}
        onLogoClick={handleLogoClick}
        user={user}
      />

      {selectedCategory === 'All' && !isSearching && (
        <Banner slides={bannersState} currentIndex={currentBannerIndex} onPrev={prevBanner} onNext={nextBanner} onSelect={setCurrentBannerIndex} />
      )}

      <main className="container-fluid px-4 py-4 flex-grow-1">
        {flashMessage && (
          <div className="alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" role="alert" style={{zIndex: 1050, minWidth: '300px'}}>
            <strong>✓ Success!</strong> {flashMessage}
            <button type="button" className="btn-close" onClick={() => setFlashMessage(null)}></button>
          </div>
        )}
        
        {selectedCategory === 'All' && !isSearching && (
          <>
            <section className="mb-5">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className="h4 fw-bold">Deal of the Day</h3>
                <div className="d-flex gap-2">
                  <button onClick={() => scrollDeals('left')} className="btn btn-light border rounded-circle p-2">‹</button>
                  <button onClick={() => scrollDeals('right')} className="btn btn-light border rounded-circle p-2">›</button>
                </div>
              </div>
              <div id="deals-container" className="d-flex gap-3 overflow-auto scrollbar-hide" style={{scrollBehavior: 'smooth'}}>
                {productsState.slice(0,6).map(product => (
                  <div
                    key={product.id}
                    className="card shadow-sm transition bg-white rounded-3 product-card"
                    style={{minWidth: '240px', cursor: 'pointer'}}
                    title={product.name}
                    onClick={() => handleViewProduct(product)}
                  >
                    <div className="position-relative overflow-hidden rounded-top-3 product-card-media">
                      <img src={product.image} alt={product.name} title={product.name} className="w-100 h-100 transition" style={{objectFit: 'cover'}} />
                      {formatDiscount(product.discount) && (
                        <span className="position-absolute top-0 start-0 badge bg-danger m-2 fw-semibold">{formatDiscount(product.discount)}</span>
                      )}
                      {product.tag && (
                        <span className="position-absolute top-0 end-0 badge bg-success m-2 fw-semibold">{product.tag}</span>
                      )}
                    </div>
                    <div className="card-body p-2 product-card-body">
                      <h5 className="fw-semibold text-sm mb-2 product-card-title" title={product.name}>{product.name}</h5>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="h6 fw-bold mb-0">₹{product.price.toLocaleString()}</span>
                        <span className="text-muted text-decoration-line-through" style={{fontSize: '0.75rem'}}>₹{product.originalPrice.toLocaleString()}</span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(product) }} className="w-100 btn btn-primary btn-sm fw-medium mt-auto py-1">Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <div className="row g-4">
          {isCategoryView && (
            <aside className="col-lg-3">
              <div className="card shadow-sm rounded-3 p-3" style={{position: 'sticky', top: '120px'}}>
                <h5 className="fw-bold mb-3">Filters</h5>
                <div style={{maxHeight: '68vh', overflowY: 'auto', paddingRight: '8px'}}>
                  <div className="mb-4">
                    <h6 className="fw-semibold mb-2" style={{fontSize: '0.875rem'}}>Price Range</h6>
                    <div className="d-flex flex-column gap-2">
                      {['Under ₹1,000','₹1,000 - ₹5,000','₹5,000 - ₹20,000','Above ₹20,000'].map(range => (
                        <label key={range} className="form-check" style={{fontSize: '0.875rem'}}>
                          <input type="checkbox" className="form-check-input rounded" />
                          <span className="form-check-label">{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-semibold mb-2" style={{fontSize: '0.875rem'}}>Rating</h6>
                    <div className="d-flex flex-column gap-2">
                      {['4★ & above','3★ & above','2★ & above'].map(r => (
                        <label key={r} className="form-check" style={{fontSize: '0.875rem'}}>
                          <input type="checkbox" className="form-check-input rounded" />
                          <span className="form-check-label">{r}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h6 className="fw-semibold mb-2" style={{fontSize: '0.875rem'}}>Discount</h6>
                    <div className="d-flex flex-column gap-2">
                      {['50% or more','40% or more','30% or more','20% or more'].map(d => (
                        <label key={d} className="form-check" style={{fontSize: '0.875rem'}}>
                          <input type="checkbox" className="form-check-input rounded" />
                          <span className="form-check-label">{d}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}

          <div className={isCategoryView ? 'col-lg-9' : ''}>
            {showCollectionTitle && (
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className="h5 fw-bold">All Products <span className="text-muted" style={{fontSize: '0.875rem'}}>({filteredProducts.length} items)</span></h3>
                <button className="btn btn-outline-secondary d-lg-none d-flex align-items-center gap-2">Filter</button>
              </div>
            )}

            {isCategoryView && (
              <div className="d-flex justify-content-end d-lg-none mb-3">
                <button className="btn btn-outline-secondary d-flex align-items-center gap-2">Filter</button>
              </div>
            )}

            <div className="row g-3">
              {filteredProducts.map(product => <div key={product.id} className="col-6 col-md-4 col-lg-3"><ProductCard product={product} onAdd={addToCart} onView={handleViewProduct} /></div>)}
            </div>
          </div>
        </div>
      </main>

      {showProduct && <ProductModal product={currentProduct} onClose={() => setShowProduct(false)} onAddToCart={(p) => { addToCart(p); setShowProduct(false) }} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />}
      {showProfile && <ProfileModal user={user} onClose={() => setShowProfile(false)} />}
      {showCart && (
        <CartModal
          cartItems={cart}
          isLoggedIn={Boolean(user)}
          onClose={() => setShowCart(false)}
          onRemoveFromCart={removeFromCart}
          onLogin={openLogin}
          onUpdateQuantity={updateCartQuantity}
          onClearCart={clearCart}
        />
      )}

      <Footer />
    </div>
  )
}

