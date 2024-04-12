import { useState, useContext, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext";
import {
  alphabet_characters,
  alphabet_uppercase_characters,
  numbers_characters,
  symbols_characters,
} from "../utils/";

function usePasswordGenerator() {
  const { settings } = useContext(GlobalContext);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const generatePassword = useCallback(() => {
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
  return {
    password,
    error,
    generatePassword,
  };
}

export default usePasswordGenerator;
