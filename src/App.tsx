import {useEffect, useState} from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';

import UserPreferences from './pages/user-preferences';
import IngredientSelection from './pages/ingredient-selection';
import Map from './pages/map';
import MealSelection from './pages/meal-selection';
import { Preferences } from './types';
import loadPreferences, {defaultPreferences} from './utils/load-preferences';

export default function App() {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

  useEffect(() => {
    const preferences = loadPreferences();
    setPreferences(preferences);
  }, []);

  return (
    <Container className="m-3">
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3 mt-3"
      >
        <Tab eventKey="preferences" title="User Preferences">
          <UserPreferences
            preferences={preferences}
            setPreferences={setPreferences}
          />
        </Tab>
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
    </Container>
  );
}
