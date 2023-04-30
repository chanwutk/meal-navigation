import { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';

interface PreferenceEntryProp {
  name: string;
  value: boolean;
  setValue: (v: boolean) => void;
}

export default function PreferenceEntry({
  name,
  value,
  setValue,
}: PreferenceEntryProp) {
  function changeToggle(e: ChangeEvent<HTMLInputElement>) {
    return setValue(e.currentTarget.checked);
  }

  return (
    <div className="d-flex flex-row justify-content-between m-4">
      <div>{name}</div>
      <Form>
        <Form.Check
          type="switch"
          id={'custom-switch-' + name}
          onChange={changeToggle}
          checked={value}
        />
      </Form>
    </div>
  );
}
