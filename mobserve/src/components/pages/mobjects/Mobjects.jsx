import PropTypes from 'prop-types';
import { List, ListItem } from '../../List';
import { Link } from '../../Router';

export const Mobjects = ({ mobjects }) => (
  <List>
    {mobjects.map((mobject) => (
      <ListItem key={mobject.id}>
        <Link to={`/m/${mobject.id}`}>{mobject.key}</Link>
      </ListItem>
    ))}
  </List>
);

Mobjects.propTypes = {
  mobjects: PropTypes.arrayOf(PropTypes.object),
};
