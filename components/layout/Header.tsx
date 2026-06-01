'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'

interface HeaderProps {
  username?: string
  nama?: string
}

export default function Header({ username, nama }: HeaderProps) {
  const router = useRouter()

  async function handleLogout() {
    await axios.post('/api/auth/logout')
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="dash-header">
      {/* Left — Logo + Title */}
      <div className="dash-header-left">
        <div className="dash-header-logo">
          <i className="bi bi-shield-check" />
        </div>
        <span className="dash-header-title-text">Battle Room</span>
      </div>

      {/* Right — User info + Logout */}
      <div className="dash-header-right">
        {(nama || username) && (
          <div className="dash-user-info">
            <div className="dash-user-name">{nama || username}</div>
            {nama && username && <div className="dash-user-role">{username}</div>}
          </div>
        )}
        <div
          className="dash-logout-btn"
          onClick={handleLogout}
          title="Logout"
        >
          <i className="bi bi-box-arrow-right" />
        </div>
      </div>
    </header>
  )
}
