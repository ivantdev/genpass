import { useState, useEffect } from "react";

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

  const saveStorage = (newItem) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newItem));
      setStorage(newItem);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    storage,
    saveStorage,
  };
}

export default useLocalStorage;
