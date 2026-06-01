'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const MapView = dynamic(() => import('@/components/ui/MapView'), { ssr: false })

interface Props { lokasi: string; tipe: string }

const TOOLTIP_STYLE = {
  background: 'rgba(10,16,32,0.95)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  color: '#e2e8f0',
  fontSize: 12,
}

const TICK_STYLE = { fontSize: 11, fill: 'rgba(255,255,255,0.38)' }

export default function Alpro({ lokasi, tipe }: Props) {
  const [ports, setPorts]     = useState<any[]>([])
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchAll() {
      setLoading(true)
      try {
        const [resPorts, resHistory] = await Promise.all([
          axios.post('/api/odp/read',    { lokasi, tipe }),
          axios.post('/api/odp/history', { lokasi, tipe, tahun: '2022' }),
        ])
        setPorts(resPorts.data)
        setHistory(resHistory.data)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [lokasi, tipe])

  const centerPort = ports[Math.min(100, ports.length - 1)] ?? null
  const center: [number, number] | null = centerPort
    ? [centerPort.latitude, centerPort.longitude]
    : null

  const chartData = history.map((h, i) => ({
    bulan: `M${i + 1}`,
    Total: h.isTotal,
    Avai:  h.avai,
    Used:  h.used,
  }))

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5 gap-2">
        <div className="spinner-border" />
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>Memuat data...</span>
      </div>
    )
  }

  return (
    <div className="dash-section">
      <div className="dash-section-header">
        <h3 className="dash-section-title">Alpro</h3>
      </div>

      <div className="row g-4">

        {/* Map */}
        <div className="col-xl-7">
          <div className="glass-card" style={{ marginBottom: 0 }}>
            <div className="glass-card-header">
              <h3 className="glass-card-title">
                ODP Map
                <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400, marginLeft: 8, fontSize: 13 }}>
                  {ports.length} titik
                </span>
              </h3>
            </div>
            <div className="glass-card-body" style={{ height: 420 }}>
              {center ? (
                <MapView center={center} ports={ports} />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center h-100"
                  style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}
                >
                  <i className="bi bi-geo me-2" />
                  Tidak ada data ODP
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History chart */}
        <div className="col-xl-5">
          <div className="glass-card" style={{ marginBottom: 0 }}>
            <div className="glass-card-header">
              <h3 className="glass-card-title">ODP History</h3>
            </div>
            <div className="glass-card-body">
              <ResponsiveContainer width="100%" height={370}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                  <XAxis dataKey="bulan" tick={TICK_STYLE} axisLine={false} tickLine={false} />
                  <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                  <Legend wrapperStyle={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }} />
                  <Bar dataKey="Total" fill="#38bdf8" radius={[4,4,0,0]} />
                  <Bar dataKey="Avai"  fill="#34d399" radius={[4,4,0,0]} />
                  <Bar dataKey="Used"  fill="#f87171" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
