import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { EventForm } from '../../forms/EventForm';
import { useEventTypes } from '../../../hooks/event-types';
import { useLocations } from '../../../hooks/locations';
import { useCreateEvent } from '../../../hooks/create-event';

export const NewEvent = ({ onCreate, onCancel }) => {
  const { createEvent } = useCreateEvent();
  const { eventTypes } = useEventTypes();
  const { locations } = useLocations();

  const handleSubmit = useCallback(
    ({ title, typeId, dateValue, locationId }) =>
      createEvent(title, typeId, dateValue, locationId).then(onCreate),
    [createEvent, onCreate],
  );

  return (
    <div className="max-w-md">
      <EventForm
        eventTypes={eventTypes}
        locations={locations}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

NewEvent.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
