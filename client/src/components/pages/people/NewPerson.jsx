import PropTypes from 'prop-types';
import { PersonForm } from '../../forms/PersonForm';
import { useCallback } from 'react';
import { useCreatePerson } from '../../../hooks/create-person';
import { useGenders } from '../../../hooks/genders';

export const NewPerson = ({ onNew, onCancel }) => {
  const { createPerson } = useCreatePerson();
  const { genders } = useGenders();

  const handleSubmit = useCallback(
    ({ givenNames, surname, genderId }) =>
      createPerson(givenNames, surname, genderId).then(() => {
        onNew();
      }),
    [createPerson, onNew],
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
  onNew: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
