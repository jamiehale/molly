import PropTypes from 'prop-types';
import { classnames } from '../lib/classnames';

export const FlexRow = ({ className, children }) => (
  <div className={classnames('flex flex-row', className)}>{children}</div>
);

FlexRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
