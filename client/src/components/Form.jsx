import PropTypes from 'prop-types';

export const Form = ({ onSubmit, children }) => (
  <form className="flex flex-col p-1" onSubmit={onSubmit}>
    {children}
  </form>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
