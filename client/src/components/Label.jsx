import PropTypes from 'prop-types';
import { Typography } from './Typography';

export const Label = ({ value, children }) => (
  <label className="flex flex-col">
    <Typography className="">{value}:</Typography>
    {children}
  </label>
);

Label.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
