import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import PropTypes from 'prop-types';
import PlusIcon from '../../assets/icons/Plus';
import RemoveIcon from '../../assets/icons/Remove';

function CustomRange({ name, min = 0, max = 100, initialValue, onChange }) {
  const [value, setValue] = useState(initialValue);
  const { theme } = useContext(GlobalContext);
  const [fill, setFill] = useState('#ffffff');
  const [percent, setPercent] = useState(0);

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
      <button onClick={handleDecrement}>
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
        style={{ background: `linear-gradient(to right, #008080 0%, #008080 ${percent}%, #999999 ${percent}%, #999999 100%)` }}
      />
      <button onClick={handleIncrement}>
        <PlusIcon fill={fill} />
      </button>
    </div>
  );
}

CustomRange.propTypes = {
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  initialValue: PropTypes.number,
  onChange: PropTypes.func,
};

export default CustomRange;
