const alphabet_characters = "abcdefghijklmnñopqrstuvwxyz";
const alphabet_uppercase_characters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const numbers_characters = "0123456789";
const symbols_characters = "`~!@#$%^&*();':\",.<>?/\\|{}[]-_=+";

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

export {
  copyToClipboard,
  characterClass,
  alphabet_characters,
  alphabet_uppercase_characters,
  numbers_characters,
  symbols_characters,
};
