import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useArtifact } from '../hooks/artifact';
import { useArtifactTypes } from '../hooks/artifact-types';
import { useArtifactSources } from '../hooks/artifact-sources';
import { useArtifactCollections } from '../hooks/artifact-collections';
import { ArtifactForm } from './ArtifactForm';

export const EditArtifact = ({ artifact, onUpdateArtifact, onCancel }) => {
  const { updateArtifact } = useArtifact(artifact.id);
  const { artifactTypes } = useArtifactTypes();
  const { artifactSources } = useArtifactSources();
  const { artifactCollections } = useArtifactCollections();

  const handleSubmit = useCallback(
    ({ title, description, typeId, sourceId, collectionId }) =>
      updateArtifact(title, description, typeId, sourceId, collectionId).then(
        () => {
          onUpdateArtifact();
        },
      ),
    [updateArtifact, onUpdateArtifact],
  );

  return (
    <div className="max-w-md">
      <ArtifactForm
        artifact={artifact}
        artifactTypes={artifactTypes}
        artifactSources={artifactSources}
        artifactCollections={artifactCollections}
        submitButtonText="Update"
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

EditArtifact.propTypes = {
  artifact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    typeId: PropTypes.string.isRequired,
    sourceId: PropTypes.string.isRequired,
    collectionId: PropTypes.string.isRequired,
  }).isRequired,
  onUpdateArtifact: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
