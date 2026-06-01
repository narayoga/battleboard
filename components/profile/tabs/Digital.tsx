'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

interface Props { lokasi: string; tipe: string }

const MONTHS = ['jan','feb','mar','apr','mei','jun','jul','agu','sep','okt','nov','des']

const TOOLTIP_STYLE = {
  background: 'rgba(10,16,32,0.95)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  color: '#e2e8f0',
  fontSize: 12,
}

const TICK_STYLE = { fontSize: 11, fill: 'rgba(255,255,255,0.38)' }

function toChartData(data: Record<string, any> | null) {
  if (!data) return []
  return MONTHS.map((m) => ({ bulan: m.toUpperCase(), value: data[m] ?? 0 }))
}

export default function Digital({ lokasi, tipe }: Props) {
  const [addon, setAddon]     = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchAll() {
      setLoading(true)
      try {
        const res = await axios.post('/api/performance', {
          performance: 'addon', tahun: '2022', lokasi, tipe,
        })
        setAddon(res.data[0] ?? null)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [lokasi, tipe])

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
        <h3 className="dash-section-title">Digital</h3>
      </div>

      <div className="row g-4">
        <div className="col-xl-8">
          <div className="glass-card" style={{ marginBottom: 0 }}>
            <div className="glass-card-header">
              <h3 className="glass-card-title">Digital Addon</h3>
            </div>
            <div className="glass-card-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={toChartData(addon)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                  <XAxis dataKey="bulan" tick={TICK_STYLE} axisLine={false} tickLine={false} />
                  <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                  <Bar dataKey="value" fill="#a78bfa" radius={[6,6,0,0]} name="Addon" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
