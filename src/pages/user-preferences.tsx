import {Dispatch, SetStateAction} from 'react';

import {Preferences} from '../types';
import PreferenceEntry from '../components/preference-entry';
import {types} from '../utils/is-preferences';

interface UserPreferencesProp {
  preferences: Preferences;
  setPreferences: Dispatch<SetStateAction<Preferences>>;
};

export default function UserPreferences({preferences, setPreferences}: UserPreferencesProp) {
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

  return <div className="m-2">
    {Object.keys(types).map(makeEntry)}
  </div>;
}
