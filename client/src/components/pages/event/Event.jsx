import { PropTypes } from 'prop-types';
import { Typography } from '../../Typography';

export const Event = ({ event }) => (
  <>
    <Typography as="title">Event: {event.title}</Typography>
    <Typography>Type: {event.typeTitle}</Typography>
    <Typography>Date: {event.dateValue}</Typography>
    <Typography>Location: {event.locationValue}</Typography>
  </>
);

Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    typeTitle: PropTypes.string.isRequired,
    dateValue: PropTypes.string.isRequired,
    locationValue: PropTypes.string.isRequired,
  }).isRequired,
};
