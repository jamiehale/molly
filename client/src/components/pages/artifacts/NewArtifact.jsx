import PropTypes from 'prop-types';
import { ArtifactForm } from '../../forms/ArtifactForm';
import { useCallback } from 'react';
import { useArtifacts } from '../../../hooks/artifacts';
import { useArtifactTypes } from '../../../hooks/artifact-types';
import { useArtifactSources } from '../../../hooks/artifact-sources';
import { useArtifactCollections } from '../../../hooks/artifact-collections';

export const NewArtifact = ({ onNewArtifact, onCancel }) => {
  const { createArtifact } = useArtifacts();
  const { artifactTypes } = useArtifactTypes();
  const { artifactSources } = useArtifactSources();
  const { artifactCollections } = useArtifactCollections();

  const handleSubmit = useCallback(
    ({ title, description, typeId, sourceId, collectionId }) =>
      createArtifact(title, description, typeId, sourceId, collectionId).then(
        () => {
          onNewArtifact();
        },
      ),
    [createArtifact, onNewArtifact],
  );

  return (
    <div className="max-w-md">
      <ArtifactForm
        artifactTypes={artifactTypes}
        artifactSources={artifactSources}
        artifactCollections={artifactCollections}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

NewArtifact.propTypes = {
  onNewArtifact: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
