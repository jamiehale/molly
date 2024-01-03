import PropTypes from 'prop-types';
import { classnames } from '../lib/classnames';

export const FlexColumn = ({ className, children }) => (
  <div className={classnames('flex flex-col', className)}>{children}</div>
);

FlexColumn.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
