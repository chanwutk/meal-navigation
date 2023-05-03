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
import { stores as STORES, stores } from '../data/stores';
import 'leaflet/dist/leaflet.css';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { _Ingredient } from './ingredient-selection';
import Receipt from '../components/receipt';
import processPlans from '../utils/process-plans';
import StoresOrdered from '../components/stores-ordered';
import DropdownCost from '../components/dropdown-cost';
import { Plan, _Store } from '../types';

export const CURRENT_LOCATION: LatLngTuple = [37.87607, -122.258502];

interface GrocerySelectionProp {
  show: boolean;
  selectedIngredients: _Ingredient[];
  selectedMeals: { [day: string]: string };
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
  selectedMeals,
}: GrocerySelectionProp) {
  // const [activeMarker, setActiveMarker] = useState<string>('');
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
          <StoresOrdered stores={plan.stores} />
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
        selectedMeals={selectedMeals}
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
        zoom={15}
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
        {[...plans]
          .sort(
            (p1, p2) =>
              +(planString(p1.stores) === selectedPlan) -
              +(planString(p2.stores) === selectedPlan),
          )
          .map((plan, idx) => (
            <Polyline
              key={'line-' + idx}
              positions={plan.paths
                .flatMap(path =>
                  path.features.flatMap(({ geometry }) =>
                    geometry.type === 'LineString'
                      ? geometry.coordinates
                      : (() => {
                          throw new Error('should be LineString');
                        })(),
                  ),
                )
                .map(([lat, lon]) => [lon, lat])}
              pathOptions={
                selectedPlan === planString(plan.stores)
                  ? { color: '#00bfff', opacity: 1, weight: 5 }
                  : { color: 'gray', opacity: 0.5, weight: 3 }
              }
            ></Polyline>
          ))}
        {Object.entries(stores)
          .flatMap(([key, values]) => values.map(v => ({ key, value: v })))
          .map(({ key, value }, i) => (
            <Marker
              key={'marker-' + i}
              position={value.location as [number, number]}
              icon={
                new Icon({
                  iconUrl: ICONS[key],
                  iconSize: [50, 50],
                  iconAnchor: [25, 25],
                  popupAnchor: [0, -25],
                })
              }
              // eventHandlers={{
              //   click: () => setActiveMarker(key === activeMarker ? '' : key),
              // }}
            >
              <Popup closeOnClick closeOnEscapeKey>
                <b>{key}</b>: {value.address}
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
