import { useState, useContext, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext";
import {
  alphabet_characters,
  alphabet_uppercase_characters,
  numbers_characters,
  symbols_characters,
  alphabet_characters_with_accent,
  alphabet_characters_with_accent_replacements,
} from "../utils/";

function usePasswordGenerator() {
  const { settings } = useContext(GlobalContext);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const generatePasswordPronounceable = useCallback(async () => {
    if (!settings) {
      return;
    }

    let response = await fetch("/dict.json");
    response = await response.json();
    const arrayWords = response.arrayWords;
    
    const { num_words, word_uppercase, word_numbers, word_separator, accent_umlaut } = settings;

    let password = "";
    while (password.split(word_separator).length < num_words + 1) {
      let word = arrayWords[Math.floor(Math.random() * arrayWords.length)];
      if (word_uppercase) {
        word = word[0].toUpperCase() + word.slice(1);
      } else {
        word = word.toLowerCase();
      }
      if (word_numbers) {
        word += Math.floor(Math.random() * 100);
      }
      password += word + word_separator;
    }
    password = password.slice(0, -1);

    if (!accent_umlaut) {
      for (let i = 0; i < alphabet_characters_with_accent.length; i++) {
        const char = alphabet_characters_with_accent[i];
        const replacement = alphabet_characters_with_accent_replacements[i];
        password = password.replaceAll(char, replacement);
      }
    }

    setPassword(password);
    setError(null);
  }, [settings]);


  const generatePasswordRandom = useCallback(() => {
    if (!settings) {
      return;
    }
    const {
      length,
      uppercase,
      lowercase,
      numbers,
      symbols,
      no_repeated,
      start_with_letter,
      no_consecutive,
    } = settings;
    let password = "";
    let characters = "";
    if (uppercase) characters += alphabet_uppercase_characters;
    if (lowercase) characters += alphabet_characters;
    if (numbers) characters += numbers_characters;
    if (symbols) characters += symbols_characters;

    while (password.length < length) {
      if (characters.length < length && no_repeated) {
        setError(
          "No hay suficientes caracteres para generar una contraseña de longitud " +
            length +
            ". Por favor, cambie los ajustes."
        );
        return;
      }
      if (characters.length === 0 && password.length < length) {
        setError(
          `Imposible generar una contraseña de longitud ${length}. Por favor, cambie los ajustes.`
        );
        return;
      }

      const character =
        characters[Math.floor(Math.random() * characters.length)];

      if (no_consecutive) {
        const last_character = password[password.length - 1];
        if (
          alphabet_characters.includes(last_character) &&
          alphabet_characters.includes(character)
        ) {
          if (
            alphabet_characters.indexOf(character) -
              alphabet_characters.indexOf(last_character) ===
            1
          ) {
            continue;
          }
        }
        if (
          alphabet_uppercase_characters.includes(last_character) &&
          alphabet_uppercase_characters.includes(character)
        ) {
          if (
            alphabet_uppercase_characters.indexOf(character) -
              alphabet_uppercase_characters.indexOf(last_character) ===
            1
          ) {
            continue;
          }
        }
        if (
          numbers_characters.includes(last_character) &&
          numbers_characters.includes(character)
        ) {
          if (
            numbers_characters.indexOf(character) -
              numbers_characters.indexOf(last_character) ===
            1
          ) {
            continue;
          }
        }
      }
      if (start_with_letter && password.length === 0) {
        if (!lowercase && !uppercase) {
          setError(
            "Para empezar con una letra, debe seleccionar minúsculas o mayúsculas."
          );
          return;
        }
        if (
          !(alphabet_characters + alphabet_uppercase_characters).includes(
            character
          )
        ) {
          continue;
        }
      }
      if (no_repeated) {
        characters = characters.replace(character, "");
      }
      password += character;
    }
    setPassword(password);
    setError(null);
  }, [settings]);

  const generatePassword = useCallback(() => {
    if (!settings) {
      return;
    }

    if (settings.passwordType === "random") {
      generatePasswordRandom();
    } else {
      generatePasswordPronounceable();
    }
  }, [ settings ]);
  return {
    password,
    error,
    generatePassword,
  };
}

export default usePasswordGenerator;
