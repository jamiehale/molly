import PropTypes from 'prop-types';
import { PersonForm } from '../../forms/PersonForm';
import { useCallback } from 'react';
import { useGenders } from '../../../hooks/genders';
import { usePerson } from '../../../hooks/person';

export const EditPerson = ({ person, onUpdatePerson, onCancel }) => {
  const { updatePerson } = usePerson(person.id);
  const { genders } = useGenders();

  const handleSubmit = useCallback(
    ({ givenNames, surname, genderId }) =>
      updatePerson(givenNames, surname, genderId).then(() => {
        onUpdatePerson();
      }),
    [updatePerson, onUpdatePerson],
  );

  return (
    <div className="max-w-md">
      <PersonForm
        person={person}
        genders={genders}
        submitButtonText="Update"
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

EditPerson.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    givenNames: PropTypes.string,
    surname: PropTypes.string,
    genderId: PropTypes.string.isRequired,
  }).isRequired,
  onUpdatePerson: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
