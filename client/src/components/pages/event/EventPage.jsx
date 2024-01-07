import PropTypes from 'prop-types';
import { Typography } from '../../Typography';
import { Layout } from '../../Layout';
import { Button } from '../../Button';
import { CustomToggle } from '../../CustomToggle';
import { useEvent } from '../../../hooks/event';
import { useEventPeople } from '../../../hooks/event-people';
import { EditEvent } from './EditEvent';
import { Event } from './Event';
import { FlexColumn } from '../../FlexColumn';
import { FlexRow } from '../../FlexRow';
import { List, ListItem } from '../../List';
import { ButtonToggle } from '../../ButtonToggle';
import { NewEventPerson } from './NewEventPerson';
import { PersonList } from '../../PersonList';

export const EventPeople = ({ eventPeople }) => (
  <List>
    {eventPeople.map((eventPerson) => (
      <ListItem key={eventPerson.id}>
        <Typography>
          {eventPerson.surname}, {eventPerson.givenNames}
        </Typography>
      </ListItem>
    ))}
  </List>
);

EventPeople.propTypes = {
  eventPeople: PropTypes.arrayOf(
    PropTypes.shape({
      surname: PropTypes.string,
      givenNames: PropTypes.string,
    }),
  ).isRequired,
};

export const EventPage = ({ params }) => {
  const { event, loadEvent } = useEvent(params.id);
  const { eventPeople, loadEventPeople } = useEventPeople(params.id);

  return (
    <Layout>
      {event && (
        <>
          <CustomToggle
            buttonText="Edit"
            renderOpen={(onClose) => (
              <FlexColumn>
                <Typography>Editing</Typography>
                <EditEvent
                  event={event}
                  onUpdate={() => {
                    loadEvent().then(() => {
                      onClose();
                    });
                  }}
                  onCancel={onClose}
                />
              </FlexColumn>
            )}
            renderClosed={(onOpen) => (
              <FlexColumn>
                <Event event={event} />
                <FlexRow>
                  <Button type="button" onClick={onOpen}>
                    Edit
                  </Button>
                </FlexRow>
              </FlexColumn>
            )}
          />
          <div>
            <Typography as="title">People</Typography>
            <PersonList
              people={eventPeople}
              displayFn={({ surname, givenNames, roleTitle }) =>
                `${surname}, ${givenNames} (${roleTitle})`
              }
            />
            {/* <EventPeople eventPeople={eventPeople} /> */}
            <div>
              <ButtonToggle
                buttonText="Add Person"
                renderOpen={(onClose) => (
                  <div>
                    <NewEventPerson
                      eventId={event.id}
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
          </div>
        </>
      )}
    </Layout>
  );
};

EventPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
