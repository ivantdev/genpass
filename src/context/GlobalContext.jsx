import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useLocalStorage from "../hooks/useLocalStorage";

const GlobalContext = createContext();

const defaultStorage = {
  theme: "dark",
  settings: {
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    no_repeated: false,
    start_with_letter: false,
    no_consecutive: true,
  },
};

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