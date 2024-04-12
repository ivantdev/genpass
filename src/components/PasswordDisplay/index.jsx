import PropTypes from 'prop-types';
import React from 'react';
import ContentCopy from '../../assets/icons/ContentCopy';
import Autorenew from '../../assets/icons/Autorenew';
import { characterClass, copyToClipboard } from '../../utils';

function PasswordDisplay({ password, generatePassword }) {
  return (
    <section>
      <div className="password__container">
        <div className="password__text">
          <span className='to-select'>{password}</span>
          {
            password.split('').map((char, index) => (
              <React.Fragment key={index}>
                <span className={characterClass(char)}>{char}</span>
              </React.Fragment>
            ))
          }
        </div>
        <button onClick={() => {
          copyToClipboard(password)
        }}>
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