import PropTypes from 'prop-types';

export const Button = ({ type, children, ...props }) => (
  <button
    className="px-4 py-2 rounded-md border"
    type={type || 'button'}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};
