import { useContext, useEffect, useState } from "react"
import { Legend, Bar, BarChart, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import ReactApexChart from "react-apexcharts";
import { KTSVG } from "../../../../_metronic/helpers"
import { AppsContext } from "../../../pages/profile-page"
import axios from "axios";
import { ListsWidget5, ChartsWidget1 } from "../../../../_metronic/partials/widgets"

export const Overview = () => {
  const token = localStorage.getItem('token')
  const { input } = useContext(AppsContext)
  const [lis, SetLis] = useState('')
  const [billing, setBilling] = useState('')
  const [pranpc, setPranpc] = useState('')
  const [sales, setSales] = useState('')
  const [kw1, setKw1] = useState('')
  const [kw2, setKw2] = useState('')
  const [kw3, setKw3] = useState('')
  const [kw4, setKw4] = useState('')
  const [c3mr, setC3mr] = useState('')
  const getLis = async () => {
    const body = {
      "performance": "lis",
      "tahun": "2022",
      "lokasi": input.lokasi,
      "tipe": input.tipe
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://osmosys.tr6.my.id/public/api/battle/performance/bulanan/`;
    await axios.post(url, body, config)
      .then(res => {
        // console.log(res.data[0])
        SetLis(res.data[0])
      })

      .catch(err => {
        console.log(err)
      })
  }
  const getBilling = async () => {
    const body = {
      "performance": "billing",
      "tahun": "2022",
      "lokasi": input.lokasi,
      "tipe": input.tipe
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://osmosys.tr6.my.id/public/api/battle/performance/bulanan/`;
    await axios.post(url, body, config)
      .then(res => {
        // console.log(res.data[0])
        setBilling(res.data[0])
      })

      .catch(err => {
        console.log(err)
      })
  }
  const getPranpc = async () => {
    const body = {
      "performance": "pranpc",
      "tahun": "2022",
      "lokasi": input.lokasi,
      "tipe": input.tipe
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://osmosys.tr6.my.id/public/api/battle/performance/bulanan/`;
    await axios.post(url, body, config)
      .then(res => {
        // console.log(res.data[0])
        setPranpc(res.data[0])
      })

      .catch(err => {
        console.log(err)
      })
  }
  const getSales = async () => {
    const body = {
      "performance": "sales",
      "tahun": "2022",
      "lokasi": input.lokasi,
      "tipe": input.tipe
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://osmosys.tr6.my.id/public/api/battle/performance/bulanan/`;
    await axios.post(url, body, config)
      .then(res => {
        // console.log(res.data[0])
        setSales(res.data[0])
      })

      .catch(err => {
        console.log(err)
      })
  }
  const getKw1 = async () => {
    const body = {
      "performance": "kw1",
      "tahun": "2022",
      "lokasi": input.lokasi,
      "tipe": input.tipe
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://osmosys.tr6.my.id/public/api/battle/performance/bulanan/`;
    await axios.post(url, body, config)
      .then(res => {
        // console.log(res.data[0])
        setKw1(res.data[0])
      })

      .catch(err => {
        console.log(err)
      })
  }
  const getKw2 = async () => {
    const body = {
      "performance": "kw2",
      "tahun": "2022",
      "lokasi": input.lokasi,
      "tipe": input.tipe
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://osmosys.tr6.my.id/public/api/battle/performance/bulanan/`;
    await axios.post(url, body, config)
      .then(res => {
        // console.log(res.data[0])
        setKw2(res.data[0])
      })

      .catch(err => {
        console.log(err)
      })
  }
  const getKw3 = async () => {
    const body = {
      "performance": "kw3",
      "tahun": "2022",
      "lokasi": input.lokasi,
      "tipe": input.tipe
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://osmosys.tr6.my.id/public/api/battle/performance/bulanan/`;
    await axios.post(url, body, config)
      .then(res => {
        // console.log(res.data[0])
        setKw3(res.data[0])
      })

      .catch(err => {
        console.log(err)
      })
  }
  const getKw4 = async () => {
    const body = {
      "performance": "kw4",
      "tahun": "2022",
      "lokasi": input.lokasi,
      "tipe": input.tipe
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://osmosys.tr6.my.id/public/api/battle/performance/bulanan/`;
    await axios.post(url, body, config)
      .then(res => {
        // console.log(res.data[0])
        setKw4(res.data[0])
      })

      .catch(err => {
        console.log(err)
      })
  }
  const getC3mr = async () => {
    const body = {
      "performance": "c3mr",
      "tahun": "2022",
      "lokasi": input.lokasi,
      "tipe": input.tipe
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://osmosys.tr6.my.id/public/api/battle/performance/bulanan/`;
    await axios.post(url, body, config)
      .then(res => {
        // console.log(res.data[0])
        setC3mr(res.data[0])
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

  const seriesLis = [
    {
      name: "value",
      data: [
        lis.jan,
        lis.feb,
        lis.mar,
        lis.apr,
        lis.mei,
        lis.jun,
        lis.jul,
        lis.agu,
        lis.sep,
        lis.okt,
        lis.nov,
        lis.des
      ],
    }
  ];
  const seriesBilling = [
    {
      name: "value",
      data: [
        billing.jan,
        billing.feb,
        billing.mar,
        billing.apr,
        billing.mei,
        billing.jun,
        billing.jul,
        billing.agu,
        billing.sep,
        billing.okt,
        billing.nov,
        billing.des
      ],
    }
  ];
  const seriesPranpc = [
    {
      name: "value",
      data: [
        pranpc.jan,
        pranpc.feb,
        pranpc.mar,
        pranpc.apr,
        pranpc.mei,
        pranpc.jun,
        pranpc.jul,
        pranpc.agu,
        pranpc.sep,
        pranpc.okt,
        pranpc.nov,
        pranpc.des
      ],
    }
  ];
  const seriesSales = [
    {
      name: "value",
      data: [
        sales.jan,
        sales.feb,
        sales.mar,
        sales.apr,
        sales.mei,
        sales.jun,
        sales.jul,
        sales.agu,
        sales.sep,
        sales.okt,
        sales.nov,
        sales.des
      ],
    }
  ];
  const seriesKw = [
    {
      name: "value",
      data: [
        kw1.jan,
        kw1.feb,
        kw1.mar,
        kw1.apr,
        kw1.mei,
        kw1.jun,
        kw1.jul,
        kw1.agu,
        kw1.sep,
        kw1.okt,
        kw1.nov,
        kw1.des
      ],
    }
  ];
  const seriesKw2 = [
    {
      name: "value",
      data: [
        kw2.jan,
        kw2.feb,
        kw2.mar,
        kw2.apr,
        kw2.mei,
        kw2.jun,
        kw2.jul,
        kw2.agu,
        kw2.sep,
        kw2.okt,
        kw2.nov,
        kw2.des
      ],
    }
  ];
  const seriesKw3 = [
    {
      name: "value",
      data: [
        kw3.jan,
        kw3.feb,
        kw3.mar,
        kw3.apr,
        kw3.mei,
        kw3.jun,
        kw3.jul,
        kw3.agu,
        kw3.sep,
        kw3.okt,
        kw3.nov,
        kw3.des
      ],
    }
  ];
  const seriesKw4 = [
    {
      name: "value",
      data: [
        kw4.jan,
        kw4.feb,
        kw4.mar,
        kw4.apr,
        kw4.mei,
        kw4.jun,
        kw4.jul,
        kw4.agu,
        kw4.sep,
        kw4.okt,
        kw4.nov,
        kw4.des
      ],
    }
  ];
  const seriesC3mr = [
    {
      name: "value",
      data: [
        c3mr.jan,
        c3mr.feb,
        c3mr.mar,
        c3mr.apr,
        c3mr.mei,
        c3mr.jun,
        c3mr.jul,
        c3mr.agu,
        c3mr.sep,
        c3mr.okt,
        c3mr.nov,
        c3mr.des
      ],
    }
  ];


  useEffect(() => {
    getLis()
    getBilling()
    getPranpc()
    getSales()
    getKw1()
    getKw2()
    getKw3()
    getKw4()
    getC3mr()
  }, [])
  return (
    <>
      <div className={'card card-body px-5 py-3 mb-xl-10'} style={{ borderRadius: "10px" }}>
        <div className='card-header border-0 px-4'>
          <h3 className='card-title align-items-start flex-column mx-auto'>
            <span className='card-label fw-bold fs-3 mb-1'>Kwadran Peformance</span>
            {/* <span className='text-muted fw-semibold fs-7'>More than 400 people live here</span> */}
          </h3>
        </div>
        <div className='card-body text-center pt-5' >
          <div className='col-xl-12'>
            <div className={`card `}>
              <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                  <span className='card-label fw-bold fs-3 mb-1'>Performance Lis</span>
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
                  series={seriesLis}
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
                    <span className='card-label fw-bold fs-3 mb-1'>Performance Kw 1</span>
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
                    series={seriesKw}
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
                    <span className='card-label fw-bold fs-3 mb-1'>Performance Kw 2</span>
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
                    series={seriesKw2}
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
                    <span className='card-label fw-bold fs-3 mb-1'>Performance Kw 3</span>
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
                    series={seriesKw3}
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
                    <span className='card-label fw-bold fs-3 mb-1'>Performance Kw 4</span>
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
                    series={seriesKw4}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'card card-body px-5 py-3'} style={{ borderRadius: "10px" }}>
        <div className='card-header border-0 px-4'>
          <h3 className='card-title align-items-start flex-column mx-auto'>
            <span className='card-label fw-bold fs-3 mb-1'>Operational Peformance</span>
            {/* <span className='text-muted fw-semibold fs-7'>More than 400 people live here</span> */}
          </h3>
        </div>
        <div className='card-body text-center pt-5' >
          <div className='row g-5 g-xxl-8'>
            <div className='col-xl-6'>
              <div className={`card `}>
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Performance Billing</span>
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
                    series={seriesBilling}
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
                    <span className='card-label fw-bold fs-3 mb-1'>Performance PranPc</span>
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
                    series={seriesPranpc}
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
                    <span className='card-label fw-bold fs-3 mb-1'>Performance Sales</span>
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
                    series={seriesSales}
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
                    <span className='card-label fw-bold fs-3 mb-1'>Performance C3mr</span>
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
                    series={seriesC3mr}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

			// <div className='col-xl-6'>
			// 	<div className={`card `}>
			// 		<div className='card-header border-0 pt-5'>
			// 			<h3 className='card-title align-items-start flex-column'>
			// 				<span className='card-label fw-bold fs-3 mb-1'>Performance Lis</span>
			// 				<span className='text-muted fw-semibold fs-7'>More than 400 new members</span>
			// 			</h3>
			// 			<div className='card-toolbar'>
			// 				{/* begin::Menu */}
			// 				<button
			// 					type='button'
			// 					className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
			// 					data-kt-menu-trigger='click'
			// 					data-kt-menu-placement='bottom-end'
			// 					data-kt-menu-flip='top-end'
			// 				>
			// 					<KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
			// 				</button>
			// 			</div>
			// 		</div>
			// 		<div className='card-body text-center pt-5' style={{ height: "350px",padding:"0px !important" }}>
			// 			<LineChart width={600} height={300} data={dataLis} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
			// 				<Line type="monotone" dataKey="amount" stroke="#8884d8" />
			// 				{/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
			// 				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			// 				<XAxis dataKey="name" />
			// 				<YAxis type="number" domain={['dataMin', 'dataMax']}/>
			// 				<Tooltip />
			// 			</LineChart>
			// 		</div>
			// 	</div>
			// </div>
			// <div className='col-xl-6'>
			// 	<div className={`card `}>
			// 		<div className='card-header border-0 pt-5'>
			// 			<h3 className='card-title align-items-start flex-column'>
			// 				<span className='card-label fw-bold fs-3 mb-1'>Performance billing</span>
			// 				<span className='text-muted fw-semibold fs-7'>More than 400 new members</span>
			// 			</h3>
			// 			<div className='card-toolbar'>
			// 				{/* begin::Menu */}
			// 				<button
			// 					type='button'
			// 					className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
			// 					data-kt-menu-trigger='click'
			// 					data-kt-menu-placement='bottom-end'
			// 					data-kt-menu-flip='top-end'
			// 				>
			// 					<KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
			// 				</button>
			// 			</div>
			// 		</div>
			// 		<div className='card-body text-center pt-5' style={{ height: "350px",padding:"0px !important" }}>
			// 			<LineChart width={600} height={300} data={dataBilling} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
			// 				<Line type="monotone" dataKey="amount" stroke="#8884d8" />
			// 				{/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
			// 				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			// 				<XAxis dataKey="name" />
			// 				<YAxis type="number" domain={['dataMin', 'dataMax']} />
			// 				<Tooltip />
			// 			</LineChart>
			// 		</div>
			// 	</div>
			// </div>
			// <div className='col-xl-6'>
			// 	<div className={`card `}>
			// 		<div className='card-header border-0 pt-5'>
			// 			<h3 className='card-title align-items-start flex-column'>
			// 				<span className='card-label fw-bold fs-3 mb-1'>Performance pranpc</span>
			// 				<span className='text-muted fw-semibold fs-7'>More than 400 new members</span>
			// 			</h3>
			// 			<div className='card-toolbar'>
			// 				{/* begin::Menu */}
			// 				<button
			// 					type='button'
			// 					className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
			// 					data-kt-menu-trigger='click'
			// 					data-kt-menu-placement='bottom-end'
			// 					data-kt-menu-flip='top-end'
			// 				>
			// 					<KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
			// 				</button>
			// 			</div>
			// 		</div>
			// 		<div className='card-body text-center pt-5' style={{ height: "350px",padding:"0px !important" }}>
			// 			<LineChart width={600} height={300} data={dataPranpc} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
			// 				<Line type="monotone" dataKey="amount" stroke="#8884d8" />
			// 				{/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
			// 				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			// 				<XAxis dataKey="name" />
			// 				<YAxis type="number" domain={['dataMin', 'dataMax']} />
			// 				<Tooltip />
			// 			</LineChart>
			// 		</div>
			// 	</div>
			// </div>
			// <div className='col-xl-6'>
			// 	<div className={`card `}>
			// 		<div className='card-header border-0 pt-5'>
			// 			<h3 className='card-title align-items-start flex-column'>
			// 				<span className='card-label fw-bold fs-3 mb-1'>Performance sales</span>
			// 				<span className='text-muted fw-semibold fs-7'>More than 400 new members</span>
			// 			</h3>
			// 			<div className='card-toolbar'>
			// 				{/* begin::Menu */}
			// 				<button
			// 					type='button'
			// 					className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
			// 					data-kt-menu-trigger='click'
			// 					data-kt-menu-placement='bottom-end'
			// 					data-kt-menu-flip='top-end'
			// 				>
			// 					<KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
			// 				</button>
			// 			</div>
			// 		</div>
			// 		<div className='card-body text-center pt-5' style={{ height: "350px",padding:"0px !important" }}>
			// 			<LineChart width={600} height={300} data={dataSales} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
			// 				<Line type="monotone" dataKey="amount" stroke="#8884d8" />
			// 				{/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
			// 				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			// 				<XAxis dataKey="name" />
			// 				<YAxis type="number" domain={['dataMin', 'dataMax']} />
			// 				<Tooltip />
			// 			</LineChart>
			// 		</div>
			// 	</div>
			// </div>
			// <div className='col-xl-6'>
			// 	<div className={`card `}>
			// 		<div className='card-header border-0 pt-5'>
			// 			<h3 className='card-title align-items-start flex-column'>
			// 				<span className='card-label fw-bold fs-3 mb-1'>Performance kw1</span>
			// 				<span className='text-muted fw-semibold fs-7'>More than 400 new members</span>
			// 			</h3>
			// 			<div className='card-toolbar'>
			// 				{/* begin::Menu */}
			// 				<button
			// 					type='button'
			// 					className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
			// 					data-kt-menu-trigger='click'
			// 					data-kt-menu-placement='bottom-end'
			// 					data-kt-menu-flip='top-end'
			// 				>
			// 					<KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
			// 				</button>
			// 			</div>
			// 		</div>
			// 		<div className='card-body text-center pt-5' style={{ height: "350px",padding:"0px !important" }}>
			// 			<LineChart width={600} height={300} data={dataKw1} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
			// 				<Line type="monotone" dataKey="amount" stroke="#8884d8" />
			// 				{/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
			// 				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			// 				<XAxis dataKey="name" />
			// 				<YAxis type="number" domain={['dataMin', 'dataMax']} />
			// 				<Tooltip />
			// 			</LineChart>
			// 		</div>
			// 	</div>
			// </div>
			// <div className='col-xl-6'>
			// 	<div className={`card `}>
			// 		<div className='card-header border-0 pt-5'>
			// 			<h3 className='card-title align-items-start flex-column'>
			// 				<span className='card-label fw-bold fs-3 mb-1'>Performance kw2</span>
			// 				<span className='text-muted fw-semibold fs-7'>More than 400 new members</span>
			// 			</h3>
			// 			<div className='card-toolbar'>
			// 				{/* begin::Menu */}
			// 				<button
			// 					type='button'
			// 					className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
			// 					data-kt-menu-trigger='click'
			// 					data-kt-menu-placement='bottom-end'
			// 					data-kt-menu-flip='top-end'
			// 				>
			// 					<KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
			// 				</button>
			// 			</div>
			// 		</div>
			// 		<div className='card-body text-center pt-5' style={{ height: "350px",padding:"0px !important" }}>
			// 			<LineChart width={600} height={300} data={dataKw2} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
			// 				<Line type="monotone" dataKey="amount" stroke="#8884d8" />
			// 				{/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
			// 				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			// 				<XAxis dataKey="name" />
			// 				<YAxis type="number" domain={['dataMin', 'dataMax']} />
			// 				<Tooltip />
			// 			</LineChart>
			// 		</div>
			// 	</div>
			// </div>
			// <div className='col-xl-6'>
			// 	<div className={`card `}>
			// 		<div className='card-header border-0 pt-5'>
			// 			<h3 className='card-title align-items-start flex-column'>
			// 				<span className='card-label fw-bold fs-3 mb-1'>Performance kw3</span>
			// 				<span className='text-muted fw-semibold fs-7'>More than 400 new members</span>
			// 			</h3>
			// 			<div className='card-toolbar'>
			// 				{/* begin::Menu */}
			// 				<button
			// 					type='button'
			// 					className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
			// 					data-kt-menu-trigger='click'
			// 					data-kt-menu-placement='bottom-end'
			// 					data-kt-menu-flip='top-end'
			// 				>
			// 					<KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
			// 				</button>
			// 			</div>
			// 		</div>
			// 		<div className='card-body text-center pt-5' style={{ height: "350px",padding:"0px !important" }}>
			// 			<LineChart width={600} height={300} data={dataKw3} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
			// 				<Line type="monotone" dataKey="amount" stroke="#8884d8" />
			// 				{/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
			// 				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			// 				<XAxis dataKey="name" />
			// 				<YAxis type="number" domain={['dataMin', 'dataMax']} />
			// 				<Tooltip />
			// 			</LineChart>
			// 		</div>
			// 	</div>
			// </div>
			// <div className='col-xl-6'>
			// 	<div className={`card `}>
			// 		<div className='card-header border-0 pt-5'>
			// 			<h3 className='card-title align-items-start flex-column'>
			// 				<span className='card-label fw-bold fs-3 mb-1'>Performance kw4</span>
			// 				<span className='text-muted fw-semibold fs-7'>More than 400 new members</span>
			// 			</h3>
			// 			<div className='card-toolbar'>
			// 				{/* begin::Menu */}
			// 				<button
			// 					type='button'
			// 					className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
			// 					data-kt-menu-trigger='click'
			// 					data-kt-menu-placement='bottom-end'
			// 					data-kt-menu-flip='top-end'
			// 				>
			// 					<KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
			// 				</button>
			// 			</div>
			// 		</div>
			// 		<div className='card-body text-center pt-5' style={{ height: "350px",padding:"0px !important" }}>
			// 			<LineChart width={600} height={300} data={dataKw4} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
			// 				<Line type="monotone" dataKey="amount" stroke="#8884d8" />
			// 				{/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
			// 				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			// 				<XAxis dataKey="name" />
			// 				<YAxis type="number" domain={['dataMin', 'dataMax']} />
			// 				<Tooltip />
			// 			</LineChart>
			// 		</div>
			// 	</div>
			// </div>
			// <div className='col-xl-6'>
			// 	<div className={`card `}>
			// 		<div className='card-header border-0 pt-5'>
			// 			<h3 className='card-title align-items-start flex-column'>
			// 				<span className='card-label fw-bold fs-3 mb-1'>Performance c3mr</span>
			// 				<span className='text-muted fw-semibold fs-7'>More than 400 new members</span>
			// 			</h3>
			// 			<div className='card-toolbar'>
			// 				{/* begin::Menu */}
			// 				<button
			// 					type='button'
			// 					className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
			// 					data-kt-menu-trigger='click'
			// 					data-kt-menu-placement='bottom-end'
			// 					data-kt-menu-flip='top-end'
			// 				>
			// 					<KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
			// 				</button>
			// 			</div>
			// 		</div>
			// 		<div className='card-body text-center pt-5' style={{ height: "350px",padding:"0px !important" }}>
			// 			<LineChart width={600} height={300} data={dataC3mr} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
			// 				<Line type="monotone" dataKey="amount" stroke="#8884d8" />
			// 				{/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
			// 				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			// 				<XAxis dataKey="name" />
			// 				<YAxis type="number" domain={['dataMin', 'dataMax']} />
			// 				<Tooltip />
			// 			</LineChart>
			// 		</div>
			// 	</div>
			// </div>

// const dataLis = [
// 	{
// 		name: "jan",
// 		amount: lis.jan,
// 	},
// 	{
// 		name: "feb",
// 		amount: lis.feb,
// 	},
// 	{
// 		name: "mar",
// 		amount: lis.mar,
// 	},
// 	{
// 		name: "mei",
// 		amount: lis.jan,
// 	},
// 	{
// 		name: "jun",
// 		amount: lis.jun,
// 	},
// 	{
// 		name: "jul",
// 		amount: lis.jul,
// 	},
// 	{
// 		name: "agu",
// 		amount: lis.agu,
// 	},
// 	{
// 		name: "sep",
// 		amount: lis.sep,
// 	},
// 	{
// 		name: "okt",
// 		amount: lis.okt,
// 	},
// 	{
// 		name: "nov",
// 		amount: lis.nov,
// 	},
// 	{
// 		name: "des",
// 		amount: lis.des,
// 	}
// ];
// const dataPranpc = [
// 	{
// 		name: "jan",
// 		amount: pranpc.jan,
// 	},
// 	{
// 		name: "feb",
// 		amount: pranpc.feb,
// 	},
// 	{
// 		name: "mar",
// 		amount: pranpc.mar,
// 	},
// 	{
// 		name: "mei",
// 		amount: pranpc.jan,
// 	},
// 	{
// 		name: "jun",
// 		amount: pranpc.jun,
// 	},
// 	{
// 		name: "jul",
// 		amount: pranpc.jul,
// 	},
// 	{
// 		name: "agu",
// 		amount: pranpc.agu,
// 	},
// 	{
// 		name: "sep",
// 		amount: pranpc.sep,
// 	},
// 	{
// 		name: "okt",
// 		amount: pranpc.okt,
// 	},
// 	{
// 		name: "nov",
// 		amount: pranpc.nov,
// 	},
// 	{
// 		name: "des",
// 		amount: pranpc.des,
// 	}
// ];
// const dataSales = [
// 	{
// 		name: "jan",
// 		amount: sales.jan,
// 	},
// 	{
// 		name: "feb",
// 		amount: sales.feb,
// 	},
// 	{
// 		name: "mar",
// 		amount: sales.mar,
// 	},
// 	{
// 		name: "mei",
// 		amount: sales.jan,
// 	},
// 	{
// 		name: "jun",
// 		amount: sales.jun,
// 	},
// 	{
// 		name: "jul",
// 		amount: sales.jul,
// 	},
// 	{
// 		name: "agu",
// 		amount: sales.agu,
// 	},
// 	{
// 		name: "sep",
// 		amount: sales.sep,
// 	},
// 	{
// 		name: "okt",
// 		amount: sales.okt,
// 	},
// 	{
// 		name: "nov",
// 		amount: sales.nov,
// 	},
// 	{
// 		name: "des",
// 		amount: sales.des,
// 	}
// ];
// const dataKw1 = [
// 	{
// 		name: "jan",
// 		amount: kw1.jan,
// 	},
// 	{
// 		name: "feb",
// 		amount: kw1.feb,
// 	},
// 	{
// 		name: "mar",
// 		amount: kw1.mar,
// 	},
// 	{
// 		name: "mei",
// 		amount: kw1.jan,
// 	},
// 	{
// 		name: "jun",
// 		amount: kw1.jun,
// 	},
// 	{
// 		name: "jul",
// 		amount: kw1.jul,
// 	},
// 	{
// 		name: "agu",
// 		amount: kw1.agu,
// 	},
// 	{
// 		name: "sep",
// 		amount: kw1.sep,
// 	},
// 	{
// 		name: "okt",
// 		amount: kw1.okt,
// 	},
// 	{
// 		name: "nov",
// 		amount: kw1.nov,
// 	},
// 	{
// 		name: "des",
// 		amount: kw1.des,
// 	}
// ];
// const dataKw2 = [
// 	{
// 		name: "jan",
// 		amount: kw2.jan,
// 	},
// 	{
// 		name: "feb",
// 		amount: kw2.feb,
// 	},
// 	{
// 		name: "mar",
// 		amount: kw2.mar,
// 	},
// 	{
// 		name: "mei",
// 		amount: kw2.jan,
// 	},
// 	{
// 		name: "jun",
// 		amount: kw2.jun,
// 	},
// 	{
// 		name: "jul",
// 		amount: kw2.jul,
// 	},
// 	{
// 		name: "agu",
// 		amount: kw2.agu,
// 	},
// 	{
// 		name: "sep",
// 		amount: kw2.sep,
// 	},
// 	{
// 		name: "okt",
// 		amount: kw2.okt,
// 	},
// 	{
// 		name: "nov",
// 		amount: kw2.nov,
// 	},
// 	{
// 		name: "des",
// 		amount: kw2.des,
// 	}
// ];
// const dataKw3 = [
// 	{
// 		name: "jan",
// 		amount: kw3.jan,
// 	},
// 	{
// 		name: "feb",
// 		amount: kw3.feb,
// 	},
// 	{
// 		name: "mar",
// 		amount: kw3.mar,
// 	},
// 	{
// 		name: "mei",
// 		amount: kw3.jan,
// 	},
// 	{
// 		name: "jun",
// 		amount: kw3.jun,
// 	},
// 	{
// 		name: "jul",
// 		amount: kw3.jul,
// 	},
// 	{
// 		name: "agu",
// 		amount: kw3.agu,
// 	},
// 	{
// 		name: "sep",
// 		amount: kw3.sep,
// 	},
// 	{
// 		name: "okt",
// 		amount: kw3.okt,
// 	},
// 	{
// 		name: "nov",
// 		amount: kw3.nov,
// 	},
// 	{
// 		name: "des",
// 		amount: kw3.des,
// 	}
// ];
// const dataKw4 = [
// 	{
// 		name: "jan",
// 		amount: kw4.jan,
// 	},
// 	{
// 		name: "feb",
// 		amount: kw4.feb,
// 	},
// 	{
// 		name: "mar",
// 		amount: kw4.mar,
// 	},
// 	{
// 		name: "mei",
// 		amount: kw4.jan,
// 	},
// 	{
// 		name: "jun",
// 		amount: kw4.jun,
// 	},
// 	{
// 		name: "jul",
// 		amount: kw4.jul,
// 	},
// 	{
// 		name: "agu",
// 		amount: kw4.agu,
// 	},
// 	{
// 		name: "sep",
// 		amount: kw4.sep,
// 	},
// 	{
// 		name: "okt",
// 		amount: kw4.okt,
// 	},
// 	{
// 		name: "nov",
// 		amount: kw4.nov,
// 	},
// 	{
// 		name: "des",
// 		amount: kw4.des,
// 	}
// ];
// const dataC3mr = [
// 	{
// 		name: "jan",
// 		amount: c3mr.jan,
// 	},
// 	{
// 		name: "feb",
// 		amount: c3mr.feb,
// 	},
// 	{
// 		name: "mar",
// 		amount: c3mr.mar,
// 	},
// 	{
// 		name: "mei",
// 		amount: c3mr.jan,
// 	},
// 	{
// 		name: "jun",
// 		amount: c3mr.jun,
// 	},
// 	{
// 		name: "jul",
// 		amount: c3mr.jul,
// 	},
// 	{
// 		name: "agu",
// 		amount: c3mr.agu,
// 	},
// 	{
// 		name: "sep",
// 		amount: c3mr.sep,
// 	},
// 	{
// 		name: "okt",
// 		amount: c3mr.okt,
// 	},
// 	{
// 		name: "nov",
// 		amount: c3mr.nov,
// 	},
// 	{
// 		name: "des",
// 		amount: c3mr.des,
// 	}
// ];
// const dataBilling = [
// 	{
// 		name: "jan",
// 		amount: billing.jan,
// 	},
// 	{
// 		name: "feb",
// 		amount: billing.feb,
// 	},
// 	{
// 		name: "mar",
// 		amount: billing.mar,
// 	},
// 	{
// 		name: "mei",
// 		amount: billing.jan,
// 	},
// 	{
// 		name: "jun",
// 		amount: billing.jun,
// 	},
// 	{
// 		name: "jul",
// 		amount: billing.jul,
// 	},
// 	{
// 		name: "agu",
// 		amount: billing.agu,
// 	},
// 	{
// 		name: "sep",
// 		amount: billing.sep,
// 	},
// 	{
// 		name: "okt",
// 		amount: billing.okt,
// 	},
// 	{
// 		name: "nov",
// 		amount: billing.nov,
// 	},
// 	{
// 		name: "des",
// 		amount: billing.des,
// 	}
// ];