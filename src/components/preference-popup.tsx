import React from 'react';

import {Preferences} from '../types';
import PreferenceEntry from './preference-entry';
import {types} from '../utils/is-preferences';
import { Button, Modal } from 'react-bootstrap';

interface PreferencesPopupProp {
  show: boolean;
  handleClose: () => void;
  preferences: Preferences;
  setPreferences: React.Dispatch<React.SetStateAction<Preferences>>;
};

export default function PreferencesPopup({show, handleClose, preferences, setPreferences}: PreferencesPopupProp) {
  const changePreference = (key: keyof Preferences) =>
    (value: boolean) =>
      setPreferences({...preferences, [key]: value});

  function isKey(k: string): k is keyof Preferences {
    return k in preferences;
  }

  function makeEntry(name: string, index: number) {
    if (!isKey(name)) {
      throw new Error();
    }

    return <PreferenceEntry
      key={index}
      name={name}
      setValue={changePreference(name)}
    />;
  }

  return <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>User Preferences</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {Object.keys(types).map(makeEntry)}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary">Next</Button>
    </Modal.Footer>
  </Modal>;
}
