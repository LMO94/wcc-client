import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken =
"pk.eyJ1IjoibGVtYW9zIiwiYSI6ImNrbDAxbWl5ZTBob3Yyb3BlbWxlYnUxaXcifQ.Vn4koYBizzmn8-waXw-mPA"; 

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(8.3);
  const [lat, setLat] = useState(46.8);
  const [zoom, setZoom] = useState(6.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;
