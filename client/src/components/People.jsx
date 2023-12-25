import PropTypes from "prop-types";

export const People = ({ people }) => (
  <ul>
    {people.map((person) => (
      <li key={person.id}>
        {person.surname}, {person.givenNames}
      </li>
    ))}
  </ul>
);

People.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object),
};
