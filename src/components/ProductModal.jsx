import React from 'react'

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{zIndex: 2000, backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="card shadow-lg rounded-3" style={{width: '90%', maxWidth: '900px'}}>
        <div className="row g-0">
          <div className="col-md-6 d-flex align-items-center justify-content-center p-4" style={{backgroundColor: '#f8f9fa'}}>
            <img src={product.image} alt={product.name} style={{maxWidth: '100%', maxHeight: '420px', objectFit: 'cover'}} />
          </div>
          <div className="col-md-6 p-4">
            <div className="d-flex justify-content-between align-items-start">
              <h4 className="fw-bold">{product.name}</h4>
              <button className="btn btn-sm btn-light" onClick={onClose}>✕</button>
            </div>

            <p className="text-muted">Category: {product.category}</p>
            <div className="mb-3">
              <span className="h4 fw-bold">₹{product.price.toLocaleString()}</span>
              <span className="text-muted ms-2 text-decoration-line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="badge bg-success ms-2">{product.discount}</span>
            </div>

            <p className="mb-3">{product.description || 'High-quality product from Sleepwell collection.'}</p>

            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={() => onAddToCart(product)}>Add to Cart</button>
              <button className="btn btn-outline-secondary" onClick={() => { window.open('#', '_blank') }}>Buy Now</button>
            </div>

            <hr />
            <div>
              <h6 className="fw-semibold">Specifications</h6>
              <ul>
                <li>Material: Premium fabric</li>
                <li>Warranty: 1 year</li>
                <li>Free returns within 7 days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
