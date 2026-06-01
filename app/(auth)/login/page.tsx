'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername]       = useState('')
  const [password, setPassword]       = useState('')
  const [error, setError]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await axios.post('/api/auth/login', { username, password })
      router.push('/profile')
      router.refresh()
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-root">
      {/* Floating blobs */}
      <div className="login-blob login-blob-1" />
      <div className="login-blob login-blob-2" />
      <div className="login-blob login-blob-3" />

      {/* Card */}
      <div className="login-card animate__animated animate__fadeInUp animate__faster">

        {/* Brand */}
        <div className="login-brand">
          <div className="login-logo">
            <i className="bi bi-shield-check" />
          </div>
          <h1 className="login-title">Battle Room</h1>
          <p className="login-subtitle">Planning Access Supervision</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* Error alert */}
          {error && (
            <div className="login-alert">
              <i className="bi bi-exclamation-circle me-2" />
              {error}
            </div>
          )}

          {/* Username */}
          <div className="login-field">
            <label className="login-label">Username</label>
            <div className="login-input-wrap">
              <i className="bi bi-person login-input-icon" />
              <input
                type="text"
                className="login-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-field">
            <label className="login-label">Password</label>
            <div className="login-input-wrap">
              <i className="bi bi-lock login-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="login-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                required
              />
              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                <i className={`bi bi-eye${showPassword ? '-slash' : ''}`} />
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading || !username || !password}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Authenticating...
              </>
            ) : (
              <>
                Sign In
                <i className="bi bi-arrow-right ms-2" />
              </>
            )}
          </button>
        </form>

        {/* Footer note */}
        <div className="login-divider">
          <div className="login-divider-line" />
          <span className="login-footer-text">Secure &amp; Encrypted Connection</span>
          <div className="login-divider-line" />
        </div>

      </div>
    </div>
  )
}
