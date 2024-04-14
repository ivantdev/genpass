import PropTypes from 'prop-types';

function PlusIcon({ fill }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill={fill} d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
  );
}

PlusIcon.propTypes = {
  fill: PropTypes.string,
};

PlusIcon.defaultProps = {
  fill: '#1f1f1f',
};

export default PlusIcon;