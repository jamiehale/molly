import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { LocationForm } from '../../forms/LocationForm';
import { useCreateLocation } from '../../../hooks/create-location';

export const NewLocation = ({ onNew, onCancel }) => {
  const { createLocation } = useCreateLocation();

  const handleSubmit = useCallback(
    ({ value }) =>
      createLocation(value).then(() => {
        onNew();
      }),
    [createLocation, onNew],
  );

  return (
    <div className="max-w-md">
      <LocationForm onSubmit={handleSubmit} onCancel={onCancel} />
    </div>
  );
};

NewLocation.propTypes = {
  onNew: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
