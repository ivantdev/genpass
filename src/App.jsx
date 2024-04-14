import { useContext, useEffect } from 'react';
import { GlobalContext } from './context/GlobalContext.jsx';
import usePasswordGenerator from './hooks/usePasswordGenerator.js';
import ThemeSwitcher from './components/ThemeSwitcher';
import PasswordDisplay from './components/PasswordDisplay/index.jsx';
import SettingsFormCustom from './components/SettingsFormRandom/index.jsx';
import DisplayError from './components/ErrorDisplay/index.jsx';
import DescriptionDisplay from './components/DescriptionDisplay/index.jsx';
import AppBackground from './components/BackgroundApp/index.jsx';
import './App.css'
import PasswordModeButtons from './components/PasswordModeButtons/index.jsx';
import SettingsFormPronounceable from './components/SettingsFormPronounceable/index.jsx';

function App() {
  const { theme, settings } = useContext(GlobalContext);
  const { password, error, generatePassword } = usePasswordGenerator();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  if (!settings) {
    return null;
  }

  return (
    <>
      <AppBackground />
      <header>
        <h1>Generador de contraseñas seguras</h1>
        <p>Proteja sus cuentas en Internet usando contraseñas <span className='bold'>seguras</span>.</p>
      </header>
      <main>
        <PasswordModeButtons />
        <PasswordDisplay password={password} generatePassword={generatePassword} />
        <DisplayError error={error} />
        {
          settings.passwordType === "random" && <SettingsFormCustom />
        }
        {
          settings.passwordType === "pronounceable" && <SettingsFormPronounceable />
        }
      </main>
      <DescriptionDisplay />
      <ThemeSwitcher />
    </>
  )
}

export default App;
