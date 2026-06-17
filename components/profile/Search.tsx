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

/* Locations that actually have seeded data (profile + charts + ODP). */
const REAL_DATA_HINTS: { lokasi: string; tipe: string }[] = [
  { lokasi: 'BRU', tipe: 'STO' },
  { lokasi: 'MKM', tipe: 'STO' },
  { lokasi: 'SKU', tipe: 'STO' },
  { lokasi: 'BAM', tipe: 'STO' },
  { lokasi: 'KJN', tipe: 'STO' },
  { lokasi: 'BTK', tipe: 'STO' },
  { lokasi: 'BTK', tipe: 'HERO' },
  { lokasi: 'KJN', tipe: 'HERO' },
]

export default function Search({ onSelect }: SearchProps) {
  const [locations, setLocations]   = useState<Location[]>([])
  const [filteredData, setFiltered] = useState<Location[]>([])
  const [wordEntered, setWordEntered] = useState('')
  const [focused, setFocused]       = useState(false)

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
    setFocused(false)
    onSelect(loc.lokasi, loc.tipe)
  }

  function handleSelectHint(h: { lokasi: string; tipe: string }) {
    setWordEntered(h.lokasi)
    setFiltered([])
    setFocused(false)
    onSelect(h.lokasi, h.tipe)
  }

  const showHint = focused && wordEntered.trim() === ''
  const showList = wordEntered.trim() !== '' && filteredData.length > 0

  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control form-control-solid"
        placeholder="Cari lokasi..."
        value={wordEntered}
        onChange={handleFilter}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 120)}
      />

      {(showHint || showList) && (
        <div
          className="search-dropdown position-absolute w-100"
          style={{ zIndex: 999, maxHeight: 300, overflowY: 'auto', top: 'calc(100% + 6px)' }}
        >
          {showHint ? (
            <>
              <div className="search-hint-label">
                <i className="bi bi-lightbulb me-2" />
                Ketik atau klik lokasi dengan data tersedia:
              </div>
              <div className="search-hint-chips">
                {REAL_DATA_HINTS.map((h) => (
                  <button
                    key={`${h.lokasi}-${h.tipe}`}
                    type="button"
                    className="search-hint-chip"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelectHint(h)}
                  >
                    {h.lokasi}
                    <span className="search-hint-chip-tag">{h.tipe}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            filteredData.map((loc) => (
              <div
                key={loc.id}
                className="search-dropdown-item px-4 py-2"
                onClick={() => handleSelect(loc)}
              >
                <span style={{ fontWeight: 600 }}>{loc.label}</span>{' '}
                <span className="badge badge-light-primary ms-2">{loc.tipe}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
