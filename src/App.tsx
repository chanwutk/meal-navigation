import {useEffect, useState} from 'react';
import { Container, Navbar, Nav, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

import UserPreferences from './pages/user-preferences';
import IngredientSelection from './pages/ingredient-selection';
import GrocerySelection from './pages/grocery-selection';
import MealSelection from './pages/meal-selection';
import { Preferences } from './types';
import loadPreferences, {defaultPreferences} from './utils/load-preferences';
import savePreferences from './utils/save-preferences';

export type NavKey = 'user-pref' | 'meal-sel' | 'ingr-sel' | 'groc-sel';

const navKeys = ['user-pref', 'meal-sel', 'ingr-sel', 'groc-sel'] as const;

export default function App() {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [activeTab, setActiveTab] = useState<NavKey>('user-pref');
  //Sunny tried this
  const [selectedMeals, setSelectedMeals] = useState<{[key: string]: string}>({});
  const [selectedBrands, setSelectedBrands] = useState<{[key: string]: string}>({});

  function handleTabChange(eventKey: string | null) {
    if (eventKey !== 'user-pref' && eventKey !== 'meal-sel' && eventKey !== 'ingr-sel' && eventKey !== 'groc-sel') {
      throw new Error();
    }
    setActiveTab(eventKey ?? 'user-pref');
  }

  function activateStyle(key: NavKey) {
    return key === activeTab ? {} : {display: 'none'};
  }

  function handleNext() {
    const idx = navKeys.findIndex(d => d === activeTab) + 1;
    if (idx < navKeys.length) {
      setActiveTab(navKeys[idx]);
    }
  }

  function handlePrev() {
    const idx = navKeys.findIndex(d => d === activeTab) - 1;
    if (idx >= 0) {
      setActiveTab(navKeys[idx]);
    }
  }

  function handleKeyPressed(ev: KeyboardEvent) {
    // TODO: currently broken
    if (ev.key === 'ArrowLeft') {
      handlePrev();
    } else if (ev.key === 'ArrowRight') {
      handleNext();
    }
  }

  useEffect(() => {
    const preferences = loadPreferences();
    setPreferences(preferences);
    window.addEventListener('keydown', handleKeyPressed);
    return () => {
      savePreferences(preferences);
      window.removeEventListener('keydown', handleKeyPressed);
    };
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
        meals={[]}
      /></div>

      <Container>
        <div style={activateStyle('user-pref')}>
          <UserPreferences
            preferences={preferences}
            setPreferences={(preferences) => {
              savePreferences(preferences);
              setPreferences(preferences);
            }}
          />
        </div>
        <div style={activateStyle('meal-sel')}>
          <MealSelection selectedMeals={selectedMeals} setSelectedMeals={setSelectedMeals}/>
        </div>
        <div style={activateStyle('ingr-sel')}>
          <IngredientSelection selectedMeals={selectedMeals} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}/>
        </div>
      </Container>

      <ButtonGroup
        style={{maxWidth: 400, left: '50%', transform: 'translate(-50%, -50%)'}}
        size="lg"
        className="mb-2 position-fixed fixed-bottom"
      >
        <Button
          onClick={handlePrev}
          disabled={activeTab === 'user-pref'}
        >Back</Button>
        <Button
          onClick={handleNext}
          disabled={activeTab === 'groc-sel'}
        >Next</Button>
      </ButtonGroup>
    </>
  );
}
