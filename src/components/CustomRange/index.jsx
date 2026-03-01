import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import PropTypes from 'prop-types';
import PlusIcon from '../../assets/icons/Plus';
import RemoveIcon from '../../assets/icons/Remove';

function CustomRange({ name, label, min = 0, max = 100, initialValue, onChange }) {
  const [value, setValue] = useState(initialValue);
  const { theme } = useContext(GlobalContext);
  const [fill, setFill] = useState('#ffffff');
  const [percent, setPercent] = useState(0);
  const activeTrackColor = theme === 'light' ? '#557663' : '#8fb49c';
  const inactiveTrackColor = theme === 'light' ? 'rgba(85, 118, 99, 0.18)' : 'rgba(219, 232, 223, 0.16)';

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(event);
    }
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    if (value < max) {
      let event = { target: { name, type: "range", value: value + 1 } };
      handleChange(event);
    }
  }

  const handleDecrement = (e) => {
    e.preventDefault();
    if (value > min) {
      let event = { target: { name, type: "range", value: value - 1 } };
      handleChange(event);
    }
  }

  useEffect(() => {
    setPercent(((value - min) * 100) / (max - min));
  }, [value, min, max]);

  useEffect(() => {
    setValue(initialValue);
  }, [ initialValue ]);

  useEffect(() => {
    setFill(theme === 'light' ? '#1f1f1f' : '#ffffff');
  }, [ theme ]);

  return (
    <div className="custom-range-container">
      <button
        type="button"
        onClick={handleDecrement}
        aria-label={`Reducir ${label.toLowerCase()}`}
        title={`Reducir ${label.toLowerCase()}`}
      >
        <RemoveIcon fill={fill} />
      </button>
      <input
        type="range"
        name={name}
        id={name}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="custom-range-slider"
        style={{
          background: `linear-gradient(to right, ${activeTrackColor} 0%, ${activeTrackColor} ${percent}%, ${inactiveTrackColor} ${percent}%, ${inactiveTrackColor} 100%)`,
        }}
      />
      <button
        type="button"
        onClick={handleIncrement}
        aria-label={`Aumentar ${label.toLowerCase()}`}
        title={`Aumentar ${label.toLowerCase()}`}
      >
        <PlusIcon fill={fill} />
      </button>
    </div>
  );
}

CustomRange.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  initialValue: PropTypes.number,
  onChange: PropTypes.func,
};

export default CustomRange;
