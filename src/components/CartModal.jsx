import React, { useEffect, useState } from 'react'
import { ShoppingCart } from './Icons'

export default function CartModal({ cartItems = [], isLoggedIn = false, onClose, onRemoveFromCart, onLogin, onUpdateQuantity, onClearCart }) {
  const [cart, setCart] = useState({ items: cartItems, total: 0 })

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
    setCart({ items: cartItems, total })
  }, [cartItems])

  const recomputeTotal = (items) => items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)

  const remove = (id) => {
    setCart((prev) => {
      const items = prev.items.filter((item) => item.id !== id)
      return { items, total: recomputeTotal(items) }
    })
    if (onRemoveFromCart) onRemoveFromCart(id)
  }

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      remove(id)
      return
    }

    setCart((prev) => {
      const items = prev.items.map((item) => (
        item.id === id ? { ...item, quantity: qty } : item
      ))
      return { items, total: recomputeTotal(items) }
    })
    if (onUpdateQuantity) onUpdateQuantity(id, qty)
  }

  const clearCart = () => {
    setCart({ items: [], total: 0 })
    if (onClearCart) onClearCart()
  }

  if (!cart) return null

  const showEmptyState = cart.items.length === 0
  const showGuestEmptyState = showEmptyState && !isLoggedIn

  return (
    <div
      className="position-fixed start-0 w-100"
      style={{
        top: '72px',
        height: 'calc(100vh - 72px)',
        zIndex: 2000,
        backgroundColor: 'rgba(0,0,0,0.35)'
      }}
    >
      <div className="d-flex justify-content-end h-100 p-2 p-md-3">
        <div
          className="d-flex flex-column bg-white rounded-3 overflow-hidden"
          style={{
            width: '100%',
            maxWidth: '460px',
            height: '100%',
            boxShadow: '0 12px 30px rgba(0,0,0,0.2)'
          }}
        >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0">Your Cart</h5>
          <button className="btn btn-sm btn-light" onClick={onClose}>x</button>
        </div>

        <div className={`p-3 flex-grow-1 ${showEmptyState ? 'overflow-hidden' : 'overflow-auto'}`}>
          {showEmptyState ? (
            <div className="d-flex align-items-center justify-content-center py-4 px-3" style={{ minHeight: '52vh' }}>
              <div className={`w-100 text-center ${showGuestEmptyState ? 'app-cart-empty-card' : 'bg-light rounded-4 border shadow-sm'}`} style={{ maxWidth: '520px' }}>
                {showGuestEmptyState ? (
                  <div className="app-cart-empty-guest">
                    <h3 className="app-cart-empty-title mb-2">PLEASE LOG IN</h3>
                    <p className="app-cart-empty-subtitle mb-2">Login to view items in your cart.</p>

                    <div className="app-cart-empty-art mb-3 mx-auto" aria-hidden="true">
                      <svg viewBox="0 0 180 180" role="presentation">
                        <g transform="translate(52 34)">
                          <rect x="8" y="8" width="78" height="106" rx="8" fill="#f7f8f9" stroke="#6adbc8" strokeWidth="3" transform="rotate(-4 47 61)" />
                          <rect x="14" y="12" width="78" height="106" rx="8" fill="#f7f8f9" stroke="#6adbc8" strokeWidth="3" transform="rotate(2 53 65)" />
                          <path d="M42 56c0-3.8 3-6.8 6.8-6.8 2.6 0 4.8 1.4 6 3.5 1.1-2.1 3.3-3.5 5.9-3.5 3.8 0 6.8 3 6.8 6.8 0 6.5-9.2 11.7-12.7 13.4a2.5 2.5 0 0 1-2.1 0C51.2 67.7 42 62.5 42 56z" fill="#f4b557" />
                          <rect x="70" y="56" width="22" height="6" rx="3" fill="#f4b557" />
                          <rect x="70" y="68" width="18" height="6" rx="3" fill="#f4b557" />
                          <rect x="73" y="23" width="10" height="8" rx="2" fill="#6adbc8" />
                        </g>
                        <path d="M44 95l2.8 6.2 6.8.7-5.1 4.4 1.5 6.6-6-3.4-6 3.4 1.6-6.6-5.2-4.4 6.9-.7z" fill="#cfd2d9" />
                        <circle cx="138" cy="121" r="3" fill="#cfd2d9" />
                        <path d="M86 104l2 4.6 5 .5-3.7 3.3 1.1 4.8-4.4-2.5-4.4 2.5 1.2-4.8-3.7-3.3 5-.5z" fill="#cfd2d9" />
                      </svg>
                    </div>

                    <button
                      className="btn app-cart-empty-login-btn fw-semibold"
                      onClick={() => {
                        onClose && onClose()
                        onLogin && onLogin()
                      }}
                    >
                      LOGIN
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: '96px',
                        height: '96px',
                        background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
                        color: '#2563eb'
                      }}
                    >
                      <ShoppingCart />
                    </div>
                    <h3 className="h4 mb-2">Your cart is empty</h3>
                    <p className="text-muted mb-4">Add products to your cart and they will appear here.</p>
                    <button className="btn btn-outline-primary px-4 fw-semibold" onClick={onClose}>Continue Shopping</button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {cart.items.map((item) => (
                <div key={item.id} className="d-flex align-items-center gap-3 py-2 border-bottom">
                  <img src={item.image} alt={item.name} style={{ width: 64, height: 64, objectFit: 'cover' }} />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="fw-semibold">{item.name}</div>
                        <div className="text-muted small">Rs. {item.price.toLocaleString()}</div>
                      </div>
                      <div className="text-end">
                        <div className="d-flex align-items-center gap-2">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQty(item.id, (item.quantity || 1) - 1)}>-</button>
                          <div>{item.quantity || 1}</div>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQty(item.id, (item.quantity || 1) + 1)}>+</button>
                        </div>
                        <button className="btn btn-sm btn-link text-danger mt-2" onClick={() => remove(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!showEmptyState && (
          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <div className="fw-bold">Total: Rs. {cart.total.toLocaleString()}</div>
            <div>
              <button className="btn btn-outline-secondary me-2" onClick={clearCart}>Clear</button>
              <button className="btn btn-primary">Checkout</button>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
