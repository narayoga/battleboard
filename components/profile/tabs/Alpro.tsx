'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const MapView = dynamic(() => import('@/components/ui/MapView'), { ssr: false })

type Theme = 'light' | 'dark'

interface Props { lokasi: string; tipe: string; theme?: Theme }

const CHART_THEME = {
  light: {
    tooltip: {
      background: '#ffffff',
      border: '1px solid #eff2f5',
      borderRadius: 8,
      color: '#181c32',
      fontSize: 12,
      boxShadow: '0 4px 12px rgba(76,87,125,0.1)',
    },
    tick: { fontSize: 11, fill: '#a1a5b7' },
    grid: '#f5f8fa',
    cursor: '#f5f8fa',
    legend: '#5e6278',
    muted: '#a1a5b7',
  },
  dark: {
    tooltip: {
      background: 'rgba(16,21,38,0.96)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 8,
      color: '#ffffff',
      fontSize: 12,
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
    },
    tick: { fontSize: 11, fill: 'rgba(255,255,255,0.4)' },
    grid: 'rgba(255,255,255,0.06)',
    cursor: 'rgba(255,255,255,0.05)',
    legend: 'rgba(255,255,255,0.6)',
    muted: 'rgba(255,255,255,0.4)',
  },
} as const

export default function Alpro({ lokasi, tipe, theme = 'light' }: Props) {
  const [ports, setPorts]     = useState<any[]>([])
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const t = CHART_THEME[theme]

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
        <div className="col-12">
          <div className="glass-card" style={{ marginBottom: 0 }}>
            <div className="glass-card-header">
              <h3 className="glass-card-title">
                ODP Map
                <span style={{ color: t.muted, fontWeight: 400, marginLeft: 8, fontSize: 13 }}>
                  {ports.length} titik
                </span>
              </h3>
            </div>
            <div className="glass-card-body" style={{ height: 'clamp(460px, 65vh, 760px)' }}>
              {center ? (
                <MapView center={center} ports={ports} />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center h-100"
                  style={{ color: t.muted, fontSize: 13 }}
                >
                  <i className="bi bi-geo me-2" />
                  Tidak ada data ODP
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History chart */}
        <div className="col-12">
          <div className="glass-card" style={{ marginBottom: 0 }}>
            <div className="glass-card-header">
              <h3 className="glass-card-title">ODP History</h3>
            </div>
            <div className="glass-card-body">
              <ResponsiveContainer width="100%" height={370}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={t.grid} />
                  <XAxis dataKey="bulan" tick={t.tick} axisLine={false} tickLine={false} />
                  <YAxis tick={t.tick} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={t.tooltip} cursor={{ fill: t.cursor }} />
                  <Legend wrapperStyle={{ fontSize: 12, color: t.legend }} />
                  <Bar dataKey="Total" fill="#009ef7" radius={[4,4,0,0]} />
                  <Bar dataKey="Avai"  fill="#1BC5BD" radius={[4,4,0,0]} />
                  <Bar dataKey="Used"  fill="#F64E60" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
