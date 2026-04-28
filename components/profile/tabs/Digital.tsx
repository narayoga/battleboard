'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Props { lokasi: string; tipe: string }

const MONTHS = ['jan','feb','mar','apr','mei','jun','jul','agu','sep','okt','nov','des']

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
        const res = await axios.post('/api/performance', { performance: 'addon', tahun: '2022', lokasi, tipe })
        setAddon(res.data[0] ?? null)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [lokasi, tipe])

  if (loading) return <div className="text-center py-10"><div className="spinner-border" /></div>

  return (
    <div className="row g-5 g-xl-8">
      <div className="col-xl-8">
        <div className="card card-xl-stretch mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title fw-bolder text-dark">Digital Addon</h3>
          </div>
          <div className="card-body pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={toChartData(addon)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8950FC" name="Addon" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
