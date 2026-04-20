import React, { useState } from 'react'

const DEFAULT_API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:7000/api'

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [mobile, setMobile] = useState('')
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)

  // Scroll locking is handled centrally in App.jsx for showLogin/showCart

  const login = async () => {
    try {
      const trimmed = String(mobile || '').trim()
      if (!trimmed) {
        setMessage('Please enter your mobile number')
        return
      }

      if (!String(code || '').trim()) {
        setMessage('Please enter any code')
        return
      }

      setIsLoading(true)

      const res = await fetch(`${DEFAULT_API_BASE}/userLogin/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNo: trimmed, code: code.trim() })
      })

      const ct = res.headers.get('content-type') || ''
      if (!ct.includes('application/json')) {
        setMessage('Server returned unexpected response. Check API base/port.')
        setIsLoading(false)
        return
      }

      const data = await res.json()
      if (!res.ok) {
        setMessage(data?.error || 'Login failed')
        setIsLoading(false)
        return
      }

      // Store contact info locally
      localStorage.setItem('contactNo', trimmed)
      localStorage.setItem('userId', data.user?.id)

      if (typeof onLoginSuccess === 'function') {
        const user = data.user || { mobileNo: trimmed }
        onLoginSuccess(user)
      }

      onClose && onClose()
    } catch (e) {
      setMessage(e?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="position-fixed start-0 w-100"
      onClick={onClose}
      style={{ top: '72px', height: 'calc(100vh - 72px)', zIndex: 2000, backgroundColor: 'rgba(0,0,0,0.35)' }}
    >
      <div className="d-flex justify-content-end h-100 p-2 p-md-3">
        <div
          className="d-flex flex-column bg-white rounded-3 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{ width: '100%', maxWidth: '460px', height: '100%', boxShadow: '0 12px 30px rgba(0,0,0,0.2)' }}
        >
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <h5 className="mb-0">Login</h5>
            <button className="btn btn-sm btn-light" onClick={onClose}>x</button>
          </div>

          <div className="p-3 flex-grow-1 overflow-auto">
            <div className="mb-3">
              <label className="form-label small">Mobile</label>
              <input className="form-control" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter mobile number" />
            </div>
            <div className="mb-3">
              <label className="form-label small">Code</label>
              <input className="form-control" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" />
            </div>

            {message && <div className="alert alert-danger" role="alert">{message}</div>}

            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={onClose} disabled={isLoading}>Cancel</button>
              <button className="btn btn-primary" onClick={login} disabled={isLoading}>{isLoading ? 'Please wait...' : 'Login'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}