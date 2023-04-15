import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import PreferencesPopup from './components/preference-popup';
import { Preferences } from './types';
import loadPreferences, {defaultPreferences} from './utils/load-preferences';

function App() {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

  const handleClosePopup = () => setShowPopup(false);

  useEffect(() => {
    const preferences = loadPreferences();
    setPreferences(preferences);
  }, []);

  return (
    <div className="App">
      <PreferencesPopup
        show={showPopup}
        handleClose={handleClosePopup}
        preferences={preferences}
        setPreferences={setPreferences}
      />
      <Button onClick={() => setShowPopup(true)}>popup</Button>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3 m-3"
      >
        <Tab eventKey="home" title="Home">
          Test 1
        </Tab>
        <Tab eventKey="profile" title="Profile">
          Test 2
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          Test 3
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
