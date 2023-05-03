import { PreferenceTitle, Preferences } from '../data/preferences';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

interface UserPreferencesProp {
  preferences: Preferences;
  setPreferences: (p: Preferences) => void;
}

function getVariant(idx: number) {
  return ['outline-success', 'outline-secondary', 'outline-danger'][idx];
}

function getPreferenceValue(value: string) {
  return { true: true, false: false }[value] ?? null;
}

const buttonValues: [string, boolean | null][] = [
  ['Yes', true],
  ['Maybe', null],
  ['No', false],
];

export default function UserPreferences({
  preferences,
  setPreferences,
}: UserPreferencesProp) {
  function onToggle(name: PreferenceTitle) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setPreferences(
        new Map<PreferenceTitle, boolean | null>([
          ...preferences,
          [name, getPreferenceValue(e.currentTarget.value)],
        ]),
      );
    };
  }

  return (
    <div className='m-3'>
      {[...preferences.keys()]
        .filter(name => name !== 'Lamb' && name !== 'Cilantro')
        .map((name, i) => (
          <div
            className='d-flex flex-row justify-content-between m-2'
            key={`preference-${i}`}
          >
            <div>{name}</div>
            <ButtonGroup>
              {buttonValues.map(([text, val], idx) => (
                <ToggleButton
                  key={`${name}-${idx}`}
                  id={`radio-${name}-${idx}`}
                  type='radio'
                  variant={getVariant(idx)}
                  name={`radio-${name}`}
                  value={val + ''}
                  checked={preferences.get(name) === val}
                  onChange={onToggle(name)}
                >
                  {text}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
        ))}
    </div>
  );
}
