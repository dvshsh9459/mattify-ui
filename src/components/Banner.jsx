import React from 'react'
import { ChevronLeft, ChevronRight } from './Icons'

export default function Banner({ slides, currentIndex, onPrev, onNext, onSelect }) {
  const [imageErrors, setImageErrors] = React.useState({})

  const handleImageError = (slideId) => {
    setImageErrors(prev => ({...prev, [slideId]: true}))
  }

  return (
    <div className="position-relative overflow-hidden" style={{backgroundColor: '#212529'}}>
      <div className="position-relative" style={{height: '320px', minHeight: '320px', overflowX: 'hidden'}}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="position-absolute start-0 top-0 w-100 transition"
            style={{
              height: '100%',
              background: slide.bg,
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 0.7s ease',
              zIndex: index === currentIndex ? 1 : 0
            }}
          >
            <div className="container-fluid h-100 d-flex align-items-center">
              <div className="row w-100 align-items-center">
                <div className="col-md-6 text-white" style={{maxWidth: '50%'}}>
                  <h2 className="display-5 fw-bold mb-3">{slide.title}</h2>
                  <p className="fs-5 mb-4">{slide.subtitle}</p>
                  <button className="btn btn-light fw-semibold px-4 py-2">Shop Now</button>
                </div>
                <div className="col-md-6 d-none d-md-block text-end">
                  {!imageErrors[slide.id] ? (
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="rounded-3 shadow-lg" 
                      onError={() => handleImageError(slide.id)}
                      style={{height: '320px', width: '420px', objectFit: 'cover'}} 
                    />
                  ) : (
                    <div className="rounded-3 shadow-lg d-flex align-items-center justify-content-center" style={{height: '320px', width: '420px', backgroundColor: 'rgba(255,255,255,0.2)'}}>
                      <span className="text-white text-center">Image not available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <button onClick={onPrev} className="btn btn-light position-absolute top-50 start-3 translate-middle-y rounded-circle p-2 shadow-lg" style={{zIndex: 20}}><ChevronLeft /></button>
        <button onClick={onNext} className="btn btn-light position-absolute top-50 end-3 translate-middle-y rounded-circle p-2 shadow-lg" style={{zIndex: 20}}><ChevronRight /></button>

        <div className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-2 pb-3" style={{zIndex: 20}}>
          {slides.map((_, index) => (
            <button 
              key={index} 
              onClick={() => onSelect(index)} 
              className="rounded-pill transition" 
              style={{
                width: index === currentIndex ? '32px' : '8px',
                height: '8px',
                backgroundColor: index === currentIndex ? '#fff' : 'rgba(255,255,255,0.5)',
                border: 'none',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
