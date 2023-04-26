import {useEffect, useState} from 'react';
import { Container, Navbar, Nav, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

import UserPreferences from './pages/user-preferences';
import IngredientSelection from './pages/ingredient-selection';
import GrocerySelection from './pages/grocery-selection';
import MealSelection from './pages/meal-selection';
import { Preferences } from './types';
import loadPreferences, {defaultPreferences} from './utils/load-preferences';

export type NavKey = 'user-pref' | 'meal-sel' | 'ingr-sel' | 'groc-sel';

const navKies = ['user-pref', 'meal-sel', 'ingr-sel', 'groc-sel'] as const;

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

      <div style={activateStyle('groc-sel')}><GrocerySelection
        show={activeTab === 'groc-sel'}
      /></div>
      <Container>
        <div style={activateStyle('user-pref')}>
          <UserPreferences
            preferences={preferences}
            setPreferences={setPreferences}
          />
        </div>
        <div style={activateStyle('meal-sel')}>
          <MealSelection/>
        </div>
        <div style={activateStyle('ingr-sel')}>
          <IngredientSelection/>
        </div>
      </Container>
      <ButtonGroup style={{width: 300, left: '50%', transform: 'translate(-50%, -50%)'}} size="lg" className="mb-2 position-fixed fixed-bottom">
        <Button
          onClick={() => setActiveTab(navKies[navKies.findIndex(d => d === activeTab) - 1])}
          disabled={activeTab === 'user-pref'}
        >Back</Button>
        <Button
          onClick={() => setActiveTab(navKies[navKies.findIndex(d => d === activeTab) + 1])}
          disabled={activeTab === 'groc-sel'}
        >Next</Button>
      </ButtonGroup>
    </>
  );
}
