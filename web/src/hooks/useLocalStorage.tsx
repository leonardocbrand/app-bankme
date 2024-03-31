import { useState } from 'react';

type UseLocalStorageReturn = {
  value: string,
  setItem: (newValue: string) => void
};

function useLocalStorage(key: string, initialValue: string): UseLocalStorageReturn {
  const storedValue = localStorage.getItem(key);

  const [value, setValue] = useState(storedValue || initialValue);

  const setItem = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return { value, setItem };
}

export default useLocalStorage;
