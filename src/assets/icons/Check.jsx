import PropTypes from 'prop-types';

function CheckIcon({ fill }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
      <path fill={fill} d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  );
}

CheckIcon.propTypes = {
  fill: PropTypes.string,
};

CheckIcon.defaultProps = {
  fill: '#2E6380',
};

export default CheckIcon;
