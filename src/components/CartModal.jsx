import React, { useEffect, useState } from 'react'

export default function CartModal({ cartItems = [], onClose, onRemoveFromCart }) {
  const [cart, setCart] = useState({ items: cartItems, total: 0 })

  useEffect(() => {
    // Update local cart when cartItems prop changes
    const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
    setCart({ items: cartItems, total })
  }, [cartItems])

  const remove = async (id) => {
    try {
      const res = await fetch('http://localhost:5000/api/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id })
      })
      if (res.ok) {
        if (onRemoveFromCart) onRemoveFromCart(id)
      }
    } catch (e) {
      console.log('Remove failed:', e)
      if (onRemoveFromCart) onRemoveFromCart(id)
    }
  }

  const updateQty = async (id, qty) => {
    if (qty <= 0) {
      remove(id)
      return
    }
    try {
      await fetch('http://localhost:5000/api/cart/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id, quantity: qty })
      })
    } catch (e) {
      console.log('Update quantity failed:', e)
    }
  }

  const clearCart = async () => {
    try {
      await fetch('http://localhost:5000/api/cart/clear', { method: 'POST' })
      setCart({ items: [], total: 0 })
    } catch (e) {
      console.log('Clear failed:', e)
      setCart({ items: [], total: 0 })
    }
  }

  if (!cart) return null

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100" style={{zIndex: 2000, backgroundColor: 'rgba(0,0,0,0.45)'}}>
      <div className="d-flex flex-column h-100 bg-white" style={{width: '100%', maxWidth: '100%', boxShadow: '0 8px 24px rgba(0,0,0,0.2)'}}>
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0">Your Cart</h5>
          <div>
            <button className="btn btn-sm btn-light me-2" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="p-3 flex-grow-1 overflow-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Your Cart</h5>
            <button className="btn btn-sm btn-light" onClick={onClose}>✕</button>
          </div>

          {cart.items.length === 0 ? (
            <div className="p-4 text-center">Your cart is empty</div>
          ) : (
            <div style={{maxHeight: '60vh', overflowY: 'auto'}}>
              {cart.items.map(item => (
                <div key={item.id} className="d-flex align-items-center gap-3 py-2 border-bottom">
                  <img src={item.image} alt={item.name} style={{width: 64, height: 64, objectFit: 'cover'}} />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="fw-semibold">{item.name}</div>
                        <div className="text-muted small">₹{item.price.toLocaleString()}</div>
                      </div>
                      <div className="text-end">
                        <div className="d-flex align-items-center gap-2">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQty(item.id, (item.quantity||1)-1)}>-</button>
                          <div>{item.quantity || 1}</div>
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQty(item.id, (item.quantity||1)+1)}>+</button>
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
        <div className="p-3 border-top d-flex justify-content-between align-items-center">
          <div className="fw-bold">Total: ₹{cart.total.toLocaleString()}</div>
          <div>
            <button className="btn btn-outline-secondary me-2" onClick={clearCart}>Clear</button>
            <button className="btn btn-primary">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
