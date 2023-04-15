import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import PreferencesPopup from './components/preference-popup';
import IngredientSelection from './pages/ingredient-selection';
import Map from './pages/map';
import MealSelection from './pages/meal-selection';
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
    <div className="m-3">
      <PreferencesPopup
        show={showPopup}
        handleClose={handleClosePopup}
        preferences={preferences}
        setPreferences={setPreferences}
      />
      <Button onClick={() => setShowPopup(true)}>User Preferences</Button>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3 mt-3"
      >
        <Tab eventKey="meal" title="Meal Selection">
          <MealSelection />
        </Tab>
        <Tab eventKey="ingredient" title="Ingredient Selection">
          <IngredientSelection />
        </Tab>
        <Tab eventKey="grocery" title="Grocery Selection">
          <Map />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
