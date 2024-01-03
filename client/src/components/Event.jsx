import { PropTypes } from 'prop-types';
import { Typography } from './Typography';

export const Event = ({ event }) => (
  <Typography as="title">Event: {event.title}</Typography>
);

Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
