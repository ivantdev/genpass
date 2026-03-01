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
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="form__intro">
        <p className="form__eyebrow">Recordable</p>
        <h2 className="form__title">Ajustes de palabras</h2>
        <p className="form__subtitle">Ajusta formato, cantidad y legibilidad de las claves basadas en palabras.</p>
      </div>
      <div className="settings-group">
        <div className="form__field form__field--range">
          <div className="form__field-head">
            <label className="form__label" htmlFor="num_words">Cantidad</label>
            <span className="form__value">{settings.num_words} palabras</span>
          </div>
          <CustomRange
            name={"num_words"}
            label="cantidad de palabras"
            min={1}
            max={8}
            initialValue={settings.num_words}
            onChange={handleChangeSettings}
          />
        </div>
        <div className="form__field">
          <input type="checkbox" id="word_uppercase" name="word_uppercase" checked={settings.word_uppercase} onChange={handleChangeSettings} />
          <label className="label__checkbox" htmlFor="word_uppercase">Mayúscula
            <span className='field__example'>Si</span>
            <span className='field__example tachado'>no</span>
          </label>
        </div>
        <div className="form__field">
          <input type="checkbox" id="word_numbers" name="word_numbers" checked={settings.word_numbers} onChange={handleChangeSettings} />
          <label className="label__checkbox" htmlFor="word_numbers">Números
            <span className='field__example'>Uno12</span>
            <span className='field__example tachado'>Uno</span>
          </label>
        </div>
        <div className="form__field">
          <input type="checkbox" id="accent_umlaut" name="accent_umlaut" checked={settings.accent_umlaut} onChange={handleChangeSettings} />
          <label className="label__checkbox" htmlFor="accent_umlaut">Tildes y diéresis
            <span className='field__example'>Fácil</span>
            <span className='field__example'>Güey</span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default SettingsFormPronounceable;
