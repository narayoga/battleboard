import { useState, useContext } from "react";
import { KTSVG } from "../../../../_metronic/helpers"
import axios from "axios";
import Data from "./data.json"
import { AppsContext } from "../../../pages/profile-page";

export default function Search() {
  const token = localStorage.getItem('token')
  const { setProfile, setInputTipe } = useContext(AppsContext)
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [spinner, setSpinner] = useState(false)

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = Data.filter((value) => {
      return value.label.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const onSearch = async (value) => {
    setWordEntered(value.label);
    setFilteredData([])
    localStorage.setItem('input', JSON.stringify(
      {
        "lokasi": value.lokasi,
        "tipe": value.tipe
      }
    ))
    window.location.reload()
  }
  return (
    <div className="mx-auto position-relative" style={{ width: "300px", bottom: "98px" }} >
      <div className='d-flex align-items-center mb-3 pt-3'>
        <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        />
        <input
          type='text'
          className='form-control form-control-solid w-250px ps-14'
          placeholder='search...'
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult" style={{ position: "absolute", zIndex: "1" }}>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem d-flex justify-content-between px-2" key={key} onClick={() => onSearch(value)} target="_blank">
                <p className="me-4 ">
                  {value.label}
                </p>
                {value.tipe === 'STO' &&
                    <span style={{fontSize:"8px"}} className="text-white badge badge-dark">{value.tipe}</span>
                  }
                  {value.tipe === 'HERO' &&
                    <span style={{fontSize:"8px"}} className="text-white badge badge-warning">{value.tipe}</span>
                  }
                  {value.tipe === 'DATEL' &&
                    <span style={{fontSize:"8px"}} className="text-white badge badge-primary">{value.tipe}</span>
                  }
                  {value.tipe === 'WITEL' &&
                    <span style={{fontSize:"8px"}} className="text-white badge badge-success">{value.tipe}</span>
                  }
              </a>
            );
          })}
        </div>
      )}
    </div>
  )
}