import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";

interface MapProp {
  onBack: () => void;
};

export default function Map({onBack}: MapProp) {
  const [center, setCenter] = useState<[number, number]>();

  useEffect(() => {
    setCenter([37.876068, -122.258530]);
  }, []);

  return <div>

    {/* <div style={{ position: 'relative', top: top }}>
      <div
        id='map-id'
        style={{ height, width, position: 'absolute', zIndex: '1' }}
      ></div>
    </div> */}
    <MapContainer center={[37.876068, -122.258530]} zoom={16} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
        // url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[37.876068, -122.258530]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  </div>
}