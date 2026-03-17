import React from 'react'
import { Star } from './Icons'
import { formatDiscount } from '../utils/formatProductValue'

export default function ProductCard({ product, onAdd, onView }) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)
  const discountLabel = formatDiscount(product.discount)
  
  return (
    <div 
      className="card shadow-sm transition rounded-3 product-card"
      title={product.name}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onView && onView(product)}
      style={{cursor: 'pointer', transition: 'box-shadow 0.3s ease'}}
    >
      <div className="position-relative overflow-hidden rounded-top-3 product-card-media">
        {!imageError ? (
          <img 
            src={product.image} 
            alt={product.name} 
            title={product.name}
            className="w-100 h-100 transition" 
            onError={() => setImageError(true)}
            style={{
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          />
        ) : (
          <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{backgroundColor: '#e9ecef'}}>
            <span className="text-muted">Image not available</span>
          </div>
        )}
        {discountLabel && (
          <span className="position-absolute top-0 start-0 badge bg-danger m-2 fw-semibold">{discountLabel}</span>
        )}
        {product.tag && (
          <span className="position-absolute top-0 end-0 badge bg-success m-2 fw-semibold">{product.tag}</span>
        )}
      </div>

      <div className="card-body product-card-body">
        <h5
          onClick={() => onView && onView(product)}
          className="card-title fw-semibold text-sm mb-2 product-card-title"
          style={{fontSize: '0.875rem'}}
          title={product.name}
        >
          {product.name}
        </h5>
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="badge bg-success d-flex align-items-center gap-1" style={{fontSize: '0.75rem'}}>{product.rating}<Star /></span>
          <span className="text-muted" style={{fontSize: '0.75rem'}}>({product.reviews.toLocaleString()})</span>
        </div>

        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="fw-bold" style={{fontSize: '1.125rem'}}>₹{product.price.toLocaleString()}</span>
          <span className="text-muted text-decoration-line-through" style={{fontSize: '0.875rem'}}>₹{product.originalPrice.toLocaleString()}</span>
        </div>

        <button onClick={(e) => { e.stopPropagation(); onAdd(product) }} className="w-100 btn btn-primary fw-medium rounded-2 mt-auto py-1">Add to Cart</button>
      </div>
    </div>
  )
}
