import { Icon, LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap, Polyline } from "react-leaflet";
import { useEffect, useState } from "react";
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

import { data } from '../data/data';
import { paths } from '../data/paths';

import 'leaflet/dist/leaflet.css';


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
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const ICONS: {[k: string]: string} = {
  'Whole Food': './icon-whole-foods.png',
  'Trader Joe\'s': './icon-trader-joes.png',
  'Safeway': './icon-safeway.png',
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
  // const [directions, setDirections] = useState<{[k: string]: Path}>({});
  const [activeMarker, setActiveMarker] = useState<string>('');

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

    // try {
    //   if (Object.keys(directions).length > 0) {
    //     return;
    //   }
    //   const d: {[k: string]: Path} = {}
    //   getDirections(CURRENT_LOCATION, ..._stores.map(d => d.location))
    //     .then(v => v.json())
    //     .then((geojsons: GeoJSON[]) => {
    //       geojsons.map((geojson, i) => {
    //         d[_stores[i].name + '_' + _stores[i].address] = {
    //           end: _stores[i].location,
    //           path: geojson,
    //         };
    //       })
    //       setDirections(d);
    //     })
    //     .catch(err => console.log(err));
    // } catch (e) {
    //   console.error(e)
    // }
  }, []);

  // useEffect(() => {
  //   console.log(directions);
  //   console.log(JSON.stringify(directions));
  // }, [directions]);

  return<MapContainer
      center={CURRENT_LOCATION}
      zoom={16}
      scrollWheelZoom={true}
      zoomControl={false}
      minZoom={12}
    >
    <MapOps show={show} />
    <TileLayer attribution={ATTRIBUTION} url={TILES.osm} />
    <Marker
      position={CURRENT_LOCATION}
      icon={new Icon({
        iconUrl: './profile-picture.png',
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -25],
      })}
    />
    {Object.entries(paths)
      .sort(([k1, _v1], [k2, _v2]) => (+(k1 === activeMarker) - +(k2 === activeMarker)))
      .map(([key, value], i) =>
        <Polyline
          key={'line-' + i}
          positions={value.path.features[0].geometry.coordinates.map(([lat, lon]) => [lon, lat])}
          pathOptions={activeMarker === key ? {color: 'red', opacity: 1} : {color: 'gray', opacity: .5}}
        ></Polyline>
    )}
    {Object.entries(paths).map(([key, value], i) =>
      <Marker
        key={'marker-' + i}
        position={value.end as [number, number]}
        icon={new Icon({
          iconUrl: ICONS[key.split('_')[0]],
          iconSize: [50, 50],
          iconAnchor: [25, 25],
          popupAnchor: [0, -25],
        })}
        eventHandlers={{click: () => setActiveMarker(key === activeMarker ? '' : key)}}
      >
        <Popup closeOnClick closeOnEscapeKey><b>{key.split('_')[0]}</b>: {key.split('_')[1]}</Popup>
      </Marker>
    )}
  </MapContainer>
}
