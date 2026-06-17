'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

type Theme = 'light' | 'dark'

interface Props { lokasi: string; tipe: string; theme?: Theme }

const MONTHS = ['jan','feb','mar','apr','mei','jun','jul','agu','sep','okt','nov','des']

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
  },
} as const

function toChartData(data: Record<string, any> | null) {
  if (!data) return []
  return MONTHS.map((m) => ({ bulan: m.toUpperCase(), value: data[m] ?? 0 }))
}

export default function Digital({ lokasi, tipe, theme = 'light' }: Props) {
  const [addon, setAddon]     = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const t = CHART_THEME[theme]

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
                  <CartesianGrid strokeDasharray="3 3" stroke={t.grid} />
                  <XAxis dataKey="bulan" tick={t.tick} axisLine={false} tickLine={false} />
                  <YAxis tick={t.tick} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={t.tooltip} cursor={{ fill: t.cursor }} />
                  <Bar dataKey="value" fill="#8950FC" radius={[6,6,0,0]} name="Addon" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
