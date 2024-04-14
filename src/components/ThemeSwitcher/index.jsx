import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import LightModeIcon from '../../assets/icons/LightMode';
import DarkModeIcon from '../../assets/icons/DarkMode';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(GlobalContext);
  return (
    <div className="theme">
      <button onClick={toggleTheme}>
        {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </button>
    </div>
  )
}

export default ThemeSwitcher;