import PropTypes from 'prop-types';

function DisplayError({ error }) {
  if (!error) {
    return null;
  }
  return (
    <div className='error' role="alert">
      <strong>No se pudo generar la contraseña</strong>
      <p>{error}</p>
    </div>
  );
}

DisplayError.propTypes = {
  error: PropTypes.string,
};

export default DisplayError;
