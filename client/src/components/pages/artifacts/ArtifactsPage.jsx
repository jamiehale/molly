import { useArtifacts } from '../../../hooks/artifacts';
import { NewArtifact } from './NewArtifact';
import { Artifacts } from './Artifacts';
import { Typography } from '../../Typography';
import { Layout } from '../../Layout';
import { ButtonToggle } from '../../ButtonToggle';

export const ArtifactsPage = () => {
  const { artifacts, loadArtifacts } = useArtifacts();

  return (
    <Layout>
      <Typography as="title">Artifacts</Typography>
      <Artifacts artifacts={artifacts} />
      <ButtonToggle
        buttonText="Add Artifact"
        renderOpen={(onClose) => (
          <NewArtifact
            onNew={() => {
              loadArtifacts().then(() => {
                onClose();
              });
            }}
            onCancel={onClose}
          />
        )}
      />
    </Layout>
  );
};
