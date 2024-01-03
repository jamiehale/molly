import PropTypes from 'prop-types';
import { PersonForm } from './PersonForm';
import { useCallback } from 'react';
import { usePeople } from '../hooks/people';
import { useGenders } from '../hooks/genders';

export const NewPerson = ({ onNewPerson, onCancel }) => {
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
      <PersonForm
        genders={genders}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

NewPerson.propTypes = {
  onNewPerson: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
