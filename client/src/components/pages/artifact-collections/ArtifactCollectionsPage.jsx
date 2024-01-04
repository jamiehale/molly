import { useArtifactCollections } from '../../../hooks/artifact-collections';
import { NewArtifactCollection } from './NewArtifactCollection';
import { ArtifactCollections } from './ArtifactCollections';
import { Typography } from '../../Typography';
import { Layout } from '../../Layout';
import { ButtonToggle } from '../../ButtonToggle';

export const ArtifactCollectionsPage = () => {
  const { artifactCollections, reloadArtifactCollections } =
    useArtifactCollections();

  return (
    <Layout>
      <Typography as="title">Artifact Collections</Typography>
      <ArtifactCollections artifactCollections={artifactCollections} />
      <ButtonToggle
        buttonText="Add Artifact Collection"
        renderOpen={(onClose) => (
          <NewArtifactCollection
            onNewArtifactCollection={() => {
              reloadArtifactCollections();
              onClose();
            }}
            onCancel={onClose}
          />
        )}
      />
    </Layout>
  );
};
