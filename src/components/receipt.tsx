import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Modal, Image } from 'react-bootstrap';
import { ICONS, Plan } from '../pages/grocery-selection';
import { IngredientData } from '../pages/ingredient-selection';
import { Store } from '../types';
import filterIngredients from '../utils/filter-ingredients';

interface ReceiptProp {
  modalShow: boolean;
  setModalShow: (s: boolean) => void;
  plan: Plan;
  selectedIngredients: { ingredient: string; ingredientData: IngredientData }[];
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
            {plan && plan.groceryCost + plan.travelCost}
          </h1>
          <div className='mb-2'>
            {plan && plan.travelDistance} Miles | {plan && plan.travelTime}{' '}
            Minutes
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
                      src={ICONS[s.brand]}
                    ></Image>
                    <Card.Text style={{ width: '90%' }}>
                      {filterIngredients(s, selectedIngredients).map(
                        ReceiptIngredientEntry,
                      )}
                    </Card.Text>
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

function ReceiptIngredientEntry({
  ingredient,
  ingredientData,
}: {
  ingredient: string;
  ingredientData: IngredientData;
}) {
  return (
    <div
      className='d-flex flex-row justify-content-between'
      style={{ width: '100%' }}
    >
      {/* {ingredient} {JSON.stringify(ingredientData)} */}
      <div className='d-flex flex-column align-items-begin'>
        <div>{ingredient}</div>
        <div style={{ fontSize: 10 }}>{ingredientData.name}</div>
      </div>
      <div className='d-flex flex-column align-items-begin'>
        <div>${ingredientData.discount_price}</div>
        {/* <div style={{ fontSize: 10 }}>i</div> */}
      </div>
    </div>
  );
}

const GMAP_URL = 'https://www.google.com/maps/dir/';

function GoogleMapNavigation({ stores }: { stores: Store[] }) {
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
