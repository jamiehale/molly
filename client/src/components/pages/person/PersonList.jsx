import PropTypes from 'prop-types';
import { Typography } from '../../Typography';
import { List, ListItem } from '../../List';
import { Link } from '../../Router';

export const PersonList = ({ people, displayFn }) => {
  const theDisplayFn =
    displayFn || ((person) => `${person.surname}, ${person.givenNames}`);

  return (
    <List>
      {people.map((person) => (
        <ListItem key={person.id}>
          <Link to={`/people/${person.id}`}>
            <Typography>{theDisplayFn(person)}</Typography>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

PersonList.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      surname: PropTypes.string,
      givenNames: PropTypes.string,
    }),
  ),
  displayFn: PropTypes.func,
};
