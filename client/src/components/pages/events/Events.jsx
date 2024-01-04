import PropTypes from 'prop-types';
import { List, ListItem } from '../../List';
import { Link } from '../../Router';

export const Events = ({ events }) => (
  <List>
    {events.map((event) => (
      <ListItem key={event.id}>
        <Link to={`/events/${event.id}`}>
          {event.dateValue}: {event.title} ({event.typeTitle})
        </Link>
      </ListItem>
    ))}
  </List>
);

Events.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
};
