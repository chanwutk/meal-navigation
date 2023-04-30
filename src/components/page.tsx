import { JSXElementConstructor, ReactElement } from 'react';
import { Button } from 'react-bootstrap';

interface NavigationProp {
  onBack?: () => void;
  onNext?: () => void;
  children?:
    | (string | ReactElement<any, string | JSXElementConstructor<any>>)[]
    | string;
}

export default function Page({ onBack, onNext, children }: NavigationProp) {
  return (
    <div className="m-2">
      {children ?? <></>}
      <div className="d-flex flex-row justify-content-end m-2 mt-4">
        {onBack ? (
          <Button onClick={onBack} className="ms-2">
            Back
          </Button>
        ) : (
          <></>
        )}
        {onNext ? (
          <Button onClick={onNext} className="ms-2">
            Next
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
