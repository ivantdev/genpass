import PropTypes from 'prop-types';

function RemoveIcon({ fill }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill={ fill } d="M200-440v-80h560v80H200Z"/></svg>
  );
}

RemoveIcon.propTypes = {
  fill: PropTypes.string,
};

RemoveIcon.defaultProps = {
  fill: '#1f1f1f',
};

export default RemoveIcon;