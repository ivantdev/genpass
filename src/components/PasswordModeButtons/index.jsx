import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

function PasswordModeButtons() {
  const { storage, saveStorage } = useContext(GlobalContext);
  const [passwordType, setPasswordType] = useState(storage.settings.passwordType);

  const handlePasswordType = (type) => {
    setPasswordType(type);
  }

  useEffect(() => {
    if (!passwordType) return;

    saveStorage({
      ...storage,
      settings: {
        ...storage.settings,
        passwordType,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ passwordType ]);

  useEffect(() => {
    if (!storage) return;
    setPasswordType(storage.settings.passwordType);
  }, [ storage ]);

  return (
    <div className='password__types'>
      <button
        type="button"
        className={passwordType === 'random' ? 'active' : ''}
        onClick={(e) => {
          e.preventDefault();
          handlePasswordType('random');
      }}>
        Aleatoria
      </button>
      <button
        type="button"
        className={passwordType === 'pronounceable' ? 'active' : ''}
        onClick={(e) => {
          e.preventDefault();
          handlePasswordType('pronounceable');
      }}>
        Recordable
      </button>
    </div>
  );
}

export default PasswordModeButtons;