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

function commaSeparate(val: number): string {
  return val.toLocaleString('en-US')
}

export default function ProfileMain() {
  const [lokasi, setLokasi]   = useState('BRU')
  const [tipe, setTipe]       = useState('STO')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)
  const [tab, setTab]         = useState<Tab | false>('overview')

  const fetchProfile = useCallback(async () => {
    setLoading(true)
    try {
      const res = await axios.post('/api/profile', {
        lokasi,
        tipe,
        bulan: 'sep',
        tahun: '2022',
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
    <div className="d-flex flex-column flex-root min-vh-100">
      <Header />

      <div className="page d-flex flex-row flex-column-fluid">
        <div className="d-flex flex-column flex-row-fluid" id="kt_wrapper">
          <div id="kt_content" className="content d-flex flex-column flex-column-fluid">
            <div className="post d-flex flex-column-fluid" id="kt_post">
              <div id="kt_content_container" className="container-xxl">

                {/* Search */}
                <div className="pt-6">
                  <Search onSelect={handleSelectLocation} />
                </div>

                {/* Profile Card */}
                <div className="card mb-5 mb-xl-10">
                  <div className="card-body pt-9 pb-0">
                    <div className="d-flex flex-wrap flex-sm-nowrap mb-3">

                      {/* Photo */}
                      <div className="me-7 mb-4">
                        <div style={{ width: 150, height: 150 }}>
                          {profile?.photoUrl ? (
                            <img
                              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%', borderRadius: 10 }}
                              src={profile.photoUrl}
                              alt={profile.nama}
                            />
                          ) : (
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-center" style={{ width: '100%', height: '100%', borderRadius: 10 }}>
                              <i className="bi bi-person fs-1 text-muted" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                          <div className="d-flex flex-column">
                            {loading ? (
                              <div className="d-flex align-items-center mb-2">
                                <div className="spinner-border spinner-border-sm me-2" />
                                <span className="text-muted">loading...</span>
                              </div>
                            ) : (
                              <div className="d-flex align-items-center mb-2">
                                <span className="text-gray-800 fs-2 fw-bolder me-3">
                                  {profile?.nama ?? '—'}
                                </span>
                                {profile?.level === 'KECIL'  && <span className="badge badge-danger">{profile.level}</span>}
                                {profile?.level === 'BESAR'  && <span className="badge badge-success">{profile.level}</span>}
                                {profile?.level === 'SEDANG' && <span className="badge badge-warning">{profile.level}</span>}
                              </div>
                            )}
                            <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                              <span className="d-flex align-items-center text-gray-400 me-5 mb-2">
                                <i className="bi bi-person-badge me-1" />
                                {loading ? '...' : (profile?.jabatan ?? '—')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        {!loading && profile && (
                          <div className="d-flex flex-wrap flex-stack">
                            <div className="d-flex flex-column flex-grow-1 pe-8">
                              <div className="d-flex flex-wrap">
                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                  <div className="fs-2 fw-bolder">{commaSeparate(profile.lis)}</div>
                                  <div className="fw-bold fs-6 text-gray-400">Subscribers</div>
                                </div>
                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                  <div className="fs-2 fw-bolder">IDR {commaSeparate(profile.billingAmount)}</div>
                                  <div className="fw-bold fs-6 text-gray-400">Monthly Revenue</div>
                                </div>
                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                  <div className="fs-2 fw-bolder">{commaSeparate(profile.newSales)}</div>
                                  <div className="fw-bold fs-6 text-gray-400">Sales</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tabs */}
                    {tab !== false && (
                      <div className="d-flex overflow-auto h-55px">
                        <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
                          {(['overview', 'Digital', 'alpro'] as Tab[]).map((t) => (
                            <li key={t} className="nav-item cursor-pointer">
                              <div
                                onClick={() => setTab(t)}
                                className={`nav-link me-6 ${tab === t ? 'active' : ''}`}
                                style={{ cursor: 'pointer' }}
                              >
                                {t === 'overview' ? 'Overview' : t === 'Digital' ? 'Digital' : 'Alpro'}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tab Content */}
                {!loading && tab === 'overview' && <Overview lokasi={lokasi} tipe={tipe} />}
                {!loading && tab === 'Digital'  && <Digital  lokasi={lokasi} tipe={tipe} />}
                {!loading && tab === 'alpro'    && <Alpro    lokasi={lokasi} tipe={tipe} />}

              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
