import PropTypes from 'prop-types';
import { List, ListItem } from '../../List';
import { Link } from '../../Router';

export const Collections = ({ collections }) => (
  <List>
    {collections.map((collection) => (
      <ListItem key={collection.id}>
        <Link to={`/collections/${collection.id}`}>{collection.title}</Link>
      </ListItem>
    ))}
  </List>
);

Collections.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.object),
};
