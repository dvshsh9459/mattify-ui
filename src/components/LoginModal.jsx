import React, { useState } from 'react'

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [mobile, setMobile] = useState('')
  const [code, setCode] = useState('')
  const [stage, setStage] = useState('send')
  const [message, setMessage] = useState('')

  const sendCode = async () => {
    try {
      const res = await fetch('/api/auth/send-code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile }) })
      const data = await res.json()
      if (res.ok) {
        setStage('verify')
        setMessage('Code sent (demo). Check server console.')
      } else setMessage(data.error || 'Failed')
    } catch (e) { setMessage('Network error') }
  }

  const verify = async () => {
    try {
      const res = await fetch('/api/auth/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile, code }) })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('demo_token', data.token)
        onLoginSuccess && onLoginSuccess(data.user, data.token)
        onClose()
      } else setMessage(data.error || 'Invalid code')
    } catch (e) { setMessage('Network error') }
  }

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{zIndex: 2000, backgroundColor: 'rgba(0,0,0,0.45)'}}>
      <div className="card p-4 rounded-3" style={{width: '360px'}}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Login</h5>
          <button className="btn btn-sm btn-light" onClick={onClose}>✕</button>
        </div>

        {stage === 'send' ? (
          <>
            <label className="form-label">Mobile number</label>
            <input className="form-control mb-3" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="10-digit mobile" />
            <button className="btn btn-primary w-100" onClick={sendCode}>Send Code</button>
          </>
        ) : (
          <>
            <label className="form-label">Enter code</label>
            <input className="form-control mb-3" value={code} onChange={(e) => setCode(e.target.value)} placeholder="4-digit code" />
            <button className="btn btn-primary w-100" onClick={verify}>Verify & Login</button>
          </>
        )}

        {message && <div className="mt-3 text-muted small">{message}</div>}
      </div>
    </div>
  )
}
