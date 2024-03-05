import PropTypes from 'prop-types';
import { Typography } from '../../Typography';
import { useEventPeople } from '../../../hooks/event-people';
import { ButtonToggle } from '../../ButtonToggle';
import { NewEventPerson } from './NewEventPerson';
import { PersonList } from '../../PersonList';

export const People = ({ eventId }) => {
  const { eventPeople, loadEventPeople } = useEventPeople(eventId);

  return (
    <>
      <Typography as="subtitle">People</Typography>
      <PersonList
        people={eventPeople}
        displayFn={({ surname, givenNames, roleTitle }) =>
          `${surname}, ${givenNames} (${roleTitle})`
        }
      />
      <div>
        <ButtonToggle
          buttonText="Add Person"
          renderOpen={(onClose) => (
            <div>
              <NewEventPerson
                eventId={eventId}
                onNew={() => {
                  loadEventPeople().then(() => {
                    onClose();
                  });
                }}
                onCancel={onClose}
              />
            </div>
          )}
        />
      </div>
    </>
  );
};

People.propTypes = {
  eventId: PropTypes.string.isRequired,
};
