import PropTypes from 'prop-types';
import { classnames } from '../lib/classnames';

export const Button = ({ className, type, children, ...props }) => (
  <button
    className={classnames(
      'p-2 mt-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200',
      className,
    )}
    type={type || 'button'}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};
