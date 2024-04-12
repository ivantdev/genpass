import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import LightMode from '../../assets/icons/LightMode';
import DarkMode from '../../assets/icons/DarkMode';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(GlobalContext);
  return (
    <div className="theme">
      <button onClick={toggleTheme}>
        {theme === 'light' ? <DarkMode /> : <LightMode />}
      </button>
    </div>
  )
}

export default ThemeSwitcher;