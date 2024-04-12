import { useContext, useEffect } from 'react';
import { GlobalContext } from './context/GlobalContext.jsx';
import usePasswordGenerator from './hooks/usePasswordGenerator.js';
import ThemeSwitcher from './components/ThemeSwitcher';
import PasswordDisplay from './components/PasswordDisplay/index.jsx';
import SettingsForm from './components/SettingsForm/index.jsx';
import './App.css'
import DisplayError from './components/ErrorDisplay/index.jsx';
import DesciptionDisplay from './components/DesciptionDisplay/index.jsx';

function App() {
  const { theme, settings } = useContext(GlobalContext);
  const { password, error, generatePassword } = usePasswordGenerator();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [ theme ]);

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ settings ]);

  if (!settings) {
    return null;
  }

  return (
    <>
      <header>
        <h1>Generador de contraseñas seguras</h1>
        <p>Proteja sus cuentas en Internet usando contraseñas <span className='bold'>seguras</span>.</p>
      </header>
      <main>
        <PasswordDisplay password={password} generatePassword={generatePassword} />
        <DisplayError error={error} />
        <SettingsForm />
      </main>
      <DesciptionDisplay />
      <ThemeSwitcher />
    </>
  )
}

export default App;
