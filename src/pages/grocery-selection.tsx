import { Icon, LatLngTuple } from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  Polyline,
} from 'react-leaflet';
import { useEffect, useState } from 'react';

import { stores } from '../data/stores';
import { paths } from '../data/paths';

import 'leaflet/dist/leaflet.css';
import { ToggleButton, Image, Container } from 'react-bootstrap';
import { Store } from '../types';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CURRENT_LOCATION: LatLngTuple = [37.87607, -122.258502];

interface Plan {
  stores: Store[];
  travelCost: number;
  groceryCost: number;
  travelTime: number;
  travelDistance: number;
}

interface GrocerySelectionProp {
  show: boolean;
  // TODO
  meals: any[];
}

const TILES = {
  osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  stamen:
    'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png',
  stadia: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png',
};
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const ICONS: { [k: string]: string } = {
  'Whole Food': './icon-whole-foods.png',
  "Trader Joe's": './icon-trader-joes.png',
  Safeway: './icon-safeway.png',
};

interface MapOpsProp {
  show: boolean;
}

function MapOps({ show }: MapOpsProp) {
  const map = useMap();
  useEffect(() => {
    if (show) {
      map.invalidateSize();
    }
  }, [show]);
  return null;
}

export default function GrocerySelection({ show }: GrocerySelectionProp) {
  // const [directions, setDirections] = useState<{[k: string]: Path}>({});
  const [activeMarker, setActiveMarker] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [plans, setPlans] = useState<Plan[]>([
    {
      stores: [
        {
          brand: 'Whole Food',
          address: '5110 Telegraph Ave, Oakland, CA 94609',
          phone: '(510) 903-2222',
          time: '08:00-21:00',
          location: [37.837657, -122.262078],
        },
        {
          brand: "Trader Joe's",
          address: '5700 Christie Ave, Emeryville, CA 94608',
          phone: '(510) 658-8091',
          time: '08:00-21:00',
          location: [37.837047, -122.293903],
        },
        {
          brand: 'Safeway',
          address: '6310 College Ave, Oakland, CA 94618',
          phone: '(510) 985-0012',
          time: '05:00-24:00',
          location: [37.85073, -122.252364],
        },
      ],
      travelCost: 3,
      travelTime: 15,
      travelDistance: 3,
      groceryCost: 30,
    },
    {
      travelCost: 2,
      travelTime: 20,
      travelDistance: 3,
      groceryCost: 60,
      stores: [
        {
          brand: "Trader Joe's",
          address: '5727 College Ave, Oakland, CA 94618',
          phone: '(510) 923-9428',
          time: '08:00-21:00',
          location: [37.845923, -122.252565],
        },
        {
          brand: 'Whole Food',
          address: '1025 Gilman St, Berkeley, CA 94710',
          phone: '(510) 809-8293',
          time: '08:00-22:00',
          location: [37.880569, -122.297177],
        },
        {
          brand: 'Safeway',
          address: '1550 Shattuck Ave., Berkeley, CA 94709',
          phone: '(510) 841-7942',
          time: '06:00-23:00',
          location: [37.878793, -122.269677],
        },
      ],
    },
    {
      travelCost: 1,
      travelTime: 2,
      travelDistance: 1,
      groceryCost: 30,
      stores: [
        {
          brand: 'Safeway',
          address: '1444 Shattuck Place, Berkeley, CA 94709',
          phone: '(510) 526-3086',
          time: '05:00-24:00',
          location: [37.880819, -122.269725],
        },
        {
          brand: "Trader Joe's",
          address: '5727 College Ave, Oakland, CA 94618',
          phone: '(510) 923-9428',
          time: '08:00-21:00',
          location: [37.845923, -122.252565],
        },
        {
          brand: 'Whole Food',
          address: '1025 Gilman St, Berkeley, CA 94710',
          phone: '(510) 809-8293',
          time: '08:00-22:00',
          location: [37.880569, -122.297177],
        },
      ],
    },
    {
      travelCost: 1,
      travelTime: 2,
      travelDistance: 1,
      groceryCost: 30,
      stores: [
        {
          brand: 'Safeway',
          address: '1444 Shattuck Place, Berkeley, CA 94709',
          phone: '(510) 526-3086',
          time: '05:00-24:00',
          location: [37.880819, -122.269725],
        },
        {
          brand: "Trader Joe's",
          address: '5727 College Ave, Oakland, CA 94618',
          phone: '(510) 923-9428',
          time: '08:00-21:00',
          location: [37.845923, -122.252565],
        },
        {
          brand: 'Whole Food',
          address: '1025 Gilman St, Berkeley, CA 94710',
          phone: '(510) 809-8293',
          time: '08:00-22:00',
          location: [37.880569, -122.297177],
        },
      ],
    },
  ]);

  useEffect(() => {
    const _stores: {
      name: string;
      address: string;
      location: [number, number];
    }[] = [];

    Object.entries(stores).map(([name, stores]) => {
      stores.map(s => {
        const [lat, lon] = s.location;
        _stores.push({
          name,
          address: s.address,
          location: [lat, lon],
        });
      });
    });
    // stores['Whole Food'].forEach((wf) => {
    //   stores["Trader Joe's"].forEach((tj) => {
    //     stores['Safeway'].forEach((sw) => {
    //       const places = [wf, tj, sw];
    //       places.forEach((p1) => {
    //         places.forEach((p2) => {
    //           fetch(
    //             'https://api.openrouteservice.org/v2/directions/driving-car',
    //           );
    //         });
    //       });
    //     });
    //   });
    // });

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

  return (
    <>
      <Container>
        <div
          className='p-1 plan-panel'
          style={{ overflow: 'scroll', whiteSpace: 'nowrap' }}
        >
          {plans.map((plan, idx) => (
            <ToggleButton
              key={`plan-${idx}`}
              id={`plan-${idx}`}
              type='radio'
              variant='outline-dark'
              value={plan.stores.map(s => s.address).join('_')}
              checked={
                selectedPlan === plan.stores.map(s => s.address).join('_')
              }
              onChange={e => setSelectedPlan(e.currentTarget.value)}
              className='m-2'
              style={
                selectedPlan === plan.stores.map(s => s.address).join('_')
                  ? {}
                  : { backgroundColor: 'white' }
              }
            >
              <>
                <div className='d-flex flex-row justify-content-center align-items-center'>
                  {plan.stores
                    .map((s, i) => (
                      <Image
                        key={`${i}-${s.brand}`}
                        className='m-1'
                        width={30}
                        height={30}
                        src={ICONS[s.brand]}
                      ></Image>
                    ))
                    .map((c, i) => {
                      return (
                        <>
                          {c}
                          {i < plan.stores.length - 1 ? (
                            <div>
                              <FontAwesomeIcon icon={faCaretRight} size='2xs' />
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                    })}
                </div>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                  <div style={{ fontWeight: 'bolder', fontSize: 40 }}>
                    ${plan.travelCost + plan.groceryCost}
                  </div>
                  <div className='d-flex flex-column align-items-start m-2'>
                    <div style={{ lineHeight: '100%' }}>
                      {plan.travelDistance} mi.
                    </div>
                    <div style={{ lineHeight: '100%' }}>
                      {plan.travelTime} min.
                    </div>
                  </div>
                </div>
                {/* {JSON.stringify(plan)} */}
              </>
            </ToggleButton>
          ))}
        </div>
      </Container>
      <MapContainer
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
          icon={
            new Icon({
              iconUrl: './profile-picture.png',
              iconSize: [50, 50],
              iconAnchor: [25, 25],
              popupAnchor: [0, -25],
            })
          }
        />
        {Object.entries(paths)
          .sort(
            ([k1, _v1], [k2, _v2]) =>
              +(k1 === activeMarker) - +(k2 === activeMarker),
          )
          .map(([key, value], i) => (
            <Polyline
              key={'line-' + i}
              positions={value.path.features[0].geometry.coordinates.map(
                ([lat, lon]) => [lon, lat],
              )}
              pathOptions={
                activeMarker === key
                  ? { color: 'red', opacity: 1 }
                  : { color: 'gray', opacity: 0.5 }
              }
            ></Polyline>
          ))}
        {Object.entries(paths).map(([key, value], i) => (
          <Marker
            key={'marker-' + i}
            position={value.end as [number, number]}
            icon={
              new Icon({
                iconUrl: ICONS[key.split('_')[0]],
                iconSize: [50, 50],
                iconAnchor: [25, 25],
                popupAnchor: [0, -25],
              })
            }
            eventHandlers={{
              click: () => setActiveMarker(key === activeMarker ? '' : key),
            }}
          >
            <Popup closeOnClick closeOnEscapeKey>
              <b>{key.split('_')[0]}</b>: {key.split('_')[1]}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
