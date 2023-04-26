import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import {GeoJSON} from 'geojson';
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

type Path = {
  end: [number, number];
  path: GeoJSON;
};

export default function GrocerySelection({show, meals}: GrocerySelectionProp) {
  const [directions, setDirections] = useState<{[k: string]: Path}>({});

  useEffect(() => {
    const _stores: {
      name: string,
      address: string,
      location: [number, number]
    }[] = [];

    Object.entries(data.store).map(([name, stores]) => {
      stores.map(s => {
        const [lat, lon] = s.location;
        _stores.push({
          name,
          address: s.address,
          location: [lat, lon],
        });
      })
    });

    try {
      if (Object.keys(directions).length > 0) {
        return;
      }
      const d: {[k: string]: Path} = {}
      getDirections(CURRENT_LOCATION, ..._stores.map(d => d.location))
        .then(v => v.json())
        .then((geojsons: GeoJSON[]) => {
          geojsons.map((geojson, i) => {
            d[_stores[i].name + '_' + _stores[i].address] = {
              end: _stores[i].location,
              path: geojson,
            };
          })
          setDirections(d);
        })
        .catch(err => console.log(err));
    } catch (e) {
      console.error(e)
    }
  }, []);

  useEffect(() => {
    console.log(directions);
    console.log(JSON.stringify(directions));
  }, [directions]);

  return<MapContainer
      center={CURRENT_LOCATION}
      zoom={16}
      scrollWheelZoom={true}
      zoomControl={false}
    >
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
    {Object.entries(directions).map(([key, value], i) =>
      <Marker
        key={i}
        position={value.end}
        icon={new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12.5, 41],
          popupAnchor: [0, -41],
        })}
      >
        <Popup>{key.split('_').join(': ')}</Popup>
      </Marker>
    )}
  </MapContainer>
}
