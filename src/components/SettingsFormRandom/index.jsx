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
  }
  return (
    <form onChange={handleChangeSettings}>
      <div className="form__field">
        <label htmlFor="length">{settings.length} caracteres</label>
        <CustomRange name={"length"} min={4} max={64} initialValue={settings.length} onChange={handleChangeSettings} />
      </div>
      <div className="form__field">
        <input type="checkbox" readOnly id="uppercase" name="uppercase" checked={settings.uppercase} />
        <label className="label__checkbox" htmlFor="uppercase">Mayúsculas <span className='field__example'>ABC</span></label>
      </div>
      <div className="form__field">
        <input type="checkbox" readOnly id="lowercase" name="lowercase" checked={settings.lowercase} />
        <label className="label__checkbox" htmlFor="lowercase">Minúsculas <span className='field__example'>abc</span></label>
      </div>
      <div className="form__field">
        <input type="checkbox" readOnly id="numbers" name="numbers" checked={settings.numbers} />
        <label className="label__checkbox" htmlFor="numbers">Números <span className='field__example'>123</span></label>
      </div>
      <div className="form__field">
        <input type="checkbox" readOnly id="symbols" name="symbols" checked={settings.symbols} />
        <label className="label__checkbox" htmlFor="symbols">Símbolos <span className='field__example'>!@#</span></label>
      </div>
      <div className="form__field">
        <input type="checkbox" readOnly id="no_repeated" name="no_repeated" checked={settings.no_repeated} />
        <label className="label__checkbox" htmlFor="no_repeated">Caracteres únicos
          <span className='field__example tachado'>AA11</span>
        </label>
      </div>
      <div className="form__field">
        <input type="checkbox" readOnly id="start_with_letter" name="start_with_letter" checked={settings.start_with_letter} />
        <label className="label__checkbox" htmlFor="start_with_letter">Empezar con una letra
          <span className='field__example'>A!2</span>
        </label>
      </div>
      <div className="form__field">
        <input type="checkbox" readOnly id="no_consecutive" name="no_consecutive" checked={settings.no_consecutive} />
        <label className="label__checkbox" htmlFor="no_consecutive">Sin consecutivos
          <span className='field__example tachado'>abc</span>
          <span className='field__example tachado'>123</span>
        </label>
      </div>
    </form>
  );
}

export default SettingsFormRandom;