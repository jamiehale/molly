import PropTypes from 'prop-types';
import { Link } from './Router';
import { List, ListItem } from './List';

export const Layout = ({ children }) => (
  <div>
    <nav>
      <List>
        <ListItem>
          <Link to="/">Home</Link>
        </ListItem>
        <ListItem>
          <Link to="/events">Events</Link>
        </ListItem>
        <ListItem>
          <Link to="/people">People</Link>
        </ListItem>
        <ListItem>
          <Link to="/locations">Locations</Link>
        </ListItem>
      </List>
    </nav>
    <div>{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};
