import PropTypes from 'prop-types';
import { Typography } from '../../Typography';
import { Layout } from '../../Layout';
import { Button } from '../../Button';
import { CustomToggle } from '../../CustomToggle';
import { useEffect } from 'react';
import { useArtifactCollection } from '../../../hooks/artifact-collection';
import { EditArtifactCollection } from './EditArtifactCollection';
import { ArtifactCollection } from './ArtifactCollection';

export const ArtifactCollectionPage = ({ params }) => {
  const { artifactCollection, reload: reloadArtifactCollection } =
    useArtifactCollection(params.id);

  useEffect(reloadArtifactCollection, [reloadArtifactCollection]);

  return (
    <Layout>
      {artifactCollection && (
        <>
          <CustomToggle
            buttonText="Edit"
            renderOpen={(onClose) => (
              <div>
                <Typography>Editing</Typography>
                <EditArtifactCollection
                  artifactCollection={artifactCollection}
                  onUpdateArtifactCollection={() => {
                    reloadArtifactCollection();
                    onClose();
                  }}
                  onCancel={onClose}
                />
              </div>
            )}
            renderClosed={(onOpen) => (
              <div>
                <ArtifactCollection artifactCollection={artifactCollection} />
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

ArtifactCollectionPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
