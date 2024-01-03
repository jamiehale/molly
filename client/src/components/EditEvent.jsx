import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useEvent } from '../hooks/event';
import { useEventTypes } from '../hooks/event-types';
import { useLocations } from '../hooks/locations';
import { EventForm } from './EventForm';

export const EditEvent = ({ event, onUpdateEvent }) => {
  const { updateEvent } = useEvent(event.id);
  const { eventTypes } = useEventTypes();
  const { locations } = useLocations();

  const handleSubmit = useCallback(
    ({ givenNames, surname, genderId }) => {
      updateEvent(givenNames, surname, genderId).then(() => {
        onUpdateEvent();
      });
    },
    [updateEvent, onUpdateEvent],
  );

  return (
    <div className="max-w-md">
      <EventForm
        event={event}
        eventTypes={eventTypes}
        locations={locations}
        submitButtonText="Update"
        onSubmit={handleSubmit}
      />
    </div>
  );
};

EditEvent.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    typeId: PropTypes.string.isRequired,
    dateValue: PropTypes.string.isRequired,
    locationId: PropTypes.string,
  }).isRequired,
  onUpdateEvent: PropTypes.func.isRequired,
};
