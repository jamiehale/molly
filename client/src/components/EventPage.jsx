import PropTypes from 'prop-types';
import { Typography } from './Typography';
import { Layout } from './Layout';
import { Button } from './Button';
import { CustomToggle } from './CustomToggle';
import { useEffect } from 'react';
import { useEvent } from '../hooks/event';
import { EditEvent } from './EditEvent';

export const EventPage = ({ params }) => {
  const { event, reload: reloadEvent } = useEvent(params.id);

  useEffect(reloadEvent, [reloadEvent]);

  return (
    <Layout>
      {event && (
        <>
          <CustomToggle
            buttonText="Edit"
            renderOpen={(onClose) => (
              <div>
                <Typography>Editing</Typography>
                <EditEvent
                  event={event}
                  onUpdateEvent={() => {
                    reloadEvent();
                    onClose();
                  }}
                />
                <Button type="button" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            )}
            renderClosed={(onOpen) => (
              <div>
                <Typography as="title">Event: {event.title}</Typography>
                <Button type="button" onClick={onOpen}>
                  Edit
                </Button>
              </div>
            )}
          />
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
