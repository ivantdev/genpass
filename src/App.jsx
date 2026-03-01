import { useContext, useEffect, useMemo, useRef } from 'react';
import { GlobalContext } from './context/GlobalContext.jsx';
import usePasswordGenerator from './hooks/usePasswordGenerator.js';
import ThemeSwitcher from './components/ThemeSwitcher';
import PasswordDisplay from './components/PasswordDisplay/index.jsx';
import SettingsFormCustom from './components/SettingsFormRandom/index.jsx';
import DisplayError from './components/ErrorDisplay/index.jsx';
import AppBackground from './components/BackgroundApp/index.jsx';
import './App.css'
import PasswordModeButtons from './components/PasswordModeButtons/index.jsx';
import SettingsFormPronounceable from './components/SettingsFormPronounceable/index.jsx';
import SidebarPanel from './components/SidebarPanel/index.jsx';

function App() {
  const { theme, settings } = useContext(GlobalContext);
  const { password, error, generatePassword } = usePasswordGenerator();
  const settingsSignature = useMemo(() => JSON.stringify(settings), [settings]);
  const lastGeneratedSettingsSignature = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!settingsSignature) {
      return;
    }

    if (lastGeneratedSettingsSignature.current === settingsSignature) {
      return;
    }

    const shouldRecordHistory = lastGeneratedSettingsSignature.current !== null;
    lastGeneratedSettingsSignature.current = settingsSignature;

    generatePassword({
      recordHistory: shouldRecordHistory,
      autoCopy: false,
    });
  }, [generatePassword, settingsSignature]);

  if (!settings) {
    return null;
  }

  return (
    <>
      <AppBackground />
      <header className="app-header">
        <p className="app-header__eyebrow">Generación local</p>
        <h1>Generador de contraseñas seguras</h1>
        <p className="app-header__description">Proteja sus cuentas en Internet usando contraseñas <span className='bold'>seguras</span>, únicas y ajustadas a sus necesidades.</p>
      </header>
      <main className="app-shell">
        <section className="app-generator">
          <PasswordModeButtons />
          <PasswordDisplay password={password} generatePassword={generatePassword} />
          <DisplayError error={error} />
          {
            settings.passwordType === "random" && <SettingsFormCustom />
          }
          {
            settings.passwordType === "pronounceable" && <SettingsFormPronounceable />
          }
        </section>
        <aside className="app-sidebar">
          <SidebarPanel />
        </aside>
      </main>
      <ThemeSwitcher />
    </>
  )
}

export default App;
