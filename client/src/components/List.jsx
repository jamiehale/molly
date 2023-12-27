import PropTypes from 'prop-types';
import { classnames } from '../lib/classnames';

export const List = ({ className, children, ...props }) => (
  <ul className={classnames('m-1', className)} {...props}>
    {children}
  </ul>
);

List.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const ListItem = ({ className, children, ...props }) => (
  <li className={classnames('', className)} {...props}>
    {children}
  </li>
);

ListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
