import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import * as L from 'leaflet'

const MapView = (coordinate) => {
  const items = coordinate.coordinate

  const map = useRef()
  const clusterLayer = useRef()

  // const showPin = () => {
  //   clusterLayer.current?.remove();

  //   if (!map.current) {
  //     return;
  //   }

  //   if (clusterLayer && clusterLayer.current) {
  //     map.current.removeLayer(clusterLayer.current);
  //     clusterLayer.current?.remove();
  //   }

  //   clusterLayer.current = L.markerClusterGroup();

  //   const timer = setTimeout(() => {
  //     items.forEach(element => {
  //       L.marker([element.latitude, element.longitude])
  //         .addTo(clusterLayer.current)
  //         .bindPopup(`${element.odp_name} <br />
  //         Total Port: ${element.is_total} <br />
  //         Port Available: ${element.avai} <br />
  //         Port Used: ${element.used} <br />
  //         Status: ${element.status} <br />`)
  //         .openPopup()
  //     });
  //     map.current.addLayer(clusterLayer.current);
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }

  useEffect(() => {
    clusterLayer.current?.remove();

    if (!map.current) {
      return;
    }

    if (clusterLayer && clusterLayer.current) {
      map.current.removeLayer(clusterLayer.current);
      clusterLayer.current?.remove();
    }

    clusterLayer.current = L.markerClusterGroup();

    const timer = setTimeout(() => {
      // console.log('count start')
      items.forEach(element => {
        L.marker([element.latitude, element.longitude])
          .addTo(clusterLayer.current)
          .bindPopup(`${element.odp_name} <br />
          Total Port: ${element.is_total} <br />
          Port Available: ${element.avai} <br />
          Port Used: ${element.used} <br />
          Status: ${element.status} <br />`)
          .openPopup()
      });
      map.current.addLayer(clusterLayer.current);
    }, 2000);
    return () => clearTimeout(timer);
  })

  useEffect(() => {
    const mapNode = ReactDOM.findDOMNode(
      document.getElementById('mapId')
    );
    if (!mapNode || map.current) {
      return;
    }
    map.current = L.map(mapNode).setZoom(7).setView(L.latLng(-1.132644, 113.478088));
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map.current);
  }, []);

  return (
    <div className={'card card-body px-5 py-3'} style={{ borderRadius: "10px" }}>
      <div className='card-header border-0 px-4'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Peta Persebaran ODP</span>
          {/* <span className='text-muted fw-semibold fs-7 ' onClick={() => { showPin() }} >
            untuk menampilkan kluster <span className='text-hover-success cursor-pointer'>tekan disini</span>
          </span> */}
        </h3>
      </div>
      <div className='card-body text-center pt-5' >
        <div style={{ width: '100%', height: '80vh' }} id="mapId" />
      </div>
    </div>

  )
}

export default MapView;
