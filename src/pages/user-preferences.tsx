import { Preferences } from '../types';
import PreferenceEntry from '../components/preference-entry';

interface UserPreferencesProp {
  preferences: Preferences;
  setPreferences: (p: Preferences) => void;
}

export default function UserPreferences({
  preferences,
  setPreferences,
}: UserPreferencesProp) {
  function isKey(k: string): k is keyof Preferences {
    return k in preferences;
  }

  function makeEntry(name: string, index: number) {
    if (!isKey(name)) {
      throw new Error();
    }

    return (
      <PreferenceEntry
        key={index}
        name={name}
        value={preferences[name]}
        setValue={(value) => setPreferences({ ...preferences, [name]: value })}
      />
    );
  }

  return (
    <div className='m-3'>
      {Object.keys(preferences).map(makeEntry)}
    </div>
  );
}
