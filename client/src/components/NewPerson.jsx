import PropTypes from 'prop-types';
import { NewPersonForm } from './NewPersonForm';
import { useCallback } from 'react';

export const NewPerson = ({ onNewPerson, genders }) => {
  const handleSubmit = useCallback(
    ({ givenNames, surname, genderId }) => {
      onNewPerson(givenNames, surname, genderId);
    },
    [onNewPerson],
  );

  return (
    <div className="max-w-md">
      <NewPersonForm genders={genders} onSubmit={handleSubmit} />
    </div>
  );
};

NewPerson.propTypes = {
  onNewPerson: PropTypes.func.isRequired,
  genders: PropTypes.arrayOf(PropTypes.object),
};
