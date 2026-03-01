import { useCallback, useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storage, setStorage] = useState(initialValue);

  useEffect(() => {
    try {
      let parsedItem;
      const localStorageItem = window.localStorage.getItem(key);
      if (!localStorageItem) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        parsedItem = initialValue;
      } else {
        parsedItem = JSON.parse(localStorageItem);
      }
      setStorage(parsedItem);
    } catch (error) {
      console.log(error);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveStorage = useCallback((newItem) => {
    try {
      setStorage((currentStorage) => {
        const nextItem =
          typeof newItem === "function" ? newItem(currentStorage) : newItem;

        if (!nextItem) {
          return currentStorage;
        }

        const currentSerialized = JSON.stringify(currentStorage);
        const nextSerialized = JSON.stringify(nextItem);

        if (currentSerialized === nextSerialized) {
          return currentStorage;
        }

        window.localStorage.setItem(key, nextSerialized);
        return nextItem;
      });
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  return {
    storage,
    saveStorage,
  };
}

export default useLocalStorage;
