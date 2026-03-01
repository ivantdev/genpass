import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import CustomRange from "../CustomRange";

function SettingsFormRandom() {
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
        <p className="form__eyebrow">Aleatoria</p>
        <h2 className="form__title">Ajustes de generación</h2>
        <p className="form__subtitle">Controla longitud, composición y restricciones para evitar caracteres conflictivos.</p>
      </div>
      <div className="settings-group">
        <div className="form__field form__field--range">
          <div className="form__field-head">
            <label className="form__label" htmlFor="length">Longitud</label>
            <span className="form__value">{settings.length} caracteres</span>
          </div>
          <CustomRange name={"length"} min={4} max={64} initialValue={settings.length} onChange={handleChangeSettings} />
        </div>
        <div className="form__field">
          <input type="checkbox" id="uppercase" name="uppercase" checked={settings.uppercase} onChange={handleChangeSettings} />
          <label className="label__checkbox" htmlFor="uppercase">Mayúsculas <span className='field__example'>ABC</span></label>
        </div>
        <div className="form__field">
          <input type="checkbox" id="lowercase" name="lowercase" checked={settings.lowercase} onChange={handleChangeSettings} />
          <label className="label__checkbox" htmlFor="lowercase">Minúsculas <span className='field__example'>abc</span></label>
        </div>
        <div className="form__field">
          <input type="checkbox" id="numbers" name="numbers" checked={settings.numbers} onChange={handleChangeSettings} />
          <label className="label__checkbox" htmlFor="numbers">Números <span className='field__example'>123</span></label>
        </div>
        <div className="form__field">
          <input type="checkbox" id="symbols" name="symbols" checked={settings.symbols} onChange={handleChangeSettings} />
          <label className="label__checkbox" htmlFor="symbols">Símbolos <span className='field__example'>!@#</span></label>
        </div>
        <div className="form__field form__field--stacked">
          <label className="form__label" htmlFor="excluded_characters">Caracteres excluidos</label>
          <input
            id="excluded_characters"
            name="excluded_characters"
            type="text"
            className="form__text-input"
            value={settings.excluded_characters ?? ""}
            onChange={handleChangeSettings}
            placeholder="Ej: O0Il1{}"
            autoComplete="off"
            spellCheck={false}
          />
          <p className="form__help">Cada carácter escrito aquí se elimina del conjunto permitido antes de generar la contraseña.</p>
        </div>
        <div className="form__field">
          <input type="checkbox" id="no_repeated" name="no_repeated" checked={settings.no_repeated} onChange={handleChangeSettings} />
          <label className="label__checkbox" htmlFor="no_repeated">Caracteres únicos
            <span className='field__example tachado'>AA11</span>
          </label>
        </div>
        <div className="form__field">
          <input type="checkbox" id="start_with_letter" name="start_with_letter" checked={settings.start_with_letter} onChange={handleChangeSettings} />
          <label className="label__checkbox" htmlFor="start_with_letter">Empezar con una letra
            <span className='field__example'>A!2</span>
          </label>
        </div>
        <div className="form__field">
          <input type="checkbox" id="no_consecutive" name="no_consecutive" checked={settings.no_consecutive} onChange={handleChangeSettings} />
          <label className="label__checkbox" htmlFor="no_consecutive">Sin consecutivos
            <span className='field__example tachado'>abc</span>
            <span className='field__example tachado'>123</span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default SettingsFormRandom;
