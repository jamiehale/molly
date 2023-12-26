import PropTypes from "prop-types";
import { List, ListItem } from "./List";

export const People = ({ people }) => (
  <List>
    {people.map((person) => (
      <ListItem key={person.id}>
        {person.surname}, {person.givenNames}
      </ListItem>
    ))}
  </List>
);

People.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object),
};
