import React from 'react';
import { Form } from 'react-bootstrap';

interface PreferenceEntryProp {
  name: string;
  setValue: (v: boolean) => void;
}

export default function PreferenceEntry({name, setValue}: PreferenceEntryProp) {
  function changeToggle(e: React.ChangeEvent<HTMLInputElement>) {
    return setValue(e.currentTarget.checked)
  }

  return (<div className='d-flex flex-row justify-content-between'>
    <div>{name}</div>
    <Form>
      <Form.Check 
        type="switch"
        id={"custom-switch-" + name}
        onChange={changeToggle}
      />
    </Form>
  </div>);
}
