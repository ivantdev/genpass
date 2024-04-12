import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import CustomRange from "../../CustomRange";

function SettingsForm() {
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
        <label htmlFor="length">Longitud de la contraseña: {settings.length}</label>
        <CustomRange name={"length"} min={4} max={64} initialValue={settings.length} onChange={null} />
      </div>
      <div className="form__field">
        <input type="checkbox" id="uppercase" name="uppercase" checked={settings.uppercase} />
        <label className="label__checkbox" htmlFor="uppercase">Incluir mayúsculas <span className='field__example'>ABC</span></label>
      </div>
      <div className="form__field">
        <input type="checkbox" id="lowercase" name="lowercase" checked={settings.lowercase} />
        <label className="label__checkbox" htmlFor="lowercase">Incluir minúsculas <span className='field__example'>abc</span></label>
      </div>
      <div className="form__field">
        <input type="checkbox" id="numbers" name="numbers" checked={settings.numbers} />
        <label className="label__checkbox" htmlFor="numbers">Incluir números <span className='field__example'>123</span></label>
      </div>
      <div className="form__field">
        <input type="checkbox" id="symbols" name="symbols" checked={settings.symbols} />
        <label className="label__checkbox" htmlFor="symbols">Incluir símbolos <span className='field__example'>!@#</span></label>
      </div>
      <div className="form__field">
        <input type="checkbox" id="no_repeated" name="no_repeated" checked={settings.no_repeated} />
        <label className="label__checkbox" htmlFor="no_repeated">Sin repetidos <span className='field__example tachado'>AA11</span></label>
      </div>
      <div className="form__field">
        <input type="checkbox" id="start_with_letter" name="start_with_letter" checked={settings.start_with_letter} />
        <label className="label__checkbox" htmlFor="start_with_letter">Empezar con una letra <span className='field__example'>a^4</span></label>
      </div>
      <div className="form__field">
        <input type="checkbox" id="no_consecutive" name="no_consecutive" checked={settings.no_consecutive} />
        <label className="label__checkbox" htmlFor="no_consecutive">Sin consecutivos <span className='field__example tachado'>abc123</span></label>
      </div>
    </form>
  );
}

export default SettingsForm;