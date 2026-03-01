import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import LightModeIcon from '../../assets/icons/LightMode';
import DarkModeIcon from '../../assets/icons/DarkMode';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(GlobalContext);
  const nextThemeLabel = theme === 'light' ? 'Activar tema oscuro' : 'Activar tema claro';

  return (
    <div className="theme">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={nextThemeLabel}
        title={nextThemeLabel}
      >
        {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </button>
    </div>
  )
}

export default ThemeSwitcher;
