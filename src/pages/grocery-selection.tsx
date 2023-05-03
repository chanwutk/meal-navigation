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

import { stores as STORES } from '../data/stores';
import { paths } from '../data/paths';

import 'leaflet/dist/leaflet.css';
import { Image, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { faCaretRight, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { _Ingredient } from './ingredient-selection';
import Receipt from '../components/receipt';
import round2 from '../utils/round-2';
import processPlans from '../utils/process-plans';

export const CURRENT_LOCATION: LatLngTuple = [37.87607, -122.258502];

export type _Store = {
  name: string;
  address: string;
  idx: number;
};
export type _Path = GeoJSON.FeatureCollection & {
  metadata?: any;
};
export type Plan = {
  stores: _Store[];
  paths: _Path[];
  distance: number;
  duration: number;
  groceryCost: number;
  totalCost: number;
  groceryList: {
    store: _Store;
    ingredients: _Ingredient[];
  }[];
};

interface GrocerySelectionProp {
  show: boolean;
  selectedIngredients: _Ingredient[];
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

export default function GrocerySelection({
  show,
  selectedIngredients,
}: GrocerySelectionProp) {
  const [activeMarker, setActiveMarker] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [modalShow, setModalShow] = useState<boolean>(false);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [plan, setPlan] = useState<Plan>();

  useEffect(() => {
    const _stores: {
      name: string;
      address: string;
      location: [number, number];
    }[] = [];

    Object.entries(STORES).map(([name, stores]) => {
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
    console.log(selectedPlan);
    setPlan(
      plans.filter(p =>
        selectedPlan
          .split('_')
          .every((a, i) => a.split('-')[1] === p.stores[i].address),
      )[0],
    );
  }, [selectedPlan]);

  useEffect(() => {
    setPlans(processPlans(selectedIngredients));
  }, [selectedIngredients]);

  function planString(stores: _Store[]) {
    return stores.map(s => `${s.name}-${s.address}`).join('_');
  }

  function planColor(stores: _Store[]) {
    return selectedPlan === planString(stores)
      ? { backgroundColor: 'lightgray' }
      : {};
  }

  function planDropdownEntry(plan: Plan, idx: number) {
    return (
      <Dropdown.Item
        key={`plan-key-${idx}`}
        eventKey={planString(plan.stores)}
        style={planColor(plan.stores)}
      >
        <div className='d-flex flex-row justify-content-between'>
          <DropdownCost plan={plan} />
          <StoreOrder stores={plan.stores} />
        </div>
      </Dropdown.Item>
    );
  }

  return (
    <>
      <Receipt
        modalShow={modalShow}
        setModalShow={setModalShow}
        plan={plan}
        selectedIngredients={selectedIngredients}
      />
      <Container>
        <div
          className='p-3 d-flex justify-content-between align-items-center'
          style={{ width: '100%' }}
        >
          <DropdownButton
            title='Select Grocery Plan'
            autoClose='outside'
            onSelect={key => key && setSelectedPlan(key)}
          >
            {plans.map(planDropdownEntry)}
          </DropdownButton>
          <FontAwesomeIcon
            icon={faCircleInfo}
            style={{ cursor: 'pointer', fontSize: 30 }}
            onClick={() => selectedPlan && setModalShow(true)}
          />
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
                  ? { color: '#00bfff', opacity: 1, weight: 5 }
                  : { color: 'gray', opacity: 0.5, weight: 3 }
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

function MapOps({ show }: { show: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (show) {
      map.invalidateSize();
    }
  }, [show]);
  return null;
}

function DropdownCost({ plan }: { plan: Plan }) {
  return (
    <div className='d-flex flex-row justify-content-between align-items-center'>
      <div style={{ fontWeight: 'bolder', fontSize: 40 }}>
        ${round2(plan.totalCost)}
      </div>
      <div className='d-flex flex-column align-items-start m-2'>
        <div style={{ lineHeight: '100%' }}>{round2(plan.distance)} mi.</div>
        <div style={{ lineHeight: '100%' }}>{round2(plan.duration)} min.</div>
      </div>
    </div>
  );
}

function StoreOrder({ stores }: { stores: _Store[] }) {
  function brandLogo(store: _Store, idx: number) {
    return (
      <div
        key={`img-plan-${idx}-with-caret`}
        className='d-flex align-items-center'
      >
        {idx ? <FontAwesomeIcon icon={faCaretRight} size='2xs' /> : ''}
        <Image
          key={`img-plan-${idx}-${store.name}`}
          className='m-1'
          width={30}
          height={30}
          src={ICONS[store.name]}
        ></Image>
      </div>
    );
  }

  return (
    <div className='d-flex flex-row justify-content-center align-items-center'>
      {stores.map(brandLogo)}
    </div>
  );
}
