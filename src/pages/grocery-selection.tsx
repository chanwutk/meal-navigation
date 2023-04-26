import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { data } from '../data/data';

import { Icon } from "leaflet";
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from "leaflet";
import getDirections from "../utils/get-directions";


const CURRENT_LOCATION: LatLngTuple = [37.876070, -122.258502]

interface GrocerySelectionProp {
  show: boolean;
  // TODO
  meals: any[];
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

export default function GrocerySelection({show, meals}: GrocerySelectionProp) {
  // TODO: fix typing
  const [directions, setDirections] = useState<any>({});

  useEffect(() => {
    const _stores: [string, string, [number, number]][] = [];
    Object.entries(data.store).map(([name, stores]) => {
      stores.map(s => {
        const [lat, lon] = s.location;
        _stores.push([name, s.address, [lat, lon]]);
      })
    });
    try {
      if (Object.keys(directions).length > 0) {
        return;
      }
      getDirections(CURRENT_LOCATION, ..._stores.map(d => d[2]))
        .then(v => v)
        .then(v => v.json())
        .then((geojsons: any[]) =>
          geojsons.map((geojson, i) => {
            console.log(geojson)
            setDirections({
              ...directions,
              [_stores[i][0] + '_' + _stores[i][1]]: geojson
            })
          }
          ))
        .catch(err => console.log(err));
    } catch (e) {
      console.log(e)
    }
  }, []);

  useEffect(() => {
    console.log(directions);
  }, [directions]);

  return<MapContainer center={CURRENT_LOCATION} zoom={16} scrollWheelZoom={true}>
    <MapOps show={show} />
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url={TILES.osm}
    />
    <Marker
      position={CURRENT_LOCATION}
      icon={new Icon({
        iconUrl: markerIconPng,
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41],
      })}
    >
      <Popup>You are here.</Popup>
    </Marker>
  </MapContainer>
}