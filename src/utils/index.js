const alphabet_characters = "abcdefghijklmnñopqrstuvwxyz";
const alphabet_uppercase_characters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const numbers_characters = "0123456789";
const symbols_characters = "`~!@#$%^&*();':\",.<>?/\\|{}[]-_=+";

const alphabet_characters_with_accent = "áéíóúüÁÉÍÓÚÜ";
const alphabet_characters_with_accent_replacements = "aeiouuAEIOUU";

const copyToClipboard = (password) => {
  navigator.clipboard.writeText(password);
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
  storageVersion: "0.0.11",
  theme: "light",
  settings: {
    passwordType: "random",
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    no_repeated: false,
    start_with_letter: false,
    no_consecutive: true,
    num_words: 4,
    word_uppercase: true,
    word_numbers: true,
    word_separator: "-",
    accent_umlaut: true,
  },
};

const setDefaultNewSettings = (storage, saveStorage) => {
  saveStorage({
    ...defaultStorage,
    ...storage,
    settings: {
      ...storage.settings,
    },
  });
}



export {
  copyToClipboard,
  characterClass,
  setDefaultNewSettings,
  alphabet_characters,
  alphabet_uppercase_characters,
  numbers_characters,
  symbols_characters,
  alphabet_characters_with_accent,
  alphabet_characters_with_accent_replacements,
  defaultStorage,
};

