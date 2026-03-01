import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

function PasswordModeButtons() {
  const { settings, updateSettings } = useContext(GlobalContext);

  const passwordType = settings?.passwordType;

  const handlePasswordType = (type) => {
    if (!type || type === passwordType) {
      return;
    }

    updateSettings({ passwordType: type });
  };

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
