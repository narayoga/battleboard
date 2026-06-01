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
  const [locations, setLocations]   = useState<Location[]>([])
  const [filteredData, setFiltered] = useState<Location[]>([])
  const [wordEntered, setWordEntered] = useState('')

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
    <div className="position-relative">
      <input
        type="text"
        className="form-control form-control-solid"
        placeholder="Cari lokasi..."
        value={wordEntered}
        onChange={handleFilter}
      />

      {filteredData.length > 0 && (
        <div
          className="search-dark-dropdown position-absolute w-100"
          style={{ zIndex: 999, maxHeight: 260, overflowY: 'auto', top: 'calc(100% + 6px)' }}
        >
          {filteredData.map((loc) => (
            <div
              key={loc.id}
              className="search-dark-item px-4 py-2"
              onClick={() => handleSelect(loc)}
            >
              <span style={{ fontWeight: 600 }}>{loc.label}</span>{' '}
              <span className="badge badge-light-primary ms-2">{loc.tipe}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
