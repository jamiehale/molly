import PropTypes from 'prop-types';
import { List, ListItem } from './List';
import { Link } from './Router';

export const Locations = ({ locations }) => (
  <List>
    {locations.map((location) => (
      <ListItem key={location.id}>
        <Link to={`/locations/${location.id}`}>{location.value}</Link>
      </ListItem>
    ))}
  </List>
);

Locations.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object),
};
