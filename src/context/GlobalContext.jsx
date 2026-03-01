import { createContext, useCallback, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import useLocalStorage from "../hooks/useLocalStorage";
import { defaultStorage, mergeStorageWithDefaults, prunePasswordHistory } from "../utils/";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const { storage, saveStorage } = useLocalStorage("ivant_dev_genpass", defaultStorage);
  const normalizedStorage = useMemo(
    () => mergeStorageWithDefaults(storage ?? defaultStorage),
    [storage]
  );
  const theme = normalizedStorage.theme;
  const settings = normalizedStorage.settings;
  const preferences = normalizedStorage.preferences;
  const history = normalizedStorage.history;

  const persistStorage = useCallback((updater) => {
    saveStorage((currentStorage) => {
      const normalizedStorage = mergeStorageWithDefaults(currentStorage ?? defaultStorage);
      const nextStorage = typeof updater === "function" ? updater(normalizedStorage) : updater;
      return mergeStorageWithDefaults(nextStorage);
    });
  }, [saveStorage]);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "light" ? "dark" : "light";
    persistStorage((currentStorage) => ({
      ...currentStorage,
      theme: nextTheme,
    }));
  }, [persistStorage, theme]);

  const updatePreferences = useCallback((changes) => {
    persistStorage((currentStorage) => {
      const nextPreferences = {
        ...currentStorage.preferences,
        ...changes,
      };

      return {
        ...currentStorage,
        preferences: nextPreferences,
        history: nextPreferences.store_history
          ? prunePasswordHistory(currentStorage.history, nextPreferences.history_ttl_minutes)
          : [],
      };
    });
  }, [persistStorage]);

  const updateSettings = useCallback((changes) => {
    persistStorage((currentStorage) => ({
      ...currentStorage,
      settings: {
        ...currentStorage.settings,
        ...changes,
      },
    }));
  }, [persistStorage]);

  const clearHistory = useCallback(() => {
    persistStorage((currentStorage) => ({
      ...currentStorage,
      history: [],
    }));
  }, [persistStorage]);

  const removeHistoryEntry = useCallback((entryId) => {
    persistStorage((currentStorage) => ({
      ...currentStorage,
      history: currentStorage.history.filter((entry) => entry.id !== entryId),
    }));
  }, [persistStorage]);

  const pruneExpiredHistory = useCallback(() => {
    persistStorage((currentStorage) => {
      const nextHistory = currentStorage.preferences.store_history
        ? prunePasswordHistory(currentStorage.history, currentStorage.preferences.history_ttl_minutes)
        : [];

      return {
        ...currentStorage,
        history: nextHistory,
      };
    });
  }, [persistStorage]);

  const addHistoryEntry = useCallback((value) => {
    if (!value) {
      return;
    }

    persistStorage((currentStorage) => {
      if (!currentStorage.preferences.store_history) {
        return currentStorage;
      }

      const nextHistory = prunePasswordHistory(
        currentStorage.history,
        currentStorage.preferences.history_ttl_minutes
      );

      return {
        ...currentStorage,
        history: [{
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          value,
          createdAt: Date.now(),
          passwordType: currentStorage.settings.passwordType,
        }, ...nextHistory].slice(0, 6),
      };
    });
  }, [persistStorage]);

  useEffect(() => {
    const sanitizedHistory = normalizedStorage.preferences.store_history
      ? prunePasswordHistory(normalizedStorage.history, normalizedStorage.preferences.history_ttl_minutes)
      : [];

    const nextStorage = {
      ...normalizedStorage,
      history: sanitizedHistory,
    };

    if (JSON.stringify(normalizedStorage) !== JSON.stringify(nextStorage)) {
      saveStorage(nextStorage);
    }
  }, [normalizedStorage, saveStorage]);


  return (
    <GlobalContext.Provider
      value={{
        theme,
        toggleTheme,
        settings,
        preferences,
        history,
        storage,
        saveStorage,
        updateSettings,
        updatePreferences,
        clearHistory,
        removeHistoryEntry,
        addHistoryEntry,
        pruneExpiredHistory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GlobalContext, GlobalContextProvider };
