import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useUpdateArtifact } from '../../../hooks/update-artifact';
import { useArtifactTypes } from '../../../hooks/artifact-types';
import { useArtifactSources } from '../../../hooks/artifact-sources';
import { useCollections } from '../../../hooks/collections';
import { ArtifactForm } from '../../forms/ArtifactForm';

export const EditArtifact = ({ artifact, onUpdate, onCancel }) => {
  const { updateArtifact } = useUpdateArtifact(artifact.id);
  const { artifactTypes } = useArtifactTypes();
  const { artifactSources } = useArtifactSources();
  const { collections } = useCollections();

  const handleSubmit = useCallback(
    ({ title, description, typeId, sourceId, collectionId }) =>
      updateArtifact(title, description, typeId, sourceId, collectionId).then(
        () => {
          onUpdate();
        },
      ),
    [updateArtifact, onUpdate],
  );

  return (
    <div className="max-w-md">
      <ArtifactForm
        artifact={artifact}
        artifactTypes={artifactTypes}
        artifactSources={artifactSources}
        collections={collections}
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
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
