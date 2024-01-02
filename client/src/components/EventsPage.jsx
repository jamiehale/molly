import { Typography } from './Typography';
import { Layout } from './Layout';
import { ButtonToggle } from './ButtonToggle';
import { Events } from './Events';
import { NewEvent } from './NewEvent';
import { useEvents } from '../hooks/events';

export const EventsPage = () => {
  const { events, reloadEvents } = useEvents();

  return (
    <Layout>
      <Typography as="title">Events</Typography>
      <Events events={events} />
      <ButtonToggle
        buttonText="Add Event"
        renderOpen={(onClose) => (
          <NewEvent
            onNewEvent={() => {
              reloadEvents();
              onClose();
            }}
          />
        )}
      />
    </Layout>
  );
};
