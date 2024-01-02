import PropTypes from 'prop-types';

export const Form = ({ error, onSubmit, children }) => (
  <form className="flex flex-col p-1" onSubmit={onSubmit}>
    {error && <p>{error}</p>}
    {children}
  </form>
);

Form.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
