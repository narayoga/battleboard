import { useContext, useState, useEffect } from "react"
import { AppsContext } from "../../../pages/profile-page"
import { MapContainer, TileLayer, Map, Marker, Popup } from 'react-leaflet'
import axios from "axios";
import { KTSVG } from "../../../../_metronic/helpers";
import ReactApexChart from "react-apexcharts";
import MapView from './mapView'

import('leaflet.markercluster/dist/leaflet.markercluster.js')
import('leaflet.markercluster/dist/MarkerCluster.css')
import('leaflet.markercluster/dist/MarkerCluster.Default.css')

export const Alpro = () => {
  const { input, token } = useContext(AppsContext)
  const [addon, setAddon] = useState('')
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [history, setHistory] = useState('')
  const [avai, setAvai] = useState('')
  const [used, setUsed] = useState('')
  const getHistory = async () => {
    const body = {
      "lokasi": input.lokasi,
      "tipe": input.tipe,
      "tahun": 2022
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://osmosys.tr6.my.id/public/api/battle/odp/history/`;
    await axios.post(url, body, config)
      .then(res => {
        setHistory([
          res.data[0].is_total,
          res.data[1].is_total,
          res.data[2].is_total,
          res.data[3].is_total,
          res.data[4].is_total,
          res.data[5].is_total,
          res.data[6].is_total,
          res.data[7].is_total,
          res.data[8].is_total,
          res.data[9].is_total,
          res.data[10].is_total,
        ])
        setAvai([
          res.data[0].avai,
          res.data[1].avai,
          res.data[2].avai,
          res.data[3].avai,
          res.data[4].avai,
          res.data[5].avai,
          res.data[6].avai,
          res.data[7].avai,
          res.data[8].avai,
          res.data[9].avai,
          res.data[10].avai,
        ])
        setUsed([
          res.data[0].used,
          res.data[1].used,
          res.data[2].used,
          res.data[3].used,
          res.data[4].used,
          res.data[5].used,
          res.data[6].used,
          res.data[7].used,
          res.data[8].used,
          res.data[9].used,
          res.data[10].used,
        ])
      })

      .catch(err => {
        console.log(err)
      })
  }
  const options = {
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    stroke: {
      width: 4,
      curve: "straight",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des"
      ],
    },
    tooltip: {
    },
  };
  const total = [
    {
      name: "value",
      data: history,
    }
  ];
  const available = [
    {
      name: "value",
      data: avai,
    }
  ];
  const is_used = [
    {
      name: "value",
      data: used,
    }
  ];
  const getOdp = async () => {
    const body = {
      "lokasi": input.lokasi,
      "tipe": input.tipe
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://osmosys.tr6.my.id/public/api/battle/odp/read/`;
    await axios.post(url, body, config)
      .then(res => {
        // console.log(res.data[0].latitude)
        setLat(res.data[100].latitude)
        setLon(res.data[100].longitude)
        setAddon(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getOdp()
    getHistory()
  }, [])
  return (
    <>
      <div className={'card card-body px-5 py-3 mb-3'} style={{ borderRadius: "10px" }}>
        <div className='card-body text-center pt-5' >
          <div className="accordion" id="kt_accordion_1">
            <div className="accordion-item">
              <h2 className="accordion-header" id="kt_accordion_1_header_1">
                <button className="accordion-button fs-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#kt_accordion_1_body_1" aria-expanded="true" aria-controls="kt_accordion_1_body_1">
                  ODP Status
                </button>
              </h2>
              <div id="kt_accordion_1_body_1" className="accordion-collapse collapse show" aria-labelledby="kt_accordion_1_header_1" data-bs-parent="#kt_accordion_1">
                <div className="accordion-body">
                  <div className='col-xl-12'>
                    <div className={`card `}>
                      <div className='card-header border-0 pt-5'>
                        <h3 className='card-title align-items-start flex-column'>
                          <span className='card-label fw-bold fs-3 mb-1'>Total Port</span>
                          {/* <span className='text-muted fw-semibold fs-7'>More than 400 new members</span> */}
                        </h3>
                        <div className='card-toolbar'>
                          <button
                            type='button'
                            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                            data-kt-menu-trigger='click'
                            data-kt-menu-placement='bottom-end'
                            data-kt-menu-flip='top-end'
                          >
                            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
                          </button>
                        </div>
                      </div>
                      <div className='card-body text-center pt-5' style={{ height: "fit-content", padding: "0px !important" }}>
                        <ReactApexChart
                          options={options}
                          series={total}
                          type="line"
                          height={350}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row g-5 g-xxl-8'>
                    <div className='col-xl-6'>
                      <div className={`card `}>
                        <div className='card-header border-0 pt-5'>
                          <h3 className='card-title align-items-start flex-column'>
                            <span className='card-label fw-bold fs-3 mb-1'>Port Available</span>
                            {/* <span className='text-muted fw-semibold fs-7'>More than 400 new members</span> */}
                          </h3>
                          <div className='card-toolbar'>
                            <button
                              type='button'
                              className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                              data-kt-menu-trigger='click'
                              data-kt-menu-placement='bottom-end'
                              data-kt-menu-flip='top-end'
                            >
                              <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
                            </button>
                          </div>
                        </div>
                        <div className='card-body text-center pt-5' style={{ height: "fit-content", padding: "0px !important" }}>
                          <ReactApexChart
                            options={options}
                            series={available}
                            type="line"
                            height={350}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6'>
                      <div className={`card `}>
                        <div className='card-header border-0 pt-5'>
                          <h3 className='card-title align-items-start flex-column'>
                            <span className='card-label fw-bold fs-3 mb-1'>Port Used</span>
                            {/* <span className='text-muted fw-semibold fs-7'>More than 400 new members</span> */}
                          </h3>
                          <div className='card-toolbar'>
                            <button
                              type='button'
                              className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                              data-kt-menu-trigger='click'
                              data-kt-menu-placement='bottom-end'
                              data-kt-menu-flip='top-end'
                            >
                              <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
                            </button>
                          </div>
                        </div>
                        <div className='card-body text-center pt-5' style={{ height: "fit-content", padding: "0px !important" }}>
                          <ReactApexChart
                            options={options}
                            series={is_used}
                            type="line"
                            height={350}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MapView coordinate={addon} />
    </>
  )
}