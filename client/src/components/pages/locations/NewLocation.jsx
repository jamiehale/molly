import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { LocationForm } from '../../forms/LocationForm';
import { useLocations } from '../../../hooks/locations';

export const NewLocation = ({ onNewLocation, onCancel }) => {
  const { createLocation } = useLocations();

  const handleSubmit = useCallback(
    ({ value }) =>
      createLocation(value).then(() => {
        onNewLocation();
      }),
    [createLocation, onNewLocation],
  );

  return (
    <div className="max-w-md">
      <LocationForm onSubmit={handleSubmit} onCancel={onCancel} />
    </div>
  );
};

NewLocation.propTypes = {
  onNewLocation: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
