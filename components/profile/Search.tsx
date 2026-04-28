'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Location {
  id: number
  label: string
  lokasi: string
  tipe: string
}

interface SearchProps {
  onSelect: (lokasi: string, tipe: string) => void
}

export default function Search({ onSelect }: SearchProps) {
  const [locations, setLocations]     = useState<Location[]>([])
  const [filteredData, setFiltered]   = useState<Location[]>([])
  const [wordEntered, setWordEntered] = useState('')
  const [loading, setLoading]         = useState(false)

  useEffect(() => {
    axios.get('/api/locations').then((res) => setLocations(res.data))
  }, [])

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setWordEntered(val)
    if (!val) { setFiltered([]); return }
    setFiltered(
      locations.filter((loc) => loc.label.toLowerCase().includes(val.toLowerCase()))
    )
  }

  function handleSelect(loc: Location) {
    setWordEntered(loc.label)
    setFiltered([])
    onSelect(loc.lokasi, loc.tipe)
  }

  return (
    <div className="position-relative mb-3" style={{ maxWidth: 400 }}>
      <div className="d-flex align-items-center">
        <input
          type="text"
          className="form-control form-control-solid"
          placeholder="Cari lokasi..."
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>

      {filteredData.length > 0 && (
        <div
          className="position-absolute bg-white border rounded shadow-sm w-100"
          style={{ zIndex: 999, maxHeight: 250, overflowY: 'auto', top: '100%' }}
        >
          {filteredData.map((loc) => (
            <div
              key={loc.id}
              className="px-4 py-2 cursor-pointer border-bottom"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSelect(loc)}
            >
              <span className="fw-bold">{loc.label}</span>{' '}
              <span className="badge badge-light-primary ms-2">{loc.tipe}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
