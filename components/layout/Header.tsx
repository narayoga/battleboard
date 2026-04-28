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
    <div id="kt_header" style={{ backgroundColor: '#1b1b28' }}>
      <div className="container d-flex align-items-stretch justify-content-between flex-lg-grow-1">
        {/* Title */}
        <div className="d-flex align-items-center">
          <h2 className="text-white mb-0">Battle Room</h2>
        </div>

        {/* User menu */}
        <div className="d-flex align-items-stretch flex-shrink-0">
          <div
            className="cursor-pointer symbol symbol-30px symbol-md-40px d-flex px-5 py-2"
            style={{ borderRadius: '5px', margin: '10px 0' }}
          >
            <div className="me-2 text-white">
              <span className="fw-bold">{nama || username}</span>
              <div className="fs-7 text-gray-400">{username}</div>
            </div>
          </div>
          <div
            className="d-flex align-items-center cursor-pointer text-white px-3"
            onClick={handleLogout}
            title="Logout"
          >
            <i className="bi bi-box-arrow-right fs-2x" />
          </div>
        </div>
      </div>
    </div>
  )
}
