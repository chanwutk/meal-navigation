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
import {
  ToggleButton,
  Image,
  Container,
  Modal,
  Button,
  Card,
} from 'react-bootstrap';
import { Store } from '../types';
import {
  faArrowDown,
  faCaretRight,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IngredientData } from './ingredient-selection';

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
  selectedIngredients: [string, IngredientData][];
}

const TILES = {
  osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  stamen:
    'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png',
  stadia: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png',
};
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const ICONS: { [k: string]: string } = {
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

const defaultPlans: Plan[] = [
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
        brand: "Trader Joe's",
        address: '5727 College Ave, Oakland, CA 94618',
        phone: '(510) 923-9428',
        time: '08:00-21:00',
        location: [37.845923, -122.252565],
      },
      {
        brand: 'Safeway',
        address: '1444 Shattuck Place, Berkeley, CA 94709',
        phone: '(510) 526-3086',
        time: '05:00-24:00',
        location: [37.880819, -122.269725],
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
];

export default function GrocerySelection({
  show,
  selectedIngredients,
}: GrocerySelectionProp) {
  const [activeMarker, setActiveMarker] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [modalShow, setModelShow] = useState<boolean>(false);

  const [plans, setPlans] = useState<Plan[]>(defaultPlans);
  const [plan, setPlan] = useState<Plan>(plans[0]);

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
  }, []);

  useEffect(() => {
    setPlan(
      plans.filter(p =>
        selectedPlan.split('_').every((a, i) => a === p.stores[i].address),
      )[0],
    );
  }, [selectedPlan]);

  return (
    <>
      <Container>
        <div
          className='p-1 plan-panel'
          style={{ overflow: 'scroll', whiteSpace: 'nowrap' }}
        >
          {plans.map((plan, idx) => (
            <ToggleButton
              key={`plan-key-${idx}`}
              id={`plan-id-${idx}`}
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
                        key={`img-plan${idx}-${i}-${s.brand}`}
                        className='m-1'
                        width={30}
                        height={30}
                        src={ICONS[s.brand]}
                      ></Image>
                    ))
                    .map((c, i) => {
                      return (
                        <div
                          key={`img-plan${idx}-${i}-with-caret`}
                          className='d-flex align-items-center'
                        >
                          {c}
                          {i < plan.stores.length - 1 ? (
                            <div>
                              <FontAwesomeIcon icon={faCaretRight} size='2xs' />
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
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
              </>
            </ToggleButton>
          ))}
        </div>
        <div className='px-3' style={{ fontSize: 30 }}>
          <FontAwesomeIcon
            icon={faCircleInfo}
            style={{ cursor: 'pointer' }}
            onClick={() => selectedPlan !== '' && setModelShow(true)}
          />
          <Modal show={modalShow} onHide={() => setModelShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Grocery Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='d-flex flex-column align-items-center'>
                <h1
                  style={{
                    fontSize: 80,
                    fontWeight: 'bolder',
                    lineHeight: '100%',
                  }}
                >
                  <span style={{ color: 'grey' }}>$</span>
                  {plan && plan.groceryCost + plan.travelCost}
                </h1>
                <div>
                  {plan && plan.travelDistance} Miles |{' '}
                  {plan && plan.travelTime} Minutes
                </div>
                <hr
                  style={{
                    height: 2,
                    color: 'grey',
                    width: '90%',
                  }}
                />
                {plan ? (
                  plan.stores.map((s, i) => (
                    <div
                      key={`modal-${i}-${s.brand}`}
                      className='d-flex flex-column align-items-center'
                    >
                      <div style={{ fontSize: 40, color: 'grey' }}>
                        <FontAwesomeIcon icon={faArrowDown} />
                      </div>
                      <Card style={{ width: '90%' }}>
                        <Card.Body className='d-flex flex-column align-items-center'>
                          {/* <Card.Title>Card Title</Card.Title>
                          <Card.Subtitle className='mb-2 text-muted'>
                            Card Subtitle
                          </Card.Subtitle> */}
                          <Image
                            className='m-1'
                            width={100}
                            height={100}
                            src={ICONS[s.brand]}
                          ></Image>
                          <Card.Text>
                            {selectedIngredients
                              .map(([ing, ingData]) => [ing, ...ingData])
                              .filter(ing => ing[5] === s.brand)
                              .map(([_store, ingredientData]) => (
                                <>
                                  {_store} {JSON.stringify(ingredientData)}
                                </>
                              ))}
                          </Card.Text>
                          <Button
                            variant='primary'
                            href='https://chanwutk.github.io'
                          >
                            Navigate
                          </Button>
                          {/* <Card.Link href='#'>Card Link</Card.Link>
                          <Card.Link href='#'>Another Link</Card.Link> */}
                        </Card.Body>
                      </Card>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setModelShow(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
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
