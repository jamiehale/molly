import PropTypes from 'prop-types';
import { Typography } from './Typography';
import { Layout } from './Layout';
import { Button } from './Button';
import { CustomToggle } from './CustomToggle';
import { useEffect } from 'react';
import { useEvent } from '../hooks/event';
import { EditEvent } from './EditEvent';
import { Event } from './Event';
import { FlexColumn } from './FlexColumn';
import { FlexRow } from './FlexRow';

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
              <FlexColumn>
                <Typography>Editing</Typography>
                <EditEvent
                  event={event}
                  onUpdateEvent={() => {
                    reloadEvent();
                    onClose();
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
