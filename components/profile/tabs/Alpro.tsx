'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Leaflet tidak support SSR — wajib dynamic import
const MapView = dynamic(() => import('@/components/ui/MapView'), { ssr: false })

interface Props { lokasi: string; tipe: string }

export default function Alpro({ lokasi, tipe }: Props) {
  const [ports, setPorts]         = useState<any[]>([])
  const [history, setHistory]     = useState<any[]>([])
  const [loading, setLoading]     = useState(false)

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

  // Center map dari ODP port ke-100 (atau index 0 jika <100)
  const centerPort = ports[Math.min(100, ports.length - 1)] ?? null
  const center: [number, number] | null = centerPort
    ? [centerPort.latitude, centerPort.longitude]
    : null

  // Chart data dari ODP history
  const chartData = history.map((h, i) => ({
    bulan: `M${i + 1}`,
    Total: h.isTotal,
    Avai: h.avai,
    Used: h.used,
  }))

  if (loading) return <div className="text-center py-10"><div className="spinner-border" /></div>

  return (
    <div className="row g-5 g-xl-8">
      {/* Map */}
      <div className="col-xl-7">
        <div className="card card-xl-stretch mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title fw-bolder text-dark">ODP Map ({ports.length} titik)</h3>
          </div>
          <div className="card-body pt-0" style={{ height: 400 }}>
            {center ? (
              <MapView center={center} ports={ports} />
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                Tidak ada data ODP
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History Chart */}
      <div className="col-xl-5">
        <div className="card card-xl-stretch mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title fw-bolder text-dark">ODP History</h3>
          </div>
          <div className="card-body pt-0">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total" fill="#3699FF" />
                <Bar dataKey="Avai"  fill="#1BC5BD" />
                <Bar dataKey="Used"  fill="#F64E60" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
