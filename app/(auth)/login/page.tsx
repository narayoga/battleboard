'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

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
    <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed min-vh-100 bg-light">
      <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="fw-bold fs-1">Battle Room</h1>
          <p className="text-muted">Planning Access Supervision</p>
        </div>

        {/* Form card */}
        <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
          <form className="form w-100" onSubmit={handleSubmit} noValidate>
            <div className="text-center mb-10">
              <h2 className="text-dark mb-3">Sign In to Battle Room</h2>
            </div>

            {error && (
              <div className="mb-lg-15 alert alert-danger">
                <div className="alert-text font-weight-bold">{error}</div>
              </div>
            )}

            <div className="fv-row mb-10">
              <label className="form-label fs-6 fw-bolder text-dark">Username</label>
              <input
                className="form-control form-control-lg form-control-solid"
                type="text"
                name="username"
                placeholder="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="fv-row mb-10">
              <label className="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
              <input
                className="form-control form-control-lg form-control-solid mt-2"
                type="password"
                name="password"
                placeholder="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-lg btn-primary w-100 mb-5"
                disabled={loading || !username || !password}
              >
                {loading ? (
                  <span>
                    Please wait...{' '}
                    <span className="spinner-border spinner-border-sm align-middle ms-2" />
                  </span>
                ) : (
                  <span>Continue</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
