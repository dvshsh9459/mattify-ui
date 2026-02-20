import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-dark text-light mt-4 pt-3">
      <div className="container-fluid px-3 pb-3">
        <div className="row g-3">
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="text-white fw-bold mb-2" style={{fontSize: '1rem'}}>About Mattify</h5>
            <p className="mb-1" style={{fontSize: '0.8rem'}}>Your trusted destination for premium bedding products. Quality sleep starts here.</p>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="text-white fw-semibold mb-2" style={{fontSize: '0.9rem'}}>Quick Links</h6>
            <ul className="list-unstyled mb-1" style={{fontSize: '0.8rem'}}>
              <li className="mb-1"><a href="#" className="text-light text-decoration-none link-light">About Us</a></li>
              <li className="mb-1"><a href="#" className="text-light text-decoration-none link-light">Contact</a></li>
              <li className="mb-1"><a href="#" className="text-light text-decoration-none link-light">Shipping Info</a></li>
              <li><a href="#" className="text-light text-decoration-none link-light">Returns</a></li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="text-white fw-semibold mb-2" style={{fontSize: '0.9rem'}}>Categories</h6>
            <ul className="list-unstyled mb-1" style={{fontSize: '0.8rem'}}>
              <li className="mb-1"><a href="#" className="text-light text-decoration-none link-light">Mattresses</a></li>
              <li className="mb-1"><a href="#" className="text-light text-decoration-none link-light">Bed Sheets</a></li>
              <li className="mb-1"><a href="#" className="text-light text-decoration-none link-light">Pillows</a></li>
              <li><a href="#" className="text-light text-decoration-none link-light">Accessories</a></li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="text-white fw-semibold mb-2" style={{fontSize: '0.9rem'}}>Customer Service</h6>
            <ul className="list-unstyled mb-1" style={{fontSize: '0.8rem'}}>
              <li className="mb-1"><a href="#" className="text-light text-decoration-none link-light">Help Center</a></li>
              <li className="mb-1"><a href="#" className="text-light text-decoration-none link-light">Track Order</a></li>
              <li className="mb-1"><a href="#" className="text-light text-decoration-none link-light">Warranty</a></li>
              <li><a href="#" className="text-light text-decoration-none link-light">FAQs</a></li>
            </ul>
          </div>
        </div>
        <hr className="bg-secondary-subtle my-3" />
        <div className="text-center" style={{fontSize: '0.8rem'}}>
          <p className="mb-0">© 2026 Mattify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
