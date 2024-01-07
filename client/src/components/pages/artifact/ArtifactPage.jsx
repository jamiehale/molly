import PropTypes from 'prop-types';
import { Typography } from '../../Typography';
import { Layout } from '../../Layout';
import { Button } from '../../Button';
import { CustomToggle } from '../../CustomToggle';
import { useArtifact } from '../../../hooks/artifact';
import { EditArtifact } from './EditArtifact';
import { Artifact } from './Artifact';
import { FlexColumn } from '../../FlexColumn';
import { FlexRow } from '../../FlexRow';

export const ArtifactPage = ({ params }) => {
  const { artifact, loadArtifact } = useArtifact(params.id);

  return (
    <Layout>
      {artifact && (
        <>
          <CustomToggle
            buttonText="Edit"
            renderOpen={(onClose) => (
              <FlexColumn>
                <Typography>Editing</Typography>
                <EditArtifact
                  artifact={artifact}
                  onUpdate={() => {
                    loadArtifact().then(() => {
                      onClose();
                    });
                  }}
                  onCancel={onClose}
                />
              </FlexColumn>
            )}
            renderClosed={(onOpen) => (
              <FlexColumn>
                <Artifact artifact={artifact} />
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

ArtifactPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
