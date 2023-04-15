import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

interface PreferenceEntryProp {
  name: string;
  value: boolean;
  setValue: (v: boolean) => void;
}

export default function PreferenceEntry({name, value, setValue}: PreferenceEntryProp) {
  function changeToggle(e: React.ChangeEvent<HTMLInputElement>) {
    return setValue(e.currentTarget.value === 'yes')
  }

  const nameId = name.split(' ').join('-');

  return (<div className='flex flex-row justify-content-between'>
    <div>{name}</div>
    <ButtonGroup className="mb-2">
      <ToggleButton
        key={nameId + '-yes'}
        id={nameId + '-yes'}
        type='radio'
        value={'yes'}
        checked={value}
        onChange={changeToggle}
      >Yes</ToggleButton>
      <ToggleButton
        key={nameId + '-no'}
        id={nameId + '-no'}
        type='radio'
        value={'no'}
        checked={!value}
        onChange={changeToggle}
      >No</ToggleButton>
    </ButtonGroup>
  </div>);
}
