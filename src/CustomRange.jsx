import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function CustomRange({ name, min = 0, max = 100, initialValue = 16, onChange }) {
  const [value, setValue] = useState(initialValue);
  const [percent, setPercent] = useState(0);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  useEffect(() => {
    setPercent(((value - min) * 100) / (max - min));
  }, [value, min, max]);

  return (
    <div className="custom-range-container">
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
