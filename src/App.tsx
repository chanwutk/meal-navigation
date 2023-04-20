import {useEffect, useState} from 'react';
import { Container, Tab, Tabs, Navbar, Nav } from 'react-bootstrap';

import UserPreferences from './pages/user-preferences';
import IngredientSelection from './pages/ingredient-selection';
import Map from './pages/map';
import MealSelection from './pages/meal-selection';
import { Preferences } from './types';
import loadPreferences, {defaultPreferences} from './utils/load-preferences';

export type NavKey = 'user-pref' | 'meal-sel' | 'ingr-sel' | 'groc-sel';

export default function App() {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [activeTab, setActiveTab] = useState<NavKey>('user-pref');

  function handleTabChange(eventKey: string | null) {
    if (eventKey !== 'user-pref' && eventKey !== 'meal-sel' && eventKey !== 'ingr-sel' && eventKey !== 'groc-sel') {
      throw new Error();
    }
    setActiveTab(eventKey ?? 'user-pref');
  }

  function activateStyle(key: NavKey) {
    return key === activeTab ? {} : {display: 'none'};
  }

  useEffect(() => {
    const preferences = loadPreferences();
    setPreferences(preferences);
  }, []);

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand>Meal Navigation</Navbar.Brand>
          <Navbar.Toggle aria-controls="top-navbar-nav" />
          <Navbar.Collapse id="top-navbar-nav">
              <Nav
                defaultActiveKey="user-pref"
                className="justify-content-end flex-grow-1 pe-3"
                onSelect={handleTabChange}
                activeKey={activeTab}
              >
                <Nav.Link eventKey='user-pref'>User Preferences</Nav.Link>
                <Nav.Link eventKey='meal-sel'>Meal Selection</Nav.Link>
                <Nav.Link eventKey='ingr-sel'>Ingredient Selection</Nav.Link>
                <Nav.Link eventKey='groc-sel'>Grocery Selection</Nav.Link>
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        <div style={activateStyle('user-pref')}>
          <UserPreferences
            preferences={preferences}
            setPreferences={setPreferences}
            onNext={() => setActiveTab('meal-sel')}
          />
        </div>
        <div style={activateStyle('meal-sel')}>
          <MealSelection
            onBack={() => setActiveTab('user-pref')}
            onNext={() => setActiveTab('ingr-sel')}
          />
        </div>
        <div style={activateStyle('ingr-sel')}>
          <IngredientSelection
            onBack={() => setActiveTab('meal-sel')}
            onNext={() => setActiveTab('groc-sel')}
          />
        </div>
        <div style={activateStyle('groc-sel')}><Map
          onBack={() => setActiveTab('ingr-sel')}
        /></div>
      </Container>
    </>
  );
}
