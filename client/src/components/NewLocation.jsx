import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { LocationForm } from './LocationForm';
import { useLocations } from '../hooks/locations';

export const NewLocation = ({ onNewLocation }) => {
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
      <LocationForm onSubmit={handleSubmit} />
    </div>
  );
};

NewLocation.propTypes = {
  onNewLocation: PropTypes.func.isRequired,
};
