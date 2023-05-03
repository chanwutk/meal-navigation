import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICONS } from '../pages/grocery-selection';
import { Image } from 'react-bootstrap';
import { _Store } from '../types';

export default function StoresOrdered({ stores }: { stores: _Store[] }) {
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
