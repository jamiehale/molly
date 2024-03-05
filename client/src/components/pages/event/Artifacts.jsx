import PropTypes from 'prop-types';
import { Typography } from '../../Typography';
import { useEventArtifacts } from '../../../hooks/event-artifacts';
import { ButtonToggle } from '../../ButtonToggle';
import { NewEventArtifact } from './NewEventArtifact';
import { ArtifactList } from '../../ArtifactList';

export const Artifacts = ({ eventId }) => {
  const { eventArtifacts, loadEventArtifacts } = useEventArtifacts(eventId);

  return (
    <>
      <Typography as="subtitle">Artifacts</Typography>
      <ArtifactList
        artifacts={eventArtifacts}
        displayFn={({ title }) => `${title}`}
      />
      <div>
        <ButtonToggle
          buttonText="Add Artifact"
          renderOpen={(onClose) => (
            <div>
              <NewEventArtifact
                eventId={eventId}
                onNew={() => {
                  loadEventArtifacts().then(() => {
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

Artifacts.propTypes = {
  eventId: PropTypes.string.isRequired,
};
