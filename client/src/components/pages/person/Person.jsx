import { PropTypes } from 'prop-types';
import { Typography } from '../../Typography';

export const Person = ({ person }) => (
  <>
    <Typography as="title">
      Person: {person.surname}, {person.givenNames}
    </Typography>
    <Typography>Gender: {person.genderTitle}</Typography>
  </>
);

Person.propTypes = {
  person: PropTypes.shape({
    givenNames: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    genderTitle: PropTypes.string.isRequired,
  }).isRequired,
};
