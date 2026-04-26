import React, { useState, useContext, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import axios from 'axios'
import { Overview } from './tab/overview'
import { Alpro } from './tab/alpro'
import { Digital } from './tab/digital'
import { AppsContext } from '../../pages/profile-page'
import Search from './header/search'
import blank from './blank.png'

export const ProfileMain = () => {
  const { input, token } = useContext(AppsContext)
  const [profile, setProfile] = useState({})
  const [photo, setPhoto] = useState('')
  const [sub, setSub] = useState('')
  const [billing, setBilling] = useState('')
  const [sales, setSales] = useState('')
  const [warning, setWarning] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('overview')
  const getItem = async () => {
    setLoading(true)
    const body = {
      "bulan": "sep",
      "tahun": "2022",
      "lokasi": input.lokasi,
      "tipe": input.tipe
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://osmosys.tr6.my.id/public/api/battle/profile/read/`;
    await axios.post(url, body, config)
      .then(res => {
        const commaSeparateNumber = (val) => {
          // remove sign if negative
          var sign = 1;
          if (val < 0) {
            sign = -1;
            val = -val;
          }

          // trim the number decimal point if it exists
          let num = val.toString().includes('.') ? val.toString().split('.')[0] : val.toString();

          while (/(\d+)(\d{3})/.test(num.toString())) {
            // insert comma to 4th last position to the match number
            num = num.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
          }

          // add number after decimal point
          if (val.toString().includes('.')) {
            num = num + '.' + val.toString().split('.')[1];
          }

          // return result with - sign if negative
          return sign < 0 ? '-' + num : num;
        }
        // console.log(res.data)
        // console.log(res.data[0])
        setLoading(false)
        if (res.data[0] === "<") {
          // console.log("ini bukan data")
          setProfile({
            nama: "unknown",
            jabatan: "unknown"
          })
          setPhoto(blank)
          setSub("NaN")
          setBilling("NaN")
          setSales("NaN")
          setTab(false)
          alert('data belum diinput, silahkan cari pilihan lain')
          setWarning(true)
          return
        }

        if (res.data[0].nama === "") {
          setProfile({
            jabatan: "unknown",
            nama: "unknown",
            level: "unknown"
          })
          setPhoto(blank)
          setSub(commaSeparateNumber(res.data[0].lis))
          setBilling(commaSeparateNumber(res.data[0].billing_amount))
          setSales(commaSeparateNumber(res.data[0].new_sales))
          return
        }

        // console.log(res.data[0])
        setSub(commaSeparateNumber(res.data[0].lis))
        setBilling(commaSeparateNumber(res.data[0].billing_amount))
        setSales(commaSeparateNumber(res.data[0].new_sales))
        setProfile(res.data[0])
        setPhoto(res.data.photo)

      })
      .catch(err => {
        console.log(err)
        setWarning(true)
      })
  }

  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'IDR',
  // });

  useEffect(() => {
    getItem()
  }, [])
  return (
    <>

      <Search />
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div style={{ width: '150px', height: '150px' }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%', borderRadius: '10px' }} src={photo} alt={profile.nama} />
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  {loading ?
                    <div className='alert alert-muted d-flex'>
                      <div className="spinner-border spinner-border-sm" role="status">
                      </div>
                      <div className='alert-text font-weight-bold ms-2 position-relative' style={{ top: "-2px" }}>loading...</div>
                    </div>
                    :
                    <div className='d-flex align-items-center mb-2'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-3'>
                        {profile.nama}
                      </a>
                      {profile.level === 'KECIL' &&
                        <span className="badge badge-danger">{profile.level}</span>
                      }
                      {profile.level === 'BESAR' &&
                        <span className="badge badge-success">{profile.level}</span>
                      }
                      {profile.level === 'SEDANG' &&
                        <span className="badge badge-warning">{profile.level}</span>
                      }
                    </div>
                  }

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    {loading ?
                      <div className='alert alert-muted d-flex'>
                        <div className="spinner-border spinner-border-sm" role="status">
                        </div>
                        <div className='alert-text font-weight-bold ms-2 position-relative' style={{ top: "-2px" }}>loading...</div>
                      </div>
                      :
                      <a
                        href='#'
                        className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                      >
                        <KTSVG
                          path='/media/icons/duotune/communication/com006.svg'
                          className='svg-icon-4 me-1'
                        />
                        {profile.jabatan}
                      </a>
                    }
                  </div>
                </div>
              </div>

              <div className='d-flex flex-wrap flex-stack'>
                {loading ?
                  <div className='alert alert-muted d-flex'>
                    <div className="spinner-border spinner-border-sm" role="status">
                    </div>
                    <div className='alert-text font-weight-bold ms-2 position-relative' style={{ top: "-2px" }}>loading...</div>
                  </div>
                  :
                  <div className='d-flex flex-column flex-grow-1 pe-8'>
                    <div className='d-flex flex-wrap'>
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          {/* <KTSVG
                          path='/media/icons/duotune/arrows/arr066.svg'
                          className='svg-icon-3 svg-icon-success me-2'
                        /> */}
                          <div className='fs-2 fw-bolder'>{sub}</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          <KTSVG
                            path='/media/icons/duotune/general/gen049.svg'
                            className='svg-icon-3 svg-icon-success me-2'
                          />
                          Subscribers
                        </div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          {/* <KTSVG
                          path='/media/icons/duotune/arrows/arr065.svg'
                          className='svg-icon-3 svg-icon-danger me-2'
                        /> */}
                          <div className='fs-2 fw-bolder'>IDR {billing}</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          <KTSVG
                            path='/media/icons/duotune/finance/fin010.svg'
                            className='svg-icon-3 svg-icon-success me-2'
                          />
                          Monthy Revenue
                        </div>
                      </div>

                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          {/* <KTSVG
                          path='/media/icons/duotune/arrows/arr066.svg'
                          className='svg-icon-3 svg-icon-success me-2'
                        /> */}
                          <div className='fs-2 fw-bolder'>{sales}</div>
                        </div>

                        <div className='fw-bold fs-6 text-gray-400'>
                          <KTSVG
                            path='/media/icons/duotune/graphs/gra001.svg'
                            className='svg-icon-3 svg-icon-success me-2'
                          />
                          Sales
                        </div>
                      </div>
                    </div>
                  </div>
                }

                {/* <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                  <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                    <span className='fw-bold fs-6 text-gray-400'>Profile Compleation</span>
                    <span className='fw-bolder fs-6'>50%</span>
                  </div>
                  <div className='h-5px mx-3 w-100 bg-light mb-3'>
                    <div
                      className='bg-success rounded h-5px'
                      role='progressbar'
                      style={{ width: '50%' }}
                    ></div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {tab !== false ?
            <div className='d-flex overflow-auto h-55px'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item cursor-pointer'>
                  <div onClick={() => setTab('overview')} className={tab === "overview" ? 'nav-link tab-active me-6' : 'nav-link tab me-6'}>
                    Overview
                  </div>
                </li>
                <li className='nav-item cursor-pointer'>
                  <div onClick={() => setTab('Digital')} className={tab === "Digital" ? 'nav-link tab-active me-6' : 'nav-link tab me-6'}>
                    Digital
                  </div>
                </li>
                <li className='nav-item cursor-pointer'>
                  <div onClick={() => setTab('alpro')} className={tab === "alpro" ? 'nav-link tab-active me-6' : 'nav-link tab me-6'}>
                    Alpro
                  </div>
                </li>
              </ul>
            </div>
            :
            null
          }
        </div>
      </div>
      {loading &&
        <div className='alert alert-muted d-flex'>
          <div className="spinner-border spinner-border-sm" role="status">
          </div>
          <div className='alert-text font-weight-bold ms-2 position-relative' style={{ top: "-2px" }}>loading...</div>
        </div>
      }
      {!loading &&
        <>
          {tab === 'overview' &&
            <Overview />
          }
          {tab === 'Digital' &&
            <Digital />
          }
          {tab === 'alpro' &&
            <Alpro />
          }
        </>
      }

      {/* <SelectInput /> */}
    </>
  )
}
