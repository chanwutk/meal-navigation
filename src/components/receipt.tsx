import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Modal, Image } from 'react-bootstrap';
import { ICONS, Plan, _Store } from '../pages/grocery-selection';
import { IngredientData, _Ingredient } from '../pages/ingredient-selection';
import { Store } from '../types';
import filterIngredients from '../utils/filter-ingredients';
import round2 from '../utils/round-2';

const GAS_PRICE = 4.8; // $ / galon
const CAR_EFFICIENCY = 30; // miles / galon
export const DRIVING_COST = GAS_PRICE / CAR_EFFICIENCY; // $ / miles

interface ReceiptProp {
  modalShow: boolean;
  setModalShow: (s: boolean) => void;
  plan: Plan | undefined;
  selectedIngredients: _Ingredient[];
}

export default function Receipt({
  modalShow,
  setModalShow,
  plan,
  selectedIngredients,
}: ReceiptProp) {
  return (
    <Modal show={modalShow} onHide={() => setModalShow(false)}>
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
            {plan && round2(plan.totalCost)}
          </h1>
          <div className='mb-2'>
            {plan && round2(plan.distance)} Miles |{' '}
            {plan && round2(plan.duration)} Minutes
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
                key={`modal-${i}-${s.name}`}
                style={{ width: '90%' }}
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
                      src={ICONS[s.name]}
                    ></Image>
                    <div style={{ width: '90%' }}>
                      {filterIngredients(
                        { brand: s.name },
                        selectedIngredients,
                      ).map(ReceiptIngredientEntry)}
                    </div>
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
        <GoogleMapNavigation stores={plan ? plan.stores : []} />
        <Button variant='secondary' onClick={() => setModalShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ReceiptIngredientEntry(
  { ingredient, idata }: _Ingredient,
  idx: number,
) {
  return (
    <div
      className='d-flex flex-row justify-content-between'
      style={{ width: '100%' }}
      key={`receipt-ingredient-entry-${idx}`}
    >
      {/* {ingredient} {JSON.stringify(idata)} */}
      <div className='d-flex flex-column align-items-begin'>
        <div>
          {ingredient.slice(0, 1).toUpperCase()}
          {ingredient.slice(1)}
        </div>
        <div style={{ fontSize: 10 }}>{idata.name}</div>
      </div>
      <div className='d-flex flex-column align-items-begin'>
        <div>${idata.discount_price}</div>
        {/* <div style={{ fontSize: 10 }}>i</div> */}
      </div>
    </div>
  );
}

const GMAP_URL = 'https://www.google.com/maps/dir/';

function GoogleMapNavigation({ stores }: { stores: _Store[] }) {
  return (
    <Button
      variant='primary'
      href={
        GMAP_URL +
        stores.map(({ address }) => address.split(' ').join('+')).join('/')
      }
    >
      Navigate
    </Button>
  );
}
