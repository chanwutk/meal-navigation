import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useRef, useState } from "react";

interface GrocerySelectionProp {
  show: boolean;
};

const TILES = {
  osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  stamen: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png",
  stadia: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
};

interface MapOpsProp {
  show: boolean;
}

function MapOps({show}: MapOpsProp) {
  const map = useMap();
  useEffect(() => {
    if (show) {
      map.invalidateSize();
    }
  }, [show])
  return null;
}

export default function GrocerySelection({show}: GrocerySelectionProp) {
  return<MapContainer center={[37.876070, -122.258502]} zoom={16} scrollWheelZoom={false}>
    <MapOps show={show} />
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url={TILES.osm}
    />
    <Marker position={[37.876070, -122.258502]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
}