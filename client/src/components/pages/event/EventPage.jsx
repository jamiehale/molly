import PropTypes from 'prop-types';
import { Typography } from '../../Typography';
import { Layout } from '../../Layout';
import { Button } from '../../Button';
import { CustomToggle } from '../../CustomToggle';
import { useEvent } from '../../../hooks/event';
import { EditEvent } from './EditEvent';
import { Event } from './Event';
import { FlexColumn } from '../../FlexColumn';
import { FlexRow } from '../../FlexRow';
import { Link } from '../../Router';
import { People } from './People';
import { Artifacts } from './Artifacts';

export const EventPage = ({ params }) => {
  const { event, loadEvent } = useEvent(params.id);

  return (
    <Layout>
      <Link to="/events">&lt;&lt;</Link>
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
            <People eventId={event.id} />
            <Artifacts eventId={event.id} />
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
