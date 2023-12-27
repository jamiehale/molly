import PropTypes from 'prop-types';
import { List, ListItem } from './List';
import { Link } from './Router';

export const People = ({ people }) => (
  <List>
    {people.map((person) => (
      <ListItem key={person.id}>
        <Link to={`/people/${person.id}`}>
          {person.surname}, {person.givenNames}
        </Link>
      </ListItem>
    ))}
  </List>
);

People.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object),
};
