import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useLocation } from '../hooks/location';
import { LocationForm } from './LocationForm';

export const EditLocation = ({ location, onUpdateLocation, onCancel }) => {
  const { updateLocation } = useLocation(location.id);

  const handleSubmit = useCallback(
    ({ value }) => {
      updateLocation(value).then(() => {
        onUpdateLocation();
      });
    },
    [updateLocation, onUpdateLocation],
  );

  return (
    <div className="max-w-md">
      <LocationForm
        location={location}
        submitButtonText="Update"
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

EditLocation.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  onUpdateLocation: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
