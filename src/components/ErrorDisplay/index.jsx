import PropTypes from 'prop-types';

function DisplayError({ error }) {
  if (!error) {
    return null;
  }
  return (
    <div className='error' style={{color: "red"}}>
      {error}
    </div>
  );
}

DisplayError.propTypes = {
  error: PropTypes.string,
};

export default DisplayError;