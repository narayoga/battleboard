import { useContext, useEffect, useState } from "react"
import { Legend, Bar, BarChart, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import ReactApexChart from "react-apexcharts";
import { KTSVG } from "../../../../_metronic/helpers"
import axios from "axios";
import { AppsContext } from "../../../pages/profile-page"
import { ListsWidget5, ChartsWidget1 } from "../../../../_metronic/partials/widgets"

export const Digital = () => {
  const { input, token } = useContext(AppsContext)
  const [addon, setAddon] = useState('')
  const getAddon = async () => {
    const body = {
      "performance": "addon",
      "tahun": "2022",
      "lokasi": input.lokasi,
      "tipe": input.tipe
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const url = `https://osmosys.tr6.my.id/public/api/battle/performance/bulanan/`;
    await axios.post(url, body, config)
      .then(res => {
        console.log(res.data)
        setAddon(res.data)
      })

      .catch(err => {
        console.log(err)
      })
  }
  const newArray = Array.from(addon).map((item) => {
    return (
      {
        addon: item.addon,
        data: [
          {
            name: "jan",
            amount: item.jan,
          },
          {
            name: "feb",
            amount: item.feb,
          },
          {
            name: "mar",
            amount: item.mar,
          },
          {
            name: "mei",
            amount: item.jan,
          },
          {
            name: "jun",
            amount: item.jun,
          },
          {
            name: "jul",
            amount: item.jul,
          },
          {
            name: "agu",
            amount: item.agu,
          },
          {
            name: "sep",
            amount: item.sep,
          },
          {
            name: "okt",
            amount: item.okt,
          },
          {
            name: "nov",
            amount: item.nov,
          },
          {
            name: "des",
            amount: item.des,
          }
        ]
      }
    )
  })

  const newData = Array.from(addon).map((item) => {
    return (
      {
        addon: item.addon,
        series: [
          {
            name: "value",
            data: [
              item.jan,
              item.feb,
              item.mar,
              item.apr,
              item.mei,
              item.jun,
              item.jul,
              item.agu,
              item.sep,
              item.okt,
              item.nov,
              item.des
            ]
          },
        ],
        options: {
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
            type: 'category',
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
        }
      }
    )
  })

  useEffect(() => {
    getAddon()
    // console.log(newArray[5].addon)
  }, [])
  return (
    <div className='row g-5 g-xxl-8'>
      {Array.from(newData).map((item, i) => {
        return (
          <div key={i} className='col-xl-6'>
            <div className={`card `}>
              <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                  <span className='card-label fw-bold fs-3 mb-1'>{item.addon}</span>
                  {/* <span className='text-muted fw-semibold fs-7'>More than 400 new members</span> */}
                </h3>
                <div className='card-toolbar'>
                  {/* begin::Menu */}
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
                  options={item.options}
                  series={item.series}
                  type="line"
                  height={350}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// {Array.from(newArray).map((item, i) => {
//   return (
//     <div key={i} className='col-xl-6'>
//       <div className={`card `}>
//         <div className='card-header border-0 pt-5'>
//           <h3 className='card-title align-items-start flex-column'>
//             <span className='card-label fw-bold fs-3 mb-1'>{item.addon}</span>
//             <span className='text-muted fw-semibold fs-7'>More than 400 new members</span>
//           </h3>
//           <div className='card-toolbar'>
//             {/* begin::Menu */}
//             <button
//               type='button'
//               className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
//               data-kt-menu-trigger='click'
//               data-kt-menu-placement='bottom-end'
//               data-kt-menu-flip='top-end'
//             >
//               <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
//             </button>
//           </div>
//         </div>
//         <div className='card-body text-center pt-5' style={{ height: "350px", padding: "0px !important" }}>
//           <LineChart width={600} height={300} data={item.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
//             <Line type="monotone" dataKey="amount" stroke="#8884d8" />
//             <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//             <XAxis dataKey="name" />
//             <YAxis type="number" domain={[0, "auto"]} />
//             <Tooltip />
//           </LineChart>
//         </div>
//       </div>
//     </div>
//   )
// })}