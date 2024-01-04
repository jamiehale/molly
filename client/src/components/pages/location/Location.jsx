import { PropTypes } from 'prop-types';
import { Typography } from '../../Typography';

export const Location = ({ location }) => (
  <Typography as="title">Location: {location.value}</Typography>
);

Location.propTypes = {
  location: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
};
