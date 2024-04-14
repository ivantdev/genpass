import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useLocalStorage from "../hooks/useLocalStorage";
import { setDefaultNewSettings } from "../utils";
import { defaultStorage } from "../utils/";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [theme, setTheme] = useState();
  const [settings, setSettings] = useState();
  const { storage, saveStorage } = useLocalStorage("ivant_dev_genpass", defaultStorage);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    saveStorage({
      ...storage,
      theme: theme === "light" ? "dark" : "light",
    })
  };

  useEffect(() => {
    if (storage) {
      setTheme(storage.theme);
      setSettings(storage.settings);
    }
    
    if (storage && storage.storageVersion !== defaultStorage.storageVersion) {
      setDefaultNewSettings(storage, saveStorage);
    }
  }, [ storage ]);



  return (
    <GlobalContext.Provider value={{ theme, toggleTheme, settings, storage, saveStorage }}>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GlobalContext, GlobalContextProvider };