'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
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
  return MONTHS.map((m) => ({
    bulan: m.charAt(0).toUpperCase() + m.slice(1),
    value: data[m] ?? 0,
  }))
}

function PerfChart({ title, data, color }: { title: string; data: any[]; color: string }) {
  return (
    <div className="glass-card">
      <div className="glass-card-header">
        <h3 className="glass-card-title">{title}</h3>
      </div>
      <div className="glass-card-body">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
            <XAxis dataKey="bulan" tick={TICK_STYLE} axisLine={false} tickLine={false} />
            <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
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

export default function Overview({ lokasi, tipe }: Props) {
  const [data, setData]     = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)

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
        types.forEach((t, i) => { map[t] = results[i].data[0] ?? null })
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
          <PerfChart title="Performance LIS" data={toChartData(data.lis)} color="#38bdf8" />
        </div>

        {/* Kw1–Kw4 — 2×2 grid */}
        <div className="row g-4">
          <div className="col-xl-6">
            <PerfChart title="Performance Kw 1" data={toChartData(data.kw1)} color="#34d399" />
          </div>
          <div className="col-xl-6">
            <PerfChart title="Performance Kw 2" data={toChartData(data.kw2)} color="#a78bfa" />
          </div>
          <div className="col-xl-6">
            <PerfChart title="Performance Kw 3" data={toChartData(data.kw3)} color="#f87171" />
          </div>
          <div className="col-xl-6">
            <PerfChart title="Performance Kw 4" data={toChartData(data.kw4)} color="#fbbf24" />
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
            <PerfChart title="Performance Billing" data={toChartData(data.billing)} color="#38bdf8" />
          </div>
          <div className="col-xl-6">
            <PerfChart title="Performance PranPc"  data={toChartData(data.pranpc)} color="#34d399" />
          </div>
          <div className="col-xl-6">
            <PerfChart title="Performance Sales"   data={toChartData(data.sales)}  color="#f87171" />
          </div>
          <div className="col-xl-6">
            <PerfChart title="Performance C3mr"    data={toChartData(data.c3mr)}   color="#fbbf24" />
          </div>
        </div>
      </div>
    </>
  )
}
