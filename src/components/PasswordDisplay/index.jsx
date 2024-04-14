import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ContentCopy from '../../assets/icons/ContentCopy';
import Autorenew from '../../assets/icons/Autorenew';
import { characterClass, copyToClipboard } from '../../utils';

function PasswordDisplay({ password, generatePassword }) {
  const [passwordArray, setPasswordArray] = useState([]);
  const [animationArray, setAnimationArray] = useState([]);
  const cancelToken = useRef(0);

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const currentToken = ++cancelToken.current;
    setPasswordArray([]);
    setAnimationArray([]);
    let shuffledPassword = shuffle(password.split(''));
    setAnimationArray(shuffledPassword);

    const rotate = async () => {
      for (let i = 0; i < password.length; i++) {
        await sleep(10);
        if (currentToken !== cancelToken.current) return;
        setPasswordArray((prev) => [...prev, password[i]]);
        setAnimationArray((prev) => shuffle(prev.slice(1)));
      }
    };
    rotate();
  }, [password]);

  return (
    <section>
      <div className="password__container">
        <div className="password__text">
          <span className='to-select'>{password}</span>
          {passwordArray.map((char, index) => (
            <React.Fragment key={`${index}-${char}`}>
              <span className={characterClass(passwordArray[index])}>{char}</span>
            </React.Fragment>
          ))}
          {animationArray.map((char, index) => (
            <React.Fragment key={`${index}-${char}`}>
              <span 
                className={characterClass(animationArray[index]) + " rotateX"}
                style={{"--speed": `${Math.floor(Math.random() * 100) + 100}ms`}}
              >
                {char}
              </span>
            </React.Fragment>
          ))}
        </div>
        <button onClick={() => copyToClipboard(password)}>
          <ContentCopy />
        </button>
        <button onClick={generatePassword}>
          <Autorenew />
        </button>
      </div>
    </section>
  );
}

PasswordDisplay.propTypes = {
  password: PropTypes.string.isRequired,
  generatePassword: PropTypes.func.isRequired,
};

export default PasswordDisplay;
