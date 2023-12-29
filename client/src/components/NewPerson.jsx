import PropTypes from 'prop-types';
import { NewPersonForm } from './NewPersonForm';
import { useCallback } from 'react';
import { usePeople } from '../hooks/people';
import { useGenders } from '../hooks/genders';

export const NewPerson = ({ onNewPerson }) => {
  const { createPerson } = usePeople();
  const { genders } = useGenders();

  const handleSubmit = useCallback(
    ({ givenNames, surname, genderId }) => {
      createPerson(givenNames, surname, genderId).then(() => {
        onNewPerson();
      });
    },
    [createPerson, onNewPerson],
  );

  return (
    <div className="max-w-md">
      <NewPersonForm genders={genders} onSubmit={handleSubmit} />
    </div>
  );
};

NewPerson.propTypes = {
  onNewPerson: PropTypes.func.isRequired,
};
