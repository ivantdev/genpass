import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import CustomRange from "../CustomRange";

function SettingsFormPronounceable() {
  const { settings, storage, saveStorage } = useContext(GlobalContext);
  const handleChangeSettings = (e) => {
    const { name, type } = e.target;
    let value = type === 'checkbox' ? e.target.checked : e.target.value;
    if (type === 'range') {
      value = parseInt(value);
    }

    saveStorage({
      ...storage,
      settings: {
        ...storage.settings,
        [name]: value,
      },
    });
  }
  return (
    <form onChange={handleChangeSettings}>
      <div className="form__field">
        <label htmlFor="num_words">{settings.num_words} palabras</label>
        <CustomRange name={"num_words"} min={2} max={8} initialValue={settings.num_words} onChange={handleChangeSettings} />
      </div>
      <div className="form__field">
        <input type="checkbox" readOnly id="word_uppercase" name="word_uppercase" checked={settings.word_uppercase} />
        <label className="label__checkbox" htmlFor="word_uppercase">Mayúscula
          <span className='field__example'>Si</span>
          <span className='field__example tachado'>no</span>
        </label>
      </div>
      <div className="form__field">
        <input type="checkbox" readOnly id="word_numbers" name="word_numbers" checked={settings.word_numbers} />
        <label className="label__checkbox" htmlFor="word_numbers">Números
          <span className='field__example'>Uno12</span>
          <span className='field__example tachado'>Uno</span>
        </label>
      </div>
      <div className="form__field">
        <input type="checkbox" readOnly id="accent_umlaut" name="accent_umlaut" checked={settings.accent_umlaut} />
        <label className="label__checkbox" htmlFor="accent_umlaut">Tildes y diéresis
          <span className='field__example'>Fácil</span>
          <span className='field__example'>Güey</span>
        </label>
      </div>
    </form>
  );
}

export default SettingsFormPronounceable;