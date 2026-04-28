'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Props { lokasi: string; tipe: string }

const MONTHS = ['jan','feb','mar','apr','mei','jun','jul','agu','sep','okt','nov','des']

function toChartData(data: Record<string, any> | null) {
  if (!data) return []
  return MONTHS.map((m) => ({ bulan: m.toUpperCase(), value: data[m] ?? 0 }))
}

export default function Overview({ lokasi, tipe }: Props) {
  const [lis, setLis]         = useState<any>(null)
  const [billing, setBilling] = useState<any>(null)
  const [sales, setSales]     = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchAll() {
      setLoading(true)
      try {
        const body = { tahun: '2022', lokasi, tipe }
        const [resLis, resBilling, resSales] = await Promise.all([
          axios.post('/api/performance', { ...body, performance: 'lis' }),
          axios.post('/api/performance', { ...body, performance: 'billing' }),
          axios.post('/api/performance', { ...body, performance: 'sales' }),
        ])
        setLis(resLis.data[0] ?? null)
        setBilling(resBilling.data[0] ?? null)
        setSales(resSales.data[0] ?? null)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [lokasi, tipe])

  if (loading) return <div className="text-center py-10"><div className="spinner-border" /></div>

  return (
    <div className="row g-5 g-xl-8">
      {/* LIS Chart */}
      <div className="col-xl-6">
        <div className="card card-xl-stretch mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title fw-bolder text-dark">Subscribers (LIS)</h3>
          </div>
          <div className="card-body pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={toChartData(lis)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3699FF" name="LIS" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Billing Chart */}
      <div className="col-xl-6">
        <div className="card card-xl-stretch mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title fw-bolder text-dark">Monthly Revenue</h3>
          </div>
          <div className="card-body pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={toChartData(billing)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#1BC5BD" name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="col-xl-6">
        <div className="card card-xl-stretch mb-5 mb-xl-8">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title fw-bolder text-dark">New Sales</h3>
          </div>
          <div className="card-body pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={toChartData(sales)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#F64E60" name="Sales" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
