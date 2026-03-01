const alphabet_characters = "abcdefghijklmnñopqrstuvwxyz";
const alphabet_uppercase_characters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const numbers_characters = "0123456789";
const symbols_characters = "`~!@#$%^&*();':\",.<>?/\\|{}[]-_=+";

const alphabet_characters_with_accent = "áéíóúüÁÉÍÓÚÜ";
const alphabet_characters_with_accent_replacements = "aeiouuAEIOUU";
const HISTORY_ENTRY_LIMIT = 6;
const historyRetentionOptions = [
  { value: 5, label: "5 minutos" },
  { value: 15, label: "15 minutos" },
  { value: 60, label: "1 hora" },
  { value: 360, label: "6 horas" },
  { value: 1440, label: "24 horas" },
  { value: 0, label: "Nunca" },
];

const copyToClipboard = (password) => {
  return navigator.clipboard.writeText(password);
};

const characterClass = (char) => {
  if (alphabet_characters.includes(char)) {
    return "char__letter";
  }
  if (numbers_characters.includes(char)) {
    return "char__number";
  }
  if (symbols_characters.includes(char)) {
    return "char__symbol";
  }
};

const defaultStorage = {
  storageVersion: "0.0.15",
  theme: "light",
  settings: {
    passwordType: "random",
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excluded_characters: "",
    no_repeated: false,
    start_with_letter: false,
    no_consecutive: true,
    num_words: 2,
    word_uppercase: true,
    word_numbers: true,
    word_separator: "-",
    accent_umlaut: true,
  },
  preferences: {
    auto_copy: false,
    store_history: false,
    history_ttl_minutes: 60,
  },
  history: [],
};

const mergeStorageWithDefaults = (storage) => ({
  ...defaultStorage,
  ...storage,
  settings: {
    ...defaultStorage.settings,
    ...storage?.settings,
  },
  preferences: {
    ...defaultStorage.preferences,
    ...storage?.preferences,
  },
  history: Array.isArray(storage?.history) ? storage.history : [],
});

const prunePasswordHistory = (history, ttlMinutes, now = Date.now()) => {
  if (!Array.isArray(history)) {
    return [];
  }

  const boundedHistory = history
    .filter((entry) => entry && typeof entry.value === "string" && typeof entry.createdAt === "number")
    .slice(0, HISTORY_ENTRY_LIMIT);

  if (!ttlMinutes || ttlMinutes <= 0) {
    return boundedHistory;
  }

  const ttlMs = ttlMinutes * 60 * 1000;

  return boundedHistory.filter((entry) => now - entry.createdAt < ttlMs);
};

const getPasswordStrength = (password) => {
  if (!password) {
    return {
      label: "Vacía",
      tone: "weak",
    };
  }

  let score = 0;
  const hasLowercase = /[a-záéíóúüñ]/i.test(password);
  const hasUppercase = /[A-ZÁÉÍÓÚÜÑ]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]/.test(password);
  const variety = [hasLowercase, hasUppercase, hasNumbers, hasSymbols].filter(Boolean).length;

  if (password.length >= 10) score += 1;
  if (password.length >= 16) score += 1;
  if (password.length >= 24) score += 1;
  if (variety >= 2) score += 1;
  if (variety >= 3) score += 1;

  if (score <= 2) {
    return {
      label: "Débil",
      tone: "weak",
    };
  }

  if (score <= 4) {
    return {
      label: "Media",
      tone: "medium",
    };
  }

  return {
    label: "Fuerte",
    tone: "strong",
  };
};

const formatRelativeTime = (timestamp, now = Date.now()) => {
  const diffMs = Math.max(0, now - timestamp);
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) {
    return "ahora";
  }

  if (diffMinutes < 60) {
    return `hace ${diffMinutes} min`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `hace ${diffHours} h`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `hace ${diffDays} d`;
};

const setDefaultNewSettings = (storage, saveStorage) => {
  saveStorage(mergeStorageWithDefaults(storage));
};



export {
  copyToClipboard,
  characterClass,
  setDefaultNewSettings,
  mergeStorageWithDefaults,
  prunePasswordHistory,
  getPasswordStrength,
  formatRelativeTime,
  historyRetentionOptions,
  HISTORY_ENTRY_LIMIT,
  alphabet_characters,
  alphabet_uppercase_characters,
  numbers_characters,
  symbols_characters,
  alphabet_characters_with_accent,
  alphabet_characters_with_accent_replacements,
  defaultStorage,
};
