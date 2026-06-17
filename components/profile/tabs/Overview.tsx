'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
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
    cursor: '#eff2f5',
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
    cursor: 'rgba(255,255,255,0.12)',
  },
} as const

function toChartData(data: Record<string, any> | null) {
  if (!data) return []
  return MONTHS.map((m) => ({
    bulan: m.charAt(0).toUpperCase() + m.slice(1),
    value: data[m] ?? 0,
  }))
}

function PerfChart({ title, data, color, t }: { title: string; data: any[]; color: string; t: typeof CHART_THEME[Theme] }) {
  return (
    <div className="glass-card">
      <div className="glass-card-header">
        <h3 className="glass-card-title">{title}</h3>
      </div>
      <div className="glass-card-body">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={t.grid} />
            <XAxis dataKey="bulan" tick={t.tick} axisLine={false} tickLine={false} />
            <YAxis tick={t.tick} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={t.tooltip} cursor={{ stroke: t.cursor }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ r: 3, fill: color }}
              activeDot={{ r: 5 }}
              name="Value"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default function Overview({ lokasi, tipe, theme = 'light' }: Props) {
  const [data, setData]     = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)
  const t = CHART_THEME[theme]

  useEffect(() => {
    async function fetchAll() {
      setLoading(true)
      try {
        const body  = { tahun: '2022', lokasi, tipe }
        const types = ['lis','kw1','kw2','kw3','kw4','billing','pranpc','sales','c3mr']
        const results = await Promise.all(
          types.map((t) => axios.post('/api/performance', { ...body, performance: t }))
        )
        const map: Record<string, any> = {}
        types.forEach((tp, i) => { map[tp] = results[i].data[0] ?? null })
        setData(map)
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
    <>
      {/* Section 1 — Kwadran Performance */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h3 className="dash-section-title">Kwadran Performance</h3>
        </div>

        {/* LIS — full width */}
        <div style={{ marginBottom: 20 }}>
          <PerfChart title="Performance LIS" data={toChartData(data.lis)} color="#009ef7" t={t} />
        </div>

        {/* Kw1–Kw4 — 2×2 grid */}
        <div className="row g-4">
          <div className="col-xl-6">
            <PerfChart title="Performance Kw 1" data={toChartData(data.kw1)} color="#1BC5BD" t={t} />
          </div>
          <div className="col-xl-6">
            <PerfChart title="Performance Kw 2" data={toChartData(data.kw2)} color="#8950FC" t={t} />
          </div>
          <div className="col-xl-6">
            <PerfChart title="Performance Kw 3" data={toChartData(data.kw3)} color="#F64E60" t={t} />
          </div>
          <div className="col-xl-6">
            <PerfChart title="Performance Kw 4" data={toChartData(data.kw4)} color="#FFA800" t={t} />
          </div>
        </div>
      </div>

      {/* Section 2 — Operational Performance */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h3 className="dash-section-title">Operational Performance</h3>
        </div>

        <div className="row g-4">
          <div className="col-xl-6">
            <PerfChart title="Performance Billing" data={toChartData(data.billing)} color="#009ef7" t={t} />
          </div>
          <div className="col-xl-6">
            <PerfChart title="Performance PranPc"  data={toChartData(data.pranpc)} color="#1BC5BD" t={t} />
          </div>
          <div className="col-xl-6">
            <PerfChart title="Performance Sales"   data={toChartData(data.sales)}  color="#F64E60" t={t} />
          </div>
          <div className="col-xl-6">
            <PerfChart title="Performance C3mr"    data={toChartData(data.c3mr)}   color="#FFA800" t={t} />
          </div>
        </div>
      </div>
    </>
  )
}
