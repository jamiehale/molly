import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { EventForm } from '../../forms/EventForm';
import { useEvents } from '../../../hooks/events';
import { useEventTypes } from '../../../hooks/event-types';
import { useLocations } from '../../../hooks/locations';

export const NewEvent = ({ onNewEvent, onCancel }) => {
  const { createEvent } = useEvents();
  const { eventTypes } = useEventTypes();
  const { locations } = useLocations();

  const handleSubmit = useCallback(
    ({ title, typeId, dateValue, locationId }) =>
      createEvent(title, typeId, dateValue, locationId).then(() => {
        onNewEvent();
      }),
    [createEvent, onNewEvent],
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
  onNewEvent: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
