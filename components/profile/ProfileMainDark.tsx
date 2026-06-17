'use client'

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Search from '@/components/profile/Search'
import Overview from '@/components/profile/tabs/Overview'
import Digital from '@/components/profile/tabs/Digital'
import Alpro from '@/components/profile/tabs/Alpro'

type Tab = 'overview' | 'Digital' | 'alpro'

interface Profile {
  nama: string
  jabatan: string
  level: string
  lis: number
  billingAmount: number
  newSales: number
  photoUrl?: string
}

const TAB_CONFIG: { key: Tab; label: string; icon: string }[] = [
  { key: 'overview', label: 'Overview',  icon: 'bi-bar-chart-line' },
  { key: 'Digital',  label: 'Digital',   icon: 'bi-phone'          },
  { key: 'alpro',    label: 'Alpro',     icon: 'bi-geo-alt'        },
]

function commaSeparate(val: number): string {
  return val.toLocaleString('en-US')
}

export default function ProfileMainDark() {
  const [lokasi, setLokasi]   = useState('BRU')
  const [tipe, setTipe]       = useState('STO')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)
  const [tab, setTab]         = useState<Tab | false>('overview')

  const fetchProfile = useCallback(async () => {
    setLoading(true)
    try {
      const res = await axios.post('/api/profile', {
        lokasi, tipe, bulan: 'sep', tahun: '2022',
      })
      if (res.data.length > 0) {
        setProfile(res.data[0])
        setTab('overview')
      } else {
        setProfile(null)
        setTab(false)
        alert('Data belum diinput, silahkan cari pilihan lain')
      }
    } catch {
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }, [lokasi, tipe])

  useEffect(() => { fetchProfile() }, [fetchProfile])

  function handleSelectLocation(newLokasi: string, newTipe: string) {
    setLokasi(newLokasi)
    setTipe(newTipe)
  }

  return (
    <div className="dashboard-root dashboard-dark">

      <Header />

      <main className="dash-content">

        {/* ── Search ── */}
        <div style={{ marginBottom: 28, maxWidth: 420 }}>
          <Search onSelect={handleSelectLocation} />
        </div>

        {/* ── Profile Card ── */}
        <div className="profile-glass-card">
          <div className="profile-card-inner">
            <div className="d-flex flex-wrap flex-sm-nowrap">

              {/* Photo */}
              <div className="profile-photo-box">
                {profile?.photoUrl ? (
                  <img src={profile.photoUrl} alt={profile.nama} />
                ) : (
                  <i className="bi bi-person" style={{ fontSize: 38, color: 'rgba(255,255,255,0.18)' }} />
                )}
              </div>

              {/* Info */}
              <div className="flex-grow-1">

                {/* Name row */}
                <div className="d-flex align-items-center flex-wrap gap-2" style={{ marginBottom: 2 }}>
                  {loading ? (
                    <div className="d-flex align-items-center gap-2">
                      <div className="spinner-border spinner-border-sm" />
                      <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>Loading...</span>
                    </div>
                  ) : (
                    <>
                      <span className="profile-name">{profile?.nama ?? '—'}</span>
                      {profile?.level === 'KECIL'  && <span className="badge badge-danger">{profile.level}</span>}
                      {profile?.level === 'BESAR'  && <span className="badge badge-success">{profile.level}</span>}
                      {profile?.level === 'SEDANG' && <span className="badge badge-warning">{profile.level}</span>}
                    </>
                  )}
                </div>

                {/* Jabatan */}
                <div className="profile-jabatan-row">
                  <i className="bi bi-person-badge" style={{ color: 'rgba(255,255,255,0.28)', fontSize: 14 }} />
                  <span className="profile-jabatan-text">
                    {loading ? '...' : (profile?.jabatan ?? '—')}
                  </span>
                </div>

                {/* Stat boxes */}
                {!loading && profile && (
                  <div className="profile-stats-row">
                    <div className="profile-stat-box">
                      <div className="profile-stat-value">{commaSeparate(profile.lis)}</div>
                      <div className="profile-stat-label">Subscribers</div>
                    </div>
                    <div className="profile-stat-box">
                      <div className="profile-stat-value">IDR {commaSeparate(profile.billingAmount)}</div>
                      <div className="profile-stat-label">Monthly Revenue</div>
                    </div>
                    <div className="profile-stat-box">
                      <div className="profile-stat-value">{commaSeparate(profile.newSales)}</div>
                      <div className="profile-stat-label">Sales</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tab nav */}
            {tab !== false && (
              <div className="dash-tab-wrap">
                <ul className="dash-tab-list">
                  {TAB_CONFIG.map(({ key, label, icon }) => (
                    <li key={key}>
                      <div
                        className={`dash-tab-btn ${tab === key ? 'active-tab' : ''}`}
                        onClick={() => setTab(key)}
                      >
                        <i className={`bi ${icon}`} />
                        {label}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ── Tab Content ── */}
        {!loading && tab === 'overview' && <Overview lokasi={lokasi} tipe={tipe} theme="dark" />}
        {!loading && tab === 'Digital'  && <Digital  lokasi={lokasi} tipe={tipe} theme="dark" />}
        {!loading && tab === 'alpro'    && <Alpro    lokasi={lokasi} tipe={tipe} theme="dark" />}

      </main>

      <Footer />
    </div>
  )
}
