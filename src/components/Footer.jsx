import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-dark text-light mt-3 pt-2">
      <div className="container-fluid px-3 pb-2">
        <div className="row g-2">
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="text-white fw-bold mb-2" style={{fontSize: '1rem'}}>About Mattify</h5>
            <p className="mb-1" style={{fontSize: '0.8rem'}}>Your trusted destination for premium bedding products. Quality sleep starts here.</p>
            <p className="mb-1 fw-semibold" style={{fontSize: '0.78rem'}}>Keep in Touch</p>
            <div className="d-flex align-items-center gap-3 mt-2">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="Instagram" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37a4 4 0 1 1-2.3-2.3"></path>
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="WhatsApp" title="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.5 8.5 0 0 1-12.54 7.5L3 21l2.06-5.09A8.5 8.5 0 1 1 21 11.5z"></path>
                  <path d="M8.3 9.4c.2-.5.5-.5.7-.5h.6c.2 0 .4.1.5.4.2.5.6 1.4.6 1.5.1.2 0 .3-.1.5l-.4.5c-.1.1-.2.3-.1.5.1.2.5 1 1.2 1.6.9.8 1.6 1 1.8 1.1.2.1.4.1.5-.1l.6-.7c.1-.1.3-.2.5-.1.2.1 1.2.6 1.4.7.2.1.3.2.4.3.1.2.1 1-.2 1.5-.3.5-1.4 1-1.9 1.1-.5.1-1.2.2-3-.6-1.8-.8-3-2.6-3.3-3-.3-.4-.7-1.2-.7-2.2 0-1 .5-1.5.7-1.8z"></path>
                </svg>
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="Facebook" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.24 0-1.62.77-1.62 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z"></path>
                </svg>
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="YouTube" title="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8zM9.6 15.5v-7L16 12l-6.4 3.5z"></path>
                </svg>
              </a>
            </div>
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
        <hr className="bg-secondary-subtle my-2" />
        <div className="text-center" style={{fontSize: '0.75rem'}}>
          <p className="mb-0">© 2026 Mattify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
